<template>
  <SDialog
    v-bind="$attrs"
    @ok="onOk"
    @close="onClose"
  >
    <template v-slot:title>
      <div class="title-body-1">
        添加瞎逛网站加油格言
      </div>
    </template>
    <template v-slot:body>
      <div class="add-body">
        <div class="body-header mb-10">
          <el-popover
            v-model="popVisible"
            placement="right"
            width="400"
            trigger="click"
          >
            <div class="flex-column pop-body">
              <el-input
                v-model="keyWord"
                size="medium"
                placeholder="请输入内容"
                type="textarea"
              />
              <div class="mt-10">
                <el-button
                  slot="reference"
                  size="small"
                  @click="onCancle"
                >
                  取消
                </el-button>
                <el-button
                  slot="reference"
                  size="small"
                  type="primary"
                  @click="onSet"
                >
                  确定
                </el-button>
              </div>
            </div>
            <el-button
              slot="reference"
              type="primary"
            >
              自定义加油格言
            </el-button>
          </el-popover>
          <el-button>还原默认设置</el-button>
        </div>
        <div class="body-list">
          <template v-for="(item,index) in cheerList">
            <div
              :key="index"
              class="item-row"
            >
              <div class="row-name flex-row">
                <el-checkbox />
                <span class="ml-10">{{ item }}</span>
              </div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                class="cursor-pointer"
              />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div>
        <span class="title-body-3 mr-10">已选中{{ checkedList.length }}</span>
        <el-button
          type="danger"
          size="mini"
        >
          删除
        </el-button>
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
      keyWord: '',
      checkedList: [],
      cheerList: [],
      popVisible: false,
    }
  },
  methods: {
    onOk() {
      this.$emit('success', this.stopList)
    },
    onClose() {
      this.$emit('cancel', this.stopList)
    },
    onSet() {
      this.popVisible = false
    },
    onCancle() {
      this.popVisible = false
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
