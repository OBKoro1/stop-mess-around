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

// let result = versionStringCompare('1.0.2', '1.0');
// console.log(result);    //1

// let result = versionStringCompare('1.0.0', '1.1');
// console.log(result);    //-1

// let result = versionStringCompare('11.0.2', '5.5.6');
// console.log(result);    //1

// let result = versionStringCompare('5.5.0', '5.5');
// console.log(result);    //0

// let result = versionStringCompare('1.1.a', '1.1.1');
// console.log(result);    //1
