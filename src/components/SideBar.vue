<template>
  <div class="sidebar-content">
    <div class="sider-header">
      <img
        src="/img/origin.jpeg"
        class="header-img"
        alt=""
        @click="utils.jumpUrl(NET.CHROMESTORE)"
      >
      <div class="header-plugin cursor-pointer">
        <h2 @click="utils.jumpUrl(NET.GITHUBREPO)">
          {{ utils.getLanguageMessage('pluginName') }}
        </h2>
        <span
          class="cursor-pointer"
          @click="utils.jumpUrl(NET.RELEASES)"
        >{{ getVersion() }}</span>
        <span
          class="author cursor-pointer"
          @click="utils.jumpUrl(NET.MYSITE)"
        >  by OBKoro1</span>
      </div>
    </div>
    <template v-for="(item,index) in sidebarList">
      <p
        :key="index"
        class="title"
        :style="{color:`${activeItem.label === item.label ? '#409EFF':'rgba(0,0,0,.64)'}`}"
        @click="onEnterUrl(item)"
      >
        <i :class="item.icon" />
        <span class="label">{{ item.label }}</span>
      </p>
    </template>
    <p class="title">
      <span class="mr-10">开启</span>
      <el-switch v-model="openAll" />
    </p>
  </div>
</template>

<script>

export default {
  inject: [],
  data() {
    return {
      openAll: true,
      sidebarList: [
        {
          label: '停止瞎逛',
          url: '/stop',
          icon: 'el-icon-s-release',
        },
        {
          label: '专注模式',
          url: '/focus',
          icon: 'el-icon-s-tools',
        },
        {
          label: '任务清单',
          url: '/todolist',
          icon: 'el-icon-s-order',
        },
      ],
      activeItem: {
        label: '停止摸鱼网站',
        url: '/stop',
      },
    }
  },
  methods: {
    onEnterUrl(item) {
      this.activeItem = item
      this.$router.push({
        path: item.url,
      })
    },
    getVersion() {
      const manifestData = chrome.runtime.getManifest()
      return `v${manifestData.version}`
    },
  },
}
</script>

<style scoped>
.sidebar-content{
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 100%;
    border-right:1px solid rgb(238, 238, 238);
}
.sider-header{
    height: 65px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.header-img {
  height: 40px;
  display: inline-block;
  margin-right: 10px;
}
.title{
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
}
.label{
    margin-left: 10px;
}
</style>
