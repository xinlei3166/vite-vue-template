const to = require('await-to-js').default
const Client = require('ssh2-sftp-client')
const sftp = new Client()
const srcDir = `${__dirname}/dist`
const dstDir = `/data/nginx/html/vite-vue-template`

const config = {
  host: '192.168.1.1',
  username: '',
  password: ''
}

async function run() {
  let err
  ;[err] = await to(sftp.connect(config))
  if (err) {
    console.log(err, `连接失败`)
    return
  }
  ;[err] = await to(sftp.rmdir(dstDir, true))
  ;[err] = await to(sftp.uploadDir(srcDir, dstDir))
  if (err) {
    sftp.end()
    return
  }
  console.log(`Source Dir: ${srcDir}`)
  console.log(`Dest Dir: ${dstDir}`)
  console.log(`Host: ${config.host}`)
  console.log(`上传成功`)
  sftp.end()
}

run()
