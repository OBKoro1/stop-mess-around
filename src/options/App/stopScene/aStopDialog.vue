<template>
  <SDialog
    v-bind="$attrs"
    @ok="onOk"
    @close="onClose"
  >
    <template v-slot:title>
      <div class="title-body-1">
        添加瞎逛网站
      </div>
    </template>
    <template v-slot:body>
      <div class="add-body">
        <div class="mb-10 flex-row">
          <el-switch
            v-model="switchVal"
            active-color="#13ce66"
            class="mr-10"
          />需添加到默认阻止网站
        </div>
        <div class="body-header">
          <el-input
            v-model="keyWord"
            class="mr-10"
            size="medium"
            placeholder="请输入网站或关键字"
          />
          <el-button
            type="success"
            icon="el-icon-plus"
            circle
            size="medium"
            @click="onAdd('keyWord')"
          />
        </div>
        <div class="body-content mt-10">
          <div class="mb-20 mt-20">
            <span class="title-body-3">要阻止的网站</span>
            <div class="body-list mt-10">
              <template v-for="(item,index) in keyWordList">
                <div
                  :key="index"
                  class="item-content"
                >
                  <span class="mr-10">{{ item.name }}</span>
                  <el-button
                    :key="index"
                    type="success"
                    :icon="!item.checked?'el-icon-plus':'el-icon-check'"
                    size="mini"
                    circle
                    class="cursor-pointer"
                    @click="onAdd('default',item)"
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="mb-20 mt-20">
            <span class="title-body-3">默认阻止的网站</span>
            <div class="body-list mt-10">
              <template v-for="(item,index) in defaultStopList">
                <div
                  :key="index"
                  class="item-content"
                >
                  <span class="mr-10">{{ item.name }}</span>
                  <el-button
                    :key="index"
                    type="success"
                    :icon="!item.checked?'el-icon-plus':'el-icon-check'"
                    size="mini"
                    circle
                    class="cursor-pointer"
                    @click="onAdd('default',item)"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div>
        已阻止{{ stopList.length }}/5
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
      defaultStopList: [
        {
          name: 1111,
          checked: true,
        },
        {
          name: 222,
          checked: false,
        },
      ],
      stopList: [],
      keyWord: '',
      switchVal: false,
      keyWordList: [],
    }
  },
  methods: {
    onOk() {
      this.$emit('success', this.stopList)
    },
    onClose() {
      this.$emit('cancel', this.stopList)
    },
    onAdd(type, item) {
      if (type === 'keyWord') {
        console.log(122)
      } else if (type === 'default') {
        item.checked = !item.checked
      }
    },
  },
}
</script>

<style scoped>
.body-header{
  display: flex;
}
.body-content{
  max-height: 500px;
  overflow-y: auto;
}
.body-list{
  display: flex;
  flex-wrap: wrap;
  background: rgb(238, 238, 238);
  border-radius: 5px;
}
.item-content{
  display: flex;
  align-items: center;
  width: 100%;
  margin: 7px;
  justify-content:space-between;
  padding: 8px;
}
.item-content:hover{
  background:#fff;
  opacity: .75;
  border-radius: 5px;
}
</style>
