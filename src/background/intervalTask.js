/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 14:06:01
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-06-05 14:28:55
 * FilePath     : /src/background/intervalTask.js
 * description  : 后台定时任务
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */
import { utils } from '@/utils/index'
import NET from '@/utils/net'
import { defaultSetting, itemProto } from '@/utils/Default'
import { AutoOpenCheck } from './autoOpenCheck'
import { StatisticsNewDay } from './statisticsNewDay'

class IntervalTask {
  run() {
    setInterval(async () => {
      ({ setting: this.setting, statisticsTime: this.statisticsTime, listArr: this.listArr } = await utils.getData())
      await this.updateItemPrototype()
      await this.updateSettingOldValue()
      await this.autoOpen()
      await this.statisticsNewDayCheck()
    }, 3000)
  }

  /**
   * @description: 强制更新老的配置 避免配置错误
   */
  async updateSettingOldValue() {
    if (this.setting.lookCode === 'github1s.com' || this.setting.lookCode === 'github.dev') {
      this.setting.lookCode = 'open'
      await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
    }
  }

  /**
   * @description: 查看数组默认元素是否有更新
   */
  async updateItemPrototype() {
    let change = false
    const newList = this.listArr.map((item) => {
      itemProto.forEach((ele) => {
        if (item[ele] === undefined) {
          change = true
          item[ele] = defaultSetting[ele]
        }
      })
      return item
    })
    if (change) {
      this.listArr = newList
      await utils.updateStorageData(newList, NET.TABLELIST)
    }
  }

  /**
   * @description: 自动打开
   */
  async autoOpen() {
    const options = {
      setting: this.setting,
      listArr: this.listArr,
      statisticsTime: this.statisticsTime,
    }
    const { setting, listArr, statisticsTime } = await new AutoOpenCheck().run(options)
    this.setting = setting
    this.listArr = listArr
    this.statisticsTime = statisticsTime
  }

  /**
   * @description: 创建新一天的摸鱼统计数据
   */
  async statisticsNewDayCheck() {
    const options = {
      setting: this.setting,
      listArr: this.listArr,
      statisticsTime: this.statisticsTime,
    }
    const { setting, listArr, statisticsTime } = await new StatisticsNewDay().run(options)
    this.setting = setting
    this.listArr = listArr
    this.statisticsTime = statisticsTime
  }
}

export const IntervalTaskInstance = new IntervalTask()
