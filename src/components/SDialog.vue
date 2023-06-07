<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    :show-close="false"
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
        <el-button
          size="medium"
          @click="onClose"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="medium"
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
