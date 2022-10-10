#! /usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const figlet = require('figlet')

program
    //定义命令和参数
    .command('create <app-name>') // <必选>  [可选] 
    .option('sdfa')
    .description('create a new project')
    //-f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwirite target directory if it eexist')
    .action((name, option) => {
        //打印一下执行的结果
        // console.log('执行结果','name', name, 'option', option)
        require('../lib/create.js')(name || 'ooooo',option)
    })


program

//配置版本号信息
.version(`v${require('../package.json').version}`)
.usage('<command> [option]')

//配置config的命令
program.command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((name, options) => {
        console.log('配置config中的命令参数',name, options)
    })


// 配置ui 命令

program.command('ui')
.description('start add open roc-cli ui')
.option('-p, --port <port>', 'delete option from config')
.action((value, options) => {
    console.log('这是ui 命令的参数', value, options)
})

//配置help

program.on('--help', () => {

    //使用 figlet 绘制logo
    console.log('\r\n' + figlet.textSync('ldcli',{
        font:'Ghost',
        horizontalLayout:'default',
        verticalLayout:'default',
        width:80,
        whitespaceBreak:true
    }))

    //新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`ldcli <command> --help`)} for detail uasge given command \r\n`)
})

//解析用户输入的指令时传入的参数

program.parse(process.argv)

// console.log('canshu',process.argv)