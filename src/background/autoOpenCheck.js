/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 13:54:43
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 12:50:25
 * FilePath     : /stop-mess-around/src/background/autoOpenCheck.js
 * description  : 定时检测 网站摸鱼时间是否到期自动开启
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

import { utils } from '@/utils/index'
import NET from '@/utils/net'

export class AutoOpenCheck {
  /**
   * @description:
   * @param options [type]
   * @options.setting 设置
   * @options.listArr 数组
   * @return [type]
   */
  async run(options) {
    ({ setting: this.setting, listArr: this.listArr, statisticsTime: this.statisticsTime } = options)
    await this.openCheck()
    return { setting: this.setting, listArr: this.listArr, statisticsTime: this.statisticsTime }
  }

  async openCheck() {
    let isChange = false

    const arr = await Promise.all(this.listArr.map(async (item) => {
      if (!item.open) {
        const isMoreTime = this.getLastTime(item)
        // 超过时间
        if (isMoreTime < Date.now()) {
          isChange = true
          const options = {
            item,
            tableArr: this.listArr,
            statisticsTime: this.statisticsTime,
            setting: this.setting,
          }
          const { item: newItem } = await utils.openCheck(options)
          return newItem
        }
      }
      return item
    }))
    if (isChange) {
      this.listArr = arr
      this.statisticsTime = await utils.getChromeStorage(NET.statisticsTime)
      await utils.updateStorageData(this.listArr, NET.TABLELIST)
    }
  }

  // 获取一个关闭检测item的开启时间
  getLastTime(item) {
    let value
    // 休息的分钟数: 休息一下
    if (item.restTime) {
      value = item.restTime
    } else {
      // item的自动打开时间与全局的自动打开事件
      value = item.checkoutStudy || this.setting.checkoutStudy
    }
    return (item.closeTime || Date.now()) + value * 60 * 1000
  }
}
