import { Message } from 'element-ui'

// 通过Chrome插件的API加载字体文件
(function insertElementIcons() {
  const elementIcons = document.createElement('style')
  elementIcons.type = 'text/css'
  elementIcons.textContent = `
        @font-face {
            font-family: "element-icons";
            src: url('${window.chrome.extension.getURL(
    'fonts/element-icons.woff',
  )}') format('woff'),
            url('${window.chrome.extension.getURL(
    'fonts/element-icons.ttf ',
  )}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        }
    `
  document.head.appendChild(elementIcons)
}())

console.log('chrome', chrome)

Message({
  type: 'info',
  message: `stop-mess-around: ${chrome.i18n.getMessage('helloWorld')}`,
})
