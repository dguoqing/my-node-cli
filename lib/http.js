
const axios = require('axios')

axios.interceptors.response.use(res => {
    return res.data
})


/**
 * 获取模版列表
 * @returns Promise
 */
const getRepoList  = async () => {
    return axios.get('https://api.github.com/users/dguoqing/repos')
    // return axios.get('https://api.github.com/orgs/zhurong-cli/repos')

    
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
  const getTagList = async(repo) => {
    return axios.get(`https://api.github.com/repos/dguoqing/${repo}/tags`)
  }
  
  module.exports = {
    getRepoList,
    getTagList
  }
  