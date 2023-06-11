<template>
  <div class="header align-center">
    <el-button
      type="text"
      size="medium"
      class="dropdown-color marginRL"
      @click="openSponsorship"
    >
      {{ utils.getLanguageMessage('sponsor') }}
    </el-button>
    <el-button
      type="text"
      size="medium"
      class="dropdown-color marginRL"
      @click="utils.jumpUrl(NET.DOCS)"
    >
      {{ utils.getLanguageMessage('useDoc') }}
    </el-button>
    <img
      alt="GitHub Repo stars"
      class="header-btns-star cursor-pointer"
      src="https://img.shields.io/github/stars/OBKoro1/stop-mess-around?style=social"
      @click="utils.jumpUrl(NET.GITHUBREPO)"
    >
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="sponsorship"
      :show-close="false"
      width="30%"
    >
      <div
        slot="title"
        class="dialog_title"
      >
        {{ utils.getLanguageMessage('sponsorship') }}
      </div>
      <div class="dialog-font">
        {{ utils.getLanguageMessage('sponsorOne') }}
      </div>
      <div class="dialog-font">
        {{ utils.getLanguageMessage('sponsorTwo') }}
      </div>
      <div class="dialog-font">
        {{ utils.getLanguageMessage('sponsorThree') }}
      </div>
      <div class="dialog-font">
        {{ utils.getLanguageMessage('sponsorFour') }}
      </div>
      <div class="dialog-font">
        {{ utils.getLanguageMessage('sponsorFive') }}
      </div>
      <img
        src="/img/pay.jpg"
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
        >
          {{ utils.getLanguageMessage('nextText') }}
        </el-button>
        <el-button
          type="primary"
          :disabled="disabledSponsorship"
          @click="confirmSponsorship('yes')"
        >
          {{ utils.getLanguageMessage('yesText') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      sponsorship: false,
      disabledSponsorship: true,
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
  methods: {
    getVersion() {
      const manifestData = chrome.runtime.getManifest()
      return `v${manifestData.version}`
    },
    openSponsorship() {
      this.sponsorship = true
    },
    confirmSponsorship(type) {
      if (type === 'yes') {
        this.$notify({
          title: this.useLanguageMessage('yesTitle'),
          message: this.useLanguageMessage('yesMsg'),
          type: 'success',
          showClose: false,
          duration: 12000,
        })
      } else {
        this.$notify({
          title: this.useLanguageMessage('nextTitle'),
          message: this.useLanguageMessage('nextMsg'),
          showClose: false,
          duration: 8000,
        })
      }
      this.sponsorship = false
    },
  },
}
</script>

<style scoped>
.dropdown-color {
  color: #000;
}
.dialog-font {
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 10px;
}
.header {
  padding: 10px 0 10px 15px;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  height: 65px;
  border-bottom: 1px solid  rgb(238, 238, 238);
}
.header-btns {
  margin-right: 15px;
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
