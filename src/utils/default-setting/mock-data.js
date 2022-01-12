/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 17:42:02
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 14:29:16
 * FilePath     : /stop-mess-around/src/utils/default-setting/mock-data.js
 * description  : 模拟数据结构
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

// 摸鱼时长统计的数据
export const statisticsTime = [
  {
    time: 2,
    restSite: [
      {
        time: 2,
        labelName: '微博',
        site: 'https://weibo.com/',
        restBtnClick: [
          {
            time: 5,
            count: 1,
          },
        ],
      },
    ],
    date: '2022-01-11',
  },
  {
    time: 4,
    restSite: [
      {
        time: 1,
        restBtnClick: [
          {
            time: 5,
            count: 2,
          },
        ],
        labelName: '微博',
        site: 'https://weibo.com/',
      },
      {
        time: 1,
        restBtnClick: [
          {
            time: 5,
            count: 1,
          },
        ],
        labelName: '淘宝网',
        site: 'http://www.taobao.com/',
      },
      {
        time: 1,
        restBtnClick: [
          {
            time: 5,
            count: 1,
          },
        ],
        labelName: 'V2ex论坛',
        site: 'https://www.v2ex.com/',
      },
      {
        time: 1,
        restBtnClick: [
          {
            time: 5,
            count: 1,
          },
        ],
        labelName: 'B站',
        site: 'https://www.bilibili.com/',
      },
    ],
    date: '2022-01-10',
  },
]

// 摸鱼列表的数据
export const listArr = [
  {
    site: 'https://www.zhihu.com/hot',
    labelName: '知乎热榜',
    matchRule: 'start', // 匹配规则
    jump: false, // 是否跳转
    jumpUrl: 'https://leetcode-cn.com/problemset/all/', // 跳转链接
    open: true, // 打开
    closeTime: 0, // 关闭检测时的时间
    globalSiteTouchFish: false, // 是否全局摸鱼开启
    restTime: 0, // 点击休息一下的时间
  },
]

