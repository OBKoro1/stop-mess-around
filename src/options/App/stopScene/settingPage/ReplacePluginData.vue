<!--
 * Author       : OBKoro1
 * Date         : 2022-04-09 14:41:25
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-10-12 22:48:25
 * FilePath     : /src/options/App/settingPage/ReplacePluginData.vue
 * description  : 插件数据与反馈问题相关
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    :close-on-press-escape="false"
    append-to-body
    :visible.sync="dialogVisible"
    :title="useLanguageMessage('feedbackIssues')"
    width="550px"
  >
    <div>
      <el-input
        v-model="inputData"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 15}"
        :placeholder="useLanguageMessage('feedbackPlaceholder')"
      />
      <div style="margin: 20px 0;" />
      <el-form
        label-width="150px"
      >
        <el-form-item prop="feedback">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('copeParams')"
              placement="top"
            >
              <span>{{ useLanguageMessage('copeData') }}</span>
            </el-tooltip>
          </span>
          <el-button
            class="button-margin-right"
            size="small"
            type="primary"
            @click="copyPluginData"
          >
            {{ useLanguageMessage('copyInit') }}
          </el-button>
          <el-button
            class="button-margin-right"
            size="small"
            @click="copyPluginData('format')"
          >
            {{ useLanguageMessage('copyFormat') }}
          </el-button>
        </el-form-item>
        <el-form-item prop="feedback2">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('jumpIssueTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('jumpIssue') }}</span>
            </el-tooltip>
          </span>
          <el-button
            class="button-margin-right"
            size="small"
            @click="utils.jumpUrl(NET.GITHUB_REPO_ISSUES)"
          >
            {{ useLanguageMessage('jumpURL') }}
          </el-button>
        </el-form-item>
        <el-form-item prop="clear">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('keySet')"
              placement="top"
            >
              <span>{{ useLanguageMessage('resetAll') }}</span>
            </el-tooltip>
          </span>
          <el-popconfirm
            :title="useLanguageMessage('confirmClear')"
            @confirm="clearAll()"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              {{ useLanguageMessage('keyClear') }}
            </el-button>
          </el-popconfirm>
        </el-form-item>
        <el-form-item prop="clear">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('keySet')"
              placement="top"
            >
              <span>{{ useLanguageMessage('resetSome') }}</span>
            </el-tooltip>
          </span>
          <el-popconfirm
            :title="useLanguageMessage('keyClear')"
            @confirm="clearSetting('clearList')"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              {{ useLanguageMessage('clearList') }}
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            :title="useLanguageMessage('confirmReset')"
            @confirm="clearSetting('clearSetting')"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              {{ useLanguageMessage('resetSet') }}
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            :title="useLanguageMessage('confirmReset')"
            @confirm="clearSetting('statisticsTime')"
          >
            <el-button
              slot="reference"
              size="small"
              type="danger"
            >
              {{ useLanguageMessage('resetTotal') }}
            </el-button>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">
        {{ useLanguageMessage('cancel') }}
      </el-button>
      <el-button
        type="danger"
        @click="replacePluginData"
      >
        {{ useLanguageMessage('replacePluginData') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

import { copyData } from '@/options/utils'

export default {
  inject: ['initData'],
  props: {
    showServeDialog: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputData: '',
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showServeDialog
      },
      set() {
        this.close()
      },
    },
  },
  methods: {
    async replacePluginData() {
      let res
      try {
        res = JSON.parse(this.inputData, null, 2)
      } catch {
        res = {}
      }
      const { setting = {}, statisticsTime = [], listArr = [] } = res
      await this.utils.updateStorageData(listArr, this.NET.TABLELIST)
      await this.utils.updateStorageData(setting, this.NET.GLOBALSETTING)
      await this.utils.updateStorageData(statisticsTime, this.NET.statisticsTime)
      this.close()
    },
    // 清空设置
    clearSetting(type) {
      this.close()
      this.initData(type)
      if (type === 'clearList') {
        this.$message.success(this.useLanguageMessage('clearListSuccess'))
      }
    },
    async clearAll() {
      await this.initData('clearList')
      await this.initData('clearSetting')
      await this.initData('statisticsTime')
      this.close()
    },
    // 复制插件配置 去反馈问题
    async copyPluginData(type) {
      const obj = await this.utils.getData()
      let tip = this.useLanguageMessage('copyPluginInitTip')
      let text = JSON.stringify(obj)
      if (type === 'format') {
        text = JSON.stringify(obj, null, 2)
        tip = this.useLanguageMessage('copyPluginFeeabackTip')
        text = `${this.useLanguageMessage('feedbackData')}:\n\`\`\`js\n${text}\n\`\`\``
      }
      copyData(text, tip)
    },
    close() {
      this.$emit('close', 'showPluginDataDialog', false)
    },
  },
}
</script>

<style scoped>
.button-margin-right {
  margin-right: 10px;
}
</style>
