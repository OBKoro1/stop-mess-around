<template>
  <div class="config-content">
    <div class="set-page-header">
      <SetPage />
      <TableSetting
        :open="open"
        :sub-options="subOptions"
        @searchChange="searchChange"
      />
    </div>
    <Table
      :table-data="tableData"
      :search="search"
      :setting="Setting"
      :update-arr="updateArr"
      :table-data-splice-update="tableDataSpliceUpdate"
    />
  </div>
</template>

<script>
import { initDefaultTableList, siteTypeFind, filterArrFn } from '@/utils/tableListUtils'
import SetPage from '../settingPage/SetPage.vue'
import TableSetting from '../settingPage/TableSetting.vue'
import Table from '../table/Table.vue'

export default {
  provide() {
    return {
      getTableData: () => this.tableData, // 获取列表
      tableDataSpliceUpdate: this.tableDataSpliceUpdate, // 通过splice形式 更新数组
      updateArr: this.updateArr, // 传递数组 更新数组
      initData: this.clearSetting,
      checkOutAppDialog: this.checkOutAppDialog, // 切换appdialog
    }
  },
  components: {
    SetPage,
    TableSetting,
    Table,
  },
  data() {
    return {
      tableData: [], //  摸鱼列表
      showList: [], // 展示的列表
      Setting: {}, // 全局设置
      search: '', // 搜索
      interval: null,
      open: true, // 当前是否打开
      // 子组件数据
      subOptions: {
        // 展示摸鱼网站列表按钮
        btnShowBatchItem: false,
      },
    }
  },
  async created() {
    window.$Vue = this
    await this.getData()
    await this.initTableList()
    await this.sortList()
    await this.setProcessEnv()
    // 监控配置更改
    this.interval = setInterval(this.getData, 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    // 获取数据 防止其他地方操作变更
    async getData() {
      ({ setting: this.Setting, statisticsTime: this.statisticsTime, listArr: this.tableData } = await this.utils.getData())
      this.updateArrLater()
    },
    /**
     * @description: 插件安装 初始化添加所有默认摸鱼列表
     */
    async initTableList() {
      const options = await initDefaultTableList(this.Setting)
      if (options.init) {
        ({ setting: this.Setting, listArr: this.tableData } = options)
      }
    },
    /**
     * @description: process env 注入
     */
    async setProcessEnv() {
      const mode = process.env.VUE_APP_MODE.toLowerCase()
      if (mode.indexOf('serve') >= 0) {
        this.Setting.develop = true
        await this.utils.updateStorageData(this.Setting, this.NET.GLOBALSETTING)
      }
    },
    // 清除数据
    async clearSetting(type) {
      if (type === 'clearList') {
        await this.utils.updateStorageData([], this.NET.TABLELIST)
      } else if (type === 'clearSetting') {
        await this.utils.updateStorageData({}, this.NET.GLOBALSETTING)
      } else if (type === 'statisticsTime') {
        await this.utils.updateStorageData([], this.NET.statisticsTime)
      }
      this.getData()
    },
    /**
     * @description: 更新子组件数据
     */
    updateSubOptions(options) {
      this.subOptions = Object.assign(this.subOptions, options)
    },
    /**
     * @description: 更新摸鱼按钮
     */
    updateBtnShowBatchItem() {
      const arr = filterArrFn(this.tableData)
      const isShow = arr.length > 0
      if (this.subOptions.btnShowBatchItem !== isShow) {
        this.updateSubOptions({
          btnShowBatchItem: isShow,
        })
      }
    },
    // 搜索
    searchChange(val) {
      this.search = val
    },
    // 判断当前是否开启
    isOpen() {
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (this.tableData[i].open) {
          this.open = true
          break
        } else {
          this.open = false
        }
      }
    },
    // 更新数据后的操作
    updateArrLater() {
      this.isOpen()
      this.updateBtnShowBatchItem()
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
    checkOutAppDialog(key, value) {
      this[key] = value
    },
    /**
     * @description: 刷新页面排序
     * @return {type}
     */
    async sortList() {
      this.tableData.sort((a, b) => {
        // create 排在前面 编辑排在后面
        if (siteTypeFind(a, 'create')) return -1
        if (siteTypeFind(b, 'create')) return 1
        if (siteTypeFind(a, 'editor')) return -1
        if (siteTypeFind(b, 'editor')) return 1
        // 其他默认随机
        return Math.random() - 0.5
      })
      await this.utils.updateStorageData(this.tableData, this.NET.TABLELIST)
    },
  },
}
</script>

<style scoped>
.set-page-header {
  padding: 8px;
  border-radius: 6px;
  width: 100%;
  background: #fff;
  color: #000;
  box-shadow: 5px 5px 10px #ddd;
}
</style>
