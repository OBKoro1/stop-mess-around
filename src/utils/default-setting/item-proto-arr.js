/*
 * Author       : OBKoro1
 * Date         : 2022-01-12 14:32:30
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 14:37:00
 * FilePath     : /stop-mess-around/src/utils/default-setting/item-proto-arr.js
 * description  : 摸鱼网站对象属性
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

// 新增对象属性都放在这里 网站可能没有新增的对象属性
// 旧网站对象属性依据这个数组进行更新数组默认值
export const itemProto = [
  'matchRule', // 网址匹配规则
  'jump', // 关闭网站时 是否跳转到学习网址
  'jumpUrl', // 跳转学习网址的链接
  'open', // 打开
  'closeTime', // 关闭检测时的时间
  'tip', // 网址提示语
  'globalSiteTouchFish', // 是否全局摸鱼开启
  'restTime', // 点击休息一下的时间
]

// site: 'https://www.zhihu.com/hot', // site 唯一id
// labelName: '知乎热榜', // 网站名
// matchRule: 'start', // 网址匹配规则
// jump: false, // 关闭网站时 是否跳转到学习网址
// jumpUrl: 'https://leetcode-cn.com/problemset/all/', // 跳转学习网址的链接
// open: true, // 打开
// closeTime: 0, // 关闭检测时的时间
// globalSiteTouchFish: false, // 是否全局摸鱼开启
// restTime: 0, // 点击休息一下的时间
