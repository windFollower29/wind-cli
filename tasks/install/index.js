const inquired = require('inquirer')
const { exec } = require('child_process')

const chalk = require('chalk')
var ora = require('ora')

const gitDown = require('github-download-parts')

const log = console.log.bind(console)

let gitUrl = `windFollower29/webpack-templates`

function download(output, tplName) {

	var spinner = ora('downloading template').start()

	return gitDown(gitUrl, output || tplName, tplName)
		.then(() => {
			spinner.stop()
			log(chalk.yellow('下载完成'))
		})
		.catch((err) => {
			spinner.stop()
			log(chalk.yellow('下载失败', err))
		})
}

module.exports = function(output, tpl) {
	const choices = ['common', 'demo', 'hehe']

	if (tpl && choices.indexOf(tpl) > -1) {
		// 输入了正确的模板，直接进入安装流程
		return download(output, tpl)
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
				return res.ensure ?
					Promise.resolve(answer.template) :
					Promise.reject('exit')
			})
	}).then(tplName => {

		return download(output, tplName)
		// return Promise.resolve(tplName)

	}).catch(err => {
		log(err)
	})
}