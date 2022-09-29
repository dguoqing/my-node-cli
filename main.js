#! /usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs  = require('ejs')


inquirer.prompt([
    {
      type: 'input', //type： input, number, confirm, list, checkbox ... 
      name: 'name', // key 名
      message: 'Your name', // 提示信息
      default: 'my-node-cli' // 默认值
    }
  ]).then(answers => {
    // 打印互用输入结果
    console.log(answers)
    //获取模板目录
    const tempaltePath = path.join(__dirname,'templates')
    
    //生成文件目录
    const cwdPath = process.cwd()

    //从模板中读取文件
    fs.readdir(tempaltePath,(err,files) => {
      if(err) throw err
      files.forEach(file => {
        //使用ejs 对应的模板文件

        ejs.renderFile(path.join(tempaltePath,file),answers).then(data => {
          //生成ejs处理后的模板文件
          fs.writeFileSync(path.join(cwdPath, file), data)
        })
      })
    })
  })
