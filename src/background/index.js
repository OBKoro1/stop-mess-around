/*
 * Author       : OBKoro1
 * Date         : 2021-06-04 10:39:57
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-06-26 16:51:48
 * FilePath     : /src/background/index.js
 * Description  : background常驻页面
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */
import AsyncPluginData from './asyncPluginData'
import { IntervalTaskInstance } from './intervalTask'
import { ListenerEventInstance } from './listenerEvent'

main()

function main() {
  // 插件安装或者升级后更新数据
  AsyncPluginData.run()
  // 定时任务
  IntervalTaskInstance.run()
  // 监听任务
  ListenerEventInstance.run()
}
