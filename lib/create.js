

const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

const Generator = require('./Generator')

module.exports =  async (name, option) => {
    // 执行创建的命令
    //获取当前的目录

    const cmd = process.cwd()

    //获取需要创建的目录地址
    
    const targetDir = path.join(cmd, name)

    //判断目录是否已存在

    if(fs.existsSync(targetDir)){

        //直接覆盖
        if(option.force){
            await fs.remove(targetDir)
        }else{

            //询问用户是否覆盖
            const { action } = await inquirer.prompt([
                {
                    name:'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action',
                    choices:[
                        {
                            name: 'Overwrite',
                            value:'overwrite'
                        },
                        {
                            name:'Cancel',
                            value:false
                        }
                    ]
                }
            ]) 
            if(!action){
                return
            }else if(action === 'overwrite'){
                console.log('\r\nRemoving')
                await fs.remove(targetDir)
            }
        }
    }else{
        
    }

    // 创建项目
    const generator = new Generator(name, targetDir)

    generator.create()

}