/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 17:55:00
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-17 14:40:42
 * FilePath     : /stop-mess-around/src/background/listenerEvent.js
 * description  : 后台监听事件通信
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */
import { utils } from '@/utils/index'
import NET from '@/utils/net'
import { CloseCheckInstance } from '@/utils/closeCheck'

class ListenerEvent {
  run() {
    this.addListener()
  }

  addListener() {
    // 第一次安装
    chrome.runtime.onInstalled.addListener((res) => {
      if (res.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        utils.jumpUrl(NET.OPTIONSPAGE)
      }
    })
    // 关键词回调
    chrome.omnibox.onInputEntered.addListener(() => {
      utils.jumpUrl(NET.OPTIONSPAGE)
    })
    // content通知 background 关闭页面
    // 不能写async 返回值必须是布尔值
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('content 消息: ', request, sender, sendResponse)
      const { id } = sender.tab
      if (request.message === 'close-tab') {
        chrome.tabs.remove(id)
      }
      // 单个tab休息一下
      if (request.message === 'reset-tab') {
        this.restTab(request, sendResponse)
        return true // 异步返回值
      }
    })
  }

  async restTab(request, sendResponse) {
    const res = await utils.getData()
    this.setting = res.setting
    this.statisticsTime = res.statisticsTime
    this.listArr = res.listArr
    console.log('-1-1--1-1-1-1--1---1----1', 333)
    const options = {
      item: request.item,
      tableArr: this.listArr,
      statisticsTime: this.statisticsTime,
      setting: this.setting,
      restTime: request.value,
    }
    const { item } = await CloseCheckInstance.run(options)
    // 网站检测关闭 更新数组
    const index = this.listArr.findIndex((ele) => ele.site === request.item.site)
    if (index === -1) return
    this.listArr.splice(index, 1, item)
    await utils.updateStorageData(this.listArr, NET.TABLELIST)
    sendResponse(JSON.stringify(item))
  }
}
export const ListenerEventInstance = new ListenerEvent()
