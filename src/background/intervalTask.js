/*
 * Author       : OBKoro1
 * Date         : 2022-01-10 14:06:01
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-06-26 14:30:09
 * FilePath     : /src/background/intervalTask.js
 * description  : 后台定时任务
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
 */
import { utils } from '@/utils/index'
import { AutoOpenCheck } from './autoOpenCheck'
import { StatisticsNewDay } from './statisticsNewDay'

class IntervalTask {
  async run() {
    setInterval(async () => {
      ({ setting: this.setting, statisticsTime: this.statisticsTime, listArr: this.listArr } = await utils.getData())
      await this.autoOpen()
      await this.statisticsNewDayCheck()
    }, 3000)
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
    await new StatisticsNewDay().run(options)
  }
}

export const IntervalTaskInstance = new IntervalTask()
