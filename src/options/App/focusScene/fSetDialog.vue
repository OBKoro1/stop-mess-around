<template>
  <SDialog
    v-bind="$attrs"
    @ok="onOk"
    @close="onClose"
  >
    <template v-slot:title>
      <div class="title-body-1">
        白噪音设置
      </div>
    </template>
    <template v-slot:body>
      <div class="add-body">
        <div>
          <span class="ml-10">选择自己喜爱的白噪音</span>
          <el-tooltip
            effect="dark"
            content="您喜爱的白噪音将在开启白噪音时播放"
            placement="top"
          >
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div class="video-body">
          <!-- baizaoyin -->
        </div>
      </div>
    </template>
  </SDialog>
</template>

<script>
import SDialog from '@/components/SDialog.vue'

export default {
  components: {
    SDialog,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    async onOk() {
      this.$emit('success')
    },
    onClose() {
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
.body-header{
  display: flex;
  justify-content: space-between;
}
.body-content{
  max-height: 500px;
  overflow-y: auto;
}
.body-list{
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 0 5px;
}
.item-row{
  display: flex;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  justify-content:space-between;
  background:  rgb(238, 238, 238);
  border-radius:5px ;
}
.item-content:hover{
  background:#fff;
  opacity: .75;
  border-radius: 5px;
}
.pop-body{
  align-items: flex-end;
}
</style>
