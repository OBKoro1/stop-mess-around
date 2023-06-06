<template>
  <div
    class="dialog-footer"
  >
    <div
      v-if="activeName === 'tipArr'"
      class="Margin6"
    >
      <el-popconfirm
        :title="useLanguageMessage('checkDel')"
        placement="top"
        @confirm="deleteChooseConfirm"
      >
        <el-button
          slot="reference"
          size="medium"
          :disabled="tipChooseList.length === 0"
          class="marginRL"
          type="danger"
        >
          {{ useLanguageMessage('delSelected') }}
        </el-button>
      </el-popconfirm>
      <el-button
        size="medium"
        class="marginRL"
        @click="openResetTipDialogShow"
      >
        {{ useLanguageMessage('restoreDeleted') }}
      </el-button>
    </div>
    <template
      v-if="showTabFont"
    >
      <el-popconfirm
        :title="useLanguageMessage('confirmClear')"
        placement="top"
        @confirm="clearListFn"
      >
        <el-button
          slot="reference"
          size="medium"
          class="marginRL"
          type="danger"
        >
          {{ useLanguageMessage('clearAll') }}{{ showTabFont }}
        </el-button>
      </el-popconfirm>
      <el-popconfirm
        :title="useLanguageMessage('confirmRestore')"
        placement="top"
        @confirm="setDefaultSetting"
      >
        <el-button
          slot="reference"
          size="medium"
          type="danger"
        >
          <!-- {{ showTabFont }} -->
          {{ useLanguageMessage('restoreSet') }}
        </el-button>
      </el-popconfirm>
    </template>
    <ResetTipVue
      :dialog-visible="resetTipDialogShow"
      :active-name="activeName"
      @close="checkoutVal"
    />
  </div>
</template>

<script>
import ResetTipVue from './resetTip.vue'

export default {
  components: {
    ResetTipVue,

  },
  inject: ['tipUpdateSettingArr', 'tipClearListFn'],
  props: {
    activeName: {
      type: String,
      default: 'tipArr',
    },
    showTabFont: {
      type: String,
      default: '',
    },
    tipChooseList: {
      type: Array,
      default: () => [],
    },
    tipArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      resetTipDialogShow: false, // 恢复删除语录弹窗

    }
  },
  methods: {

    /**
     * @description: 关闭编辑弹窗
     */
    checkoutVal(key, val) {
      this[key] = val
    },
    /**
     * @description: 打开恢复弹窗
     */
    openResetTipDialogShow() {
      this.$emit('clearChoose')
      this.$nextTick(() => {
        this.resetTipDialogShow = true
      })
    },
    clearListFn() {
      this.tipClearListFn()
    },
    /**
     * @description: 删除选中励志语录
     */
    deleteChooseConfirm() {
      const tipArr = this.tipArr.filter((item) => this.tipChooseList.indexOf(item) === -1)
      this.tipUpdateSettingArr(tipArr, this.activeName)
    },
    setDefaultSetting() {
      this.$emit('setDefaultSetting')
    },
  },
}
</script>

<style>

</style>
