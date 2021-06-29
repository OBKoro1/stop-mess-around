<template>
  <div class="box-card">
    <div @click="checkoutOpen" >
      <div>
        <i  :class="macthIcon" ></i>
      </div>
      <span>{{ matchFont }}</span>
    </div>
    <div @click="checkoutAll">
      <div>
        <i :class="allOpen"></i>
      </div>
      <span>{{ open ? '一键关闭摸鱼检测': '一键开启摸鱼检测'  }}</span>
    </div>

    <div @click="jumpOptions">
      <div>
        <i class="el-icon-setting"></i>
      </div>
      <span>管理面板</span>
    </div>

    <div @click="sponsorshipShow">
      <div>
        <i class="el-icon-present"
           style="color: #e13d14"></i>
      </div>
      <span>欢迎赞助</span>
    </div>

    <div @click="utils.jumpUrl(NET.DOCS)">
      <div>
        <i class="el-icon-document"
           style="color: #fff"></i>
      </div>
      <span>使用文档</span>
    </div>

    <div @click="utils.jumpUrl(NET.GITHUBREPO)">
      <div>
        <i class="el-icon-star-off"
           style="color: #fff"></i>
      </div>
      <span>点个Star吧</span>
    </div>
    <div @click="utils.jumpUrl(NET.RELEASES)">
      <div>
        <i class="el-icon-tickets"
           style="color: #fff"></i>
      </div>
      <span>更新日志</span>
    </div>
  </div>
</template>

<script>
import { defaultSetting } from '../../utils/Default'

export default {
  name: 'popup',
  data() {
    return {
      Setting: {},
      tableData: [],
      tab: {}, // 当前页面
      item: null, // 匹配
      index: 0,
    }
  },
  computed: {
    open() {
      return this.Setting.closeTime === 0
    },
    macthIcon() {
      if (this.item) {
        if (this.item.open) {
          // 开启状态
          return 'el-icon-open color-green'
        }
        // 关闭状态
        return 'el-icon-turn-off color-gray'
      }
      return 'el-icon-folder-add '
    },
    // 是否开启
    allOpen() {
      const close = this.Setting.closeTime
      if (close === 0) {
        // 开启状态
        return 'el-icon-open color-green'
      }
      // 关闭状态
      return 'el-icon-turn-off color-gray'
    },
    // 匹配网址
    matchFont() {
      return this.item ? this.item.labelName : '添加网址到列表中'
    },
  },
  async created() {
    await this.initData()
  },
  methods: {
    // 切换启用
    checkoutOpen() {
      if (!this.item) {
        // 添加摸鱼网站
        this.Setting.addSite = this.tab.url
        this.settingUpdate(this.Setting)
        this.jumpOptions()
        return
      }
      const value = !this.item.open
      if (value) {
        this.item.closeTime = 0
      } else {
        this.item.closeTime = Date.now()
      }
      this.item.open = value
      this.tableData.splice(this.index, 1, this.item)
      this.updateArr(this.tableData)
    },
    // 展示赞助
    sponsorshipShow() {
      this.Setting.sponsorshipTime = 'show'
      this.settingUpdate(this.Setting)
      this.jumpOptions()
    },
    // 跳转管理面板
    jumpOptions() {
      const { id } = chrome.runtime
      const url = `chrome-extension://${id}/options.html`
      this.utils.jumpUrl(url)
    },
    // 初始化
    async initData() {
      this.Setting = await this.utils.getChromeStorage(this.NET.GLOBALSETTING) || defaultSetting
      this.tableData = await this.utils.getChromeStorage(this.NET.TABLELIST) || []
      console.log('Setting', this.Setting, this.tableData)
      // 先获取当前页面的tabID
      chrome.tabs.getSelected(null, (tab) => {
        this.tab = tab
        const isMatch = this.utils.checkUrl(this.tableData, tab.url)
        console.log('tab', tab, isMatch)
        if (isMatch) {
          this.item = isMatch.item
          this.index = isMatch.index
        }
      })
    },
    // 一键开启/关闭
    checkoutAll() {
      const val = !this.open
      const arr = this.tableData.map((item) => {
        item.open = val
        if (val) {
          item.closeTime = 0
        } else {
          item.closeTime = Date.now()
        }
        return item
      })
      this.updateArr(arr)
    },

    // 判断当前是否开启
    isOpen() {
      const val = this.open
      let newVal
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (this.tableData[i].open) {
          newVal = true
          break
        } else {
          newVal = false
        }
      }
      // 切换了开关状态
      if (val !== newVal) {
        if (newVal) {
          // 打开 取消计时
          this.Setting.closeTime = 0
        } else {
          // 关闭 开始计时
          this.Setting.closeTime = Date.now()
        }
        this.settingUpdate(this.Setting)
      }
    },
    // 更新设置
    settingUpdate(obj) {
      this.Setting = obj
      return this.utils.updateStorageData(this.Setting, this.NET.GLOBALSETTING)
    },
    // 更新数组
    updateArr(arr) {
      this.tableData = arr
      this.isOpen()
      this.utils.updateStorageData(this.tableData, this.NET.TABLELIST)
    },
  },
}
</script>

<style scoped>
.box-card {
  width: 180px;
  background: #323232;
  color: #e0e0e0;
  font-size: 13.5px;
  padding: 5px 0;
}
.box-card > div > div {
  width: 20px;
  font-size: 20px;
  color: #fff;
  margin-right: 15px;
}
.color-green {
  color: #5c8e23;
}
.color-gray {
  color: gray;
}
.box-card > div {
  cursor: pointer;
  padding: 2px 10px;
  height: 32px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #2a2a2a;
}
.box-card > div:hover {
  background: #7f6026;
}
</style>
