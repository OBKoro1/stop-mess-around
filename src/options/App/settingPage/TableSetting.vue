<!--
 * Author       : OBKoro1 obkoro1@foxmail.com
 * Date         : 2022-06-05 16:38:04
 * Last Author  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-06-26 15:11:52
 * FilePath     : /src/options/App/settingPage/TableSetting.vue
 * description  : 摸鱼网站相关设置按钮列表
 * koroFileheader VSCode插件
 * Copyright (c) 2022 by OBKoro1 email: obkoro1@foxmail.com, All Rights Reserved.
-->

<template>
  <div class="set-page">
    <div class="set-page-padding">
      <div class="set-page-title">
        {{ useLanguageMessage('setTableTitle') }}
      </div>
      <el-input
        v-model="searchContent"
        class="search-input"
        :placeholder="useLanguageMessage('setTableSearch')"
        @change="search"
      />
      <!-- 一键关闭 -->
      <!-- <el-button
        type="primary"
        round
        @click="checkoutAll"
      >
        {{ closeOrOpen }}
      </el-button> -->
      <el-button
        type="primary"
        round
        @click="checkoutFn('showCreateItem', true)"
      >
        {{ useLanguageMessage('add') }}
      </el-button>
      <el-button
        type="primary"
        round
        @click="appDialog"
      >
        {{ useLanguageMessage('shareByPlugin') }}
      </el-button>
      <el-button
        type="primary"
        round
        @click="checkoutFn('showStatistics', true)"
      >
        {{ useLanguageMessage('statistics') }}
      </el-button>
      <el-button
        v-if="subOptions.btnShowBatchItem"
        type="primary"
        round
        @click="checkoutFn('showBatchItem', true)"
      >
        {{ useLanguageMessage('fishTitle') }}
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
        @showCopyDataFn="checkoutFn('showPluginDataDialog', true)"
      />
      <!-- 统计摸鱼时长 -->
      <RestStatistics
        :show-statistics="showStatistics"
        options-page
        @close="checkoutFn"
      />
    </div>
  </div>
</template>

<script>
import RestStatistics from '@/components/rest-statistics.vue'
import CreateItem from './CreateItem.vue'
import BatchItem from './BatchItem.vue'

export default {
  name: 'TableSetting',
  inject: ['getTableData', 'getSetting', 'updateArr', 'checkOutAppDialog'],
  components: {
    CreateItem,
    BatchItem,
    RestStatistics,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    subOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      searchContent: '',
      showCreateItem: false,
      showSetting: false,
      showBatchItem: false,
      showTip: false,
      showStatistics: false,
      showPluginDataDialog: false,
    }
  },
  mounted() {
    // 插件安装初始化 添加所有摸鱼网站，如果已经初始化过了，则再出现摸鱼列表添加
    setTimeout(async () => {
      const { listArr } = await this.utils.getData()
      if (listArr.length === 0) {
        // 没有数据 默认打开摸鱼网站列表
        this.showBatchItem = true
      }
    }, 1000)
  },
  methods: {
    search(val) {
      this.$emit('searchChange', val)
    },
    appDialog() {
      this.checkOutAppDialog('shareSiteDialog', true)
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
  margin-bottom: 15px;
}
</style>
