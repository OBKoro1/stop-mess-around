import { useDefalutList } from '@/utils/Default'
import { utils } from './index'
import NET from './net'
import { siteTypeTypes } from './types'
/**
 * @description: 默认摸鱼列表添加全局设置
 * @return {Array} 添加后的配置
 */
export async function defaultTableAdd(list) {
  const { itemProto } = useDefalutList()
  const { setting } = await utils.getData()
  const filterHasPushArr = await filterHasPush(list)
  const newArr = filterHasPushArr.map((item) => {
    itemProto.forEach((ele) => {
      item[ele] = item[ele] || setting[ele]
    })
    return item
  })
  newArr.sort(() => Math.random() - 0.5)
  return newArr
}

/**
 * @description: 获取与默认配置不同的数组
 * @return {Array}
 */
export function getDifferentSite(arr) {
  const { defaultList } = useDefalutList()
  return arr.filter((item) => {
    const find = defaultList.find((ele) => ele.site === item.site)
    return find === undefined // 没有在默认配置中找到 即为不同的
  })
}

/**
 * @description: 查找有没有默认配置以外的摸鱼网站
 * @param {type} arr
 * @return {Array} list 用户新增 | 编辑的摸鱼网站
 */
export function filterArrFn(arr) {
  const { defaultList } = useDefalutList()
  return defaultList.filter((item) => {
    const find = arr.find((ele) => item.site === ele.site)
    return find === undefined
  })
}

/**
 * @description: 要添加进列表的数据，先过滤一下是否存在列表中
 * @param {type} pushArr 要添加的列表
 * @return {Array}
 */
export async function filterHasPush(pushArr) {
  const { listArr } = await utils.getData()
  return pushArr.filter((item) => {
    const find = listArr.find((ele) => item.site === ele.site)
    return find === undefined
  })
}

/**
 * @description: 初始化添加所有默认摸鱼列表
 * @param {type} setting
 * @return {object}
 */
export async function initDefaultTableList(setting) {
  if (setting.init) return { init: false }
  const { defaultList } = useDefalutList()
  const tableList = await defaultTableAdd(defaultList, setting)
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
 * @description: 获取网站siteType 'create' | 'default'
 * 获取site是否存在于默认摸鱼列表
 * @return {type}
 */
export function itemSiteType(item) {
  const { defaultList } = useDefalutList()
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
export const siteTypeFind = (item, type) => item.siteType && item.siteType.toLowerCase().indexOf(type) !== -1
