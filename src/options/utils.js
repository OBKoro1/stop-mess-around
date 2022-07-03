import { defaultList } from '@/utils/Default'
import { Message } from 'element-ui'

/**
 * @description: 查找有没有默认配置以外的摸鱼网站
 * @param {type} arr
 * @return {Array} list 用户新增 | 编辑的摸鱼网站
 */
export function filterArrFn(arr) {
  return defaultList.filter((item) => {
    const find = arr.find((ele) => item.site === ele.site)
    return find === undefined
  })
}

/**
 * @description: 获取与默认配置不同的site
 * @return {Array}
 */
export function getDifferentSite(arr) {
  return arr.filter((item) => {
    const find = defaultList.find((ele) => ele.site === item.site)
    return find === undefined // 没有在默认配置中找到 即为不同的
  })
}

/**
 * @description: 复制传入的数据
 * @param {type} text
 */
export function copyData(data, tip) {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(data)
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值
    textarea.value = data
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
  Message.success(tip)
}
