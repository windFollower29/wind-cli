
const inquired = require('inquirer')
const { exec } = require('child_process')

const gitDownload = require('git-download')

const tplUrl = `git clone git@github.com:vuejs/{name}.git`


module.exports = function (tpl) {
  const choices = ['vue-router', 'vuex']

  inquired.prompt({
    type: 'list',
    name: 'template',
    message: 'choose the template you want to download',
    choices: choices
  }).then(answer => {
    console.log('the template is ', answer.template)
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
    console.log('confirm ', tplName)

    const url = tplUrl.replace(/{name}/g, tplName)
    console.log('url', url)
    // gitDownload({
    //   source: url,
    //   dest: '../'
    // }, (err, file) => {
    //   console.log(err)
    //   console.log('hhhh')
    // })

    exec(url)

  }).catch(err => {
    console.log(err)
  })
}