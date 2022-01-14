matchTest()
function matchTest() {
  const matchArr = [
    'https://github.com/OBKoro1/stop-mess-around',
    'https://github.com/OBKoro1/stop-mess-around/actions',
    'https://github.com/OBKoro1/stop-mess-around/wiki',
    'https://github.com/OBKoro1/stop-mess-around/blob/dev/src/content/App.vue',
    'https://github.com/OBKoro1/stop-mess-around/tree/master/src',
  ]
  for (const item of matchArr.values()) {
    const reg = /^(https:\/\/github\.com\/([^/]+)\/([^/]+))\/?.*/
    const res = reg.exec(item)
    if (res) {
      const [, repoUrl, repoAuthor, repoName] = res
      let newRepoUrl = repoUrl
      // 是否为查看文件 或者 文件树
      const reg2 = /^(https:\/\/github\.com\/([^/]+)\/([^/]+))\/([^/]+)\/([^/]+)\/?.*/
      const res2 = reg2.exec(item)
      const treeOrBlob = res2[4]
      if (treeOrBlob && (treeOrBlob === 'blob' || treeOrBlob === 'tree')) {
        newRepoUrl = matchBranch() // 修改为具体地址
      }
      console.log('item', repoUrl, repoAuthor, repoName)
      console.log('item', res2)
      return newRepoUrl
    }
  }
  // 匹配分支和具体的文件
  function matchBranch(repoUrl) {
    const id = 'code-tab'
    const constClassName = 'selected'
    const githubCodeButton = document.querySelector(`#${id}`)
    if (!githubCodeButton) return repoUrl
    const hasClassName = hasClass(githubCodeButton, constClassName)
    if (hasClassName) {
      return window.location.href
    }
    return repoUrl
  }
  function hasClass(dom, className) {
    if ('classList' in dom && typeof dom.classList.contains === 'function') {
      return (elem) => elem.classList.contains(className)
    }
    return (elem) => {
      const classes = elem.className.split(/\s+/)
      for (const ele of classes.values()) {
        if (ele === className) {
          return true
        }
      }
      return false
    }
  }
}
