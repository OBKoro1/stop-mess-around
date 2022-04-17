/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 15:45:28
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-17 20:23:04
 * FilePath     : /stop-mess-around/src/background/statisticsNewDay.js
 * description  : 超过十二点的统计数据初始化与摸鱼统计数据返还修正
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

import dayjs from 'dayjs'
import { utils } from '@/utils/index'
import NET from '@/utils/net'

export class StatisticsNewDay {
  async run(options) {
    ({ setting: this.setting, listArr: this.listArr, statisticsTime: this.statisticsTime } = options)
    await this.statisticsTimeInit()
    return { setting: this.setting, listArr: this.listArr, statisticsTime: this.statisticsTime }
  }

  // 模拟数据时 删掉一个
  async mock() {
    // !!!!!!! 比当前日期大的数据都删掉
    this.statisticsTime.shift()
    await utils.updateStorageData(this.statisticsTime, NET.statisticsTime)
  }

  // 统计任务 每日新增初始化
  async statisticsTimeInit(mock = false) {
    const now = Date.now()
    let date = dayjs(now).format('YYYY-MM-DD')
    if (mock) {
      date += 1
      await this.mock()
    }

    let add = true
    if (this.statisticsTime.length !== 0) {
      // 获取最新一天
      const item = this.statisticsTime[0]
      // 跟当前 不同一天 说明要新增一天
      add = item.date !== date
    }
    if (!add) return
    // 只保留近100天的
    if (this.statisticsTime.length === 100) {
      this.statisticsTime.pop()
    }
    this.statisticsTime.unshift({
      time: 0,
      restSite: [],
      date,
    })
    await this.exceedDayStatisticsTime()
    await utils.updateStorageData(this.statisticsTime, NET.statisticsTime)
    await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
  }

  // 超过一天的数据 修正统计
  async exceedDayStatisticsTime() {
    if (this.statisticsTime.length < 2) return
    let beforeDay = this.statisticsTime[1]
    let nowDay = this.statisticsTime[0]
    let isChange = false;
    ({ nowDay, beforeDay, isChange } = this.eachItem(nowDay, beforeDay, isChange))
    if (!isChange) return
    ({ nowDay, beforeDay } = this.globalTouchFishFix(nowDay, beforeDay, isChange))
    this.statisticsTime[0] = nowDay
    this.statisticsTime[1] = beforeDay
    return isChange
  }

  // 是否有网站未关的 返回昨天网站的摸鱼时间 增加今天的摸鱼时间
  eachItem(nowDay, beforeDay, isChange) {
    for (const [index, item] of this.listArr.entries()) {
      if (item.open) continue
      const find = beforeDay.restSite.find((ele) => ele.site === item.site)
      if (!find) continue
      isChange = true
      const { openTime } = utils.getItemCloseCheckTime(item, this.setting)
      const minutes = utils.getMoreDiff(openTime, Date.now(), true)
      if (minutes === 0) continue // 0代表当前时间 超过打开时间不记录
      // 修复昨天的数据 修正开启时间与关闭时间
      this.listArr[index].closeTime = Date.now()
      this.listArr[index].restTime = minutes
      // 修正昨天的网站摸鱼时间
      find.time -= minutes
      // 添加到今天的摸鱼时间中
      nowDay.restSite.unshift({
        time: minutes,
        labelName: find.labelName,
        site: find.site,
        restBtnClick: [{
          time: minutes, // 按钮休息时长
          count: 1,
        }],
      })
    }
    return { nowDay, beforeDay, isChange }
  }

  // 全局摸鱼时间更正: 减去昨天的全局摸鱼时间，今日的摸鱼时间加上
  globalTouchFishFix(nowDay, beforeDay) {
    if (this.setting.todayGlobalTouchFish === 0) return
    const minutes = utils.getMoreDiff(this.setting.todayGlobalTouchFish, Date.now(), true)
    beforeDay.time -= minutes
    nowDay.time += minutes
    return { nowDay, beforeDay }
  }
}
