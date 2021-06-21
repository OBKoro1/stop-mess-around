/*
 * Author       : OBKoro1
 * Date         : 2021-06-04 10:39:57
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-06-21 17:50:47
 * FilePath     : /stop-mess-around/src/background/index.js
 * Description  : background常驻页面
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */
import { utils } from '../utils/index'
import NET from '../utils/net'
import { defaultSetting } from '../utils/Default'

setInterval(autoOpen, 5000)

// 检测关闭 定时自动一键打开
async function autoOpen() {
  const Setting = (await utils.getChromeStorage(NET.GLOBALSETTING)) || defaultSetting
  const { closeTime, checkoutStudy } = Setting
  const listArr = (await utils.getChromeStorage(NET.TABLELIST)) || []
  // 全局没有关闭 检测单个关闭
  if (Number(closeTime) === 0) {
    autoOpenItem(listArr)
    return
  }
  const now = Date.now()
  // 关闭时间+自动开启时间
  const isMoreTime = closeTime + checkoutStudy * 60 * 1000
  if (isMoreTime < now) {
    console.log('一键开启', isMoreTime, now)
    Setting.closeTime = 0
    await utils.updateStorageData(Setting, NET.GLOBALSETTING)
    await checkoutOpen(listArr)
  }
}

// 检测单个关闭 将它开启
async function autoOpenItem(listArr) {
  let isChange = false
  const arr = listArr.map((item) => {
    // 关闭
    if (!item.open) {
      const isMoreTime = item.closeTime + item.checkoutStudy * 60 * 1000
      // 超过时间
      if (isMoreTime < Date.now()) {
        isChange = true
        item.closeTime = 0
        item.open = true
      }
    }
    return item
  })
  if (isChange) {
    await utils.updateStorageData(arr, NET.TABLELIST)
  }
}

// 一键开启摸鱼网站
async function checkoutOpen(listArr) {
  const arr = listArr.map((item) => {
    item.closeTime = 0
    item.open = true
    return item
  })
  await utils.updateStorageData(arr, NET.TABLELIST)
}

chrome.extension.onRequest.addListener((request, sender) => {
  // 关闭页面
  if (request.message === 'close-tab') {
    const { id } = sender.tab
    chrome.tabs.remove(id)
  }
})

console.log('chrome', chrome)
