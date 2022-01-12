<!--
 * Author       : OBKoro1
 * Date         : 2021-12-30 15:28:46
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-12 13:35:42
 * FilePath     : /stop-mess-around/src/content/mess-around-right-tip.vue
 * description  : 摸鱼网站右侧摸鱼时长统计与摸鱼倒计时提醒
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
-->
<template>
  <div>
    <div
      v-if="showStatistics"
      class="mess-around-right-tip"
    >
      <div>休息倒计时: {{ durationFont }}</div>
      <div>本站摸鱼时间: {{ statisticsInfo.totalSiteMessAround }}分钟 </div>
      <div>今日总摸鱼时间: {{ statisticsInfo.totalMessAround }}分钟</div>
      <div>
        <el-link
          class="link-right"
          type="primary"
          @click="showCompleteStatistics = true"
        >
          打开统计
        </el-link>
        <el-link
          type="primary"
          @click="stopRest"
        >
          停止摸鱼
        </el-link>
      </div>
    </div>
    <!-- 近百日摸鱼统计完整数据 -->
    <RestStatistics
      :show-statistics="showCompleteStatistics"
      @close="closeRestStatistics"
    />
  </div>
</template>

<script>
import NET from '@/utils/net'
import { utils } from '@/utils/index'
import dayjs from 'dayjs'
import RestStatistics from '@/components/rest-statistics.vue'

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
  name: 'MessAroundRightTip',
  components: {
    RestStatistics,
  },
  props: {
    dialogTipVisible: {
      type: Boolean,
      require: true,
      default: true,
    },
    // 定时更新 统计数据
    statisticsInfo: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      showStatistics: false, // 展示右侧
      showCompleteStatistics: false, // 展示完整的统计
      durationFontInterval: null, // 倒计时的定时器
      durationFont: '', // 倒计时
      matchItem: null, // 匹配到的网址
      setting: {},
    }
  },
  watch: {
    dialogTipVisible: {
      handler() {
        this.getStatisticsTime()
      },
      immediate: true,

    },
  },

  beforeDestroy() {
    this.clearInterval()
  },
  methods: {
    // 倒计时时间到了
    clearInterval() {
      this.showStatistics = false
      this.showCompleteStatistics = false
      this.durationFont = ''
      clearInterval(this.durationFontInterval)
    },
    closeRestStatistics() {
      this.showCompleteStatistics = false
    },
    // 通知倒计时已经到了 马上运行一次
    noticeDialogTip() {
      this.$emit('openAgain')
    },
    // 倒计时
    async duration() {
      if (this.durationFontInterval) {
        this.clearInterval()
      }
      const { openTime } = utils.getItemCloseCheckTime(this.matchItem, this.setting)
      this.durationFontInterval = setInterval(() => {
        const duration = dayjs.duration(dayjs(openTime) - dayjs())
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()
        this.durationFont = getCountDown(hours, minutes, seconds)
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
          this.clearInterval()
          this.noticeDialogTip()
        }
      }, 1000)
      this.showStatistics = true
    },
    // 获取倒计时等数据
    async getStatisticsTime() {
      if (this.dialogTipVisible) {
        // 其他地方开启了 导致定时器未关闭
        this.clearInterval()
        return
      }
      const tableData = (await utils.getChromeStorage(NET.TABLELIST)) || []
      const isMatch = utils.checkUrl(tableData, window.location.href)
      if (!isMatch) return

      // 匹配到了 必须要处于关闭状态
      if (!isMatch.item.open) {
        // 更新摸鱼时长
        this.setting = await utils.getChromeStorage(NET.GLOBALSETTING)
        this.$emit('getStatisticsMatch', isMatch.item)
        this.matchItem = isMatch.item
        // 倒计时
        this.duration()
      }
    },
    // 停止休息
    async stopRest() {
      this.setting = await utils.getChromeStorage(NET.GLOBALSETTING)
      this.statisticsTime = (await utils.getChromeStorage(NET.statisticsTime))
      this.listArr = (await utils.getChromeStorage(NET.TABLELIST))
      const options = {
        setting: this.setting,
        tableArr: this.listArr,
        statisticsTime: this.statisticsTime,
        item: this.matchItem,
      }
      const { tableArr, item } = await utils.openCheck(options)
      const index = tableArr.findIndex((ele) => ele.site === item.site)
      tableArr.splice(index, 1, item)
      await utils.updateStorageData(tableArr, NET.TABLELIST)
      this.clearInterval()
      this.noticeDialogTip()
    },
  },
}

</script>

<style scoped>
.mess-around-right-tip{
    background: #ffd966;
    border-radius: 5px 0 0 5px;
    padding: 8px 4px;
    position: fixed;
    right: 0;
    top: 65%;
    font-size: 14px;
}
.mess-around-right-tip:hover {
  z-index: 2147483647;
}
.link-right{
    margin-right: 6px;
}
</style>
