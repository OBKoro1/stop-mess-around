<template>
  <div class="header align-center">
    <div class="header-left align-center">
      <img
        src="../../../public/img/origin.jpeg"
        class="header-img"
        alt=""
        @click="utils.jumpUrl(NET.CHROMESTORE)"
      >
      <div class="header-plugin cursor-pointer">
        <h2 @click="utils.jumpUrl(NET.GITHUBREPO)">
          stop-mess-around(停止下意识摸鱼)
        </h2>
        <span
          v-if="development"
          class="cursor-pointer header-btns"
          @click="utils.jumpUrl(NET.CHROMESTORE)"
        >本地安装,无法自动更新，跳转Chrome商店安装</span>
        <span
          class="cursor-pointer"
          @click="utils.jumpUrl(NET.RELEASES)"
        >{{ getVersion() }}</span>
      </div>
      <div
        class="author cursor-pointer"
        @click="utils.jumpUrl(NET.MYSITE)"
      >
        by OBKoro1
      </div>
    </div>

    <el-button
      type="text"
      size="medium"
      class="dropdown-color marginRL"
      @click="openSponsorship"
    >
      {{ '用爱发电，求赞助😭' }}
    </el-button>
    <el-button
      type="text"
      size="medium"
      class="dropdown-color marginRL"
      @click="utils.jumpUrl(NET.DOCS)"
    >
      使用文档
    </el-button>

    <img
      alt="GitHub Repo stars"
      class="header-btns-star cursor-pointer"
      src="https://img.shields.io/github/stars/OBKoro1/stop-mess-around?style=social"
      @click="utils.jumpUrl(NET.GITHUBREPO)"
    >
    <el-dialog
      :visible.sync="sponsorship"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <div
        slot="title"
        class="dialog_title"
      >
        {{ '求赞助' }}
      </div>
      <div class="dialog-font">
        开源不易，本插件的开发与维护全都是利用业余时间。
      </div>
      <div class="dialog-font">
        开源工作对我来说就是用爱发电，从18年开始在社区开源到现在，可以说基本没有收益。
      </div>
      <div class="dialog-font">
        如果觉得这个效率工具还不错,对你有所帮助，就赞助支持一下吧。
      </div>
      <img
        src="../../../public/img/pay.jpg"
        class="obkoro1-sponsorship"
        alt=""
      >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :disabled="disabledSponsorship"
          @click="confirmSponsorship('no')"
        >下次一定</el-button>
        <el-button
          type="primary"
          :disabled="disabledSponsorship"
          @click="confirmSponsorship('yes')"
        >请你喝了</el-button>
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
      disabledSponsorship: true,
      development: false,
    }
  },
  watch: {
    sponsorship(val) {
      if (val) {
        // 像 Tampermonkey 一样出现赞赏间隔几秒再消失
        setTimeout(() => {
          this.disabledSponsorship = false
        }, 5000)
      } else {
        this.disabledSponsorship = true
      }
    },
  },
  mounted() {
    // 本地提示
    if (process.env.NODE_ENV === 'development') {
      this.development = true
      console.log('本地安装，无法自动更新，点击右上角跳转Chrome商店安装')
    }
    setTimeout(() => {
      this.sponsorshipShow()
    }, 500)
  },
  methods: {
    getVersion() {
      const manifestData = chrome.runtime.getManifest()
      return `v${manifestData.version}`
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
          title: '感谢你的肯定',
          message: '谢谢你的赞助，这下我更有动力坚持开源工作了，可以给你提供更好的工具了😘',
          type: 'success',
          showClose: false,
          duration: 12000,
        })
      } else {
        this.$notify({
          title: '下次一定',
          message: '呜呜呜, 对于开源工作我只能继续爱发电了😭',
          showClose: false,
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
.dialog-font {
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 10px;
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
