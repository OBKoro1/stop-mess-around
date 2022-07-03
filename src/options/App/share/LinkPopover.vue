<template>
  <el-popover
    v-model="isShow"
    placement="top"
    width="200"
  >
    <p>是否复制所有自定义网站数据?</p>
    <div style="text-align: right; margin-top: 10px">
      <el-button
        type="primary"
        size="mini"
        @click="jump()"
      >
        跳转不复制
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="jump(true)"
      >
        复制并跳转
      </el-button>
    </div>
    <el-link
      slot="reference"
      type="primary"
    >
      {{ linkFont }}
    </el-link>
  </el-popover>
</template>

<script>
export default {
  name: 'LinkPopover',
  props: {
    url: {
      require: true,
      default: '',
      type: String,
    },
    linkFont: {
      require: true,
      default: '',
      type: String,
    },
    show: {
      require: true,
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  watch: {

  },
  methods: {
    jump(copy) {
      this.isShow = false
      if (copy) {
        this.$emit('copyAllSite')
      } else {
        this.utils.jumpUrl(this.url)
      }
    },
  },

}
</script>

<style>

</style>
