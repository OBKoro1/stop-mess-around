<!--
 * Author       : OBKoro1
 * Date         : 2021-06-15 15:14:20
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-06-18 17:14:01
 * FilePath     : /stop-mess-around/src/options/App/settingPage/RandomTip.vue
 * Description  : 内卷随机提示增删改查
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
-->

<template>
  <el-dialog :visible.sync="dialogVisible"
             :before-close="closeBefore"
             title="关闭页面时出现的随机语录"
             width="550px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="随机内容"
                   name="tipArr">
        <div class="random-content">
          <el-table :show-header="false"
                    :data="tipArr"
                    style="width: 100%">
            <el-table-column type="index"
                             width="50">
            </el-table-column>
            <el-table-column label="内容提示"
                             show-overflow-tooltip
                             width="300">
              <template slot-scope="scope">
                <p>{{ scope.row }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="showEdit(scope.$index, scope.row)">编辑</el-button>
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
        </div>

      </el-tab-pane>
      <el-tab-pane label="随机标题"
                   name="titleArr">
        <el-table class="random-content"
                  :show-header="false"
                  :data="titleArr"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50">
          </el-table-column>
          <el-table-column label="标题"
                           show-overflow-tooltip
                           width="300">
            <template slot-scope="scope">
              <p>{{ scope.row }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showEdit(scope.$index, scope.row)">编辑</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="随机按钮"
                   name="confirmArr">
        <el-table class="random-content"
                  :show-header="false"
                  :data="confirmArr"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50">
          </el-table-column>
          <el-table-column label="按钮"
                           show-overflow-tooltip
                           width="300">
            <template slot-scope="scope">
              <p>{{ scope.row }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showEdit(scope.$index, scope.row)">编辑</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="添加"
                   name="add">
        <el-radio-group v-model="radio">
          <el-radio label="tipArr">添加内容</el-radio>
          <el-radio label="titleArr">添加标题</el-radio>
          <el-radio label="confirmArr">添加按钮</el-radio>
        </el-radio-group>
        <el-input class="add-margin"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="textarea">
        </el-input>
        <el-button type="primary"
                   @click="saveAddFn">保存添加</el-button>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
    </span>
    <el-dialog width="30%"
               title="编辑"
               :visible.sync="inner.innerVisible"
               append-to-body>
      <el-input class="add-margin"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="inner.textarea">
      </el-input>
      <el-button type="primary"
                 @click="saveEdit">保存编辑</el-button>
    </el-dialog>
  </el-dialog>
</template>

<script>

export default {
  props: {
    showTip: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  inject: ['getSetting', 'settingUpdate'],
  data() {
    return {
      setting: {},
      inner: {
        textarea: '',
        index: 0,
        innerVisible: false,
      },
      radio: 'tipArr',
      textarea: '',
      activeName: 'tipArr',
      titleArr: [],
      tipArr: [],
      confirmArr: [],
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showTip
      },
      set() {
        this.close()
      },
    },
  },
  watch: {
    // 初始化数据
    showTip(val) {
      if (val) {
        this.syncData()
      }
    },
  },
  methods: {
    syncData() {
      this.setting = this.getSetting()
      this.setSort('titleArr')
      this.setSort('tipArr')
      this.setSort('confirmArr')
    },
    // 获取数据并随机
    setSort(name) {
      this[name] = JSON.parse(JSON.stringify(this.setting[name]))
      this[name].sort(() => Math.random() - 0.5)
    },
    find(arr, row) {
      return arr.find((item) => item === row)
    },
    // 检测合法
    checkContent(arr, content) {
      if (content === '') {
        this.$message.error('内容不能为空')
        return false
      }
      const ele = this.find(arr, this.inner.textarea)
      if (ele !== undefined) {
        this.$message.error('内容重复，请重新输入')
        return false
      }
      return true
    },
    // 保存添加
    saveAddFn() {
      const arr = this[this.radio]
      if (!this.checkContent(arr, this.textarea)) return
      arr.unshift(this.textarea)
      this.$message.success('添加成功')
      this.textarea = ''
      this.updateSettingArr(arr, this.radio)
    },
    // 保存编辑
    saveEdit() {
      const arr = this[this.activeName]
      if (!this.checkContent(arr, this.inner.textarea)) return
      arr.splice(this.inner.index, 1, this.inner.textarea)
      this.$message.success('编辑成功')
      this.inner.innerVisible = false
      this.updateSettingArr(arr, this.activeName)
    },
    // 更新设置中的数组
    updateSettingArr(arr, type) {
      this.setting[type] = JSON.parse(JSON.stringify(arr))
      this.settingUpdate(this.setting)
    },
    // 删除
    handleDelete(index) {
      const arr = this[this.activeName]
      arr.splice(index, 1)
      this.$message.success('删除成功')
      this.updateSettingArr(arr, this.activeName)
    },
    showEdit(index, row) {
      this.inner.textarea = row
      this.inner.index = index
      this.inner.innerVisible = true
    },
    closeBefore(done) {
      this.textarea = ''
      this.radio = 'tipArr'
      this.activeName = 'tipArr'
      done()
    },
    close() {
      this.$emit('close', 'showTip', false)
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
.add-margin {
  margin: 15px 0;
}
.random-content-font {
  font-size: 14px;
  padding: 12px 0;
}
</style>
