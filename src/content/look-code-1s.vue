<template>
  <div />
</template>
<script>
import { utils } from '@/utils/index'

export default {
  name: 'Github1sButton',
  data() {
    return {
      setting: {},
      intervalId: null,
      idName: 'stop-mess-around',

    }
  },
  async mounted() {
    this.matchGithub()
  },
  methods: {
    isCreated() {
      return document.querySelector(`#${this.idName}`)
    },
    matchGithub() {
      if (this.isCreated()) {
        return
      }
      // 匹配github仓库
      const reg = /^(https:\/\/github\.com\/([^/]+)\/([^/]+))\/?.*/
      const url = window.location.href
      const res = reg.exec(url)
      if (res) {
        // github中开启定时
        if (!this.intervalId) {
          this.intervalId = setInterval(() => {
            this.matchGithub()
          }, 3000)
        }

        // const [, repoUrl, repoAuthor, repoName] = res
        // this.repoAuthor = repoAuthor
        // this.repoName = repoName
        // if (!this.repoUrl.startsWith(repoUrl)) {
        //   this.repoUrl = repoUrl
        // }
        this.matchDom()
      }
    },

    // 匹配dom
    async matchDom() {
      const isCreatedDom = this.isCreated();
      ({ setting: this.setting } = await utils.getData())
      // github.dev 官方出品: 可读可写可commit集成度高 加载慢一些
      let options = {
        url: 'https://github.dev',
        btnFont: '在线VSCode: github.dev',
      }
      if (this.setting.lookCode === 'github1s.com') {
        // github1s 代码只可读 加载速度快 号称只要1s
        options = {
          url: 'https://github1s.com',
          btnFont: '在线VSCode: github1s',
        }
      } else if (this.setting.lookCode === 'off') {
        return isCreatedDom && isCreatedDom.remove()
      }
      this.createDomRight(options)
    },
    createDomLeft(options) {
      // 仓库头部
      const headDom = document.querySelector('#repository-container-header')
      if (headDom) {
        const repoNameDom = headDom.children[0].children[0].children[0]
        // 创建dom
        const createDom = document.createElement('a')
        createDom.textContent = options.btnFont
        createDom.className = 'github-look-code-class'
        createDom.id = this.idName
        createDom.onclick = () => {
          window.location.href = `${options.url}${window.location.pathname}`
        }
        repoNameDom.appendChild(createDom)
      }
    },
    createDomRight(options) {
      const element = `<li id="${this.idName}"> <a target="_blank" style="background:#2ea44f; color: #fff;" class="btn btn-sm"> ${options.btnFont} </a> </li>`
      const node = document.querySelector('.pagehead-actions.flex-shrink-0.d-none.d-md-inline')
      if (node !== null) {
        node.insertAdjacentHTML('afterBegin', element)
        const dom = document.querySelector(`#${this.idName}`)
        dom.onclick = () => {
          window.location.href = `${options.url}${window.location.pathname}`
        }
      }
    },
  },
}
</script>

<style>
</style>
