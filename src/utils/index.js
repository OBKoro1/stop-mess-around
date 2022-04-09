/* eslint-disable import/no-cycle */
/*
 * Author       : OBKoro1
 * Date         : 2021-05-17 16:17:59
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-09 14:52:29
 * FilePath     : /stop-mess-around/src/utils/index.js
 * Description  : 全局方法
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
 */
import dayjs from 'dayjs'
import NET from '@/utils/net'
import { defaultSetting } from '@/utils/Default'
import { OpenCheckInstance } from './openCheck'
import { CloseCheckInstance } from './closeCheck'
import { AllActionInstance } from './allAction'

dayjs.extend(require('dayjs/plugin/duration'))

const CloseCheckInstanceRun = (options) => CloseCheckInstance.run(options)
const OpenCheckInstanceRun = (options) => OpenCheckInstance.run(options)
const AllActionInstanceRun = (options) => AllActionInstance.run(options)
class GlobalFunction {
  constructor(utils) {
    this.utils = utils
  }

  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.utils = this.utils
  }
}

// 设置 更新旧的字段
function updateOldSetting(setting, utils) {
  console.log('update updateOldSetting')
  if (typeof setting.showRightTip === 'boolean') {
    setting.showRightTip = setting.showRightTip ? 'open' : 'closeRestTimeStatistics'
    utils.updateStorageData(setting, NET.GLOBALSETTING)
  }
}

export const utils = {
  // 本地直接跳转
  replaceUrl(url) {
    window.open(url, 'target')
  },
  // 打开新页面
  jumpUrl(url) {
    window.open(url, '_blank')
  },
  closeCheck: CloseCheckInstanceRun,
  openCheck: OpenCheckInstanceRun,
  openCheckAll: AllActionInstanceRun,
  closeCheckAll: AllActionInstanceRun,
  // 获取数据
  async getData() {
    const setting = await utils.getChromeStorage(NET.GLOBALSETTING) || defaultSetting
    const statisticsTime = (await utils.getChromeStorage(NET.statisticsTime)) || []
    const listArr = (await utils.getChromeStorage(NET.TABLELIST)) || []
    updateOldSetting(setting, utils)
    return { setting, statisticsTime, listArr }
  },
  // 获取两个时间戳的差值
  getMoreDiff(lastTime, startTime, getSeconds = false) {
    const duration = dayjs.duration(lastTime - startTime)
    const hours = duration.hours()
    let minutes = duration.minutes()
    // 秒 算一分钟 因为要减去 不加 就是减
    if (getSeconds) {
      const seconds = duration.seconds()
      if (seconds > 0) minutes += 1
    }
    if (hours > 0) minutes += hours * 60
    return minutes
  },
  // 获取一个item打开检测的时间戳和休息的分钟数
  getItemCloseCheckTime(item, Setting) {
    let value // 休息的分钟数
    if (item.restTime) {
      value = item.restTime
    } else {
      value = item.checkoutStudy || Setting.checkoutStudy
    }
    const openTime = (item.closeTime || Date.now()) + value * 60 * 1000
    return { openTime, restTimeValue: value }
  },
  // 获取不同语言的方法
  /**
   * @description
   * @param * name 获取chrome的language数据
   * @param * zh 还没同步到language 临时使用汉字
   * @return {*}
   */
  getLanguageMessage(name, zh) {
    if (zh) {
      return zh
    }
    return chrome.i18n.getMessage(name)
  },
  /**
     * @description 检测当前网站地址是否匹配到列表
     * @param * tableArr  摸鱼网站列表
     * @param * url  检测的地址
     * @return {*}
     */
  checkUrl(tableArr, url) {
    let isMatch = false
    const len = tableArr.length
    for (let i = 0; i < len; i += 1) {
      const item = tableArr[i]
      if (item.matchRule === 'strict') {
        // 严格相等
        if (url === item.site) isMatch = true
      } else if (item.matchRule === 'includes') {
        const index = url.indexOf(item.site)
        if (index !== -1) {
          isMatch = true
        }
      } else if (item.matchRule === 'start') {
        // 网址以开头匹配
        isMatch = url.startsWith(item.site)
      }
      // 第一个匹配到摸鱼网址 不管是否打开 都返回
      if (isMatch) {
        return { item, index: i }
      }
    }
    // 没匹配到
    return false
  },
  /**
   * @description 获取storage数据
   * @param * key
   * @return {value}
   */
  getChromeStorage(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (res) => {
        let result = res[key]
        // 取到值 则还原给数组/对象 抛出去 否则就抛出去undefined
        if (result !== undefined) {
          result = JSON.parse(result)
        }
        resolve(result)
      })
    })
  },
  // 更新数据
  updateStorageData(val, key) {
    return new Promise((resolve) => {
      const str = window.JSON.stringify(val)
      chrome.storage.sync.set({ [key]: str }, () => {
        console.log(`${key} update`)
        resolve()
      })
    })
  },
  /**
   * @description: 防抖函数：函数被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
   * @param {Function} fn 要执行的函数
   * @param {Number} wait  wait毫秒后执行回调
   * @param {*} ...arr 传递给fn的参数
   */
  debounce(fn, wait, ...arr) {
    let timer = null
    return (...cbArr) => {
      if (timer) {
        // 如果有一个函数在等待执行 清除定时器 下面重新计时
        clearTimeout(timer)
        timer = null // 清空timer 下次重启定时器
      }
      // 设定时器/重置定时器
      timer = setTimeout(() => {
        fn(...arr, ...cbArr) // wait时间后 执行回调 期间再触发debounce 需要重新等待
      }, wait)
    }
  },
}

const instance = new GlobalFunction(utils)

export default instance
