<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 14:24:51
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-07-03 16:58:06
 * FilePath     : /src/options/App/settingPage/SetPage.vue
 * Description  : 设置按钮列表
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <div class="set-page-padding">
    <div class="set-page-title">
      {{ '全局设置' }}
    </div>
    <el-button
      type="primary"
      round
      @click="checkoutFn('showTip', true)"
    >
      {{ '提示自律的励志语录' }}
    </el-button>
    <el-button
      type="primary"
      round
      @click="checkoutFn('showSetting', true)"
    >
      {{ '设置' }}
    </el-button>
    <el-button
      type="primary"
      round
      @click="checkoutFn('showPluginDataDialog', true)"
    >
      插件数据和反馈问题相关
    </el-button>
    <!-- 随机语录设置 -->
    <RandomTip
      :show-tip="showTip"
      @close="checkoutFn"
    />
    <!-- 全局设置 -->
    <Setting
      :show-dialog="showSetting"
      @showCopyDataFn="checkoutFn('showPluginDataDialog', true)"
      @close="checkoutFn"
    />
    <!-- 覆盖设置 -->
    <ReplacePluginData
      :show-serve-dialog="showPluginDataDialog"
      @close="checkoutFn"
    />
  </div>
</template>

<script>
import RandomTip from '@/options/App/tip/index.vue'
import Setting from './Setting.vue'
import ReplacePluginData from './ReplacePluginData.vue'

export default {
  name: 'SetPage',
  components: {
    Setting,
    RandomTip,
    ReplacePluginData,
  },
  data() {
    return {
      showSetting: false,
      showTip: false,
      showPluginDataDialog: false,
    }
  },
  methods: {
    // 开关弹窗
    checkoutFn(key, val) {
      this[key] = val
    },
  },
}
</script>

<style scoped>
.set-page-padding {
  padding: 15px 20px;
}
.set-page-title {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
