<!--
 * Author       : OBKoro1
 * Date         : 2021-06-15 13:51:30
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-11-01 15:25:08
 * FilePath     : /stop-mess-around/src/content/App.vue
 * Description  : content 插入到页面的数据
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
-->
<template>
  <div class="content-div">
    <el-dialog :title="info.title"
               :lock-scroll="true"
               :visible.sync="dialogVisible"
               width="30%"
               :show-close="false"
               :close-on-click-modal="false">
      <div class="tip-info"
           v-html="info.tip"></div>
      <div slot="footer"
           class="dialog-footer">
        <div>
          <el-button type="warning"
                     @click="showRestFn">休息一下</el-button>
          <el-button type="success"
                     @click="changeTip">更新提示</el-button>
          <el-button type="primary"
                     @click="handleClose">{{ info.confirmBtn }}</el-button>
        </div>
        <div v-if="showRest">
          <el-select v-model="restTime"
                     class="select-margin"
                     placeholder="请选择休息时间">
            <el-option v-for="item in restTimeArr"
                       :key="item.time"
                       :label="item.label"
                       :value="item.time">
            </el-option>
          </el-select>
          <el-button @click="showRestFn">取消</el-button>
          <el-button @click="restConfirm">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { utils } from '../utils/index'
import { defaultSetting, restTimeArr } from '../utils/Default'
import NET from '../utils/net'

export default {
  data() {
    return {
      Setting: null,
      dialogVisible: false, // 展示提醒
      showRest: false, // 展示休息时间选项
      restTime: 15, // 休息时间默认值
      restTimeArr, // 休息时间默认数组
      item: null,
      index: 0,
      tableData: [],
      // 提醒的字段
      info: {
        title: '',
        tip: '',
        confirmBtn: '',
      },
    }
  },
  async mounted() {
    await this.run()
    if (this.Setting.log) {
      console.log('stop-mess-around: Setting', this.Setting)
      console.log('stop-mess-around: list', this.tableData)
      console.log('stop-mess-around 插入')
    }
    // 检测url变更
    setInterval(this.run, 6000)
  },
  methods: {
    // 检测链接
    async run() {
      this.Setting = (await utils.getChromeStorage(NET.GLOBALSETTING)) || defaultSetting
      const tableData = (await utils.getChromeStorage(NET.TABLELIST)) || []
      this.tableData = tableData
      const isMatch = utils.checkUrl(tableData, window.location.href)
      if (!isMatch) return
      // 不重复展示关闭提示 已经关闭 或者已经开启的 不再重复出现
      // 如果切换开关了 则可以展示弹窗
      if (this.item !== null && this.item.open === isMatch.item.open) return
      this.item = isMatch.item // 匹配到的选项
      this.index = isMatch.index // 匹配到的index
      this.matchHandle()
    },

    /**
     * @description 获取随机提示信息
     * @param * typeName 数组名字
     * @return {*}
     */
    getRandomTip(typeName) {
      const len = this.Setting[typeName].length
      const count = Math.floor(Math.random() * len)
      return `${this.Setting[typeName][count]}`
    },

    /**
     * @description 获取提示信息
     * @param * item
     */
    getTip(item, change = false) {
      if (item.tip && !change) {
        // 使用item的tip 如果点击更新提示 则使用默认提示
        this.info.tip = item.tip
      } else {
        this.info.tip = this.getRandomTip('tipArr')
      }
      this.info.title = this.getRandomTip('titleArr')
      this.info.confirmBtn = this.getRandomTip('confirmArr')
    },

    /**
     * @description 匹配后显示提示消息以及关闭页面
     * @param * item 匹配到的对象
     * @return {*}
     */
    matchHandle() {
      if (!this.item.open) {
        // 如果已经开启了弹窗，则关闭
        if (this.dialogVisible) this.dialogVisible = false
        this.$message(`${this.item.labelName}-摸鱼网站已关闭`)
        return
      }
      this.getTip(this.item)
      this.dialogVisible = true
    },
    // 休息一下
    showRestFn() {
      this.showRest = !this.showRest
    },
    // 确定休息
    restConfirm() {
      chrome.extension.sendRequest({ message: 'reset-tab', item: this.item, value: this.restTime }, (response) => {
        this.dialogVisible = false
        this.item = JSON.parse(response)
        this.showRest = false
      })
    },
    // 更新提示
    changeTip() {
      this.getTip(this.item, true)
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false // 先关闭弹窗
      // 使用全局的停留时间 或者单个的停留时间
      const time = typeof this.item.time !== 'number' ? this.Setting.time : this.item.time
      setTimeout(() => {
        if (this.item.jump) {
          // 跳转
          window.location.href = this.item.jumpUrl
        } else {
          // 关闭
          chrome.extension.sendRequest({ message: 'close-tab' })
        }
      }, time * 1000)
    },
  },
}
</script>

<style scoped>
.select-margin {
  margin-top: 20px;
  width: 150px;
  margin-right: 20px;
}
.tip-info {
  white-space: pre-line;
  font-size: 20px;
  line-height: 35px;
  max-height: 500px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
