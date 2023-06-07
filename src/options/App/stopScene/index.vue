<template>
  <div class="stop-content">
    <div class="flex-column mb-20">
      <div class="title-body-1 mb-10 stop-header">
        <span>阻止网站</span>
        <div>
          <el-button
            type="primary"
            size="medium"
          >
            重定向
          </el-button>
          <el-button
            type="primary"
            size="medium"
          >
            设定时间
          </el-button>
        </div>
      </div>
      <div class="title-body-2 text-color-1">
        按计划或者按照配置阻止网站
      </div>
    </div>
    <div class="stop-action">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="mr-10"
        @click="addList('stop')"
      >
        添加瞎逛网站
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addList('cheer')"
      >
        添加瞎逛网站的加油格言
      </el-button>
    </div>
    <div class="stop-list mt-10">
      <div class="list-header">
        <span class="title-body-4">已阻止的网站</span>
      </div>
      <div class="body-list mt-10">
        <template v-for="(item,index) in lists">
          <div
            :key="index"
            class="item-content"
          >
            <span class="mr-10">{{ item.name }}</span>
            <el-button
              :key="index"
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
    <AddStopDialog
      :visible="visibleStop"
      @cancel="(nv)=>handler('stop',nv)"
      @success="(nv)=>handler('stop',nv)"
    />
    <AddCheerDialog
      :visible="visibleCheer"
      @cancel="(nv)=>handler('cheer',nv)"
      @success="(nv)=>handler('cheer',nv)"
    />
  </div>
</template>

<script>
import AddStopDialog from './aStopDialog.vue'
import AddCheerDialog from './aCheerDialog.vue'

export default {
  components: {
    AddStopDialog,
    AddCheerDialog,
  },
  data() {
    return {
      visibleStop: false,
      visibleCheer: false,
      lists: [
        {
          name: 1111,
        },
        {
          name: 1111,
        },
      ],
    }
  },
  methods: {
    addList(type) {
      if (type === 'stop') {
        this.visibleStop = true
      } else {
        this.visibleCheer = true
      }
    },
    handler(type, list) {
      if (type === 'stop') {
        this.visibleStop = false
      } else {
        this.visibleCheer = false
      }
      this.lists = list
    },
  },
}
</script>

<style scoped>
.stop-content{
  padding: 35px;
}
.stop-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
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
