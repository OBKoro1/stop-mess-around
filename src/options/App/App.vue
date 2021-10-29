<template>
  <div class="main_app">
    <OptionsHeader />
    <div class="main-content">
      <SetPage :open="open"
               @searchChange="searchChange" />
      <Table :tableData="tableData"
             :search="search"
             :Setting="Setting"
             :updateArr="updateArr"
             :tableDataSpliceUpdate="tableDataSpliceUpdate" />
    </div>

  </div>
</template>

<script>
import OptionsHeader from './Header.vue'
import SetPage from './settingPage/SetPage.vue'
import Table from './table/Table.vue'
import { defaultSetting } from '../../utils/Default'

export default {
  name: 'app',
  provide() {
    return {
      getTableData: () => this.tableData, // 获取列表
      getSetting: () => this.Setting, // 获取设置
      tableDataSpliceUpdate: this.tableDataSpliceUpdate, // 通过splice形式 更新数组
      settingUpdate: this.settingUpdate, // 更新设置
      updateArr: this.updateArr, // 传递数组 更新数组
    }
  },
  data() {
    return {
      tableData: [], //  摸鱼列表
      showList: [], // 展示的列表
      Setting: {}, // 全局设置

      search: '', // 搜索
      interval: null,
      open: true, // 当前是否打开
    }
  },
  components: {
    OptionsHeader,
    SetPage,
    Table,
  },
  async created() {
    window.$Vue = this
    // chrome.storage.sync.clear()
    await this.initData()
    // 监控配置更改
    this.interval = setInterval(this.getData, 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    // 初始化
    async initData() {
      const arr = await this.utils.getChromeStorage(this.NET.TABLELIST) || []
      const setting = await this.utils.getChromeStorage(this.NET.GLOBALSETTING)
      this.updateArr(arr)
      this.Setting = this.syncData(setting)
      this.updateArrLater()
    },
    // 更新默认数组
    syncDefault(obj) {
      Object.keys(obj.defaultNum).forEach((key) => {
        for (let i = obj.defaultNum[key]; defaultSetting.defaultNum[key] > i; i += 1) {
          console.log('更新默认值', i, key, defaultSetting[key][i])
          obj[key].push(defaultSetting[key][i]) // 添加新的默认值
        }
        obj.defaultNum[key] = defaultSetting.defaultNum[key] // 更新默认值数量
      })
      return obj
    },
    // 获取配置
    syncData(Setting) {
      let obj
      if (Setting) {
        obj = window.JSON.parse(JSON.stringify(Setting))
        // 更新默认数组
        obj = this.syncDefault(obj)
        // 新增配置同步
        for (const key in defaultSetting) {
          if (obj[key] === undefined) {
            obj[key] = defaultSetting[key]
          }
        }
      } else {
        obj = defaultSetting
      }
      this.settingUpdate(obj) // 初始化保存
      return obj
    },
    // 获取数据 防止其他地方操作变更
    async getData() {
      this.tableData = await this.utils.getChromeStorage(this.NET.TABLELIST)
      this.Setting = await this.utils.getChromeStorage(this.NET.GLOBALSETTING)
      this.updateArrLater()
    },
    // 搜索
    searchChange(val) {
      this.search = val
    },
    // 判断当前是否开启
    isOpen() {
      const val = this.open
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (this.tableData[i].open) {
          this.open = true
          break
        } else {
          this.open = false
        }
      }
      // 切换了开关状态
      if (val !== this.open) {
        if (this.open) {
          // 打开 取消计时
          this.Setting.closeTime = 0
        } else {
          // 关闭 开始计时
          this.Setting.closeTime = Date.now()
        }
        this.settingUpdate(this.Setting)
      }
    },
    // 更新数据后的操作
    updateArrLater() {
      this.isOpen()
    },
    // 更新数组
    updateArr(arr) {
      if (!arr && !Array.isArray(arr)) return
      this.tableData = arr
      this.updateArrLater()
      this.utils.updateStorageData(this.tableData, this.NET.TABLELIST)
    },
    tableDataSpliceUpdate(index, num, ...newItem) {
      this.tableData.splice(index, num, ...newItem)
      this.updateArrLater()
      return this.utils.updateStorageData(this.tableData, this.NET.TABLELIST)
    },
    // 更新设置
    settingUpdate(obj) {
      this.Setting = JSON.parse(JSON.stringify(obj))
      return this.utils.updateStorageData(this.Setting, this.NET.GLOBALSETTING)
    },
  },
}
</script>

<style scoped>
.main_app {
  background: #2a2a2a;
  min-height: 100vh;
  min-width: 100%;
  color: #fff;
}
.main-content {
  margin: 20px;
}
</style>>
