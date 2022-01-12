/*
 * Author       : OBKoro1
 * Date         : 2022-01-07 16:43:58
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 14:14:26
 * FilePath     : /stop-mess-around/src/utils/closeCheck.js
 * description  : 关闭网站检测
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */

// eslint-disable-next-line import/no-cycle
import { utils } from './index'
import NET from './net'

class CloseCheck {
  /**
   * @description: 关闭网站检测
   * @param options
   * @options.item 需要修改的数据
   * @options.statisticsTime  统计摸鱼时长
   * @options.setting 设置 获取全局摸鱼时间，默认休息时间
   * @options.restTime [可选] 有传入即代表是网站休息一下 不传默认使用设置的时间
   * @options.isAll [可选] 是否全局关闭 默认不是
   * @return res
   * res.item
   * res.statisticsTime
   */
  async run(options) {
    const {
      item, statisticsTime, setting, restTime, globalSiteTouchFish = false,
    } = options
    this.setting = setting
    this.item = item
    item.open = false
    item.closeTime = Date.now()
    item.restTime = restTime
    if (globalSiteTouchFish) item.globalSiteTouchFish = true // 是否开启全局摸鱼
    await this.statisticsSite(statisticsTime)
    return { item, statisticsTime }
  }

  /**
   * @description: 统计关闭检测网站摸鱼时间时长增加
   * @param itemSite [Object]
   * @param statisticsTime [Array]
   * @param restTime [number] 本次休息时长
   * @param diffGlobal [number] 本次网站时长与今日全局摸鱼时间差
   * @return [type]
   */
  async statisticsSite(statisticsTime) {
    // 全局摸鱼不统计数据 在全局的地方统计
    if (this.item.globalSiteTouchFish) return
    if (!statisticsTime) statisticsTime = (await utils.getChromeStorage(NET.statisticsTime))
    // 获取一个item打开检测的时间戳和休息的分钟数
    const { openTime, restTimeValue } = utils.getItemCloseCheckTime(this.item, this.setting)

    const nowDay = statisticsTime[0]
    this.statisticsSiteData(nowDay, restTimeValue)
    // 获取网站的摸鱼时间与今日全局摸鱼时间差
    const diffGlobal = await this.getTodayTouchTimeDiff(this.setting, openTime, restTimeValue)
    // 统计总时间
    nowDay.time += diffGlobal
    // 网站摸鱼时长排序
    statisticsTime = statisticsTime.map((ele) => {
      ele.restSite.sort((a, b) => b.time - a.time)
      return ele
    })
    await utils.updateStorageData(statisticsTime, NET.statisticsTime)
  }

  statisticsSiteData(nowDay, restTime) {
    // 获取网站摸鱼统计
    const item = nowDay.restSite.find((ele) => ele.site === this.item.site)
    // 添加本网页 休息时长与 按钮点击次数
    if (item) {
      item.time += restTime
      const restBtnClickEle = item.restBtnClick.find((ele) => restTime === ele.time)
      if (restBtnClickEle) {
        restBtnClickEle.count += 1
      } else {
        item.restBtnClick.push({
          time: restTime,
          count: 1,
        })
      }
    } else {
      nowDay.restSite.push({
        time: restTime, // 休息时长
        restBtnClick: [
          {
            time: restTime, // 按钮休息时长
            count: 1,
          },
        ], // 点击了哪些按钮 点击了多少次
        labelName: this.item.labelName,
        site: this.item.site, // 网址 id
      })
    }
  }

  // 获取今日全局摸鱼与网站的摸鱼时间差
  async getTodayTouchTimeDiff(setting, openTime, restTimeValue) {
    const { todayGlobalTouchFish } = this.setting
    let diff = 0
    if (todayGlobalTouchFish === 0) {
      // 初始化摸鱼时间
      setting.todayGlobalTouchFish = openTime
      // 设置休息的时间为差值
      diff = restTimeValue
    } else if (todayGlobalTouchFish < openTime) {
      // 如果全局比当前网站摸鱼时间小的话 设置当前为全局
      setting.todayGlobalTouchFish = openTime
      diff = utils.getMoreDiff(openTime, todayGlobalTouchFish)
    }

    if (diff !== 0) {
      await utils.updateStorageData(setting, NET.GLOBALSETTING)
    }
    return diff
  }
}

export const CloseCheckInstance = new CloseCheck()
