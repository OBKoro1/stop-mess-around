<template>
  <div class="random-content">
    <el-radio-group v-model="radio">
      <el-radio label="tipArr">
        添加励志语录
      </el-radio>
      <el-radio label="titleArr">
        添加励志标题
      </el-radio>
      <el-radio label="confirmArr">
        添加励志按钮
      </el-radio>
    </el-radio-group>
    <el-input
      v-model="textarea"
      class="add-margin"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
    />
    <el-button
      type="primary"
      @click="saveAddFn"
    >
      保存添加
    </el-button>
    <div>
      <p class="page-title1">
        分享常用的摸鱼网站, 利人利己, 让插件更好用, 零配置快速上手~
      </p>
      <el-button
        type="primary"
        @click="openShareDialog"
      >
        打开分享弹窗
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
      const arr = this[this.radio]
      if (!checkContentInArr(arr, this.textarea)) return
      arr.unshift(this.textarea)
      this.$message.success('添加成功')
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
