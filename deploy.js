/*
 * Author       : OBKoro1
 * Date         : 2021-06-18 11:08:23
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-07-28 10:31:48
 * FilePath     : deploy.js
 * Description  : 同步package.json的配置到manifest.json中
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */

const path = require('path')
const fs = require('fs')

// 插件版本与描述
const VERSION = process.env.npm_package_version
let DESCRIPTION = '防摸鱼插件: 通过强制的手段禁止大家浪费时间摸鱼：在上班/学习期间下意识的打开摸鱼网站, 自动检测摸鱼网站, 提示激励信息后, 关闭摸鱼网站, 滚去学习，滚去做对未来有益的事情！'
let PLUGINNAME = 'stop-mess-around'

if (process.env.NODE_ENV !== 'production') {
  PLUGINNAME = 'stop-mess-around-file'
  DESCRIPTION = `file: ${DESCRIPTION}`
}
const templateOption = {
  DESCRIPTION,
  VERSION,
  PLUGINNAME,
}

updateFillBuilderYAML(templateOption)

// 修改manifest.template.json配置，替换manifest.production.json
function updateFillBuilderYAML(option) {
  const ELECTRON_BUILDER_TEMPLATE = path.resolve(
    __dirname,
    'src',
    'manifest.template.json',
  )
  const ELECTRON_BUILDER_OUTPUT = path.resolve(__dirname, 'src', 'manifest.production.json')
  let content = fs.readFileSync(ELECTRON_BUILDER_TEMPLATE).toString()
  // 替换匹配到的每个变量
  Object.entries(option).forEach(
    ([key, val]) => {
      content = content.replace(createReg(key), val)
    },
  )
  fs.writeFileSync(ELECTRON_BUILDER_OUTPUT, content)
}

// 根据变量名构建一个正则，匹配对应模板中的变量表示
function createReg(variable) {
  return new RegExp(`{{${variable}}}`, 'g')
}
