<template>
  <div />
</template>
<script>

export default {
  name: 'Github1sButton',
  data() {
    return {
      repoUrl: '',
      repoAuthor: '', // 用户名、仓库所属的组织
      repoName: '', // 仓库名字
    }
  },
  mounted() {
    this.matchGithub()
    // 链接更新 有时候无法检测
    setInterval(this.matchGithub, 3000)
  },
  methods: {
    isCreated() {
      return document.querySelector('#stop-mess-around')
    },
    matchGithub() {
      // 匹配github仓库
      const reg = /^(https:\/\/github\.com\/([^/]+)\/([^/]+))\/?.*/
      const url = window.location.href
      const res = reg.exec(url)
      if (res) {
        const [, repoUrl, repoAuthor, repoName] = res
        this.repoAuthor = repoAuthor
        this.repoName = repoName
        if (!this.repoUrl.startsWith(repoUrl)) {
          this.repoUrl = repoUrl
        }
        this.matchBranch(this.repoUrl)
        this.matchDom()
      }
    },

    // 匹配分支和具体的文件
    matchBranch(repoUrl) {
      // github仓库的匹配地址
      const id = 'code-tab'
      const constClassName = 'selected'
      const githubCodeButton = document.querySelector(`#${id}`)
      if (!githubCodeButton) return repoUrl
      const hasClassName = this.hasClass(githubCodeButton, constClassName)
      // 如果激活的是code-tab模块 仓库的链接就是当前浏览的分支和文件的链接
      // 即时跳到其他路由上 也是使用之前匹配到的分支和文件的链接，比如：wiki、actions、issues等
      const url = window.location.href
      if (hasClassName && this.repoUrl !== url) {
        // 获取/用户名/仓库名/路由名
        const reg2 = /^(https:\/\/github\.com\/([^/]+)\/([^/]+))\/([^/]+)\/([^/]+)\/?.*/
        const res2 = reg2.exec(url)
        if (!res2) return
        const treeOrBlob = res2[4]
        // 当为查看文件树或者查看具体文件时才可以修改
        if (treeOrBlob && (treeOrBlob === 'blob' || treeOrBlob === 'tree')) {
          this.repoUrl = window.location.href
        }
      }
    },
    // 是否有class name
    hasClass(dom, className) {
      if ('classList' in dom && typeof dom.classList.contains === 'function') {
        return dom.classList.contains(className)
      }
      const classes = dom.className.split(/\s+/)
      for (const ele of classes.values()) {
        if (ele === className) {
          return true
        }
      }
      return false
    },
    // 匹配dom
    matchDom() {
      const isCreatedDom = this.isCreated()
      if (isCreatedDom) {
        // 修改跳转地址
        isCreatedDom.href = this.repoUrl.replace('github.com', 'github1s.com')
        return
      }
      try {
      // 仓库头部
        const headDom = document.querySelector('#repository-container-header')
        if (headDom) {
          const repoNameDom = headDom.children[0].children[0].children[0]
          // 获取repoName 再次匹配
          const repoName = repoNameDom.innerText.replaceAll('\n', '')
          if (repoName === `${this.repoAuthor}/${this.repoName}`) {
            // 创建dom
            const createDom = document.createElement('a')
            createDom.textContent = '1sLookCode'
            createDom.className = 'github-look-code-class'
            createDom.id = 'stop-mess-around'
            createDom.href = this.repoUrl.replace('github.com', 'github1s.com')
            repoNameDom.appendChild(createDom)
          }
        }
      } catch {
        // 不是github 仓库
      }
    },
  },
}
</script>

<style>
.github-look-code-class {
  display: inline-flex;
  background: #2ea44f;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 16px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  border: 1px solid;
  border-radius: 6px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
