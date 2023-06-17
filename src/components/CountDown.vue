<template>
  <div class="count-down-body">
    <div class="count-header">
      <div
        data-automation="focus-mode-cycle-bar"
        class="count-header-p1"
      >
        <!-- <div class="bar-body">
                    <template v-for="(item,index) in barLinesDta">
                        <div data-automation="cycles-bar-line" class="bar-bg" :key="index">
                            <div :width="item.width" :class="{[!!item.width?'VtDUj':'igmCBd']:true}"></div>
                        </div>
                    </template>
                </div> -->
        <!-- <div data-automation="focus-runner-cyclesTitle" class="count-header-p2">
                    <font style="vertical-align: inherit">
                        {{fontDta.cycleTotal}}个周期中的第{{fontDta.cycle}}个
                    </font>
                    <font style="vertical-align: inherit">| </font>
                    <font style="vertical-align: inherit">专注{{fontDta.actionTime}}分钟</font>
                </div> -->
      </div>
      <div class="count-body">
        <div
          width="280"
          height="280"
          class="gyojmD"
        >
          <div
            width="248"
            class="ifudhZ"
          >
            <div>
              <div class="bgKUny">
                <font style="vertical-align: inherit">
                  {{ time.hour }}
                </font>
                <font style="vertical-align: inherit">
                  :
                </font>
                <font style="vertical-align: inherit">
                  {{ time.minute }}
                </font>
                <font style="vertical-align: inherit">
                  :
                </font>
                <font style="vertical-align: inherit">
                  {{ time.second }}
                </font>
              </div>
              <div class="gDiEBo">
                <font style="vertical-align: inherit">
                  小时
                </font>
                <font style="vertical-align: inherit">
                  分钟
                </font>
                <font style="vertical-align: inherit">
                  秒
                </font>
              </div>
            </div>
          </div>
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
          >
            <circle
              cx="140"
              cy="140"
              r="132"
              stroke-width="16px"
              class="fKxZEe"
            />
            <circle
              cx="140"
              cy="140"
              r="132"
              stroke-width="16px"
              transform="rotate(-90 140 140)"
              class="bdHWBS"
              :style="{
                'stroke-dasharray': '840 840',
                'stroke-dashoffset': dashoffset
              }"
            />
          </svg>
        </div>
        <div
          data-automation="circle-bar-text"
          class="kaslpq"
        >
          <font style="vertical-align: inherit">
            阻止列表中没有网站被阻止
          </font>
        </div>
      </div>
    </div>
    <div class="count-footer">
      <el-button @click="onReset">
        重置
      </el-button>
      <el-button
        type="primary"
        @click="onPause"
      >
        {{ !pauseFlag ? '暂停':'恢复' }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: {
        hour: '0',
        minute: '2',
        second: '0',
      },
      barLinesDta: [
        {
          width: 0.8888888888888888,
        },
        {
          width: 0,
        },
      ],
      fontDta: {
        cycleTotal: 2,
        cycle: 1,
        actionTime: 25,
      },
      dashoffset: 840,
      ss: 1,
      step: 0,
      countdown: null,
      pauseFlag: false,
    }
  },
  computed: {
    totalSecord() {
      const endtime = '00:02:00'
      const list = endtime.split(':')
      const ts = (parseInt(list[0]) * 3600) + (parseInt(list[1]) * 60) + (parseInt(list[2])) // 将倒计总时长转换为秒
      return ts
    },
  },
  methods: {
    onReset() {

    },
    onOpen() {
      if (this.countdown !== null) {
	        clearInterval(this.countdown) // 关闭定时器
      }
      const endtime = '00:02:00'
      const list = endtime.split(':')
      this.handlerCount(list[0], list[1], list[2])
    },
    handlerCount(h, m, s) {
      this.countdown = setInterval(() => {
        if (this.ss <= 0) {
          clearInterval(this.countdown) // 关闭定时器
          this.countdown = null
          return
        }
        this.showTimeDown(parseInt(h), parseInt(m), parseInt(s))
      }, 1000)
    },
    onPause() {
      this.pauseFlag = !this.pauseFlag
      if (this.pauseFlag) {
        clearInterval(this.countdown) // 关闭定时器
        return
      }
      this.onOpen()
    },
    showTimeDown(h, m, s) {
      const ts = (h * 3600) + (m * 60) + (s) // 将倒计总时长转换为秒
      this.step++ // 每调用一次i就会+1
      this.ss = (ts - this.step) // 剩余时间=(总秒数-i)
      const day = Math.floor(this.ss / (3600 * 24))
      const hour = Math.floor((this.ss / 3600) - (day * 24))
      const minute = Math.floor((this.ss - ((day * 24 * 3600) + (this.time.hour * 3600))) / 60)
      const second = Math.floor(this.ss - ((day * 24 * 3600) + (this.time.hour * 3600) + (this.time.minute * 60)))
      this.time.hour = hour > 9 ? hour : `0${hour}`
      this.time.minute = minute > 9 ? minute : `0${minute}`
      this.time.second = second > 9 ? second : `0${second}`
      this.changeDashoffset()
    },
    changeDashoffset() {
      this.dashoffset = (840 * this.ss) / this.totalSecord
    },
  },
}
</script>

<style scoped>
.count-down-body {
    max-width: 336px;
    margin: auto;
}
.count-header {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.count-header-p1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding-top: 12px;
}
.bar-body {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    max-width: 336px;
}
.bar-bg {
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: rgb(242, 242, 242);
    min-width: 4px;
    margin-right: 2px;
}
.VtDUj {
    width: 0.888889%;
    height: 4px;
    background-color:#409EFF;
    transition: stroke-dashoffset 7.5s linear 0s;
}
.igmCBd {
    width: 0%;
    height: 4px;
    background-color:#409EFF;
    transition: stroke-dashoffset 7.5s linear 0s;
}
.count-header-p2 {
    height: 24px;
    margin: 16px 0px 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.71;
    color: rgb(38, 38, 38);
    text-align: center;
    position: relative;
}
.count-body {
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
}
.gyojmD {
    position: relative;
    box-shadow: rgba(96, 97, 112, 0.16) 0px 8px 16px 0px, rgba(40, 41, 61, 0.04) 0px 2px 4px 0px;
    border-radius: 50%;
    padding: 8px;
    width: 280px;
    height: 280px;
}
.ifudhZ {
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 248px;
}
.bgKUny {
    font-weight: 500;
    line-height: 1.13;
    text-align: center;
    color: rgb(38, 38, 38);
    display: flex;
    flex-direction: row;
    font-size: 48px;
}
.gDiEBo {
    font-size: 14px;
    line-height: 2;
    text-align: center;
    color: rgb(166, 166, 166);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
}

.fKxZEe {
    fill: none;
    stroke: rgb(242, 242, 242);
    stroke-width: 16;
}
.kaslpq {
    margin: 12px;
    font-size: 14px;
    line-height: 1.71;
    text-align: center;
    color: rgb(166, 166, 166);
}
.count-footer {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    column-gap: 12px;
}
.bdHWBS {
    fill: none;
    stroke:#409EFF;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke-dashoffset 1000ms linear 0s;
    stroke-width: 16;
}
</style>
