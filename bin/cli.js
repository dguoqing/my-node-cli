#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora');

// program.version('0.1.0').command('create <name>').description('create a project').action(name => {
//     // 打印命令行输入的值

//     // 文本样式
//     console.log("project name is " + chalk.bold(name))

//     // 颜色
//     console.log("project name is " + chalk.cyan(name))
//     console.log("project name is " + chalk.green(name))

//     // 背景色
//     console.log("project name is " + chalk.bgRed(name))

//     // 使用RGB颜色输出
//     console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
//     console.log("project name is " + chalk.hex('#049CDB').bold(name));
//     console.log("project name is " + chalk.bgHex('#049CDB').bold(name))

// })
// program.parse()

// 自定义文本信息
const message = 'Loading unicorns'
// 初始化
const spinner = ora(message);
// 开始加载动画
spinner.start();

setTimeout(() => {
    // 修改动画样式

    // Type: string
    // Default: 'cyan'
    // Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
    spinner.color = 'red';    
    spinner.text = 'Loading rainbows';

    setTimeout(() => {
        // 加载状态修改
        spinner.stop() // 停止
        spinner.succeed('Loading succeed'); // 成功 ✔
        // spinner.fail(text?);  失败 ✖
        // spinner.warn(text?);  提示 ⚠
        // spinner.info(text?);  信息 ℹ
    }, 2000);
}, 2000);

