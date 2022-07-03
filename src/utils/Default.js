import { titleArr } from './default-setting/title-arr'
import { tipArr } from './default-setting/tip-arr'
import { confirmArr } from './default-setting/confirm-arr'
import { defaultList } from './default-setting/default-list'
import { restTimeArr } from './default-setting/rest-time-arr'
import { itemProto } from './default-setting/item-proto-arr'

export {
  titleArr,
  tipArr,
  confirmArr,
  defaultList,
  restTimeArr,
  itemProto,
}

// 默认全局设置
export const defaultSetting = {
  log: false, // 是否打印日志
  open: true, // 默认新增开启检测
  time: 2, // 检测到页面 默认停留2秒再关闭页面
  jump: false, // 新增默认是否跳转
  jumpUrl: 'https://leetcode-cn.com/problemset/all/', // 跳转链接
  checkoutStudy: 30, // 定时自动开启检测分钟 该模式不能关闭
  sponsorshipTime: Date.now(), // 自动显示赞赏的时间
  defaultList, // 默认的摸鱼网站
  titleArr, // 标题随机提示数组
  confirmArr, // 随机确认按钮数组
  matchRule: 'start', // 摸鱼网址匹配规则
  tipArr, // 随机内卷提示数组
  addSite: '', // 通过popup添加摸鱼网址
  todayGlobalTouchFish: 0, // 全局摸鱼最晚时间戳
  // 默认值数量更新判断
  defaultNum: {
    defaultList: defaultList.length,
    titleArr: titleArr.length,
    confirmArr: confirmArr.length,
    tipArr: tipArr.length,
  },
  showRightTip: 'open',
  lookCode: 'open',
  // 单个item选项的默认值
  restTime: 0, // 网站休息时间
  globalSiteTouchFish: false, // 是否为全局摸鱼状态
  closeTime: 0, // 自动检测开始时间
  siteType: 'default', // 网站类型 'default' | 'create' | 'editor'
  init: false, // 是否初始化 初始化设置摸鱼网站。
}
