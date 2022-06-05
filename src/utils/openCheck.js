/*
 * Author       : OBKoro1
 * Date         : 2022-01-07 16:43:58
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-06-04 15:05:50
 * FilePath     : /src/utils/openCheck.js
 * description  : 开启网站检测，弹窗提示
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

// eslint-disable-next-line import/no-cycle
import { utils } from './index'
import NET from './net'

class OpenCheck {
  async run(options) {
    const {
      item, tableArr, statisticsTime, setting, globalSiteTouchFish, getMoreDiffVal = false,
    } = options
    this.globalSiteTouchFish = globalSiteTouchFish
    this.statisticsTime = statisticsTime
    this.item = item
    this.tableArr = tableArr
    this.setting = setting
    this.getMoreDiff = getMoreDiffVal // 自动关闭时向上取整
    await this.openStatistics()
    item.open = true
    item.closeTime = 0
    item.restTime = 0
    return {
      tableArr, item, setting, statisticsTime: this.statisticsTime,
    }
  }

  // 打开的统计
  async openStatistics() {
    ({ openTime: this.openTime, restTimeValue: this.restTimeValue } = utils.getItemCloseCheckTime(this.item, this.setting))
    await this.isLastOpenItem(this.openTime, this.restTimeValue)
    if (this.item.globalSiteTouchFish) {
      this.item.globalSiteTouchFish = false // 设置全局摸鱼为false
    } else {
      // 网站摸鱼关闭
      await this.statisticsSiteTouchFishTime()
    }
  }

  // 网站摸鱼时间返回
  async statisticsSiteTouchFishTime() {
    if (!this.statisticsTime) this.statisticsTime = (await utils.getChromeStorage(NET.statisticsTime))
    const nowDay = this.statisticsTime[0]
    // 获取摸鱼网站返回值
    const item = nowDay.restSite.find((ele) => ele.site === this.item.site)
    if (!item) return
    // 摸鱼几分钟： 现在时间 - 关闭时的时间
    const minutes = utils.getMoreDiff(this.openTime, Date.now(), this.getMoreDiff)
    // 减去摸鱼时间
    item.time = utils.subCount(item.time, minutes)
    this.statisticsTime[0] = nowDay
    // 网站摸鱼时长排序
    this.statisticsTime = this.statisticsTime.map((ele) => {
      ele.restSite.sort((a, b) => b.time - a.time)
      return ele
    })
    await utils.updateStorageData(this.statisticsTime, NET.statisticsTime)
  }

  // 摸鱼检测开启是否为最远一个
  async isLastOpenItem(openTime) {
    if (this.openTime < this.setting.todayGlobalTouchFish) return // 小于最远的摸鱼时间
    let lastTime = 0
    let allOpen = true // 是否所有网站都开启检测 弹窗提醒
    for (const item of this.tableArr.values()) {
      if (this.item.site === item.site) continue
      if (!item.open) { // 还有其他开启的摸鱼检测吗
        const { openTime: itemOpenTime } = utils.getItemCloseCheckTime(item, this.setting)
        allOpen = false
        // 找出最大摸鱼时间
        if (lastTime < itemOpenTime) {
          lastTime = itemOpenTime
        }
      }
    }
    // 最远一个 需要返回今日摸鱼剩余 并且不是全部关闭 （全部关闭再外面返回今日摸鱼时间）
    if (lastTime < openTime && !this.globalSiteTouchFish) {
      if (allOpen) {
        lastTime = Date.now() // 所有网站都开启检测 初始化为当前时间
        this.setting.todayGlobalTouchFish = 0 // 修改最远摸鱼时间
      } else {
        this.setting.todayGlobalTouchFish = lastTime // 更新最远时间
      }
      const minutes = utils.getMoreDiff(openTime, lastTime, this.getMoreDiff)
      await this.returnTodayTouchFishTime(minutes)
      await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
    }
    if (allOpen) {
      this.setting.todayGlobalTouchFish = 0 // 修改最远摸鱼时间
      await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
    }
  }

  // 返回今日摸鱼时间剩余
  async returnTodayTouchFishTime(diffGlobal) {
    if (!this.statisticsTime) this.statisticsTime = (await utils.getChromeStorage(NET.statisticsTime))
    const nowDay = this.statisticsTime[0]
    // 统计总时间
    nowDay.time = utils.subCount(nowDay.time, diffGlobal)
    await utils.updateStorageData(this.statisticsTime, NET.statisticsTime)
  }
}

export const OpenCheckInstance = new OpenCheck()
