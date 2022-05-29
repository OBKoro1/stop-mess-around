/*
 * Author       : OBKoro1
 * Date         : 2021-06-18 11:08:23
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-05-29 15:12:45
 * FilePath     : /stop-mess-around/deploy.js
 * Description  : 同步package.json的配置到manifest.json中
 * 根据浏览器: 修改element-ui引用配置、
 * 根据参数production: 修改package.json插件名和描述
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */

const path = require('path')
const fs = require('fs')

const { argv } = process
const env = argv[2]
const navigator = argv[3]

run()

function run() {
  changeVersion()
  elementFont()
}

// 修改element的引用地址 使element icon在其他网站上可用
function elementFont() {
  const elementPath = path.resolve(__dirname, './node_modules/element-ui/lib/theme-chalk/', 'index.css')
  let content = fs.readFileSync(elementPath).toString()
  // 替换匹配到的每个变量
  const reg = /url\(.*?fonts\/element-icons\./g
  // !!! 删除fonts/element-icons.ttf好像没有作用 还会在content网站中报错
  // 源字符: el-upload-list__item.is-success:not(.focusing):focus{outline-width:0}@font-face{font-family:element-icons;src:url(fonts/element-icons.woff) format("woff"),url(fonts/element-icons.ttf) format("truetype");font-weight:400;font-display:"auto";font-style:normal}[class*=" el-icon-"],
  // 源字符: src:url(fonts/element-icons.woff)
  // 更改为: src:url(chrome-extension://__MSG_@@extension_id__/fonts/element-icons.woff)
  let navigatorName = 'chrome-extension'
  if (navigator === 'fireFox') navigatorName = 'moz-extension'
  content = content.replace(reg, `url(${navigatorName}://__MSG_@@extension_id__/fonts/element-icons.`)
  fs.writeFileSync(elementPath, content)
}

// 更改插件版本与描述
function changeVersion() {
  const VERSION = process.env.npm_package_version
  let DESCRIPTION = '减少摸鱼的时间和频率的浏览器插件：提醒你正在摸鱼，摸鱼的时候知道自己在摸鱼，提高我们上班和学习的效率，节省时间用于学习提升自己或者享受生活'
  let PLUGINNAME = 'stop-mess-around'

  if (env !== 'production') {
    PLUGINNAME = 'stop-mess-around-file'
    DESCRIPTION = `file: ${DESCRIPTION}`
  }
  const templateOption = {
    DESCRIPTION,
    VERSION,
    PLUGINNAME,
  }
  const manifestPath = {
    template: path.resolve(__dirname, './manifest/manifest.template.json'),
    production: path.resolve(__dirname, './manifest/manifest.production.json'),
  }
  if (navigator === 'fireFox') {
    manifestPath.template = path.resolve(__dirname, './manifest/fireFox.manifest.template.json')
    manifestPath.production = path.resolve(__dirname, './manifest/fireFox.manifest.production.json')
  }

  updateFillBuilderYAML(templateOption, manifestPath)
}

// 修改manifest.template.json配置，替换manifest.production.json
function updateFillBuilderYAML(option, manifestPath) {
  let content = fs.readFileSync(manifestPath.template).toString()
  // 替换匹配到的每个变量
  Object.entries(option).forEach(
    ([key, val]) => {
      content = content.replace(createReg(key), val)
    },
  )
  fs.writeFileSync(manifestPath.production, content)
}

// 根据变量名构建一个正则，匹配对应模板中的变量表示
function createReg(variable) {
  return new RegExp(`{{${variable}}}`, 'g')
}
