<!--
 * Author       : OBKoro1
 * Date         : 2021-05-28 16:02:26
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-06-19 13:19:37
 * FilePath     : /src/options/App/share/chooseShare.vue
 * Description  : 选择要分享的摸鱼网站
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    append-to-body
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    width="650px"
  >
    <div
      slot="title"
      class="dialog_title"
    >
      {{ '手动选择与默认配置不同的摸鱼网站' }}
    </div>
    <div>
      <div class="random-content">
        <el-table
          :data="showList"
          tooltip-effect="dark"
          stripe
          row-key="site"
          max-height="1000"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="60"
          />
          <el-table-column
            prop="labelName"
            width="150"
            show-overflow-tooltip
          >
            <template slot="header">
              <span>{{ '摸鱼网站名' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="site"
            show-overflow-tooltip
          >
            <template slot="header">
              <span>{{ '摸鱼网址' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmFn"
      >复制选中数据</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { copyData, getDifferentSite } from '@/options/utils'

export default {
  name: 'ShareItem',
  props: {
    showChooseShareDialog: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showList: [],
      chooseList: [],
      tableArr: [],
    }
  },
  inject: ['tableDataSpliceUpdate', 'getTableData', 'getSetting'],
  computed: {
    dialogVisible: {
      get() {
        return this.showChooseShareDialog
      },
      set() {
        this.close()
      },
    },
  },
  watch: {
    // 初始化数据
    dialogVisible(val) {
      if (val) {
        this.chooseList = []
        this.tableArr = this.getTableData()
        const arr = getDifferentSite(this.tableArr)
        this.showList = arr
      }
    },
  },
  methods: {
    close() {
      this.$emit('close', 'showChooseShareDialog', false)
    },
    // 选中
    handleSelectionChange(val) {
      this.chooseList = val
    },
    confirmFn() {
      if (this.chooseList.length === 0) {
        this.$message.error('至少选择一个数据')
        return
      }
      const tip = '自定义摸鱼网站数据已复制, 用于分享摸鱼网站, 集成到插件中'
      let text = JSON.stringify(this.chooseList, null, 2)
      text = `选择摸鱼网站列表:\n\`\`\`js\n${text}\n\`\`\``
      copyData(text, tip)
      this.close()
    },
  },
}
</script>

<style scoped>
.random-content {
  max-height: 500px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
