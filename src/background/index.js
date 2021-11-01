/*
 * Author       : OBKoro1
 * Date         : 2021-06-04 10:39:57
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-01 15:40:42
 * FilePath     : /stop-mess-around/src/background/index.js
 * Description  : background常驻页面
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */
import { utils } from '../utils/index'
import NET from '../utils/net'
import { defaultSetting } from '../utils/Default'

main()
function main() {
  setInterval(autoOpen, 5000)
  addListener()
}

// 检测关闭 定时自动一键打开
async function autoOpen() {
  const Setting = (await utils.getChromeStorage(NET.GLOBALSETTING)) || defaultSetting
  const { closeTime, checkoutStudy } = Setting
  const listArr = (await utils.getChromeStorage(NET.TABLELIST)) || []
  // 全局没有关闭 检测单个关闭
  if (Number(closeTime) === 0) {
    autoOpenItem(listArr, Setting)
    return
  }
  const now = Date.now()
  // 全局自动开启
  const isMoreTime = closeTime + checkoutStudy * 60 * 1000
  if (isMoreTime < now) {
    Setting.closeTime = 0
    await utils.updateStorageData(Setting, NET.GLOBALSETTING)
    await checkoutOpen(listArr)
  }
}

// 检测单个关闭 将它开启
async function autoOpenItem(listArr, Setting) {
  let isChange = false
  const arr = listArr.map((item) => {
    // 关闭
    if (!item.open) {
      // 如果单个没有的话 就使用全局的自动开启时间
      const checkoutStudy = item.checkoutStudy || Setting.checkoutStudy
      const isMoreTime = item.closeTime + checkoutStudy * 60 * 1000
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

function addListener() {
  // 第一次安装
  chrome.runtime.onInstalled.addListener(() => {
    utils.jumpUrl(NET.OPTIONSPAGE)
  })
  // 关键词回调
  chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('text', text)
    utils.jumpUrl(NET.OPTIONSPAGE)
  })
  // content通知 background 关闭页面
  chrome.extension.onRequest.addListener(async (request, sender, sendResponse) => {
    console.log('content 消息: ', request, sender)
    if (request.message === 'close-tab') {
      const { id } = sender.tab
      chrome.tabs.remove(id)
    }
    // 单个tab休息一下
    if (request.message === 'reset-tab') {
      const list = await utils.getChromeStorage(NET.TABLELIST)
      const index = list.findIndex((ele) => ele.site === request.item.site)
      if (index === -1) return
      request.item.open = false // 关闭检测
      request.item.checkoutStudy = request.value // 设置下次自动开启的时间
      request.item.closeTime = Date.now() // 记录关闭时间
      list.splice(index, 1, request.item)
      await utils.updateStorageData(list, NET.TABLELIST)
      sendResponse(JSON.stringify(request.item))
    }
  })
}
