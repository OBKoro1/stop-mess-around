/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 17:55:00
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 13:01:22
 * FilePath     : /stop-mess-around/src/background/listernerEvent.js
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
    chrome.runtime.onInstalled.addListener(() => {
      utils.jumpUrl(NET.OPTIONSPAGE)
    })
    // 关键词回调
    chrome.omnibox.onInputEntered.addListener(() => {
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
        await this.restTab(request, sendResponse)
      }
    })
  }

  async restTab(request, sendResponse) {
    ({ setting: this.setting, statisticsTime: this.statisticsTime, listArr: this.listArr } = await utils.getData())
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
    this.listArr.splice(index, 1, request.item)
    await utils.updateStorageData(this.listArr, NET.TABLELIST)
    sendResponse(JSON.stringify(item))
  }
}
export const ListenerEventInstance = new ListenerEvent()
