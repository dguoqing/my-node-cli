const questions = [
    {
        type:'confirm',
        name:'order',
        message:'您好，需要点餐吗',
        default:true,
    },
    {
        type:'number',
        name:'amount',
        message:'你们有几个人',
        default:1,
    },
    {
        type:'list',
        name:'mainFood',
        message:'主食需要吃点什么？',
        choices:[
            'Rice',
            'A',
            "B"
        ],
        filter(v){
            return v.toLowerCase()
        },
        default:'A'
    },
    {
    type: 'list',
    name: 'smell',
    message: '需要什么口味的;',
    choices: [
      {
        key: 0,
        name: '辣',
        value: 'hot'
      },
      {
        key: 1,
        name: '甜',
        value: 'sweet'
      },
    ],
  },
  {
    type: 'rawlist',
    message: 'Pizza 要多大尺寸的&#xff1f;',
    name: 'size',
    choices: ['5寸', '6寸', '7寸'],
    when(answers) {
      return answers.mainFood == 'pizza';
    },
    default: 1, // default 是选项在 choices 数组中的索引
  },
  {
    type: 'checkbox',
    name: 'menu',
    message: '想要吃点什么菜?',
    choices: [
      {
        name: '东坡肉',
        checked: true,
      },
      {
        name: '剁椒鱼头',
      },
      {
        name: '法式鹅肝',
        disabled: '卖完了',
      },
      {
        name: '西红柿炒鸡蛋',
      },
    ],
  },
]

module.exports = {
    questions
}