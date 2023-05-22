import { titleArr, enTitleArr } from './default-setting/title-arr'
import { tipArr } from './default-setting/tip-arr'
import { confirmArr, confirmArrEn } from './default-setting/confirm-arr'
import { defaultList } from './default-setting/default-list'
import { restTimeArr } from './default-setting/rest-time-arr'
import { itemProto } from './default-setting/item-proto-arr'

import { defaultEnList } from './default-setting/en-default-list'
import { enTipArr } from './default-setting/tip-arr-en'

const tipArrEn = enTipArr.map((t) => t.enTip)

const manifestData = chrome.runtime.getManifest() || {}
const { version = '' } = manifestData

// 中文默认全局设置
export const defaultSettingCn = {
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
  matchRule: 'includes', // 摸鱼网址摸鱼网址匹配规则
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
  version, // 版本是否一致，如果不一致则更新，并更新需要更新的内容。
  matchClosePage: 15, // 匹配到网址后，在15秒内关闭网页
}

export const defaultSettingEn = {
  log: false, // 是否打印日志
  open: true, // 默认新增开启检测
  time: 2, // 检测到页面 默认停留2秒再关闭页面
  jump: false, // 新增默认是否跳转
  jumpUrl: 'https://leetcode-cn.com/problemset/all/', // 跳转链接
  checkoutStudy: 30, // 定时自动开启检测分钟 该模式不能关闭
  sponsorshipTime: Date.now(), // 自动显示赞赏的时间
  defaultList: defaultEnList, // 默认的摸鱼网站
  titleArr: enTitleArr, // 标题随机提示数组
  confirmArr: confirmArrEn, // 随机确认按钮数组
  matchRule: 'includes', // 摸鱼网址摸鱼网址匹配规则
  tipArr: tipArrEn, // 随机内卷提示数组
  addSite: '', // 通过popup添加摸鱼网址
  todayGlobalTouchFish: 0, // 全局摸鱼最晚时间戳
  // 默认值数量更新判断
  defaultNum: {
    defaultList: defaultEnList.length,
    titleArr: enTitleArr.length,
    confirmArr: confirmArrEn.length,
    tipArr: tipArrEn.length,
  },
  showRightTip: 'open',
  lookCode: 'open',
  // 单个item选项的默认值
  restTime: 0, // 网站休息时间
  globalSiteTouchFish: false, // 是否为全局摸鱼状态
  closeTime: 0, // 自动检测开始时间
  siteType: 'default', // 网站类型 'default' | 'create' | 'editor'
  init: false, // 是否初始化 初始化设置摸鱼网站。
  version, // 版本是否一致，如果不一致则更新，并更新需要更新的内容。
  matchClosePage: 15, // 匹配到网址后，在15秒内关闭网页
}

let ChromeLang = ''

export const initDefaultConfig = (lang) => {
  ChromeLang = lang
  if (lang === 'en') {
    return {
      ...defaultSettingEn,
    }
  }
  return {
    ...defaultSettingCn,
  }
}

const defaultListCn = {
  titleArr,
  tipArr,
  confirmArr,
  defaultList,
  restTimeArr,
  itemProto,
}

const defaultListEn = {
  titleArr: enTitleArr,
  tipArr: tipArrEn,
  confirmArr: confirmArrEn,
  defaultList: defaultEnList,
  restTimeArr,
  itemProto,
}

export const useDefalutList = () => {
  if (ChromeLang === 'en') {
    return {
      ...defaultListEn,
    }
  }
  return {
    ...defaultListCn,
  }
}
