/*
 * Author       : OBKoro1
 * Date         : 2022-01-07 16:43:58
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-09 20:50:46
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

  // 关闭网站检测 摸鱼休息
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
  async setGlobalSiteTouchFish() {
    let bigEndTime = 0 // 获取全局摸鱼状态checkoutStudy 的最远时间
    let restTime = 0 // 当前网站已经在摸鱼状态了 收集休息时间
    for (const [index, item] of this.tableArr.entries()) {
      const copyItem = JSON.parse(JSON.stringify(item))
      item.restTime = 0
      if (restTime < (item.restTime || 0)) restTime = item.restTime
      const { openTime } = utils.getItemCloseCheckTime(item, this.setting)
      if (bigEndTime < openTime) bigEndTime = openTime // 最远摸鱼时间
      if (!item.open) continue
      // 已经关闭摸鱼检测的 将其开启，返回网站摸鱼统计
      const options = {
        setting: this.setting,
        tableArr: this.tableArr,
        statisticsTime: this.statisticsTime,
        item: copyItem,
      }
      // eslint-disable-next-line no-await-in-loop
      const { item: newItem } = await utils.openCheck(options)
      this.tableArr[index] = newItem
    }
    let minutes = 0
    const nowDay = this.statisticsTime[0]
    if (bigEndTime < restTime) {
      // 判断当前摸鱼状态是否比全局时间长 如果长的话 需要返回
      minutes = utils.getMoreDiff(restTime, bigEndTime, true)
      nowDay.time -= minutes
    } else if (restTime !== 0) {
      // 之前摸鱼网站有值 但是不到全局的时间 补一些时间
      const restDate = Date.now() + restTime * 60 * 1000
      minutes = utils.getMoreDiff(bigEndTime, restDate, true)
      nowDay.time += minutes
    } else {
      // 之前没有网站开始摸鱼 没值 直接增加全局时间
      minutes = utils.getMoreDiff(bigEndTime, Date.now(), true)
      nowDay.time += minutes
    }
    this.setting.todayGlobalTouchFish = bigEndTime // 全局最远摸鱼时间是全局的时间
    this.statisticsTime[0] = nowDay
  }

  // 打开检测 弹窗提醒
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
