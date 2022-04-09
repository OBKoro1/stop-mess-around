<!--
 * Author       : OBKoro1
 * Date         : 2022-04-09 14:41:25
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-09 15:06:53
 * FilePath     : /stop-mess-around/src/options/App/settingPage/serve.vue
 * description  : serve 本地开发时的可视化操作
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="本地serve debugger"
    width="550px"
  >
    <div>
      <el-button @click="replaceErrData">
        替换错误数据
      </el-button>
      <el-button @click="replaceOrigin">
        替换原先数据
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { errData, origin } from './serve'

export default {
  props: {
    showServeDialog: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {

    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showServeDialog
      },
      set() {
        this.close()
      },
    },
  },
  methods: {
    log() {
      setTimeout(() => {
        console.log('this', this)
      }, 2000)
    },
    replaceErrData() {
      const { setting, statisticsTime, listArr } = errData
      this.utils.updateStorageData(listArr, this.NET.TABLELIST)
      this.utils.updateStorageData(setting, this.NET.GLOBALSETTING)
      this.utils.updateStorageData(statisticsTime, this.NET.statisticsTime)
      this.log()
    },
    replaceOrigin() {
      const { setting, statisticsTime, listArr } = origin
      this.utils.updateStorageData(listArr, this.NET.TABLELIST)
      this.utils.updateStorageData(setting, this.NET.GLOBALSETTING)
      this.utils.updateStorageData(statisticsTime, this.NET.statisticsTime)
      this.log()
    },
    close() {
      this.$emit('close', 'showStatistics', false)
    },
  },
}
</script>

<style>

</style>
