<!--
 * Author       : OBKoro1
 * Date         : 2021-05-24 11:02:13
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-10-12 23:48:05
 * FilePath     : /src/options/App/table/Table.vue
 * Description  : 表格
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <div
    class="main-table"
    style="width:100%"
  >
    <el-table
      :data="showList"
      empty-text="暂无数据,去摸鱼网站列表选择添加，或者手动新增常用的摸鱼网站吧~"
      row-key="site"
    >
      <el-table-column type="index" />
      <el-table-column
        prop="labelName"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            :content="'网站名仅用于展示, 可重复'"
            placement="top"
          >
            <span>{{ '摸鱼网站名' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="site"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            :content="'匹配摸鱼网址展示摸鱼弹窗'"
            placement="top"
          >
            <span>{{ '摸鱼网址' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="labelName"
        width="120"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            :content="'摸鱼网址有三种状态: 新增/编辑/插件集成'"
            placement="top"
          >
            <span>{{ '摸鱼网址状态' }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ getSiteStatus(scope.row) }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="tip"
        width="270"
        column-key="tip"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            :content="'检测到摸鱼网址, 关闭网页时候显示的格言'"
            placement="top"
          >
            <span>{{ '加油格言' }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ getTip(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            :content="'检测到摸鱼网址后，过几秒关闭网页'"
            placement="top"
          >
            <span>{{ '是否强制关闭' }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ !!scope.row.time ? '否':'是' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="matchRule"
      >
        <template slot="header">
          <el-tooltip
            :content="'摸鱼网址匹配规则: 包含=> 包含,通常输入一个域名即可, 开头全等 => 前面的必须一模一样，严格相等=>一模一样'"
            placement="top"
          >
            <span>{{ '网址匹配规则' }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ getMatch(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="jump"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            :content="'关闭摸鱼网站则跳转到其他页面'"
            placement="top"
          >
            <span>{{ '是否跳转' }}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.jump ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
      >
        <template slot="header">
          <span>{{ '操作' }}</span>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openEditor(scope.$index, scope.row)"
          >
            {{ '编辑' }}
          </el-button>
          <el-popconfirm
            title="确认删除？"
            @confirm="handleDelete(scope.$index)"
          >
            <el-button
              slot="reference"
              size="mini"
              class="marginRL"
              type="danger"
            >
              {{ '删除' }}
            </el-button>
          </el-popconfirm>
          <el-tooltip
            :content="'是否启用该摸鱼网站, 匹配成功后展示摸鱼提示弹窗'"
            placement="top"
          >
            <el-switch
              v-model="scope.row.open"
              size="mini"
              active-color="rgb(255, 97, 84)"
              @change="(val)=>{
                checkoutFn(val,scope.row, scope.$index)
              }"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <EditorItem
      :show-create-item="showEditorItem"
      :item="item"
      @closeEditor="closeEditor"
    />
  </div>
</template>

<script>

import { utils } from '@/utils/index'
import { siteTypeFind } from '@/utils/tableListUtils'
import EditorItem from './EditorItem.vue'

// 列表中tip的常量 防止列表随机tip不断变化
const randomIndexFont = {}

export default {
  name: 'MainTable',
  components: {
    EditorItem,
  },
  props: {
    tableData: {
      type: Array,
      require: true,
      default: () => [],
    },
    setting: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    search: {
      type: String,
      default: '',
    },
    tableDataSpliceUpdate: {
      type: Function,
      default: () => {},
    },
    updateArr: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      // 变量
      showEditorItem: false,
      item: {
        index: 0,
        row: {},
      },
    }
  },
  computed: {
    showList() {
      console.log(this.tableData, '--this.tableData--')
      if (this.search === '') return this.tableData
      return this.tableData.filter((item) => {
        if (item.labelName.indexOf(this.search) !== -1) {
          return true
        } if (item.site.indexOf(this.search) !== -1) {
          return true
        }
        return false
      })
    },
  },
  mounted() {
    this.useGetUILanguage()
  },
  methods: {
    getMatch(row) {
      if (row.matchRule === 'start') {
        return '开头全等'
      } if (row.matchRule === 'includes') {
        return '包含'
      } if (row.matchRule === 'strict') {
        return '严格相等'
      }
      return ''
    },
    // 摸鱼网址状态
    getSiteStatus(item) {
      if (siteTypeFind(item, 'create')) return '新增'
      if (siteTypeFind(item, 'editor')) return '编辑'
      return '插件默认集成'
    },
    // 获取随机tip或者本地tip
    getTip(row) {
      if (row.tip) {
        return row.tip
      } if (randomIndexFont[row.site]) {
        return randomIndexFont[row.site]
      }
      const len = this.setting.tipArr.length
      const count = Math.floor(Math.random() * len)
      const res = this.setting.tipArr[count] || '刻意练习的四要素: 定义明确的目标，极度的专注，有效的反馈，在拉伸区练习。'
      randomIndexFont[row.site] = res
      return res
    },
    openEditor(index, row) {
      this.showEditorItem = true
      this.item = {
        index,
        row,
      }
    },
    closeEditor() {
      this.showEditorItem = false
    },
    // 切换启用
    async checkoutFn(val, row, index) {
      const options = {
        item: row,
        tableArr: this.tableData,
        setting: this.setting,
      }
      let newItem = null
      if (val) {
        // 打开检测
        const res = await utils.openCheck(options)
        newItem = res.item
      } else {
        const res = await utils.closeCheck(options)
        newItem = res.item
      }
      this.tableDataSpliceUpdate(index, 1, newItem)
    },
    handleDelete(index) {
      this.tableDataSpliceUpdate(index, 1)
    },
  },
}
</script>

<style scoped>
.main-table {
  margin: 20px 0;
}
</style>
