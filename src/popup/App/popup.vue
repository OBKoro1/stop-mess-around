<template>
  <div class="box-card">
    <div @click="checkoutOpen">
      <div>
        <i :class="macthIcon" />
      </div>
      <span>{{ matchFont }}</span>
    </div>
    <div @click="checkoutAll">
      <div>
        <i :class="allOpen" />
      </div>
      <span>{{ open ? '一键关闭摸鱼检测' : '一键开启摸鱼检测' }}</span>
    </div>

    <div @click="utils.jumpUrl(NET.OPTIONSPAGE)">
      <div>
        <i class="el-icon-setting" />
      </div>
      <span>管理面板</span>
    </div>

    <div @click="sponsorshipShow">
      <div>
        <i
          class="el-icon-present"
          style="color: #e13d14"
        />
      </div>
      <span>欢迎赞助</span>
    </div>

    <div @click="utils.jumpUrl(NET.DOCS)">
      <div>
        <i
          class="el-icon-document"
          style="color: #fff"
        />
      </div>
      <span>使用文档</span>
    </div>

    <div @click="utils.jumpUrl(NET.GITHUBREPO)">
      <div>
        <i
          class="el-icon-star-off"
          style="color: #fff"
        />
      </div>
      <img
        alt="GitHub Repo stars"
        class="header-btns-star cursor-pointer"
        src="https://img.shields.io/github/stars/OBKoro1/stop-mess-around?style=social"
        @click="utils.jumpUrl(NET.GITHUBREPO)"
      >
    </div>
    <div @click="utils.jumpUrl(NET.RELEASES)">
      <div>
        <i
          class="el-icon-tickets"
          style="color: #fff"
        />
      </div>
      <span>更新日志</span>
    </div>
  </div>
</template>

<script>
import { utils } from '@/utils'
import { defaultSetting } from '../../utils/Default'

export default {
  name: 'Popup',
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
      let open = false
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (this.tableData[i].open) {
          open = true
          break
        }
      }
      return open
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
      return this.open
        ? 'el-icon-open color-green'
        : 'el-icon-turn-off color-gray'
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
    async checkoutOpen() {
      if (!this.item) {
        // 添加摸鱼网站
        this.Setting.addSite = this.tab.url
        this.settingUpdate(this.Setting)
        this.utils.jumpUrl(this.NET.OPTIONSPAGE)
        return
      }
      const value = !this.item.open
      this.Setting = await this.utils.getChromeStorage(this.NET.GLOBALSETTING)
      this.tableData = await this.utils.getChromeStorage(this.NET.TABLELIST)
      const options = {
        item: this.item,
        tableArr: this.tableData,
        setting: this.Setting,
      }
      let newItem = null
      if (value) {
        ({ item: newItem } = await utils.openCheck(options))
      } else {
        ({ item: newItem } = await utils.closeCheck(options))
      }
      this.tableData.splice(this.index, 1, newItem)
      this.updateArr(this.tableData)
    },
    // 展示赞助
    sponsorshipShow() {
      this.Setting.sponsorshipTime = 'show'
      this.settingUpdate(this.Setting)
      this.utils.jumpUrl(this.NET.OPTIONSPAGE)
    },
    async getCurrentTab() {
      const queryOptions = { active: true, currentWindow: true }
      const res = await chrome.tabs.query(queryOptions)
      return res[0]
    },
    // 初始化
    async initData() {
      this.Setting = (await this.utils.getChromeStorage(this.NET.GLOBALSETTING))
        || defaultSetting
      this.tableData = (await this.utils.getChromeStorage(this.NET.TABLELIST)) || []
      // 先获取当前页面的tabID

      this.tab = await this.getCurrentTab()
      console.log('tab', this.tab)
      const isMatch = this.utils.checkUrl(this.tableData, this.tab.url)
      if (isMatch) {
        this.item = isMatch.item
        this.index = isMatch.index
      }
    },
    // 一键开启/关闭
    async checkoutAll() {
      this.Setting = await this.utils.getChromeStorage(this.NET.GLOBALSETTING)
      this.tableData = await this.utils.getChromeStorage(this.NET.TABLELIST)
      const options = {
        type: this.open ? 'closeAll' : 'openAll',
        tableArr: this.tableData,
        setting: this.Setting,
      }
      let tableArr
      if (this.open) {
        // 开启状态 关闭
        ({ tableArr } = await this.utils.closeCheckAll(options))
      } else {
        ({ tableArr } = await this.utils.openCheckAll(options))
      }
      this.updateArr(tableArr)
    },
    // 更新设置
    settingUpdate(obj) {
      this.Setting = obj
      return this.utils.updateStorageData(this.Setting, this.NET.GLOBALSETTING)
    },
    // 更新数组
    updateArr(arr) {
      this.tableData = arr
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
