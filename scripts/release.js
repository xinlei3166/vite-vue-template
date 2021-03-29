#!/usr/bin/env node

const minimist = require('minimist')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const semver = require('semver')
const currentVersion = require('../package.json').version
const { prompt } = require('enquirer')
const execa = require('execa')

const argv = minimist(process.argv.slice(2), {
  string: ['hello']
})

console.log(chalk.cyan(argv.hello))