export const setting = {
  log: true,
  open: true,
  time: 2,
  jump: false,
  jumpUrl: 'https://leetcode-cn.com/problemset/all/',
  checkoutStudy: 30,
  sponsorshipTime: 1641815683373,
  defaultList: [
    {
      site: 'https://www.douyu.com/',
      labelName: '斗鱼直播',
    },
    {
      site: 'https://www.huya.com/',
      labelName: '虎牙直播',
    },
    {
      site: 'https://juejin.cn/pins',
      labelName: '掘金沸点',
    },
    {
      site: 'https://www.zhihu.com/',
      labelName: '知乎首页',
      matchRule: 'strict',
    },
    {
      site: 'https://www.zhihu.com/hot',
      labelName: '知乎热榜',
    },
    {
      site: 'https://www.bilibili.com/',
      labelName: 'B站',
    },
    {
      site: 'https://weibo.com/',
      labelName: '微博',
    },
    {
      site: 'https://www.v2ex.com/',
      labelName: 'V2ex论坛',
    },
    {
      site: 'https://live.qq.com/',
      labelName: '企鹅直播',
    },
    {
      site: 'http://www.taobao.com/',
      labelName: '淘宝网',
    },
    {
      site: 'https://www.jd.com/',
      labelName: '京东',
    },
    {
      site: 'https://www.hupu.com/',
      labelName: '虎扑',
    },
    {
      site: 'https://top.baidu.com/',
      labelName: '百度热搜',
    },
    {
      site: 'https://v.douyu.com/',
      labelName: '斗鱼录播',
    },
  ],
  titleArr: [
    '停止下意识的摸鱼',
    '别浪费时间了',
    '积累的力量',
    '日拱一卒,功不唐捐',
    '愚公移山的坚持',
    '笨鸟先飞的觉悟',
    '聚焦目标',
    '千里之行，始于足下',
    '天道酬勤',
    '不经历风雨，怎能见彩虹？',
    '不经一番寒彻骨，怎得梅花扑鼻香？',
    '玉不琢，不成器',
    '日积月累',
  ],
  confirmArr: [
    '冲他妈的',
    '冲冲冲',
    '卷起来',
    '卷他妈的',
    '再卷一会儿',
    '接着卷',
    '继续卷',
    '自强不息',
    '日积月累',
    '聚沙成塔',
  ],
  matchRule: 'start',
  tipArr: [
    '种一棵树最好的时间是在十年前, \n其次就是现在了。',
    '日拱一卒,功不唐捐。',
    '人们总会高估自己短期的能力，而低估自己长期的能力。',
    '笨鸟先飞的觉悟, 愚公移山的坚持。',
    '早起的鸟儿有虫吃。',
    '好好学习，天天向上。',
    '不积跬步，无以至千里；不积小流，无以成江海。',
    '合抱之木，生于毫末；\n百丈之台，起于累土；\n千里之行，始于足下。',
    '再长的路，一步步也能走完。\n再短的路，不迈开双脚也无法到达。',
    '宝剑锋从磨砺出   梅花香自苦寒来',
    '日日行，不怕千万里；常常做，不怕千万事。',
    '路漫漫其修道远，吾将上下而求索。',
    '累了，就出去活动一下身体，或者闭眼休息一下，回来接着干。',
    '质变都来自于量变的积累',
    '书山有路勤为径，学海无涯苦作舟。',
    '世上无难事，只要肯登攀。',
    '勤能补拙是良训，一分耕耘一分才。',
    '不经历风雨，怎能见彩虹？',
    '业精于勤而荒于嬉，行成于思而毁于随。',
    '自古以来学有建树的人，都离不开一个“苦”字。',
    '勤奋的人是时间的主人，懒惰的人是时间的奴隶。',
    '黑发不知勤学早，白首方悔读书迟。',
    '形成天才的决定因素应该是勤奋。',
    '少壮不努力，老大徒伤悲。',
    '勤奋和智慧是双胞胎，懒惰和愚蠢是亲兄弟。',
    '天行健，君子以自强不息。',
    '玉不琢，不成器；\n木不雕，不成材；\n人不学，不知理。',
    '不经一番寒彻骨，怎得梅花扑鼻香？',
    '一寸光阴一寸金，寸金难买寸光阴。',
    '忙于采集的蜜蜂，无暇在人前高谈阔论。',
    '九层之台，起于累士。',
    '泰山不让土壤，故能成其大；\n江海不择细流，故能就其深。',
    '不问收获，但问耕耘，天道酬勤！',
    '花有重开日，人无再少年。',
    '百金买骏马，\n千金买美人，\n万金买高爵，\n何处买青春？\n',
    '胜利者往往是以坚持最后五分钟的时间中得来成功 - 牛顿',
    '我从来不认为半小时是微不足道的一段时间 - 达尔文',
    '三延四拖，你就是时间的小偷。',
    '明日复明日，明日何其多。\n日日传明日，万事成蹉跎。\n世人皆被明日累，明日无穷老将至。\n晨昏滚滚水东流，今古悠悠日西坠。\n百年明日能几何，请君听我明日歌。',
    '多做重要而不紧急的事情, 合理规划时间成为一个从容的人。',
    '不怕苦，苦半辈子；\n怕苦，苦一辈子。',
    '失败只有一种，那就是放弃努力, 半途而废。',
    '目标要定在月亮之上，\n即使失败，\n也可以落在众星之间。',
    '学历代表过去、能力代表现在、学习力代表未来。',
    '坚持做自己懒得做但正确的事情，\n就能得到别人想得到却得不到的东西。',
    '一个人时间用在哪儿，成就就在哪儿。',
    '要想翻过一堵墙，最好的办法是先把帽子扔过去。',
    '一身行囊离开的时候，除了一些积蓄，\n就是你的经历，你的态度，你的身体，还有，你的技术。',
    '25~35岁，是每个人最宝贵的时光，应该用在刀刃上。',
    '每天都做那件有意义的事，做的天数多了，人生就有意义了。',
    '识别高收益，长半衰期的知识。',
    '生活由许许多多小的选择组成，\n每个选择都倾向于舒服的，\n最终将一事无成。',
  ],
  addSite: '',
  todayGlobalTouchFish: 0,
  defaultNum: {
    defaultList: 14,
    titleArr: 13,
    confirmArr: 10,
    tipArr: 52,
  },
  restTime: 0,
  globalSiteTouchFish: false,
  closeTime: 0,
  showRightTip: true,
}
