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
    title="插件数据与反馈问题相关"
    width="550px"
  >
    <div>
      <el-input
        v-model="inputData"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 15}"
        :placeholder="`请复制别的电脑的本插件数据（记住点击用于初始化数据的复制按钮），粘贴到这里来，替换插件数据一般用于初始化插件数据。\n由于谷歌插件 Manifest v3 版本数据同步的数据容量限制，只能将插件数据存在本地，故使用该方式初始化数据。`"
      />
      <div style="margin: 20px 0;" />
      <el-form
        label-width="150px"
      >
        <el-form-item prop="feedback">
          <span slot="label">
            <el-tooltip
              :content="'复制参数，用于去Github提issue和初始化插件数据'"
              placement="top"
            >
              <span>{{ '复制数据' }}</span>
            </el-tooltip>
          </span>
          <el-button
            class="button-margin-right"
            size="small"
            type="primary"
            @click="copyPluginData"
          >
            复制插件数据初始化
          </el-button>
          <el-button
            class="button-margin-right"
            size="small"
            @click="copyPluginData('format')"
          >
            复制插件数据反馈问题
          </el-button>
        </el-form-item>
        <el-form-item prop="feedback2">
          <span slot="label">
            <el-tooltip
              :content="'去Github按照规范提issue'"
              placement="top"
            >
              <span>{{ '跳转反馈问题' }}</span>
            </el-tooltip>
          </span>
          <el-button
            class="button-margin-right"
            size="small"
            @click="utils.jumpUrl(NET.GITHUB_REPO_ISSUES)"
          >
            跳转反馈
          </el-button>
        </el-form-item>
        <el-form-item prop="clear">
          <span slot="label">
            <el-tooltip
              :content="'一键恢复默认设置。'"
              placement="top"
            >
              <span>{{ '重置所有数据' }}</span>
            </el-tooltip>
          </span>
          <el-popconfirm
            title="确认清空？"
            @confirm="clearAll()"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              一键清空所有设置
            </el-button>
          </el-popconfirm>
        </el-form-item>
        <el-form-item prop="clear">
          <span slot="label">
            <el-tooltip
              :content="'一键恢复默认设置。'"
              placement="top"
            >
              <span>{{ '重置部分插件数据' }}</span>
            </el-tooltip>
          </span>
          <el-popconfirm
            title="确认清空？"
            @confirm="clearSetting('clearList')"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              清空摸鱼列表
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确认重置？"
            @confirm="clearSetting('clearSetting')"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              重置设置
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确认重置？"
            @confirm="clearSetting('statisticsTime')"
          >
            <el-button
              slot="reference"
              size="small"
              type="danger"
            >
              重置摸鱼统计
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
        取消
      </el-button>
      <el-button
        type="danger"
        @click="replacePluginData"
      >
        使用输入数据替换插件数据
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
      console.log('输入数据', this.inputData)
      const { setting = {}, statisticsTime = [], listArr = [] } = res
      console.log('替换数据', setting, statisticsTime, listArr)
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
        this.$message.success('清空摸鱼列表成功')
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
      let tip = '插件数据已复制, 用于初始化数据'
      let text = JSON.stringify(obj)
      if (type === 'format') {
        text = JSON.stringify(obj, null, 2)
        tip = '插件数据已复制, 用于反馈问题, 不可以用于初始化数据，否则失效'
        text = `反馈问题数据:\n\`\`\`js\n${text}\n\`\`\``
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
