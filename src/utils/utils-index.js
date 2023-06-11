import dayjs from 'dayjs'
import NET from '@/utils/net'
import { initDefaultConfig } from '@/utils/utils-init'

dayjs.extend(require('dayjs/plugin/duration'))

class GlobalFunction {
  constructor(utils) {
    this.utils = utils
  }

  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.utils = this.utils
  }
}

export const utils = {
  /**
   * @description: 打开新页面
   * @param {type} url
   */
  jumpUrl(url) {
    chrome.tabs.create({
      url,
    })
  },
  /**
   * @description: 获取插件数据
   * @return object
   */
  async getConfig() {
    let setting = await utils.getChromeStorage(NET.GLOBALSETTING) || null
    const defaultSetting = initDefaultConfig(utils.getUILanguage())
    if (!setting) {
      setting = defaultSetting
    }
    await utils.updateStorageData(defaultSetting, NET.GLOBALSETTING)
    return JSON.parse(JSON.stringify(setting))
  },
  /**
   * @description: 获取两个时间戳的差值
   * @param {type} lastTime
   * @param {type} startTime
   * @param {type} getSeconds 一秒算不算一分钟
   * @return {type} minutes
   */
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
    // 兜底 当突然关闭等情况 导致lastTime和startTime数值不对 diff为0
    if (minutes < 0) minutes = 0
    return minutes
  },
  addCount(count, sub) {
    const result = count + sub
    if (result < 0) return 0
    return result
  },
  subCount(count, sub) {
    const res = count - sub
    return res > 0 ? res : 0
  },
  /**
   * @description 获取不同语言的方法
   * @param * name 获取chrome的language数据
   * @param * zh 还没同步到language 临时使用汉字
   */
  getLanguageMessage(name, zh) {
    if (zh) {
      return zh
    }
    return chrome.i18n.getMessage(name)
  },
  getUILanguage() {
    const lang = chrome.i18n.getMessage('lang')
    return lang
  },
  /**
   * @description 检测当前网站地址是否匹配到列表
   * @param * tableArr  摸鱼网站列表
   * @param * url  检测的地址
   * @return {*} { item, index: i } | false
   */
  checkUrl(tableArr, locationObj, url = '') {
    let isMatch = false
    const len = tableArr.length
    for (let i = 0; i < len; i += 1) {
      const item = tableArr[i]
      if (item.matchRule === 'includes') {
        // 包含，搜索origin和pathname
        let searchUrl = url
        // 如果有window.location
        if (locationObj) {
          searchUrl = `${locationObj.origin}${locationObj.pathname}`
        }
        const index = searchUrl.indexOf(item.site)
        if (index !== -1) {
          isMatch = true
        }
      } else if (item.matchRule === 'start') {
        // 网址以开头匹配
        isMatch = url.startsWith(item.site)
      }
      // 网址全等情况 并且没匹配到 即认为匹配
      if (!isMatch) {
        if (locationObj) {
          if (locationObj.href === item.site) {
            isMatch = true
          }
        } else if (url === item.site) {
          isMatch = true
        }
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
   */
  getChromeStorage(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (res) => {
        let result = res[key]
        // 取到值 则还原给数组/对象 抛出去 否则就抛出去undefined
        if (result !== undefined) {
          result = JSON.parse(result)
        }
        resolve(result)
      })
    })
  },
  /**
   * @description: 更新数据
   * @param {type} val
   * @param {type} key
   */
  updateStorageData(val, key) {
    return new Promise((resolve) => {
      const str = JSON.stringify(val)
      chrome.storage.local.set({ [key]: str }, () => {
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
