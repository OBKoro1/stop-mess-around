import { defaultList, itemProto } from '@/utils/Default'
import { utils } from './index'
import NET from './net'
import { siteTypeTypes } from './types'

/**
 * @description: 默认摸鱼列表添加全局设置
 * @return {Array} 添加后的配置
 */
export function defaultTableAdd(list, setting) {
  const newArr = list.map((item) => {
    itemProto.forEach((ele) => {
      item[ele] = item[ele] || setting[ele]
    })
    return item
  })
  newArr.sort(() => Math.random() - 0.5)
  return newArr
}

/**
 * @description: 初始化添加所有默认摸鱼列表
 * @param {type} setting
 * @return {object}
 */
export async function initDefaultTableList(setting) {
  if (setting.init) return { init: false }
  const tableList = defaultTableAdd(defaultList, setting)
  setting.init = true
  await utils.updateStorageData(setting, NET.GLOBALSETTING)
  await utils.updateStorageData(tableList, NET.TABLELIST)
  return {
    init: true,
    listArr: tableList,
    setting,
  }
}

/**
 * @description: 获取site是否存在于默认摸鱼列表
 * @return {type}
 */
export function itemSiteType(item) {
  const find = defaultList.find((ele) => ele.site === item.site)
  let type = ''
  if (!find) {
    // 不存在则是新增
    type = siteTypeTypes.create
  } else {
    // 存在则是默认
    type = siteTypeTypes.default
  }
  return {
    type,
    find,
  }
}

/**
 * @description: 找到item中siteType的类型是否匹配
 * @param {type} item
 * @param {type} type
 * @return {boolean} 是否找到这个type
 */
export const siteTypeFind = (item, type) => item.siteType.toLowerCase().indexOf(type) !== -1
