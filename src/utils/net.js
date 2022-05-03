/*
 * Author       : OBKoro1
 * Date         : 2021-05-21 14:56:38
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-03 20:43:32
 * FilePath     : /stop-mess-around/src/utils/net.js
 * Description  : 全局常量
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
 */

function getNavigatorOptions() {
  // 转小写
  const mode = process.env.VUE_APP_MODE.toLowerCase()
  if (mode.indexOf('firefox') >= 0) {
    // 打开火狐options的id
    const FIREFOX_UUID = '17ce4bd7-60f8-432c-9848-a61dd819bc06'
    // 本地调试火狐的id
    const FIREFOX_SERVER_UUID = '0ffdf229-783f-4b8b-b583-8cf7788f7180'
    const id = mode.indexOf('serve') === -1 ? FIREFOX_SERVER_UUID : FIREFOX_UUID
    return {
      name: 'Firefox',
      id, // serve
      extensionName: 'moz-extension',
      downloadUrl: 'https://addons.mozilla.org/zh-CN/firefox/addon/stop-mess-around1/',
    }
  }

  const chromeOptions = {
    name: 'Chrome',
    id: chrome.runtime.id, // serve
    extensionName: 'chrome-extension',
    downloadUrl: 'https://chrome.google.com/webstore/detail/stop-mess-around/gbjbkekbbjbieijpebieifkmahlagncm/related?hl=zh-CN',
  }
  if (mode.indexOf('edge') >= 0) {
    chromeOptions.name = 'Edge'
    chromeOptions.downloadUrl = 'https://microsoftedge.microsoft.com/addons/detail/stopmessaround/mdiafefnlaaefmfgjbeejpppkdhghmaj'
  }
  // 包含edge
  return chromeOptions
}

const NavigatorOptions = getNavigatorOptions() || {}

const NET = {
  // 项目地址
  GITHUBREPO: 'https://github.com/OBKoro1/stop-mess-around',
  GITHUB_REPO_ISSUES: 'https://github.com/OBKoro1/stop-mess-around/issues',
  // 使用文档
  DOCS: 'https://github.com/OBKoro1/stop-mess-around/wiki/%E5%8A%9F%E8%83%BD%E7%A4%BA%E4%BE%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E',
  // 更新日志
  RELEASES: 'https://github.com/OBKoro1/stop-mess-around/blob/master/CHANNGELOG.md',
  // github 地址
  GITHUBSITE: 'https://github.com/OBKoro1',
  // 我的github地址
  MYSITE: 'http://obkoro1.com/web_accumulate/about.html',
  // 插件配置面板页面
  OPTIONSPAGE: `${NavigatorOptions.extensionName}://${NavigatorOptions.id}/options.html`,
  //   MYSITE: 'https://github.com/OBKoro1',
  // 谷歌应用市场
  CHROMESTORE: NavigatorOptions.downloadUrl,
  // storage
  TABLELIST: 'tableList',
  statisticsTime: 'statisticsTime', // 统计摸鱼时长
  GLOBALSETTING: 'globalSetting',
  NAVIGATOR_OPTIONS: NavigatorOptions,
}

export default NET
