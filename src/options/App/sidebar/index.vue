<template>
  <div class="sidebar-content">
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
  </div>
</template>

<script>

export default {
  inject: [],
  data() {
    return {
      sidebarList: [
        {
          label: '摸鱼网站全局设置',
          url: '/config',
          icon: 'el-icon-s-tools',
        },
        {
          label: '反馈',
          url: '/feedback',
          icon: '',
        },
      ],
      activeItem: {
        label: '摸鱼网站全局设置',
        url: '/config',
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
  },
}
</script>

<style scoped>
.sidebar-content{
    display: flex;
    flex-direction: column;
    width: 220px
}
.title{
    padding: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
}
.label{
    margin-left: 10px;
}
</style>
