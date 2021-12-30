/*
 * Author       : OBKoro1
 * Date         : 2021-06-04 10:39:57
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-12-30 14:44:59
 * FilePath     : /stop-mess-around/src/background/index.js
 * Description  : background常驻页面
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */
import dayjs from 'dayjs'
import { utils } from '../utils/index'
import NET from '../utils/net'
import { defaultSetting, itemProto } from '../utils/Default'

main()
function main() {
  setInterval(intervalTask, 5000)
  addListener()
}

// 定时任务
async function intervalTask() {
  const Setting = (await utils.getChromeStorage(NET.GLOBALSETTING)) || defaultSetting
  autoOpen(Setting)
  statisticsTimeInit(Setting)
}

// 统计日期 每日新增初始化
async function statisticsTimeInit() {
  const statisticsTime = (await utils.getChromeStorage(NET.statisticsTime)) || []
  const now = Date.now()
  const date = dayjs(now).format('YYYY-MM-DD')
  let add = true
  if (statisticsTime.length !== 0) {
    // 获取最新一天
    const item = statisticsTime[0]
    // 跟当前 不同一天 说明要新增一天
    add = item.date !== date
  }
  if (add) {
    statisticsTime.unshift({
      time: 0,
      restSite: [],
      date,
    })
    await utils.updateStorageData(statisticsTime, NET.statisticsTime)
  }
  // await utils.updateStorageData([], NET.statisticsTime)
  console.log('statisticsTime', statisticsTime)
}

// 检测关闭 定时自动打开
async function autoOpen(Setting) {
  const { closeTime, checkoutStudy } = Setting
  let listArr = (await utils.getChromeStorage(NET.TABLELIST)) || []
  const item = await updateItemPrototype(listArr)
  if (item.change) {
    listArr = item.newList
  }
  // 全局没有关闭 检测单个关闭
  if (Number(closeTime) === 0) {
    autoOpenItem(listArr, Setting)
    return
  }
  const now = Date.now()
  // 全局自动开启
  const isMoreTime = closeTime + checkoutStudy * 60 * 1000
  if (isMoreTime < now) {
    Setting.closeTime = 0
    await utils.updateStorageData(Setting, NET.GLOBALSETTING)
    await checkoutOpen(listArr)
  }
}

// 更新摸鱼数组的默认值属性
async function updateItemPrototype(list) {
  let change = false
  const newList = list.map((item) => {
    itemProto.forEach((ele) => {
      if (item[ele] === undefined) {
        change = true
        item[ele] = defaultSetting[ele]
      }
    })
    return item
  })
  if (change) {
    await utils.updateStorageData(newList, NET.TABLELIST)
  }
  return { change, newList }
}

// 检测单个关闭 将它开启
async function autoOpenItem(listArr, Setting) {
  let isChange = false
  const arr = listArr.map((item) => {
    // 关闭
    if (!item.open) {
      // 如果单个没有的话 就使用全局的自动开启时间
      const checkoutStudy = item.checkoutStudy || Setting.checkoutStudy
      const isMoreTime = item.closeTime + checkoutStudy * 60 * 1000
      // 超过时间
      if (isMoreTime < Date.now()) {
        isChange = true
        item.closeTime = 0
        item.open = true
      }
    }
    return item
  })
  if (isChange) {
    await utils.updateStorageData(arr, NET.TABLELIST)
  }
}

// 一键开启摸鱼网站
async function checkoutOpen(listArr) {
  const arr = listArr.map((item) => {
    item.closeTime = 0
    item.open = true
    return item
  })
  await utils.updateStorageData(arr, NET.TABLELIST)
}

// 监听事件
function addListener() {
  // 第一次安装
  chrome.runtime.onInstalled.addListener(() => {
    utils.jumpUrl(NET.OPTIONSPAGE)
  })
  // 关键词回调
  chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('text', text)
    utils.jumpUrl(NET.OPTIONSPAGE)
  })
  // content通知 background 关闭页面
  chrome.extension.onRequest.addListener(async (request, sender, sendResponse) => {
    console.log('content 消息: ', request, sender)
    if (request.message === 'close-tab') {
      const { id } = sender.tab
      chrome.tabs.remove(id)
    }
    // 单个tab休息一下
    if (request.message === 'reset-tab') {
      await restTab(request, sendResponse)
    }
  })
}

async function restTab(request, sendResponse) {
  await closeOpen(request)
  await statisticsTimeFn(request)
  sendResponse(JSON.stringify(request.item))
}

// 关闭检测 休息一下
async function closeOpen(request) {
  const list = await utils.getChromeStorage(NET.TABLELIST)
  const index = list.findIndex((ele) => ele.site === request.item.site)
  if (index === -1) return
  request.item.open = false // 关闭检测
  request.item.checkoutStudy = request.value // 设置下次自动开启的时间
  request.item.closeTime = Date.now() // 记录关闭时间
  list.splice(index, 1, request.item)
  await utils.updateStorageData(list, NET.TABLELIST)
}

// 统计休息一下
async function statisticsTimeFn(request) {
  let statisticsTime = (await utils.getChromeStorage(NET.statisticsTime))
  const nowDay = statisticsTime[0]
  const item = nowDay.restSite.find((ele) => ele.site === request.item.site)
  // 添加本网页 休息时长与 按钮点击次数
  if (item) {
    item.time += request.value
    const restBtnClickEle = item.restBtnClick.find((ele) => request.value === ele.time)
    if (restBtnClickEle) {
      restBtnClickEle.count += 1
    } else {
      item.restBtnClick.push({
        time: request.value,
        count: 1,
      })
    }
  } else {
    nowDay.restSite.push({
      time: request.value, // 休息时长
      restBtnClick: [
        {
          time: request.value, // 按钮休息时长
          count: 1,
        },
      ], // 点击了哪些按钮 点击了多少次
      labelName: request.item.labelName,
      site: request.item.site, // 网址 id
    })
  }
  // 统计总时间
  nowDay.time += request.value
  statisticsTime = statisticsTime.map((ele) => {
    ele.restSite.sort((a, b) => b.time - a.time)
    return ele
  })
  console.log('statisticsTime sort', statisticsTime, nowDay)
  await utils.updateStorageData(statisticsTime, NET.statisticsTime)
}
