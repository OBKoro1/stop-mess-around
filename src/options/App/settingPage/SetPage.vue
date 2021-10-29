<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 14:24:51
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-10-29 17:16:43
 * FilePath     : /stop-mess-around/src/options/App/settingPage/SetPage.vue
 * Description  : 设置
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <div class="set-page">
    <div class="set-page-padding">
      <div class="set-page-title">{{'设置'}}</div>
      <el-input v-model="searchCotent"
                class="search-input"
                placeholder="搜索网站名和网址"
                @change="search"></el-input>
      <el-button type="primary"
                 @click="checkoutFn('showCreateItem', true)"
                 round>{{'新增'}}</el-button>
      <el-button type="primary"
                 @click="checkoutAll"
                 round>{{ closeOrOpen }}</el-button>
      <el-button type="primary"
                 @click="checkoutFn('showTip', true)"
                 round>{{'随机内卷语录'}}</el-button>
      <el-button type="primary"
                 @click="checkoutFn('showBatchItem', true)"
                 round>{{'摸鱼网站列表'}}</el-button>
      <el-button type="primary"
                 @click="checkoutFn('showSetting', true)"
                 round>{{'设置'}}</el-button>
      <!-- 新增摸鱼网站 -->
      <CreateItem :showCreateItem="showCreateItem"
                  @close="checkoutFn" />
      <!-- 批量添加摸鱼网站 -->
      <BatchItem :showBatchItem="showBatchItem"
                 @close="checkoutFn" />
      <!-- 随机语录设置 -->
      <RandomTip :showTip="showTip"
                 @close="checkoutFn" />
      <!-- 全局设置 -->
      <Setting :showDialog="showSetting"
               @close="checkoutFn" />
    </div>

  </div>
</template>

<script>
import CreateItem from './CreateItem.vue'
import Setting from './Setting.vue'
import BatchItem from './BatchItem.vue'
import RandomTip from './RandomTip.vue'

export default {
  name: 'set-page',
  inject: ['getTableData', 'updateArr'],
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
    }
  },
  components: {
    CreateItem,
    Setting,
    BatchItem,
    RandomTip,
  },
  computed: {
    closeOrOpen() {
      if (!this.open) {
        return '一键开启'
      }
      return '一键关闭'
    },
  },
  mounted() {
    // 没有数据 默认打开摸鱼网站列表
    setTimeout(() => {
      const list = this.getTableData()
      if (list.length === 0) {
        this.showBatchItem = true
      }
    }, 1000)
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
    checkoutAll() {
      const val = !this.open
      const arr = this.getTableData().map((item) => {
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
