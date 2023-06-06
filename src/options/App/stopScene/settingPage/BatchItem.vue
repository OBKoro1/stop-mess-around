<!--
 * Author       : OBKoro1
 * Date         : 2021-05-28 16:02:26
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-10-20 22:30:04
 * FilePath     : /src/options/App/settingPage/BatchItem.vue
 * Description  : 摸鱼列表 批量添加
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    append-to-body
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    width="550px"
  >
    <div
      slot="title"
      class="dialog_title"
    >
      {{ '摸鱼网站列表添加' }}
    </div>
    <div>
      <div
        v-if="showCopyData"
        class="jump-setTing"
      >
        <el-button
          plain
          type="danger"
          @click="copyDataFn"
        >
          跳转复制插件数据到本地
        </el-button>
      </div>
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
            width="55"
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
            width="270"
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
      >添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { defaultTableAdd, filterArrFn, filterHasPush } from '@/utils/tableListUtils'

export default {
  name: 'BatchItem',
  props: {
    showBatchItem: {
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
      showCopyData: false,
    }
  },
  inject: ['tableDataSpliceUpdate', 'getTableData', 'getSetting'],
  computed: {
    dialogVisible: {
      get() {
        return this.showBatchItem
      },
      set() {
        this.close()
      },
    },
  },
  watch: {
    // 初始化数据
    async dialogVisible(val) {
      if (val) {
        this.chooseList = []
        this.tableArr = this.getTableData()
        if (this.tableArr.length === 0) {
          this.showCopyData = true
        } else {
          this.showCopyData = false
        }
        const arr = filterArrFn(this.tableArr)
        this.showList = await defaultTableAdd(arr, this.getSetting())
      }
    },
  },
  methods: {
    copyDataFn() {
      this.$emit('close', 'showBatchItem', false)
      this.$nextTick(() => {
        this.$emit('showCopyDataFn')
      })
    },
    close() {
      this.$emit('close', 'showBatchItem', false)
    },
    // 选中
    handleSelectionChange(val) {
      this.chooseList = val
    },
    // 过滤选中的值
    async filterChooseFn(arr) {
      this.tableArr = this.getTableData()
      const filterArr = await filterHasPush(arr)
      return filterArr
    },
    async confirmFn() {
      if (this.chooseList.length === 0) this.$message.error('至少需要选中一个默认摸鱼网站')
      const arr = await this.filterChooseFn(this.chooseList)
      this.tableDataSpliceUpdate(this.tableArr.length, 0, ...arr)
      this.$message.success(`已添加${this.chooseList.length}个默认摸鱼网站`)
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
