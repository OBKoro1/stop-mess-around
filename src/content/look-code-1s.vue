<template>
  <el-popover
    ref="popoverDom"
    v-model="clickBtn"
    placement="bottom"
    width="200"
    trigger="manual"
  >
    <div
      v-for="item in optionsArr"
      :key="item.url"
    >
      <template v-if="!item.type">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.tip"
          placement="top"
        >
          <a
            target="_blank"
            style="background:#2ea44f; color: #fff; margin-bottom: 10px;"
            class="btn btn-sm"
            @click="jumpUrl(item)"
          > {{ item.btnFont }} </a>
        </el-tooltip>
      </template>
      <template v-else>
        <div>
          <span>stop-mess-around </span>
          <div>
            <span>自律防摸鱼插件提供</span>
          </div>
          <div class="align-center">
            <span>插件地址:</span>
            <img
              v-if="clickBtn"
              alt="GitHub Repo stars"
              class="header-btns-star cursor-pointer title-img marginLeft"
              src="https://img.shields.io/github/stars/OBKoro1/stop-mess-around?"
              @click="jumpGithub(NET.GITHUBREPO)"
            >
          </div>
        </div>
      </template>
    </div>
  </el-popover>
</template>
<script>
import { utils } from '@/utils/index'
import NET from '@/utils/net'

export default {
  name: 'Github1sButton',
  data() {
    return {
      setting: {},
      intervalId: null,
      clickBtn: false,
      idName: 'stop-mess-around-btn',
      optionsArr: [
        {
          url: 'https://github1s.com',
          btnFont: 'github1s: 第三方速度快',
          tip: 'github1s 代码只可读 加载速度快 号称只要1s',
        },
        {
          url: 'https://github.dev',
          btnFont: 'github.dev: 官方集成度高',
          tip: 'github.dev 官方出品: 可读可写可commit集成度高 加载慢一些',
        },
        {
          type: 'stop-mess-around',
        },
      ],
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

        this.matchDom()
      }
    },

    // 匹配dom
    async matchDom() {
      const isCreatedDom = this.isCreated();
      ({ setting: this.setting } = await utils.getData())
      // 关闭
      if (this.setting.lookCode === 'off') {
        return isCreatedDom && isCreatedDom.remove()
      }
      this.createDomRight()
    },
    createDomRight() {
      const element = `<li id="${this.idName}"> <a target="_blank" style="background:#2ea44f; color: #fff;" class="btn btn-sm"> 在线VSCode翻阅源码 </a> </li>`
      const node = document.querySelector('.pagehead-actions.flex-shrink-0.d-none.d-md-inline')
      if (node !== null) {
        node.insertAdjacentHTML('afterBegin', element)
        const dom = document.querySelector(`#${this.idName}`)
        // 显示提示框 选择使用github1s或者github.dev
        dom.onclick = (e) => {
          // 标签的起点
          const left = e.target.offsetLeft
          // 标签下方
          const top = e.target.offsetTop + (e.target.offsetHeight + 10)
          this.clickBtn = !this.clickBtn
          if (this.clickBtn) {
            this.$nextTick(() => {
              this.renderChooseDom(left, top)
            })
          }
        }
      }
    },
    // 设置提示框位置
    renderChooseDom(left, top) {
      // 增加偏移余量
      const popoverDomFather = this.$refs.popoverDom.$el
      const popoverDom = popoverDomFather.children[0]
      popoverDom.style.left = `${left}px`
      popoverDom.style.top = `${top}px`
    },
    // 跳转在线vscode
    jumpUrl(item) {
      window.location.href = `${item.url}${window.location.pathname}`
    },
    jumpGithub() {
      utils.jumpUrl(NET.GITHUBREPO)
    },
  },
}
</script>

<style scoped>
</style>
