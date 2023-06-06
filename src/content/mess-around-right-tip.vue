<!--
 * Author       : OBKoro1
 * Date         : 2021-12-30 15:28:46
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-10-20 22:59:24
 * FilePath     : /src/content/mess-around-right-tip.vue
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
      <!-- 关闭右侧展示 -->
      <template v-if="setting.showRightTip !== 'closeRestTimeStatistics'">
        <div>本站休息时间: {{ statisticsInfo.totalSiteMessAround }}分钟 </div>
        <div>今日总休息时间: {{ statisticsInfo.totalMessAround }}分钟</div>
      </template>
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
          停止休息
        </el-link>
      </div>
    </div>
    <!-- 近百日摸鱼统计完整数据 -->
    <RestStatistics
      v-if="showCompleteStatistics"
      :show-statistics="showCompleteStatistics"
      @close="closeRestStatistics"
    />
  </div>
</template>

<script>
import NET from '@/utils/net'
import { utils } from '@/utils/index'
import dayjs from 'dayjs'
import RestStatistics from '@/components/RestStatistics.vue'

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
      matchItem: {}, // 匹配到的网址
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
    this.clearRestInterval()
  },
  methods: {
    async openMatchItem() {
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
    },
    // 倒计时时间到了
    async clearRestInterval() {
      this.showStatistics = false
      this.showCompleteStatistics = false
      this.durationFont = ''
      clearInterval(this.durationFontInterval)
      this.durationFontInterval = null
      // 现在暂时关闭页面 TODO:二次确认
      await this.openMatchItem()
    },
    closeRestStatistics() {
      this.showCompleteStatistics = false
    },
    // 通知倒计时已经到了 马上运行一次
    // noticeDialogTip() {
    //   this.$emit('openAgain')
    // },
    // 倒计时
    async duration() {
      try {
        if (this.durationFontInterval) {
          this.clearRestInterval()
        }
        const { openTime } = utils.getItemCloseCheckTime(this.matchItem, this.setting)
        this.durationFontInterval = setInterval(async () => {
          const duration = dayjs.duration(dayjs(openTime) - dayjs())
          const hours = duration.hours()
          const minutes = duration.minutes()
          const seconds = duration.seconds()
          this.setting = await utils.getChromeStorage(NET.GLOBALSETTING)
          this.durationFont = getCountDown(hours, minutes, seconds)
          if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            this.clearRestInterval()
          }
        }, 1000)
        this.showStatistics = true
      } catch {
        clearInterval(this.durationFontInterval)
      }
    },
    // 获取倒计时等数据
    async getStatisticsTime() {
      if (this.dialogTipVisible) {
        // 其他地方开启了 导致定时器未关闭
        this.clearRestInterval()
        return
      }
      const tableData = (await utils.getChromeStorage(NET.TABLELIST)) || []
      const isMatch = utils.checkUrl(tableData, window.location, window.location.href)
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
      await this.clearRestInterval()
    },
  },
}

</script>

<style scoped>
.mess-around-right-tip{
    background: #ffd966;
    border-radius: 5px 0 0 5px;
    padding: 12px 16px;
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
