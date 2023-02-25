<template>
  <div class="random-content">
    <el-radio-group v-model="radio">
      <el-radio label="tipArr">
        {{ useLanguageMessage('addMotivationalQuotes') }}
      </el-radio>
      <el-radio label="titleArr">
        {{ useLanguageMessage('addMotivationalTitle') }}
      </el-radio>
      <el-radio label="confirmArr">
        {{ useLanguageMessage('addMotivationalBtn') }}
      </el-radio>
    </el-radio-group>
    <el-input
      v-model="textarea"
      class="add-margin"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      :placeholder="useLanguageMessage('placeholderText')"
    />
    <el-button
      type="primary"
      @click="saveAddFn"
    >
      {{ useLanguageMessage('saveAdd') }}
    </el-button>
    <div>
      <p class="page-title1">
        {{ useLanguageMessage('shareTip') }}
      </p>
      <el-button
        type="primary"
        @click="openShareDialog"
      >
        {{ useLanguageMessage('openShare') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { checkContentInArr } from '@/options/utils'

export default {
  inject: ['tipClose', 'settingUpdate', 'checkOutAppDialog', 'tipUpdateSettingArr'],
  data() {
    return {
      textarea: '', // 输入的内容
      radio: 'tipArr', // 添加哪种类型的内容
    }
  },
  methods: {
    /**
     * @description: 保存添加的数据
     */
    saveAddFn() {
      const arr = this.$attrs[this.radio]
      if (!checkContentInArr(arr, this.textarea)) return
      arr.unshift(this.textarea)
      const successTxt = this.useLanguageMessage('addSuccess')
      this.$message.success(successTxt)
      this.textarea = ''
      this.tipUpdateSettingArr(arr, this.radio)
    },
    /**
     * @description: 打开分享摸鱼网站弹窗
     */
    openShareDialog() {
      this.tipClose()
      this.$nextTick(() => {
        this.checkOutAppDialog('shareSiteDialog', true)
      })
    },
  },
}
</script>

<style>

</style>
