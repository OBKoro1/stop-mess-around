<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 15:18:00
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-10-23 17:06:31
 * FilePath     : /src/options/App/settingPage/CreateItem.vue
 * Description  : 新增摸鱼网站
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    append-to-body
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    :show-close="false"
    :before-close="resetFields"
    width="550px"
  >
    <div
      slot="title"
      class="dialog_title"
    >
      {{ useLanguageMessage('createFish') }}
    </div>
    <div class="form-class">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item
          prop="labelName"
          required
        >
          <span slot="label">{{ useLanguageMessage('fishName') }}: </span>
          <el-input
            v-model="ruleForm.labelName"
            class="input-class"
            :placeholder="useLanguageMessage('addFishName')"
          />
        </el-form-item>
        <el-form-item
          prop="site"
          required
        >
          <span slot="label">{{ useLanguageMessage('fishWebsite') }}: </span>
          <el-input
            v-model="ruleForm.site"
            class="input-class"
            autosize
            type="textarea"
            :placeholder="useLanguageMessage('addFishWebsite')"
          />
        </el-form-item>
        <el-form-item prop="tip">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('matchQuoteName')"
              placement="top"
            >
              <span>{{ useLanguageMessage('quoteName') }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model="ruleForm.tip"
            class="input-class"
            :placeholder="useLanguageMessage('nullQuoteName')"
          />
        </el-form-item>
        <el-form-item prop="time">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('websiteTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('closeTip') }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.time"
            :placeholder="useLanguageMessage('nullGloablTip')"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="checkoutStudy">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('openAutoTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('openAuto') }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.checkoutStudy"
            :placeholder="useLanguageMessage('nullOpenTip')"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="matchRule"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('fishRuleByURLTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('fishRuleByURL') }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.matchRule"
            label="includes"
          >
            {{ useLanguageMessage('includesRule') }}
          </el-radio>
          <el-radio
            v-model="ruleForm.matchRule"
            label="start"
          >
            {{ useLanguageMessage('startRule') }}
          </el-radio>
          <el-radio
            v-model="ruleForm.matchRule"
            label="strict"
          >
            {{ useLanguageMessage('strictRule') }}
          </el-radio>
        </el-form-item>
        <el-form-item
          prop="jump"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('jumpTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('jump') }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.jump"
            :label="true"
          >
            {{ useLanguageMessage('open') }}
          </el-radio>
          <el-radio
            v-model="ruleForm.jump"
            :label="false"
          >
            {{ useLanguageMessage('close') }}
          </el-radio>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.jump"
          prop="jumpUrl"
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('jumpUrlTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('jumpUrl') }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model="ruleForm.jumpUrl"
            class="input-class"
            :placeholder="useLanguageMessage('jumpUrlTip')"
          />
        </el-form-item>
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">
        {{ useLanguageMessage('cancel') }}
      </el-button>
      <el-button
        type="primary"
        @click="confirmFn(false)"
      >
        {{ useLanguageMessage('add') }}
      </el-button>
      <el-tooltip
        placement="top"
        :content="useLanguageMessage('appendTip')"
      >
        <el-button
          type="primary"
          @click="confirmFn(true)"
        >
          {{ useLanguageMessage('appendShare') }}
        </el-button>
      </el-tooltip>
    </div>
  </el-dialog>
</template>

<script>
import { itemProto } from '@/utils/Default'
import { siteTypeTypes } from '@/utils/types'

export default {
  name: 'CreateItem',
  props: {
    showCreateItem: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  inject: ['tableDataSpliceUpdate', 'getSetting', 'getTableData', 'settingUpdate', 'checkOutAppDialog'],
  data() {
    return {
      Setting: {},
      ruleForm: {
        labelName: '', // 摸鱼网站名字
        site: '', // 摸鱼网站地址
        matchRule: 'includes', // 摸鱼网址匹配规则 start/strict/includes
        time: undefined, // 是否立即关闭摸鱼网站
        checkoutStudy: undefined, // 定时自动开启
        jump: false, // 检测到摸鱼网址后 跳转到哪个页面
        jumpUrl: '', // 跳转页面
        open: true, // 是否检测该摸鱼网站
        tip: '', // 内卷提示
        closeTime: 0, // 啥时候关闭
      },
      rules: {
        labelName: [
          { required: true, message: this.useLanguageMessage('createRulesBylabelName'), trigger: 'blur' },
        ],
        site: [
          { required: true, message: this.useLanguageMessage('createRulesBySite'), trigger: 'blur' },
          {
            min: 8, message: this.useLanguageMessage('createRulesBySiteLen'), trigger: 'blur',
          },
        ],
        tip: [
          { message: this.useLanguageMessage('createRulesByTip'), trigger: 'blur' },
        ],
        jumpUrl: [
          { required: true, message: this.useLanguageMessage('createRulesByJumpUrl'), trigger: 'blur' },
          {
            min: 8, message: this.useLanguageMessage('createRulesByJumpUrlLen'), trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showCreateItem
      },
      set() {
        this.close()
      },
    },
  },
  watch: {
    // 初始化数据
    dialogVisible(val) {
      if (val) {
        this.initRuleForm()
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.openCreate()
    }, 500)
  },
  methods: {
    // 将全局设置放入新增中
    initRuleForm() {
      this.Setting = this.getSetting()
      itemProto.forEach((item) => {
        this.ruleForm[item] = this.Setting[item]
      })
    },
    // popup添加摸鱼网址
    openCreate() {
      this.Setting = this.getSetting()
      if (this.Setting.addSite !== '') {
        this.$emit('close', 'showCreateItem', true)
        this.ruleForm.site = this.Setting.addSite
        // 重置摸鱼网站
        this.Setting.addSite = ''
        this.settingUpdate(this.Setting)
      }
    },
    // 摸鱼网站是否添加过
    hasAdd(arr) {
      return arr.find((item) => item.site === this.ruleForm.site)
    },
    /**
     * @description: 点击添加按钮，添加摸鱼网站
     * @param {type} isOpenShare 是否打开分享摸鱼网站弹窗
     */
    confirmFn(isOpenShare) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const arr = this.getTableData()
          if (this.hasAdd(arr) === undefined) {
            // 添加到第一个
            const obj = JSON.parse(JSON.stringify(this.ruleForm))
            obj.siteType = siteTypeTypes.create
            // 添加到开头
            this.tableDataSpliceUpdate(0, 0, obj)
            this.$message.success(this.useLanguageMessage('addFishSuccess'))
            if (isOpenShare) {
              this.openShareDialog()
            } else {
              this.close()
            }
          } else {
            this.$message.error(this.useLanguageMessage('fishWebSiteTip'))
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.ruleForm.site = ''
      this.$refs.ruleForm.resetFields()
      this.$emit('close', 'showCreateItem', false)
    },
    resetFields(done) {
      this.$refs.ruleForm.resetFields()
      done()
    },
    /**
     * @description: 打开分享摸鱼网站弹窗
     */
    openShareDialog() {
      this.close()
      this.$nextTick(() => {
        this.checkOutAppDialog('shareSiteDialog', true)
      })
    },
  },
}
</script>

<style scoped>
.form-class {
  width: 90%;
}
</style>>
