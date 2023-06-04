<!--
 * Author       : OBKoro1
 * Date         : 2021-06-15 13:51:30
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-11-21 00:28:21
 * FilePath     : /src/content/App.vue
 * Description  : content 插入到页面的数据
 * koroFileheader插件
-->
<template>
  <div class="stop-mess-around-content">
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="info.title"
      class="stop-mess-around-content_dialog-class"
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
        <div class="footer_tip">
          阅读励志语录，想想自己的梦想和想要的生活。
        </div>
        <div
          v-if="closeInterVal"
          class="footer_tip"
        >
          如果未点击休息一下，将在倒计时后关闭页面: {{ durationFont }}
        </div>
        <div>
          <el-button
            type="success"
            @click="handleClose"
          >
            {{ info.confirmBtn }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="changeTip"
          >
            更新励志语录
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="showRestFn"
          >
            休息一下
          </el-button>
        </div>
        <div v-if="showRest">
          <el-select
            v-model="restTime"
            class="select-margin"
            popper-class="stop-mess-around-dropdown"
            placeholder="请选择休息时间"
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
      @getStatisticsMatch="getStatisticsMatch"
    />
  </div>
</template>

<script>
import { utils } from '@/utils/index'
import { useDefalutList } from '@/utils/Default'
import NET from '@/utils/net'
import dayjs from 'dayjs'
import LookCode1sVue from './look-code-1s.vue'
import MessAroundRightTipVue from './mess-around-right-tip.vue'

const { restTimeArr } = useDefalutList()

dayjs.extend(require('dayjs/plugin/duration'))

const addZero = (num) => (num < 10 ? `0${num}` : num)

// 输出倒计时
function getCountDown(hours, minutes, seconds) {
  if (hours) {
    return `${hours}:${addZero(minutes)}:${addZero(seconds)}`
  }
  return `${addZero(minutes)}:${addZero(seconds)}`
}

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
      statisticsTime: [],
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
      closeSetTimeout: null, // 关闭页面的倒计时
      closeInterVal: null,
      durationFont: '',
    }
  },
  created() {
    document.addEventListener('DOMContentLoaded', () => {
      chrome.tabs.executeScript({ file: 'fonts/element-icons.tff' })
    })
  },
  async mounted() {
    await this.run()
    if (this.Setting.log || this.Setting.develop) {
      console.log('stop-mess-around: 设置', this.Setting)
      console.log('stop-mess-around: 摸鱼网站列表', this.tableData)
      console.log('stop-mess-around(防摸鱼)插件 插入')
    }
    // 检测url变更
    this.interVal = setInterval(this.run, 2000)
  },
  beforeDestroy() {
    if (this.closeSetTimeout) {
      clearTimeout(this.closeSetTimeout)
      this.closeSetTimeout = null
    }
    clearInterval(this.interVal)
    this.interVal = null
    this.clearPageInterval()
  },
  methods: {
    clearPageInterval() {
      this.durationFont = ''
      clearInterval(this.closeInterVal)
      this.closeInterVal = null
    },
    runCloseInterval() {
      let closePageTime = 30
      if (this.Setting.matchClosePage !== undefined) {
        closePageTime = this.Setting.matchClosePage
      }
      if (this.closeInterVal || closePageTime === 0) {
        return
      }
      const openTime = Date.now() + closePageTime * 1000 // 倒计时时间
      this.closeInterVal = setInterval(() => {
        const duration = dayjs.duration(dayjs(openTime) - dayjs())
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()
        this.durationFont = getCountDown(hours, minutes, seconds)
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
          this.clearPageInterval()
          this.closePage()
        }
      }, 1000)
    },
    async getCurrentTab() {
      const queryOptions = { active: true, currentWindow: true }
      const res = await chrome.tabs.query(queryOptions)
      return res[0]
    },
    // 倒计时结束或者停止摸鱼再运行一遍
    // openAgain() {
    //   this.run()
    // },
    // 定时获取右侧摸鱼提醒数据
    async getStatisticsMatch(matchItem) {
      ({ statisticsTime: this.statisticsTime } = await utils.getData());
      [this.statisticsInfo.statisticsTimeToday = {}] = this.statisticsTime
      this.statisticsInfo.totalMessAround = this.statisticsInfo.statisticsTimeToday.time
      const find = this.statisticsInfo.statisticsTimeToday.restSite.find((ele) => ele.site === matchItem.site)
      if (!find) return // 没摸鱼
      this.statisticsInfo.totalSiteMessAround = find.time
    },
    // 检测链接
    async run() {
      try {
        ({ setting: this.Setting, statisticsTime: this.statisticsTime, listArr: this.tableData } = await utils.getData())
        this.Setting = (await utils.getChromeStorage(NET.GLOBALSETTING))
        const isMatch = utils.checkUrl(this.tableData, window.location, window.location.href)
        if (this.Setting.log || this.Setting.develop) {
          console.log('isMatch', isMatch, window.location.href)
        }
        if (!isMatch) return
        await this.getStatisticsMatch(isMatch.item)
        // 不重复展示关闭提示 已经关闭 或者已经开启的 不再重复出现
        // 如果切换开关了 则可以展示弹窗
        if (this.item !== null && this.item.open === isMatch.item.open) return
        this.item = isMatch.item // 匹配到的选项
        this.index = isMatch.index // 匹配到的index
        this.matchHandle()
        // 允许摸鱼不需要退出
        if (!this.item.open) return
        this.runCloseInterval()
      } catch (err) {
        console.log('stop-mess-around(防摸鱼)扩展更新了,请刷新页面')
        clearInterval(this.interVal)
        this.clearPageInterval()
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
      this.info.confirmBtn = this.getRandomTip('confirmArr') || '关闭页面'
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
        self.clearPageInterval()
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
      this.closePage()
    },
    // 关闭页面
    closePage() {
      chrome.runtime.sendMessage({ message: 'close-tab' })
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
.stop-mess-around-content_dialog-class {
  z-index: 2147483600 !important;
}
.stop-mess-around-dropdown {
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
