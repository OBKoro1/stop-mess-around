<!--
 * Author       : OBKoro1
 * Date         : 2021-06-15 13:51:30
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-07-30 01:01:01
 * FilePath     : App.vue
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
      <span class="tip-info"
            v-html="info.tip"></span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="handleClose">{{ info.confirmBtn }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { utils } from '../utils/index'
import { defaultSetting } from '../utils/Default'
import NET from '../utils/net'

export default {
  data() {
    return {
      Setting: null,
      dialogVisible: false,
      item: null,
      index: 0,
      tableData: [],
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
      // 如果切换了 则可以展示弹窗
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
    getTip(item) {
      if (item.tip) {
        // 使用item的tip
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
.tip-info {
  font-size: 16px;
  line-height: 18px;
}
</style>
