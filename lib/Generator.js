
const { getRepoList,getTagList } = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk')
const {questions}  = require('./questions')
const fs = require('fs-extra')

//添加动画
const wrapLoading = async(fn, message, ...args) => {
    //使用ora 初始化， 传入提示信息 message
    const spinner = ora(message)
    //开始donghua
    spinner.start()

    try {
        //传入执行的方法
        const result = await fn(...args)
        //状态修改为成功
        spinner.succeed()

        return result
    } catch (error) {
        //状态修改为失败
        spinner.fail('Request fauled, refetch ...')
        return Promise.reject(error)

    }

}


class Generator{
    constructor(name, targetDir){
        this.name = name;

        this.targetDir = targetDir
        this.downloadGitRepo = util.promisify(downloadGitRepo)
    }
    //下载模板
    /**
     * 1、拼接下载地址
     * 
     * 2、调用下载方法
     */
    async download(repo, tag){
        //1、拼接下载地址
        const requestUrl = `dguoqing/${repo}${tag ? '#' + tag : ''}`
        console.log('下载地址',requestUrl)

        //2、 调用下载方法
        return await wrapLoading(this.downloadGitRepo, 'waiting download template', requestUrl, path.resolve(process.cwd(), this.targetDir))
    }

    //获取用户选择的模板
    /**
     * 1、从远程获取模板数据
     * 
     * 2、用户选择自己新下载的模板名称
     * 
     * 3、返回用户选择的模板名称
     */

    async getRepo(){

            //1、拉去数据
            const resultList  = await wrapLoading(getRepoList, 'wating fetch template')
            if(!resultList) return 
            // console.log(resultList)

            //过滤我们需要的模板名称
            const repos = resultList.map(item => item.name)

            //用户选择自己新下载的模板名称
            // const result = await inquirer.prompt(questions)
            const result = await inquirer.prompt({
                name:'repo',
                type:'list',
                choices: repos,
                message:'Please choose a repo to create project'
            })

            const {repo} = result

            //返回用户选择的模板名称
            return repo
    }

    //获取用户选择的版本
    /**
     * 1、给予repo 结果，远程拉去对应的tag 列表
     * 
     * 2、用户选择自己下载的 tag
     * 
     * 3、返回用户选择的tag
     */

     async getTag(repo){

        //1、给予repo 结果，远程拉去对应的tag 列表
        const tagList  = await wrapLoading(getTagList, 'wating fetch Tag', repo)

        if(!tagList) return 

        //过滤我们需要的Tag名称
        const tags = tagList.map(item => item.name)

        //用户选择自己新下载的Tag
        const result = await inquirer.prompt([
            {
                name:'tag',
                type:'list',
                choices: tags,
                message:'Please choose a Tag to create project'
            },
            {
                
                name: 'name',
                message: 'Please enter the project name: '
            },
            {
                
                name: 'description',
                message: 'Please enter the project description: '
            },
            {
                name: 'author',
                message: 'Please enter the author name: '
            }
            
        ])

        //返回用户选择的模板名称
        return result
    }
    writePackage(packageobj){
        const fieldName = `${this.name}/package.json`;
        if(fs.existsSync(fieldName)){
            const data = fs.readFileSync(fieldName).toString()
            let json = JSON.parse(data)
            json = Object.assign(json, packageobj)
            //修改项目文件夹中 package.json 文件
            fs.writeFileSync(fieldName, JSON.stringify(json, null, '\t'), 'utf-8');
        }

    }

    //核心创建逻辑
    /**
     * 1、获取模板名称
     * 2、获取tag名称
     * 3、下载模板到模板目录
     */
    async create(){

        //1、获取模板名称
        const repo = await this.getRepo()
        // console.log('用户选择了repo', repo)

        //2、获取tag 名称
        const {tag, ...packageobj}  = await this.getTag(repo)

        // console.log('用户选择了repo:', repo, 'tag:', tag)

        //3、下载模板到模板目录
        await this.download(repo, tag).then(() => {
            //4、模板使用提示
            this.writePackage(packageobj)
            
            console.log(`\r\n${chalk.greenBright('Successfully created project')} ${chalk.cyan(this.name)}`)
            console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
            console.log('  npm i / yarn')
            console.log('  npm run dev\r\n')
        }).catch((error) => {
            console.log(chalk.redBright(`下载失败,原因：${error}`),)
        })
    }

}

module.exports = Generator