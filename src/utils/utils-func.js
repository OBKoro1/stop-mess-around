/*
 * Author       : OBKoro1 obkoro1@foxmail.com
 * Date         : 2022-10-20 00:00:14
 * Last Author  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-10-20 00:05:06
 * FilePath     : /src/utils/utils-func.js
 * description  : 工具方法
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1 email: obkoro1@foxmail.com, All Rights Reserved.
 */
/**
 * @description: 版本号比较
 * @param {type} preVersion 新版本
 * @param {type} lastVersion 旧版本
 * 1 新版本比较新
 * -1 旧版本比较新
 * 0 版本号相等
 */
export function versionStringCompare(preVersion = '', lastVersion = '') {
  const sources = preVersion.split('.')
  const dests = lastVersion.split('.')
  const maxL = Math.max(sources.length, dests.length)
  let result = 0
  for (let i = 0; i < maxL; i += 1) {
    const preValue = sources.length > i ? sources[i] : 0
    const preNum = Number.isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue)
    const lastValue = dests.length > i ? dests[i] : 0
    const lastNum = Number.isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue)
    if (preNum < lastNum) {
      result = -1
      break
    } else if (preNum > lastNum) {
      result = 1
      break
    }
  }
  return result
}

// 检测是否是正确的url地址
export function checkURL(URL) {
  const str = URL
  // 判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  // 下面的代码中应用了转义字符"\"输出一个字符"/"
  const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  const objExp = new RegExp(Expression)
  return objExp.test(str)
}

// 获取url字符串信息
export function getURLInfo(urlStr) {
  const url = new URL(urlStr)
  return url
}
