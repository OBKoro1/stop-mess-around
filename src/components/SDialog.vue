<template>
  <el-dialog
    :close-on-click-modal="false"
    append-to-body
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    :show-close="false"
    :before-close="resetFields"
    width="650px"
    v-bind="$attrs"
  >
    <div
      slot="title"
      class="dialog_title"
    >
      <slot name="title" />
    </div>
    <div class="add-stop-body">
      <slot name="body" />
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <slot name="footer" />
      <div
        v-if="showFooter"
        class=""
      >
        <el-button @click="onClose">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="onSet"
        >
          确定
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    visible: {
      require: true,
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {

    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set() {
        this.close()
      },
    },
  },
  methods: {
    resetFields() {},
    onClose() {
      this.$emit('close', false)
    },
    onSet() {
      this.$emit('ok', false)
    },
  },
}
</script>

<style scoped>
.dialog-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;;
}
</style>
