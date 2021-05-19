export default function injectUrl(path) {
  if (!path) {
    throw new Error('not path')
  }

  if (/\.js$/.test(path)) {
    // 在网页上加载插件内js文件
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    script.src = window.chrome.extension.getURL(path)
    script.onload = function () {
      // 放在页面不好看，执行完后移除掉
      this.parentNode.removeChild(this)
    }
    document.head.appendChild(script)
  } else if (/\.css$/.test(path)) {
    // 在网页上加载插件内css文件
    const link = document.createElement('link')
    link.href = window.chrome.extension.getURL(path)
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
}
