<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 14:24:51
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-04-09 15:05:48
 * FilePath     : /stop-mess-around/src/options/App/settingPage/SetPage.vue
 * Description  : 设置按钮列表
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <div class="set-page">
    <div class="set-page-padding">
      <div class="set-page-title">
        {{ '设置' }}
      </div>
      <el-input
        v-model="searchCotent"
        class="search-input"
        placeholder="搜索网站名和网址"
        @change="search"
      />
      <el-button
        type="primary"
        round
        @click="checkoutFn('showCreateItem', true)"
      >
        {{ '新增' }}
      </el-button>
      <el-button
        type="primary"
        round
        @click="checkoutAll"
      >
        {{ closeOrOpen }}
      </el-button>
      <el-button
        type="primary"
        round
        @click="checkoutFn('showTip', true)"
      >
        {{ '励志语录' }}
      </el-button>
      <el-button
        type="primary"
        round
        @click="checkoutFn('showBatchItem', true)"
      >
        {{ '默认摸鱼网站列表' }}
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
        @click="checkoutFn('showStatistics', true)"
      >
        摸鱼时长统计
      </el-button>

      <el-button
        v-if="serve"
        type="primary"
        round
        @click="checkoutFn('showServeDialog', true)"
      >
        serve调试
      </el-button>
      <!-- 新增摸鱼网站 -->
      <CreateItem
        :show-create-item="showCreateItem"
        @close="checkoutFn"
      />
      <!-- 批量添加摸鱼网站 -->
      <BatchItem
        :show-batch-item="showBatchItem"
        @close="checkoutFn"
      />
      <!-- 随机语录设置 -->
      <RandomTip
        :show-tip="showTip"
        @close="checkoutFn"
      />
      <!-- 全局设置 -->
      <Setting
        :show-dialog="showSetting"
        @close="checkoutFn"
      />
      <!-- 统计摸鱼时长 -->
      <RestStatistics
        :show-statistics="showStatistics"
        @close="checkoutFn"
      />
      <ServeDebugger
        :show-serve-dialog="showServeDialog"
        @close="checkoutFn"
      />
    </div>
  </div>
</template>

<script>
import CreateItem from './CreateItem.vue'
import Setting from './Setting.vue'
import BatchItem from './BatchItem.vue'
import RandomTip from './RandomTip.vue'
import ServeDebugger from './serve.vue'
import RestStatistics from '../../../components/rest-statistics.vue'

export default {
  name: 'SetPage',
  inject: ['getTableData', 'getSetting', 'updateArr'],
  components: {
    CreateItem,
    Setting,
    BatchItem,
    RandomTip,
    RestStatistics,
    ServeDebugger,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchCotent: '',
      showCreateItem: false,
      showSetting: false,
      showBatchItem: false,
      showTip: false,
      showStatistics: false,
      showServeDialog: false,
      serve: false, // 本地开发
    }
  },
  computed: {
    closeOrOpen() {
      return this.open ? '一键关闭' : '一键开启'
    },
  },
  async mounted() {
    if (process.env.VUE_APP_MODE === 'serve') {
      this.serve = true
    }
    // 没有数据 默认打开摸鱼网站列表
    const { listArr } = await this.utils.getData()
    if (listArr.length === 0) {
      this.showBatchItem = true
    }
  },
  methods: {
    search(val) {
      console.log('search')
      this.$emit('searchChange', val)
    },
    // 开关弹窗
    checkoutFn(key, val) {
      this[key] = val
    },
    // 一键开启/关闭
    async checkoutAll() {
      const options = {
        type: this.open ? 'closeAll' : 'openAll',
        tableArr: this.getTableData(),
        setting: this.getSetting(),
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
  },
}
</script>

<style scoped>
.set-page {
  border-radius: 6px;
  width: 100%;
  background: #fff;
  color: #000;
}
.set-page-padding {
  padding: 15px 20px;
}
.set-page-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.search-input {
  width: 200px;
  margin-right: 15px;
}
</style>
