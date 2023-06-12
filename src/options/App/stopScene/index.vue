<template>
  <div class="stop-content">
    <div class="flex-column mb-20">
      <div class="title-body-1 mb-10 stop-header">
        <span>阻止网站</span>
        <div>
          <el-button
            type="primary"
            size="medium"
            @click="addList('set')"
          >
            一键设置
          </el-button>
        </div>
      </div>
      <div class="title-body-2 text-color-1">
        按计划或者按照配置阻止网站
      </div>
    </div>
    <div class="stop-action mt-20 mb-20">
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
      <div
        v-if="blockSite.length"
        class="body-list mt-10"
      >
        <template v-for="(item,index) in blockSite">
          <div
            :key="index"
            class="item-content"
          >
            <span class="mr-10">{{ item.labelName }}</span>
            <el-button
              :key="index"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              class="cursor-pointer"
              @click="onDel(item)"
            />
          </div>
        </template>
      </div>
      <el-empty
        v-else
        description="暂无网站"
      />
    </div>
    <AddStopDialog
      :visible="visibleStop"
      :config="config"
      @cancel="()=>handlerCancle('stop')"
      @success="(nv)=>handlerSuccess('stop',nv)"
    />
    <AddCheerDialog
      :visible="visibleCheer"
      :config="config"
      @cancel="(nv)=>handlerCancle('cheer',nv)"
    />
    <AddSetDialog
      :visible="visibleSet"
      :config="config"
      @cancel="(nv)=>handlerCancle('set',nv)"
      @success="(nv)=>handlerSuccess('set',nv)"
    />
  </div>
</template>

<script>
import AddStopDialog from './aStopDialog.vue'
import AddCheerDialog from './aCheerDialog.vue'
import AddSetDialog from './aSetDialog.vue'

export default {
  components: {
    AddStopDialog,
    AddCheerDialog,
    AddSetDialog,
  },
  data() {
    return {
      visibleStop: false,
      visibleCheer: false,
      visibleSet: false,
    }
  },
  computed: {
    config() {
      return this.$root.$options.store.state.config
    },
    blockSite() {
      return this.config.blockSite || []
    },
  },
  methods: {
    addList(type) {
      if (type === 'stop') {
        this.visibleStop = true
      } else if (type === 'cheer') {
        this.visibleCheer = true
      } else if (type === 'set') {
        this.visibleSet = true
      }
    },
    handlerCancle(type) {
      if (type === 'stop') {
        this.visibleStop = false
      } else if (type === 'cheer') {
        this.visibleCheer = false
      } else if (type === 'set') {
        this.visibleSet = false
      }
    },
    handlerSuccess(type) {
      if (type === 'stop') {
        this.visibleStop = false
      } else if (type === 'cheer') {
        this.visibleCheer = false
      } else if (type === 'set') {
        this.visibleSet = false
      }
    },
    async onDel(item) {
      const list = this.blockSite.filter((t) => t.site !== item.site)
      const configItem = this.config.defaultStops.find((t) => t.site === item.site)
      configItem.checked = !configItem.checked
      await this.$root.$options.store.dispatch('asyncUpdateConfig', [list, 'blockSite'])
      await this.$root.$options.store.dispatch('asyncUpdateConfig', [this.config.defaultStops, 'defaultStops'])
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
