<template>
  <div class="main_app">
    <div class="main-header">
      <OptionsHeader />
    </div>
    <div class="main-content">
      <div class="main-side">
        <Sidebar />
      </div>
      <div class="main-view">
        <router-view />
      </div>
    </div>
    <!-- <ShareSiteToGithubVue :show-dialog="shareSiteDialog" /> -->
  </div>
</template>

<script>
import OptionsHeader from './Header.vue'
// import ShareSiteToGithubVue from './share/ShareSiteToGithub.vue'
import Sidebar from './sidebar/index.vue'

export default {
  name: 'OptionsApp',
  provide() {
    return {
      getSetting: () => this.Setting,
      settingUpdate: this.settingUpdate,
    }
  },
  components: {
    OptionsHeader,
    // ShareSiteToGithubVue,
    Sidebar,
  },
  data() {
    return {
      Setting: {},
    // 分享摸鱼网站，集成到插件中
    //   shareSiteDialog: false,
    }
  },
  async mounted() {
    ({ setting: this.Setting } = await this.utils.getData())
  },
  methods: {
    settingUpdate(obj) {
      this.Setting = JSON.parse(JSON.stringify(obj))
      return this.utils.updateStorageData(this.Setting, this.NET.GLOBALSETTING)
    },

  },
}
</script>

<style>
.main_app {
  min-height: 100vh;
  min-width: 100%;
  overflow: hidden;
}
.main-content {
  width: 100%;
  display: flex;
  padding: 12px;
  margin-top: 65px;
}
.main-side{
  position: fixed;
}
.main-view{
  width: calc(100% - 220px);
  margin-left: 220px;
  overflow: auto;
  overflow-x: hidden;
}
.main-header{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
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
