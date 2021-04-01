#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const semver = require('semver')
const currentVersion = require('../package.json').version
const { prompt } = require('enquirer')
const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))

const preId =
  args.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
const isDryRun = args.dry
const skipTests = args.skipTests || false
const skipBuild = args.skipBuild || false
const resolve = (...args) => path.resolve(__dirname, ...args)
const packages = fs.readdirSync(resolve('../packages')).filter(item => {
  const stat = resolve('../packages' + item)
  return stat.isDirectory()
})
console.log(packages)

const skippedPackages = []

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
]

const inc = i => semver.inc(currentVersion, i, preId)
console.log(inc)
const bin = name => resolve('../node_modules/.bin/', name)
const exec = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const run = isDryRun ? dryRun : exec
const getPkgRoot = pkg => resolve('../packages/', pkg)
const step = (msg, newline = true) => console.log(chalk.cyan(newline ? '\n' + msg : msg))

async function main() {
  let targetVersion = args._[0]

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
    })

    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion
        })
      ).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }

  // run tests before release
  step('Running tests...')
  if (!skipTests && !isDryRun) {
    await run(bin('jest'), ['--clearCache'])
    await run('yarn', ['test', '--bail'])
  } else {
    console.log(`(skipped)`)
  }

  // update all package versions and inter-dependencies
  step('Updating cross dependencies...')
  updateVersions(targetVersion)

  // build all packages with types
  step('Building all packages...')
  if (!skipBuild && !isDryRun) {
    await run('yarn', ['build', '--release'])
    // test generated dts files
    step('Verifying type declarations...')
    await run('yarn', ['test-dts-only'])
  } else {
    console.log(`(skipped)`)
  }

  // generate changelog
  await run(`yarn`, ['changelog'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('Committing changes...')
    await run('git', ['add', '-A'])
    await run('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // publish packages
  step('Publishing packages...')
  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion, run)
  }

  // push to GitHub
  step('Pushing to GitHub...')
  await run('git', ['tag', `v${targetVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`)
  }

  if (skippedPackages.length) {
    console.log(
      chalk.yellow(
        `The following packages are skipped and NOT published:\n- ${skippedPackages.join('\n- ')}`
      )
    )
  }
  console.log()
}

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(resolve('..'), version)
  // 2. update all packages
  packages.forEach(p => updatePackage(getPkgRoot(p), version))
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  updateDeps(pkg, 'dependencies', version)
  updateDeps(pkg, 'peerDependencies', version)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

function updateDeps(pkg, depType, version) {
  const deps = pkg[depType]
  if (!deps) return
  Object.keys(deps).forEach(dep => {
    if (
      dep === 'vue' ||
      (dep.startsWith('@vue') && packages.includes(dep.replace(/^@vue\//, '')))
    ) {
      console.log(chalk.yellow(`${pkg.name} -> ${depType} -> ${dep}@${version}`))
      deps[dep] = version
    }
  })
}

async function publishPackage(pkgName, version, run) {
  if (skippedPackages.includes(pkgName)) {
    return
  }
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  // for now (alpha/beta phase), every package except "vue" can be published as
  // `latest`, whereas "vue" will be published under the "next" tag.
  const releaseTag = args.tag || (pkgName === 'vue' ? 'next' : null)

  // const releaseTag = semver.prerelease(version)[0] || null

  step(`Publishing ${pkgName}...`)
  try {
    await run(
      'yarn',
      [
        'publish',
        '--new-version',
        version,
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public'
      ],
      {
        cwd: pkgRoot,
        stdio: 'pipe'
      }
    )
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}

main().catch(err => {
  console.error(err)
})
