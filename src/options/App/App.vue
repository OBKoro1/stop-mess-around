<template>
  <div class="main_app">
    <div class="main-side">
      <Sidebar />
    </div>
    <div class="main-view">
      <div class="view-header">
        <Header />
      </div>
      <div class="view-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/SideBar.vue'

export default {
  name: 'OptionsApp',
  components: {
    Header,
    Sidebar,
  },
}
</script>

<style>
.main_app {
  min-height: 100vh;
  width: 100%;
  display: flex;
}
.main-view{
  width: calc(100% - 260px);
  overflow: hidden;
}
.view-header{
  width: 100%;
}
.view-content{
  max-height: 800px;
  overflow: auto;
}
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 10%);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: hsla(0, 0%, 100%, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
}

/* element-ui 弹窗遮罩的问题 */
.v-modal {
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
}
</style>>
