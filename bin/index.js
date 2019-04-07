#!/usr/bin/env node

// console.log('hello world')
var program = require('commander')
var readline = require('readline')

var install = require('../tasks/install/index')

let cmdValue;

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
  .command('init [tpl] [output]')
  .alias('i')
  .description('download the appointed template')
  // .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(output, tpl){

    cmdValue = 'init'
    install(output, tpl)
  });

// 捕获没有命中的命令
program
  .arguments('<cmd> [data]')
  .action((cmd, data) => {

    console.log('<cmd>: ', cmd, data)
    program.help()
  })
  // .on('command:*', function () {
  //   console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  //   process.exit(1);
  // });

// program
//   .command('*')
//   .action(function(env){
//     console.log('deploying "%s"', env);
//   });

program.parse(process.argv)

if (typeof cmdValue === 'undefined') {
  install()
}
