#!/usr/bin/env node

// console.log('hello world')
var program = require('commander')
var readline = require('readline')

var execCli = require('../tasks/index')

var install = require('../tasks/install/index')

// // program.parse(process.argv)
// var tplDir = `git@github.com:vuejs/${tplName}.git`


// var rl = readline.createInterface(process.stdin, process.stdout)

// rl.question('what is your name ?', name => {
//   console.log(`name is ${name}`)

//   downFiles(`git@github.com:vuejs/${name}.git`)

//   rl.close()
// })

program
  // .version('0.1.0')
  .version(require('../package.json').version)
  .option('-v, --version', 'show the version of the node package');

  
  program
    .command('init [tpl]')
    // .alias('i')
    .description('download the appointed template')
    // .option("-e, --exec_mode <mode>", "Which exec mode to use")
    .action(function(tpl, a, b){

      install(tpl)
    });

  // 捕获没有命中的命令
  program
    .arguments('<cmd> [data]')
    .action((data, commands) => {
      console.log('<cmd>: ', data, commands)
      program.help()
    })
      
program.parse(process.argv);