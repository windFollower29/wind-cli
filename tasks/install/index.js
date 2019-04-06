// git@github.com:vuejs/vue-router.git
// git@github.com:vuejs/vuex.git


const inquired = require('inquirer')
const { exec } = require('child_process')

const chalk = require('chalk')
var ora = require('ora')
const gitDownload = require('git-download')

const log = console.log.bind(console)

const tplUrl = `git@github.com:vuejs/{name}.git`

function download (tplName) {
  var url = tplUrl.replace(/\{name\}/g, tplName)
  log(chalk.yellow('下载地址 ', url))

  var spinner = ora('downloading template').start()

  exec(`git clone ${url}`, (err, stdout, stderr) => {
    spinner.stop()
    log(chalk.green('exec回调', err, stdout, stderr))
  })
}

module.exports = function (tpl) {
  const choices = ['vue-router', 'vuex']

  if (tpl && choices.indexOf(tpl) > -1) {
    // 输入了正确的模板，直接进入安装流程
    return download(tpl)
  }

  inquired.prompt({
    type: 'list',
    name: 'template',
    message: 'choose the template you want to download',
    choices: choices
  }).then(answer => {
    log('the template is ', answer.template)
    return inquired.prompt({
      type: 'confirm',
      name: 'ensure',
      message: `are you sure to download ${answer.template}`
    }).then(res => {
      // 跳出后续的.then操作
      // return answer.template
      return res.ensure
        ? Promise.resolve(answer.template)
        : Promise.reject('exit')
    })
  }).then(tplName => {
    log('confirm ', tplName)

    // gitDownload({
    //   source: url,
    //   dest: '../'
    // }, (err, file) => {
    //   log(err)
    //   log('hhhh')
    // })

    download(tplName)

  }).catch(err => {
    log(err)
  })
}
