/*
 * Author       : OBKoro1
 * Date         : 2022-01-12 14:16:59
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2023-05-07 16:36:07
 * FilePath     : /stop-mess-around/src/utils/default-setting/en_site2.js
 * description  : 默认摸鱼网站列表
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

// TODO: 常规的摸鱼网站显示出来，非常规的摸鱼网站隐藏，并且不能编辑。

// TODO: 这个数据很关键，不能被别人偷走。
// TODO: 重新整理数据， 包括描述，包括中文描述

// TODO: 给别人一个随机摸鱼网站入口。保护我方数据的同时，随机给用户一个摸鱼休息的网站。
// TODO: 网站数据加密。
// 加密过程：传进去一个url，在函数内进行判断

// 待找摸鱼网站
// 知乎搜索 外国摸鱼网站：https://www.zhihu.com/search?type=content&q=%E5%A4%96%E5%9B%BD%E6%91%B8%E9%B1%BC%E7%BD%91%E7%AB%99

// 有推荐的摸鱼网站吗 知乎回答：
// https://www.zhihu.com/question/383719766/answer/2789990995
// 一个奇怪的网站：无用的web网站，每次点击都是不同的网站
// https://theuselessweb.com/

// 摸鱼游戏：https://neal.fun/
// 摸鱼导航网站：https://moyu.games/
// 鱼塘热榜：https://zhuanlan.zhihu.com/p/344974072
// 摸鱼中国：https://zhuanlan.zhihu.com/p/537088432

// 好玩猎奇的网站回答：https://zhuanlan.zhihu.com/p/620385065
// 好玩猎奇的外国网站：https://www.zhihu.com/question/20543725/answer/2804198879
// 适合上班摸鱼的网站回答：https://www.zhihu.com/question/37659535/answer/2733911902

// 十个奇奇怪怪的摸鱼网站：https://zhuanlan.zhihu.com/p/365185987
// 推荐12个摸鱼网站：https://zhuanlan.zhihu.com/p/377253191
// 摸鱼小网站：https://zhuanlan.zhihu.com/p/565510516
// 摸鱼网站推荐四个：https://zhuanlan.zhihu.com/p/561823859
// 必备摸鱼网站：https://zhuanlan.zhihu.com/p/385755719

// 上班摸鱼的网站有什么：https://www.zhihu.com/question/548757388/answer/2764602011
// 上班摸鱼有什么好网站推荐：https://www.zhihu.com/question/501274899/answer/2913273888
// 除了知乎还有什么网站可以上班摸鱼：https://www.zhihu.com/question/440115283/answer/2728558735
// 分享几个有意思还能扩展视野的国外网站：https://zhuanlan.zhihu.com/p/32238692
// 十个奇趣又好玩的网站：https://zhuanlan.zhihu.com/p/442452043
// 在线游戏网站：https://zhuanlan.zhihu.com/p/390253058
// 8款摸鱼网站：https://zhuanlan.zhihu.com/p/593847976
// https://zhuanlan.zhihu.com/p/614863040
// https://zhuanlan.zhihu.com/p/601050489
// https://www.zhihu.com/question/534013311/answer/2905721778
// 【摸鱼网站】㈣解锁一大波涨姿势的小众网站，总有你未曾涉足的新大陆： https://zhuanlan.zhihu.com/p/465627762
// 这些有趣好玩的摸鱼网站能让你玩一天： https://zhuanlan.zhihu.com/p/545146483
// https://zhuanlan.zhihu.com/p/575153209
// https://zhuanlan.zhihu.com/p/620079165
// 上班摸鱼休闲必备的十个网站：https://zhuanlan.zhihu.com/p/441245108
// https://zhuanlan.zhihu.com/p/544981987
// 外国网站收集站 ^_^( ﾟДﾟ)ﾉ持续更新~： https://zhuanlan.zhihu.com/p/182700488
// 国外网站导航大全：https://zhuanlan.zhihu.com/p/451629167
// https://www.naokr.com/ 推理小游戏
// 设计师摸鱼网站：https://zhuanlan.zhihu.com/p/172276617

// 一搜君各种网站：https://www.zhihu.com/people/yi-sou-jun/answers
// 互盾科技各种网站：https://www.zhihu.com/org/hu-dun-shu-ju-hui-fu/answers

// 社交app：https://zhuanlan.zhihu.com/p/57657519
// 国外著名网站：https://www.zhihu.com/question/23902367/answer/2309189371

// 国外IT网站：https://www.zhihu.com/question/26155575/answer/1739998808
// 排名前20的科技网站：https://zhuanlan.zhihu.com/p/163290663
// https://www.zhihu.com/question/20237308/answer/2930244391
// https://zhuanlan.zhihu.com/p/372069433

// 学习网站：
// https://zhuanlan.zhihu.com/p/28272881
// 62个国外精品网站：https://zhuanlan.zhihu.com/p/605665458
// 十个国外学习网站：https://zhuanlan.zhihu.com/p/58753480
// 国外学习网站：https://zhuanlan.zhihu.com/p/67550420
// 少儿编程、学习网站：https://zhuanlan.zhihu.com/p/149151678

export const defaultList = [
  // 摸鱼网站来源

  //   有趣好玩的游戏

  {
    site: 'crazygames.com',
    type: 'en',
    enLabelName: 'game online crazygames',
    cnLabelName: '7000多种在线小游戏网站',
    cnDesc: '一个国外的在线游戏网站，里面包含了7000多个游戏可以玩，类型也很全面，有行动、冒险、篮球、休闲、驾驶、多人游戏等类型，不管你喜欢什么类型的游戏几乎都能找得到。\n 而且玩起来方便，不需要注册登录，打开就能直接玩吗，超级适合上班摸鱼。',
    enDesc: 'have 7000+ online game', // 7000多个摸鱼网站
  },
  {
    site: 'gallerix.asia',
    type: 'en',
    enLabelName: 'World Famous Puzzle games', // 世界名画拼图游戏
    cnLabelName: '在线世界名画拼图游戏',
    cnDesc: `一个加勒里克斯在线博物馆网站，在这里可以16万多幅世界著名画家的画，比如达芬奇的蒙娜丽莎、梵高的向日葵、维米尔的戴珍珠耳环的少女等等。
    这些画出了可以观赏之外，还可以直接作为拼图游戏的拼块玩，自己可以设置拼块数量，最高可到204块，还可以旋转增加难度。 除了使用里面的图片进行拼图之外，还可以自己上传图片，它会自动生成拼块，同样的方法进行拼图就好了。`,
    desc: 'World Famous Puzzle games', // 7000多个摸鱼网站
  },
  {
    site: 'slowroads.io',
    type: 'en',
    enLabelName: 'Online driving games',
    cnLabelName: '模拟开车看风景解压网站',
    cnDesc: '一个开车游戏网站，打开之后会自动生成不同的风景路线，汽车前行的同时，就可以看到沿路的风景，还挺解压的，仿佛自己在开车看风景一样。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },
  {
    site: 'feedgoldfish.top',
    type: 'en',
    enLabelName: 'Online driving games',
    cnLabelName: '在线喂金鱼网站',
    cnDesc: '一个开车游戏网站，打开之后会自动生成不同的风景路线，汽车前行的同时，就可以看到沿路的风景，还挺解压的，仿佛自己在开车看风景一样。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  {
    site: 'niemao.top/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '自由捏猫游戏',
    cnDesc: '一个开车游戏网站，打开之后会自动生成不同的风景路线，汽车前行的同时，就可以看到沿路的风景，还挺解压的，仿佛自己在开车看风景一样。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  {
    site: '360360.top',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '挑战画圆游戏',
    cnDesc: '一个随手画圆挑战游戏，打开之后直接点击开始，按住鼠标左键根据中心点进行画圆就行了，以为很简单，其实还挺难的，尤其是一开始，甚至能画出来四方形。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },
  {
    site: 'https://maze.toys/mazes/mini/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '随机迷宫游戏',
    cnDesc: '迷宫跑者的完美热身挑战！这个迷宫拥有宽阔的路径和简单的布局，对于希望建立信心和技能的初学者来说是轻而易',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  //   无聊的游戏
  {
    site: 'staggeringbeauty.com',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '越摇越快乐, 解压游戏',
    cnDesc: '一个魔性又解压的网站，打开在屏幕上可以看到一个类似充气的圆柱，你移动鼠标的时候它就随着移动左右摇摆。达到一定速度之后，这个时候屏幕就会变成闪烁画面，同时还会有劲爆的音乐，真的超级解压，但是玩之前先做好心理准备呀！',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  {
    site: 'https://longdogechallenge.com/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '滚动收集wow，无聊解压游戏，似乎没有尽头',
    cnDesc: '滚动收集wow，无聊解压游戏，似乎没有尽头',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  //   上面是游戏
  //   上面是游戏
  //   上面是游戏
  //   上面是游戏

  //   工具类
  {
    site: 'tikolu.net/emojimix',
    type: 'en',
    enLabelName: 'Online driving games',
    cnLabelName: '一个emoji合成网站，可以保存图片',
    cnDesc: '一个随手画圆挑战游戏，打开之后直接点击开始，按住鼠标左键根据中心点进行画圆就行了，以为很简单，其实还挺难的，尤其是一开始，甚至能画出来四方形。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  {
    site: 'yijiankoutu.com/aiimg/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: 'AI 绘画在线生成工具',
    cnDesc: '一个开车游戏网站，打开之后会自动生成不同的风景路线，汽车前行的同时，就可以看到沿路的风景，还挺解压的，仿佛自己在开车看风景一样。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  {
    site: 'literature-clock.jenevoldsen.com',
    type: 'en',
    enLabelName: 'Online driving games',
    cnLabelName: '随机文学小说段落',
    cnDesc: '一个很有趣的网站，打开之后会出现一段文学小说段落，而且在这个段落里会包含你点进去的时间，这就意味着每分钟显示的都不一样，随时都能看到新鲜的文学小说段落。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },
  {
    site: 'thiswaifudoesnotexist.net',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '少女生成器',
    cnDesc: '一个随机生成各种少女的网站，它会生成动漫脸和生成动漫情节，没过18秒就自动刷新一次，可以让你大饱眼福。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  //   无价值无意义
  {
    site: 'https://cursoreffects.com/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '鼠标幻影移动',
    cnDesc: '移动鼠标有好看的幻影，点击可以切换幻影',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },
  {
    site: 'https://puginarug.com/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '为哈巴狗点赞，做它的守护者',
    cnDesc: '一个无用的网站，进去为哈巴狗点赞',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

  //   好玩有趣的东西
  {
    site: 'https://theuselessweb.com/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '随机未知网站',
    cnDesc: '一个可以把你带入未知世界的网站，每次点进去都会带你进入一个不同的网站，每一个都挺好玩的，光这个网站看一天都行。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },
  {
    site: 'https://alwaysjudgeabookbyitscover.com',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '奇怪的书，奇怪的封面',
    cnDesc: '有些书赢得了奖项，有些赢得了我们的心，还有一些……只会让人感到困惑。',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },
  {
    site: 'https://weirdorconfusing.com/',
    type: 'cn',
    enLabelName: 'Online driving games',
    cnLabelName: '奇奇怪怪，好玩的东西',
    cnDesc: '这个网站展示了一些奇奇怪怪的东西，古怪、恶作剧和一些毫无意义的事情，他还支持订阅,每月一次或两次直接向您发送奇怪的点点滴滴',
    desc: 'Directly simulate the driving position and automatically generate different scenic routes. As the car moves forward, you can see the scenery along the road, which is quite relaxing, as if you are driving to see the scenery yourself', // 7000多个摸鱼网站
  },

]
