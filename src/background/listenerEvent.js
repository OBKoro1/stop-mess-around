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
import { utils } from '@/utils/utils-index'
import NET from '@/utils/net'

class ListenerEvent {
  run() {
    this.addListener()
  }

  addListener() {
    // 第一次安装
    chrome.runtime.onInstalled.addListener(async (res) => {
      if (res.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        utils.jumpUrl(NET.OPTIONSPAGE)
      }
    })
    // 关键词回调
    chrome.omnibox.onInputEntered.addListener(() => {
      utils.jumpUrl(NET.OPTIONSPAGE)
    })
  }
}
export const ListenerEventInstance = new ListenerEvent()
