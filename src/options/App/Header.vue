<template>
  <div class="header align-center">
    <div class="header-left align-center">
      <img src="../../../public/img/origin.jpeg"
           class="header-img"
           alt="">
      <div class="header-plugin cursor-pointer">
        <h2 @click="utils.jumpUrl(NET.GITHUBREPO)"> stop-mess-around(停止下意识摸鱼)</h2>
        <span class="cursor-pointer"
              @click="utils.jumpUrl(NET.CHANGELOG)">{{ getVersion() }}</span>
      </div>
      <div class="author cursor-pointer"
           @click="utils.jumpUrl(NET.MYSITE)">by OBKoro1</div>
    </div>

    <el-button type="text"
               @click="openSponsorship"
               size="medium"
               class="dropdown-color marginRL">
      {{'请我喝杯水吧😘'}}
    </el-button>
    <el-button type="text"
               @click="utils.jumpUrl(NET.GITHUBREPO)"
               size="medium"
               class="dropdown-color marginRL">
      使用文档
    </el-button>

    <img alt="GitHub Repo stars"
         @click="utils.jumpUrl(NET.GITHUBREPO)"
         class="header-btns-star cursor-pointer"
         src="https://img.shields.io/github/stars/OBKoro1/stop-mess-around?style=social">
    <el-dialog :visible.sync="sponsorship"
               :close-on-click-modal="false"
               :show-close="false"
               width="30%">
      <div class="dialog_title"
           slot="title">{{'如果对你有帮助, 那就请我喝杯水吧😘'}}</div>
      <span class="obkoro1-sponsorship-span">十块八块不嫌多，三块五块也是爱 😘</span>
      <img src="../../../public/img/obkoro1-sponsorship.jpg"
           class="obkoro1-sponsorship"
           alt="">
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="confirmSponsorship('no')">狠心拒绝</el-button>
        <el-button @click="confirmSponsorship('yes')">请你喝了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OptionsHeader',
  inject: ['getSetting', 'settingUpdate'],
  data() {
    return {
      sponsorship: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.sponsorshipShow()
    }, 2000)
  },
  methods: {
    getVersion() {
      const manifestData = chrome.runtime.getManifest()
      return manifestData.version
    },
    // 自动显示赞赏
    sponsorshipShow() {
      this.Settig = this.getSetting()
      if (this.Settig.sponsorshipTime === 'show') {
        this.sponsorship = true
        this.resetSponsorshipShow()
        return
      }
      const now = Date.now()
      // 两周显示一次赞赏
      const isMoreTime = this.Settig.sponsorshipTime + 1000 * 60 * 60 * 24 * 14
      if (isMoreTime < now) {
        this.sponsorship = true
        this.resetSponsorshipShow()
      }
    },
    // 重置赞赏时间
    resetSponsorshipShow() {
      const now = Date.now()
      this.Settig.sponsorshipTime = now
      this.settingUpdate(this.Settig)
    },
    openSponsorship() {
      this.sponsorship = true
    },
    confirmSponsorship(type) {
      if (type === 'yes') {
        this.$notify({
          title: '感谢',
          message: '谢谢你请我喝水，特别爱你, 祝你天天开心，万事如意😘',
          type: 'success',
          duration: 12000,
        })
      } else {
        this.$notify({
          title: '可惜！',
          message: '少喝一杯水，渴不死, 买卖不成仁义在 😊',
          duration: 8000,
        })
      }
      this.resetSponsorshipShow()
      this.sponsorship = false
    },
  },
}
</script>

<style scoped>
.dropdown-color {
  color: #fff;
}
.header {
  padding: 10px 0 10px 15px;
  background: #855f16;
}
.header-left {
  justify-content: space-between;
}
.header-plugin {
  text-align: right;
}
.header-btns {
  margin-right: 15px;
}
.header-btns-star {
  width: 95px;
}
.author {
  margin: 10px 8px 10px 10px;
}
.header-img {
  height: 40px;
  display: inline-block;
  margin-right: 10px;
}
.obkoro1-sponsorship-span {
  font-size: 16px;
}
.obkoro1-sponsorship {
  width: 100%;
}
</style>>
