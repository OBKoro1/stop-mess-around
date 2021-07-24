/*
 * Author       : OBKoro1
 * Date         : 2021-05-17 16:17:59
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-07-24 14:17:29
 * FilePath     : index.js
 * Description  : 全局方法
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
 */
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
  // 本地直接跳转
  replaceUrl(url) {
    window.open(url, 'target')
  },
  // 打开新页面
  jumpUrl(url) {
    window.open(url, '_blank')
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
        console.log('stop-mess-around match', item)
        return { item, index: i }
      }
    }
    // 没匹配到
    return false
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
