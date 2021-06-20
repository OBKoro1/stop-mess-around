<!--
 * Author       : OBKoro1
 * Date         : 2021-05-24 11:02:13
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-06-20 18:10:29
 * FilePath     : /stop-mess-around/src/options/App/table/Table.vue
 * Description  : 表格
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <div class="main-table" style="width:100%">
    <el-table :data="showList"
              empty-text="暂无数据,去摸鱼网站列表选择添加，或者手动新增常用的摸鱼网站吧~"
              stripe
              row-key="site"
              max-height="1000"
              style="width: 100vw">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="labelName"
                       width="80">
        <template slot="header">
          <span>{{'是否启用'}}</span>
        </template>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.open"
                     @change="(val)=>{
                        checkoutFn(val,scope.row, scope.$index)
                      }"
                     active-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="labelName"
                       width="200"
                       show-overflow-tooltip>
        <template slot="header">
          <span>{{'摸鱼网站名'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="site"
                       width="350"
                       show-overflow-tooltip>
        <template slot="header">
          <span>{{'摸鱼网址'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tip"
                       width="270"
                       column-key="tip"
                       show-overflow-tooltip>
        <template slot="header">
          <el-tooltip :content="'检测到摸鱼网址, 关闭网页时候显示的提示'"
                      placement="top">
            <span>{{'关闭网页提示'}}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ getTip(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time"
                       width="100"
                       show-overflow-tooltip>
        <template slot="header">
          <el-tooltip :content="'检测到摸鱼网址后，过几秒关闭网页'"
                      placement="top">
            <span>{{'停留几秒'}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="strict"
                       width="120">
        <template slot="header">
          <el-tooltip :content="'默认网址匹配为包含，只要包含这个网址则表示匹配到, 严格匹配网址必须一模一样，才能匹配到。'"
                      placement="top">
            <span>{{'网址严格相等'}}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.strict ? '开启' : '关闭'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jump"
                       width="100"
                       show-overflow-tooltip>
        <template slot="header">
          <el-tooltip :content="'网址匹配后，不关闭页面，跳转到其他页面'"
                      placement="top">
            <span>{{'跳转'}}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.jump ? '开启' : '关闭'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="290">
        <template slot="header">
          <span>{{'操作'}}</span>
        </template>
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="openEditor(scope.$index, scope.row)">{{'编辑'}}</el-button>
          <el-button size="mini"
                     :disabled="scope.$index === 0"
                     @click="move('top', scope.$index, scope.row)">{{'上移'}}</el-button>
          <el-button size="mini"
                     :disabled="scope.$index === tableData.length -1"
                     @click="move('bto', scope.$index, scope.row)">{{'下移'}}</el-button>

          <el-popconfirm title="确认删除？"
                         @confirm="handleDelete(scope.$index)">
            <el-button size="mini"
                       class="marginRL"
                       slot="reference"
                       type="danger">{{'删除'}}</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <EditorItem :showCreateItem="showEditorItem"
                :item="item"
                @closeEditor="closeEditor" />
  </div>
</template>

<script>

import EditorItem from './EditorItem.vue'

// 列表中tip的常量 防止列表随机tip不断变化
const randomIndexFont = {}

export default {
  name: 'main-table',
  props: {
    tableData: {
      type: Array,
      require: true,
      default: () => [],
    },
    Setting: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    search: String,
    tableDataSpliceUpdate: Function,
    updateArr: Function,
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
  components: {
    EditorItem,
  },
  methods: {
    // 获取随机tip或者本地tip
    getTip(row) {
      if (row.tip) {
        return row.tip
      } if (randomIndexFont[row.site]) {
        return randomIndexFont[row.site]
      }
      const len = this.Setting.tipArr.length
      const count = Math.floor(Math.random() * len)
      const res = `${this.Setting.tipArr[count]}-随机`
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
    checkoutFn(val, row, index) {
      row.open = val
      const obj = row
      this.tableDataSpliceUpdate(index, 1, obj)
    },
    move(type, index, row) {
      const arr = JSON.parse(JSON.stringify(this.tableData))
      let newIndex
      if (type === 'top') {
        newIndex = index - 1
      } else {
        newIndex = index + 1
      }
      arr.splice(index, 1) // 删除
      arr.splice(newIndex, 0, row) // 插入
      this.updateArr(arr)
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
</style>>
