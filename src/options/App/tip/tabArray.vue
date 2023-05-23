<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="useLanguageMessage('tipArrTip')"
        name="tipArr"
      >
        <TipActive
          :tip-arr="tipArr"
          @showEditDialog="showEdit"
          @handleDelete="handleDelete"
          @tipChooseListChange="tipSetTipChooseList"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="useLanguageMessage('add')"
        name="add"
      >
        <AddActive
          :tip-arr="tipArr"
          :title-arr="titleArr"
          :confirm-arr="confirmArr"
        />
      </el-tab-pane>
    </el-tabs>
    <EditorContent
      :inner="inner"
      :active-name="activeName"
      @closeEditor="closeEditor"
    />
  </div>
</template>

<script>
import EditorContent from './EditorContent.vue'
import TipActive from './TipActive.vue'
import AddActive from './AddActive.vue'

export default {
  inject: ['tipUpdateSettingArr', 'tipSetTipChooseList'],
  components: {
    EditorContent,
    AddActive,
    TipActive,
  },
  props: {
    activeNameChange: {
      type: Function,
      default: () => {},
    },
    tipArr: {
      type: Array,
      default: () => [],
    },
    titleArr: {
      type: Array,
      default: () => [],
    },
    confirmArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeName: 'tipArr',
      inner: {
        textarea: '',
        index: 0,
        innerVisible: false,
      },
    }
  },
  watch: {
    activeName(val) {
      this.activeNameChange(val)
    },
  },
  methods: {
    /**
     * @description: 删除tab中的某条数据
     * @param {type} index
     */
    handleDelete(index) {
      const arr = this[this.activeName]
      arr.splice(index, 1)
      this.$message.success('删除成功')
      this.tipUpdateSettingArr(arr, this.activeName)
    },
    /**
     * @description: 展示编辑弹窗
     * @param {type} index
     * @param {type} row
     */
    showEdit(index, row) {
      this.inner.textarea = row
      this.inner.index = index
      this.inner.innerVisible = true
    },
    /**
     * @description: 关闭编辑弹窗
     */
    closeEditor() {
      this.inner.innerVisible = false
    },
  },
}
</script>

<style>

</style>
