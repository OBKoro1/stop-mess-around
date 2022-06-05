<!--
 * Author       : OBKoro1
 * Date         : 2021-06-15 13:51:30
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-06-05 14:40:43
 * FilePath     : /src/content/App.vue
 * Description  : content 插入到页面的数据
 * koroFileheader插件
-->
<template>
  <div class="stop-mess-around-content">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="info.title"
      class="dialog-class"
      :lock-scroll="true"
      :visible.sync="dialogVisible"
      width="60%"
      :show-close="false"
    >
      <div
        class="tip-info"
        v-html="info.tip"
      />
      <div
        slot="footer"
        class="dialog-footer"
      >
        <div>
          <el-button
            type="warning"
            @click="showRestFn"
          >
            休息一下
          </el-button>
          <el-button
            type="success"
            @click="changeTip"
          >
            更新提示
          </el-button>
          <el-button
            type="primary"
            @click="handleClose"
          >
            {{ info.confirmBtn }}
          </el-button>
        </div>
        <div v-if="showRest">
          <el-select
            v-model="restTime"
            class="select-margin"
            placeholder="请选择休息时间"
            @visible-change="visibleChangeSelect"
          >
            <el-option
              v-for="item in restTimeArr"
              :key="item.time"
              class="stop-mess-around-option"
              :label="item.label"
              :value="item.time"
            />
          </el-select>
          <el-button @click="showRestFn">
            取消
          </el-button>
          <el-button @click="restConfirm">
            确定
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- Github 仓库1s快速按钮 -->
    <LookCode1sVue />
    <!-- 右侧的摸鱼时长与摸鱼倒计时统计提醒 -->
    <MessAroundRightTipVue
      v-show="Setting.showRightTip !== 'close'"
      :dialog-tip-visible="dialogVisible"
      :statistics-info="statisticsInfo"
      @openAgain="openAgain"
      @getStatisticsMatch="getStatisticsMatch"
    />
  </div>
</template>

<script>
import { utils } from '@/utils/index'
import { defaultSetting, restTimeArr } from '@/utils/Default'
import NET from '@/utils/net'
import LookCode1sVue from './look-code-1s.vue'
import MessAroundRightTipVue from './mess-around-right-tip.vue'

export default {
  name: 'ContentApp',
  components: {
    LookCode1sVue,
    MessAroundRightTipVue,
  },
  data() {
    return {
      Setting: {},
      dialogVisible: false, // 展示提醒
      showRest: false, // 展示休息时间选项
      restTime: 5, // 休息时间默认值
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
      // 统计字段
      statisticsInfo: {
        statisticsTimeToday: {},
        totalMessAround: 0,
        totalSiteMessAround: 0,
      },
      interVal: null,
    }
  },
  async mounted() {
    await this.run()
    if (this.Setting.log) {
      console.log('stop-mess-around: 设置', this.Setting)
      console.log('stop-mess-around: 摸鱼网站列表', this.tableData)
      console.log('stop-mess-around(防摸鱼)插件 插入')
    }
    // 检测url变更
    this.interVal = setInterval(this.run, 6000)
  },
  methods: {
    async  getCurrentTab() {
      const queryOptions = { active: true, currentWindow: true }
      const res = await chrome.tabs.query(queryOptions)
      return res[0]
    },
    // 倒计时结束或者停止摸鱼再运行一遍
    openAgain() {
      this.run()
    },
    // 定时获取右侧摸鱼提醒数据
    async getStatisticsMatch(matchItem) {
      [this.statisticsInfo.statisticsTimeToday] = await utils.getChromeStorage(NET.statisticsTime)
      this.statisticsInfo.totalMessAround = this.statisticsInfo.statisticsTimeToday.time
      const find = this.statisticsInfo.statisticsTimeToday.restSite.find((ele) => ele.site === matchItem.site)
      if (!find) return // 没摸鱼
      this.statisticsInfo.totalSiteMessAround = find.time
    },
    // 检测链接
    async run() {
      try {
        this.Setting = (await utils.getChromeStorage(NET.GLOBALSETTING)) || defaultSetting
        const tableData = (await utils.getChromeStorage(NET.TABLELIST)) || []
        this.tableData = tableData
        const isMatch = utils.checkUrl(tableData, window.location.href)
        if (!isMatch) return
        await this.getStatisticsMatch(isMatch.item)
        // 不重复展示关闭提示 已经关闭 或者已经开启的 不再重复出现
        // 如果切换开关了 则可以展示弹窗
        if (this.item !== null && this.item.open === isMatch.item.open) return
        this.item = isMatch.item // 匹配到的选项
        this.index = isMatch.index // 匹配到的index
        this.matchHandle()
      } catch (err) {
        console.log('stop-mess-around(防摸鱼)扩展更新了,请刷新页面')
        clearInterval(this.interVal)
      }
    },

    /**
     * @description 获取随机提示信息
     * @param * typeName 数组名字
     * @return {*}
     */
    getRandomTip(typeName) {
      const len = this.Setting[typeName].length
      const count = Math.floor(Math.random() * len)
      return this.Setting[typeName][count]
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
        this.info.tip = this.getRandomTip('tipArr') || '刻意练习的四要素: 定义明确的目标，极度的专注，有效的反馈，在拉伸区练习。'
      }
      this.info.title = this.getRandomTip('titleArr') || '没有所谓的天才'
      this.info.confirmBtn = this.getRandomTip('confirmArr') || '科学的投入'
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
      const self = this // 传到class中 影响this指向
      chrome.runtime.sendMessage({ message: 'reset-tab', item: this.item, value: this.restTime }, (response) => {
        self.dialogVisible = false
        self.item = JSON.parse(response)
        self.showRest = false
        return true
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
          chrome.runtime.sendMessage({ message: 'close-tab' })
        }
      }, time * 1000)
    },
    // 解决z-index的问题
    // element select 出现 为其加特殊class名 防止影响用户页面
    visibleChangeSelect(val) {
      if (!val) return
      this.$nextTick(() => {
        const elSelectDropdown = document.querySelector('.stop-mess-around-option').parentElement.parentElement.parentElement.parentElement
        elSelectDropdown.className = `${elSelectDropdown.className} stop-mess-around-dropdown`
      })
    },
  },
}
</script>

<style>
/* select options 隐藏的问题 */
.stop-mess-around-dropdown {
  z-index: 2147483647 !important;
}

</style>

<style scoped>
/* 设为最大值 */
.dialog-class{
  z-index: 2147483647 !important;
}

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
