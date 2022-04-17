<!--
 * Author       : OBKoro1
 * Date         : 2021-05-28 16:02:26
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-17 17:22:20
 * FilePath     : /stop-mess-around/src/options/App/settingPage/BatchItem.vue
 * Description  : 摸鱼列表 批量添加
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
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
import { defaultList, itemProto } from '../../../utils/Default'

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
    dialogVisible(val) {
      if (val) {
        this.chooseList = []
        this.tableArr = this.getTableData()
        console.log('this', this.tableArr)
        if (this.tableArr.length === 0) {
          this.showCopyData = true
        } else {
          this.showCopyData = false
        }
        const arr = this.filterArrFn(this.tableArr)
        this.showList = this.mapSetting(arr)
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
    // 摸鱼网站使用全局设置 + 随机排序
    mapSetting(arr) {
      const setting = this.getSetting()
      const newArr = arr.map((item) => {
        itemProto.forEach((ele) => {
          item[ele] = item[ele] || setting[ele]
        })
        return item
      })
      newArr.sort(() => Math.random() - 0.5)
      return newArr
    },
    // 过滤列表中未添加的摸鱼网站 展示在表中
    filterArrFn(arr) {
      return defaultList.filter((item) => {
        const find = arr.find((ele) => item.site === ele.site)
        return find === undefined
      })
    },
    // 选中
    handleSelectionChange(val) {
      this.chooseList = val
    },
    // 过滤选中的值
    filterChooseFn(arr) {
      this.tableArr = this.getTableData()
      return arr.filter((item) => {
        const find = this.tableArr.find((ele) => item.site === ele.site)
        return find === undefined
      })
    },
    confirmFn() {
      const arr = this.filterChooseFn(this.chooseList)
      this.tableDataSpliceUpdate(this.tableArr.length, 0, ...arr)
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
