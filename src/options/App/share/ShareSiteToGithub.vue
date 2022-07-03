<!--
 * Author       : OBKoro1 obkoro1@foxmail.com
 * Date         : 2022-06-05 17:42:07
 * Last Author  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-06-21 21:26:50
 * FilePath     : /src/options/App/share/ShareSiteToGithub.vue
 * description  : 推荐摸鱼网站，集成到插件中
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1 email: obkoro1@foxmail.com, All Rights Reserved.
-->
<template>
  <el-dialog
    append-to-body
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    title="推荐常用摸鱼网站, 让插件更好用~"
    width="800px"
    style="margin-top: -7vh;"
  >
    <div class="random-content">
      <div class="page-title1">
        分享摸鱼网站的目的是让插件更好用, 利人利己~
      </div>
      <el-collapse
        v-model="shareValuesNames"
      >
        <el-collapse-item
          title="零配置使用插件, 自动添加你常用的摸鱼网站"
          name="1"
        >
          <div>推荐你常用的摸鱼网站, 添加到插件的默认配置中;</div>
          <div>安装插件后自动添加所有常见的摸鱼网站, 零配置开始监控摸鱼网站;</div>
          <div>在你换了新电脑的时候, 可以零配置使用;</div>
          <div>在你重装插件的时候, 可以零配置使用;</div>
          <div>在你推荐插件给你的好友时, 可以零配置使用;</div>
        </el-collapse-item>
        <el-collapse-item
          title="推荐各行各业的摸鱼网站, 插件精准识别摸鱼网站"
          name="2"
        >
          <div>各行各业的人有不同的上网习惯, 推荐你常用的摸鱼网站, 添加到插件的默认配置中;</div>
          <div>众人拾柴火焰高, 使插件对各行各业的摸鱼网站配置更加丰富; </div>
          <div>在日常上网冲浪的过程中能更精准的识别摸鱼网站，降低潜在的摸鱼时长;</div>
        </el-collapse-item>
        <el-collapse-item
          title="分享是一件快乐的事情"
          name="3"
        >
          <div>分享常用的摸鱼网站, 集成到插件配置中; </div>
          <div>帮助像你一样自律优秀的人, 精准识别摸鱼网站, 减少摸鱼时间;</div>
        </el-collapse-item>
      </el-collapse>
      <div class="page-title1 margin-top">
        如何分享摸鱼网站集成到插件中？
      </div>
      <el-collapse
        v-model="shareNames"
      >
        <el-collapse-item
          title="必须: 复制摸鱼网站数据"
          name="1"
        >
          <div
            v-if="differentArr.length === 0"
            class="Margin6"
          >
            不存在与插件默认集成的摸鱼网站不同的网站, 无法分享摸鱼网站。
          </div>
          <div
            v-else
            class="Margin6"
          >
            你当前有{{ differentArr.length }}个摸鱼网站，是自己新增或者编辑的，可以分享集成到插件的默认配置中。
          </div>
          <el-tooltip
            placement="top"
            :content="'复制所有与插件默认集成的摸鱼网站不同的网站, 也就是复制所有自己增加和编辑的摸鱼网站'"
          >
            <el-button
              type="primary"
              :disabled="differentArr.length === 0"
              round
              @click="copyAllSite"
            >
              {{ '复制所有自定义网站' }}
            </el-button>
          </el-tooltip>
          <el-tooltip
            placement="top"
            :content="'手动选择自己新增和编辑的摸鱼网站'"
          >
            <el-button
              type="primary"
              round
              :disabled="differentArr.length === 0"
              @click="checkoutFn('showChooseShareDialog', true)"
            >
              {{ '手动选择与默认配置不同的摸鱼网站' }}
            </el-button>
          </el-tooltip>
        </el-collapse-item>
        <el-collapse-item
          title="推荐Github途径"
          name="2"
        >
          <div>
            <b>快速分享, 直接回复issue</b>:在issue的
            <linkPopoverVue
              :url="url1"
              :link-font="'评论区直接回复复制的数据即可'"
              @copyAllSite="copyAllSite(url1)"
            />
          </div>
          <div class="align-center">
            <b>创建issue, 填上复制数据</b>: 在
            <linkPopoverVue
              :url="url2"
              :link-font="'一键选择创建issue模板'"
              @copyAllSite="copyAllSite(url2)"
            />
            的页面, 选择分享摸鱼网站按钮;
          </div>
          <div>ps: Github是程序员代码托管平台, 没有账号可以注册一下账号, 以后也用得着的~</div>
          <div>ps: Github在中国大陆被限流, 没翻墙工具的同学可能网速较慢~</div>
        </el-collapse-item>
        <el-collapse-item
          title="发邮件告知开发者"
          name="3"
        >
          <div><b>邮箱</b>: obkoro1@foxmail.com</div>
          <div>必须的邮件内容: 复制摸鱼网站数据;</div>
          <div>建议邮件标题: 推荐插件摸鱼网站;</div>
          <div>
            ps: 不能翻墙的同学，可以选择发邮件的形式,
            如果可以的话, 还是推荐使用github的形式, 因为邮件有一定概率遗漏😂。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <ChooseShare
      :show-choose-share-dialog="showChooseShareDialog"
      @close="checkoutFn"
    />
  </el-dialog>
</template>

<script>
import { copyData, getDifferentSite } from '@/options/utils'
import ChooseShare from './ChooseShare.vue'
import linkPopoverVue from './LinkPopover.vue'

export default {
  name: 'ShareSiteToGithub',
  inject: ['checkOutAppDialog', 'getTableData'],
  components: {
    ChooseShare,
    linkPopoverVue,
  },
  props: {
    showDialog: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      shareNames: ['1'], // 分享摸鱼网站折叠面板
      shareValuesNames: [], // 分享摸鱼网站的价值
      showChooseShareDialog: false,
      differentArr: [], // 与摸鱼网站不同的网站
      disabledCopy: false, // 禁用复制

      url1: 'https://github.com/OBKoro1/stop-mess-around/issues/13',
      url2: 'https://github.com/OBKoro1/stop-mess-around/issues/new/choose',
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showDialog
      },
      set() {
        this.close()
      },
    },
  },
  watch: {
    // 初始化数据
    dialogVisible: {
      async handler() {
        const tableArr = await this.utils.getChromeStorage(this.NET.TABLELIST) || []
        this.differentArr = getDifferentSite(tableArr)
      },
      immediate: true,
    },

  },
  methods: {
    checkoutFn(key, val) {
      console.log('arr', key, val)
      this[key] = val
    },
    close() {
      this.checkOutAppDialog('shareSiteDialog', false)
    },
    copyAllSite(url) {
      if (this.differentArr.length === 0) {
        this.$message.warning('没有新增和编辑的摸鱼网站列表可以分享, 请添加常用摸鱼网站~')
        return
      }
      const tip = '自定义摸鱼网站数据已复制, 用于分享摸鱼网站, 集成到插件中'
      let text = JSON.stringify(this.differentArr, null, 2)
      text = `自定义摸鱼网站列表:\n\`\`\`js\n${text}\n\`\`\``
      copyData(text, tip)
      if (url) {
        setTimeout(() => {
          this.utils.jumpUrl(url)
        }, 1000)
      }
    },
  },
}
</script>

<style scoped>
.page-title1 {
  font-size: 18px;
  margin-bottom: 10px;
}
.margin-top {
  margin-top: 20px;
}
.set-page-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.random-content {
  height: 600px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
