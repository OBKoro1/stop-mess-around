<!--
 * Author       : OBKoro1 obkoro1@foxmail.com
 * Date         : 2022-06-05 17:42:07
 * Last Author  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2023-04-11 23:09:14
 * FilePath     : /stop-mess-around/src/options/App/share/ShareSiteToGithub.vue
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
    :title="useLanguageMessage('sharePluginTitle')"
    width="800px"
    style="margin-top: -7vh;"
  >
    <div class="random-content">
      <div class="page-title1">
        {{ useLanguageMessage('sharePluginTip') }}
      </div>
      <el-collapse
        v-model="shareValuesNames"
      >
        <el-collapse-item
          :title="useLanguageMessage('pluginConfigByAuto')"
          name="1"
        >
          <div>{{ useLanguageMessage('pluginnConfigByAdd') }}</div>
          <div>{{ useLanguageMessage('pluginConfigByWatch') }}</div>
          <div>{{ useLanguageMessage('pluginConfigByUse') }}</div>
          <div>{{ useLanguageMessage('pluginConfigByReset') }}</div>
          <div>{{ useLanguageMessage('pluginConfigByShare') }}</div>
        </el-collapse-item>
        <el-collapse-item
          :title="useLanguageMessage('sharePluginWebTitle')"
          name="2"
        >
          <div>{{ useLanguageMessage('sharePluginWebConig') }}</div>
          <div>{{ useLanguageMessage('sharePluginWebMore') }}</div>
          <div>{{ useLanguageMessage('sharePluginWebTime') }}</div>
        </el-collapse-item>
        <el-collapse-item
          :title="useLanguageMessage('sharePlugin')"
          name="3"
        >
          <div>{{ useLanguageMessage('sharePluginHelpTip1') }}🌹;</div>
          <div>{{ useLanguageMessage('sharePluginHelpTip2') }}🌹;</div>
        </el-collapse-item>
      </el-collapse>
      <div class="page-title1 margin-top">
        {{ useLanguageMessage('howSharePlugin') }}
      </div>
      <el-collapse
        v-model="shareNames"
      >
        <el-collapse-item
          :title="useLanguageMessage('sharePluginNames')"
          name="1"
        >
          <div
            v-if="differentArr.length === 0"
            class="Margin6"
          >
            {{ useLanguageMessage('sharePluginNamesTip') }}
          </div>
          <div
            v-else
            class="Margin6"
          >
            {{ useLanguageMessage('currentPlugin') }}{{ differentArr.length }}{{ useLanguageMessage('sharePluginConfig') }}
          </div>
          <el-tooltip
            placement="top"
            :content="useLanguageMessage('sharePluginCopyTip')"
          >
            <el-button
              type="primary"
              :disabled="differentArr.length === 0"
              round
              @click="copyAllSite"
            >
              {{ useLanguageMessage('sharePluginCopy') }}
            </el-button>
          </el-tooltip>
          <el-tooltip
            placement="top"
            :content="useLanguageMessage('sharePluginChoose')"
          >
            <el-button
              type="primary"
              round
              :disabled="differentArr.length === 0"
              @click="checkoutFn('showChooseShareDialog', true)"
            >
              {{ useLanguageMessage('sharePluginChooseTip') }}
            </el-button>
          </el-tooltip>
        </el-collapse-item>
        <el-collapse-item
          :title="useLanguageMessage('sharePluginGithub')"
          name="2"
        >
          <div>
            <b>{{ useLanguageMessage('sharePluginIssue') }}</b>
            <linkPopoverVue
              :url="url1"
              :link-font="useLanguageMessage('sharePluginReply')"
              @copyAllSite="copyAllSite(url1)"
            />
          </div>
          <div class="align-center">
            <b>{{ useLanguageMessage('sharePluginCopyData') }}</b>
            <linkPopoverVue
              :url="url2"
              :link-font="useLanguageMessage('sharePluginModel')"
              @copyAllSite="copyAllSite(url2)"
            />
            {{ useLanguageMessage('sharePluginBtn') }}
          </div>
          <div>{{ useLanguageMessage('sharePluginSysTip1') }}</div>
          <div>{{ useLanguageMessage('sharePluginSysTip2') }}</div>
        </el-collapse-item>
        <el-collapse-item
          :title="useLanguageMessage('sharePluginDev')"
          name="3"
        >
          <div><b>{{ useLanguageMessage('sharePluginFoxmail') }}</b></div>
          <div>{{ useLanguageMessage('sharePluginFoxmailTip1') }}</div>
          <div>{{ useLanguageMessage('sharePluginFoxmailTip2') }}</div>
          <div>
            {{ useLanguageMessage('sharePluginFoxmailTip3') }}
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
import { copyData } from '@/options/utils'
import { getDifferentSite } from '@/utils/tableListUtils'
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
