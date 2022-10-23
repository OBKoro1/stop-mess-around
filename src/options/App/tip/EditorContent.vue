<template>
  <el-dialog
    :close-on-press-escape="false"
    width="60%"
    title="编辑"
    :visible.sync="innerData.innerVisible"
    :before-close="close"
    append-to-body
  >
    <el-input
      v-model="innerData.textarea"
      class="add-margin"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
    />
    <el-button
      type="primary"
      @click="saveEdit"
    >
      保存编辑
    </el-button>
  </el-dialog>
</template>

<script>
import { checkContentInArr } from '@/options/utils'

export default {
  props: {
    inner: {
      type: Object,
      default: () => ({
        textarea: '',
        index: 0,
        innerVisible: false,
      }),
    },
    activeName: {
      type: String,
      default: 'tipArr',
    },
  },
  inject: ['getSetting', 'tipUpdateSettingArr'],
  data() {
    return {
      setting: {
        titleArr: [], // 励志标题数组
        tipArr: [], // 励志语录数组
        confirmArr: [], // 关闭页面确认按钮数组
      },
      innerData: {
        textarea: '',
        index: 0,
        innerVisible: false,
      },
    }
  },
  watch: {
    inner: {
      handler() {
        if (this.inner.innerVisible) {
          this.innerData.textarea = this.inner.textarea
          this.innerData.index = this.inner.index
          this.innerData.innerVisible = this.inner.innerVisible
        } else {
          this.innerData.textarea = ''
          this.innerData.index = 0
          this.innerData.innerVisible = false
          this.close()
        }
      },
      deep: true,
    },
  },
  methods: {
    close() {
      this.$emit('closeEditor')
    },
    /**
     * @description: 保存编辑的tab数据
     */
    saveEdit() {
      this.setting = this.getSetting()
      const arr = this.setting[this.activeName]
      if (!checkContentInArr(arr, this.innerData.textarea)) return
      arr.splice(this.innerData.index, 1, this.innerData.textarea)
      this.tipUpdateSettingArr(arr, this.activeName)
      this.$message.success('编辑成功')
      this.close()
    },
  },
}
</script>

<style>

</style>
