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
      repoName: '',
    }
  },
  mounted() {
    this.matchGithub()
    // 链接更新 有时候无法检测
    setInterval(this.matchGithub, 6000)
  },
  methods: {
    isCreated() {
      return document.querySelector('#stop-mess-around')
    },
    matchGithub() {
      if (this.isCreated()) return
      // 匹配github仓库
      const reg = /^(https:\/\/github\.com\/([^/]+)\/([^/]+))?\/*/
      const url = window.location.href
      const res = reg.exec(url)
      if (res) {
        [, this.repoUrl, this.repoAuthor, this.repoName] = res
        this.matchDom()
      }
    },
    // 匹配dom
    matchDom() {
      // 仓库头部
      try {
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
