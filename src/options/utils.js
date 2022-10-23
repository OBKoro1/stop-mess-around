import { Message } from 'element-ui'

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

export function checkContentInArr(arr, content) {
  if (content === '') {
    Message.error('内容不能为空')
    return false
  }
  const ele = arr.find((item) => item === content)
  if (ele !== undefined) {
    Message.error('内容重复，请重新输入')
    return false
  }
  return true
}
