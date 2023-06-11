<template>
  <SDialog
    v-bind="$attrs"
    @ok="onOk"
    @close="onClose"
  >
    <template v-slot:title>
      <div class="title-body-1">
        一键设置
      </div>
    </template>
    <template v-slot:body>
      <div class="add-body">
        <div>
          <el-switch v-model="stopFlag" />
          <span class="ml-10">需设定阻止时间(以小时为单位)</span>
          <el-tooltip
            effect="dark"
            content="设定阻止时间可实现到点关闭检测"
            placement="top"
          >
            <i class="el-icon-question" />
          </el-tooltip>
          <template v-if="stopFlag">
            <el-input-number
              v-model="stopNum"
              class="ml-10"
              size="small"
              :min="1"
              label="描述文字"
              @change="handleChange"
            />
          </template>
        </div>
        <div class="mt-20">
          <el-input
            v-model="urlVal"
            placeholder="请输入内容"
            style="width:65%"
          >
            <template slot="prepend">
              Http://
            </template>
          </el-input>
          <span class="ml-10">被阻止的网站重定向地址</span>
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
  data() {
    return {
      stopNum: 1,
      stopFlag: false,
      urlVal: '',
    }
  },
  methods: {
    onOk() {
      this.$emit('success', this.stopList)
    },
    onClose() {
      this.$emit('cancel', this.stopList)
    },
    handleChange() {

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
