/*
 * Author       : OBKoro1
 * Date         : 2021-06-18 11:08:23
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-17 17:04:41
 * FilePath     : /stop-mess-around/deploy.js
 * Description  : 同步package.json的配置到manifest.json中
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
 */

const path = require('path')
const fs = require('fs')

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
  const reg = /\(fonts\/element-icons\./g
  content = content.replace(reg, '(chrome-extension://__MSG_@@extension_id__/fonts/element-icons.')
  fs.writeFileSync(elementPath, content)
}

// 更改插件版本与描述
function changeVersion() {
  const VERSION = process.env.npm_package_version
  let DESCRIPTION = '减少摸鱼的时间和频率的Chrome插件：在上班/学习期间很容易下意识的打开摸鱼网站，插件帮助我们减少摸鱼的时间和频率，提高我们上班和学习的效率，节省时间用于学习提升自己或者享受生活'
  let PLUGINNAME = 'stop-mess-around'

  const { argv } = process
  const env = argv[2]

  if (env !== 'production') {
    PLUGINNAME = 'stop-mess-around-file'
    DESCRIPTION = `file: ${DESCRIPTION}`
  }
  const templateOption = {
    DESCRIPTION,
    VERSION,
    PLUGINNAME,
  }

  updateFillBuilderYAML(templateOption)
}

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
