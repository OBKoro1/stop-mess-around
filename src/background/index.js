/*
 * Author       : OBKoro1
 * Date         : 2021-06-04 10:39:57
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 12:51:11
 * FilePath     : /stop-mess-around/src/background/index.js
 * Description  : background常驻页面
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */
import { IntervalTaskInstance } from './intervalTask'
import { ListenerEventInstance } from './listernerEvent'

main()

function main() {
  // 定时任务
  IntervalTaskInstance.run()
  // 监听任务
  ListenerEventInstance.run()
}
