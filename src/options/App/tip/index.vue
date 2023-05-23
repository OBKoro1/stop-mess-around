<!--
 * Author       : OBKoro1
 * Date         : 2021-06-15 15:14:20
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-07-31 17:36:21
 * FilePath     : /src/options/App/tip/index.vue
 * Description  : 内卷随机提示增删改查
 * koroFileheader插件
 * Copyright (c) ${now_year} by OBKoro1, All Rights Reserved.
-->

<template>
  <el-dialog
    :close-on-press-escape="false"
    append-to-body
    :visible.sync="dialogVisible"
    :before-close="closeBefore"
    :title="useLanguageMessage('fishTipMsgTitle')"
    style="margin-top: -7vh;"
    width="80%"
  >
    <TabArrayVue
      :title-arr="titleArr"
      :tip-arr="tipArr"
      :confirm-arr="confirmArr"
      :active-name-change="activeNameChange"
      @close="close"
    />
    <DialogFooterDiv
      slot="footer"
      :active-name="activeName"
      :show-tab-font="showTabFont"
      :tip-arr="tipArr"
      :tip-choose-list="tipChooseList"
      @setDefaultSetting="setDefaultSetting"
      @clearChoose="clearChoose"
    />
  </el-dialog>
</template>

<script>
import { initDefaultConfig } from '@/utils/Default'
import { utils } from '@/utils/index'
import DialogFooterDiv from './footer.vue'
import TabArrayVue from './tabArray.vue'

const defaultSetting = initDefaultConfig(utils.getUILanguage())

export default {
  provide() {
    return {
      // 子组件操作数据源
      tipSetTipChooseList: this.setTipChooseList,
      clearChooseBool: this.clearChooseBool,
      resetClearChoose: this.resetClearChoose,
      tipClearListFn: this.clearListFn,
      tipUpdateSettingArr: this.updateSettingArr,
      tipClose: this.close,
    }
  },
  components: {
    TabArrayVue,
    DialogFooterDiv,
  },
  props: {
    showTip: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  inject: ['getSetting', 'settingUpdate', 'checkOutAppDialog'],
  data() {
    return {
      setting: {},
      clearChooseBool: false,
      activeName: 'tipArr', // 展示哪个选项卡
      titleArr: [], // 励志标题数组
      tipArr: [], // 励志语录数组
      confirmArr: [], // 关闭页面确认按钮数组
      tipChooseList: [], // 选中的励志语录
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showTip
      },
      set() {
        this.close()
      },
    },
    showTabFont() {
      if (this.activeName === 'tipArr') {
        return this.useLanguageMessage('tipArrTip')
      }
      return ''
    },
  },
  watch: {
    // 初始化数据
    showTip(val) {
      if (val) {
        this.syncData()
      }
    },
  },
  methods: {
    activeNameChange(activeName) {
      this.clearChoose()
      this.activeName = activeName
    },
    /**
     * @description: 当前active-tab还原默认设置
     */
    setDefaultSetting() {
      const arr = defaultSetting[this.activeName]
      this.updateSettingArr(arr, this.activeName)
      this.$message.success(`还原默认${this.showTabFont}设置成功`)
      this.syncData()
    },
    /**
     * @description: 当前active-tab清空设置
     * @return {type}
     */
    clearListFn() {
      this.updateSettingArr([], this.activeName)
      this.$message.success(`清空${this.showTabFont}设置成功`)
      this.syncData()
    },
    /**
     * @description: 每个tab同步设置数据
     */
    syncData() {
      this.setting = this.getSetting()
      this.setSort('titleArr')
      this.setSort('tipArr')
      this.setSort('confirmArr')
    },
    /**
     * @description: 获取tab数据并随机
     */
    setSort(name) {
      this[name] = JSON.parse(JSON.stringify(this.setting[name]))
      this[name].sort(() => Math.random() - 0.5)
    },
    /**
     * @description: 更新tab设置中的数组
     */
    updateSettingArr(arr, type) {
      this[type] = arr
      this.setting[type] = JSON.parse(JSON.stringify(arr))
      this.settingUpdate(this.setting)
    },
    /**
     * @description: 关闭显示弹窗 重置数据
     * @param {type} done
     */
    closeBefore(done) {
      this.activeName = 'tipArr'
      done()
    },
    /**
     * @description: 关闭自律弹窗
     */
    close() {
      this.clearChoose()
      this.$nextTick(() => {
        this.$emit('close', 'showTip', false)
      })
    },
    /**
     * @description: 设置选中励志语录
     */
    setTipChooseList(val) {
      this.tipChooseList = val
    },
    /**
     * @description: 清空选择
     */
    clearChoose() {
      this.clearChooseBool = true
    },
    resetClearChoose() {
      this.clearChooseBool = false
    },
  },
}
</script>

<style>
.random-content {
  height: calc(100vh - 45vh);
  overflow: auto;
  overflow-x: hidden;
}
.add-margin {
  margin: 15px 0;
}
.random-content-font {
  font-size: 14px;
  padding: 12px 0;
}
.button-margin-right {
  margin-right: 10px;
}
.padding-title {
  padding: 15px 0;
}
.page-title1 {
  font-size: 16px;
  margin: 15px 0 ;
}
</style>
