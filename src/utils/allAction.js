/*
 * Author       : OBKoro1
 * Date         : 2022-01-07 16:43:58
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 14:14:19
 * FilePath     : /stop-mess-around/src/utils/allAction.js
 * description  : 一键开启、一键关闭
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

// eslint-disable-next-line import/no-cycle
import { utils } from './index'
import NET from './net'

// 全局操作
class AllAction {
  async run(options) {
    ({
      type: this.type, tableArr: this.tableArr, statisticsTime: this.statisticsTime, setting: this.setting,
    } = options)
    if (!this.statisticsTime) this.statisticsTime = (await utils.getChromeStorage(NET.statisticsTime))
    if (this.type === 'closeAll') {
      await this.AllCloseCheck()
    } else {
      await this.AllOpenCheck()
    }
    await utils.updateStorageData(this.tableArr, NET.TABLELIST)
    return { tableArr: this.tableArr, statisticsTime: this.statisticsTime, setting: this.setting }
  }

  async AllCloseCheck() {
    const options = {
      item: null,
      tableArr: this.tableArr,
      statisticsTime: this.statisticsTime,
      setting: this.setting,
      globalSiteTouchFish: true,
    }
    this.setGlobalSiteTouchFish()
    for (const [index, item] of this.tableArr.entries()) {
      options.item = item
      // eslint-disable-next-line no-await-in-loop
      const { item: newItem } = await utils.closeCheck(options)
      this.tableArr[index] = newItem
    }
    await utils.updateStorageData(this.statisticsTime, NET.statisticsTime)
    await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
  }

  // 打开全局摸鱼检测 设置今日摸鱼时间
  setGlobalSiteTouchFish() {
    let bigEndTime = 0
    for (const item of this.tableArr.values()) {
      item.restTime = 0 // 全局关闭 使用默认开启设置 不是休息
      const { openTime } = utils.getItemCloseCheckTime(item, this.setting)
      if (bigEndTime < openTime) bigEndTime = openTime
    }
    this.setting.todayGlobalTouchFish = bigEndTime
    const minutes = utils.getMoreDiff(bigEndTime, Date.now(), true)
    const nowDay = this.statisticsTime[0]
    nowDay.time += minutes
    this.statisticsTime[0] = nowDay
  }

  async AllOpenCheck() {
    const options = {
      item: null,
      tableArr: this.tableArr,
      statisticsTime: this.statisticsTime,
      setting: this.setting,
      globalSiteTouchFish: true,
    }
    this.getGlobalTimeDiff()
    for (const [index, item] of this.tableArr.entries()) {
      options.item = item
      // eslint-disable-next-line no-await-in-loop
      const { item: newItem } = await utils.openCheck(options)
      this.tableArr[index] = newItem
    }
    await utils.updateStorageData(this.statisticsTime, NET.statisticsTime)
  }

  // 返回全局的摸鱼时间
  getGlobalTimeDiff() {
    const nowDay = this.statisticsTime[0]
    const minutes = utils.getMoreDiff(this.setting.todayGlobalTouchFish, Date.now())
    nowDay.time -= minutes
    this.statisticsTime[0] = nowDay
  }
}

export const AllActionInstance = new AllAction()
