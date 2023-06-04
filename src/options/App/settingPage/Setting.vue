<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 22:45:36
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-10-30 17:27:54
 * FilePath     : /src/options/App/settingPage/Setting.vue
 * Description  : 全局设置
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    append-to-body
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    width="550px"
    :before-close="resetFields"
  >
    <div
      slot="title"
      class="dialog_title"
    >
      {{ useLanguageMessage('set') }}
    </div>
    <div class="form-class">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item
          prop="matchRule"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('mathRuleTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('matchRule') }}</span>
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
          prop="checkoutStudy"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('checkoutStudy')"
              placement="top"
            >
              <span>{{ useLanguageMessage('resetKey') }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.checkoutStudy"
            class="input-width"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="matchClosePage"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('mathClosePageTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('matchClosePage') }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.matchClosePage"
            min="0"
            class="input-width"
            autocomplete="off"
            :placeholder="useLanguageMessage('matchClosePlaceholder')"
          />
        </el-form-item>
        <el-form-item
          prop="log"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('logTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('log') }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.log"
            :label="true"
          >
            {{ useLanguageMessage('open') }}
          </el-radio>
          <el-radio
            v-model="ruleForm.log"
            :label="false"
          >
            {{ useLanguageMessage('close') }}
          </el-radio>
        </el-form-item>
        <el-form-item
          prop="log"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('rightFishTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('rightFish') }}</span>
            </el-tooltip>
          </span>
          <el-select
            v-model="ruleForm.showRightTip"
            class="input-width"
          >
            <el-option
              v-for="item in rightTipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="matchRule"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('viewGithubTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('viewCode') }}</span>
            </el-tooltip>
          </span>
          <el-select
            v-model="ruleForm.lookCode"
            class="input-width"
          >
            <el-option
              v-for="item in lookCodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="feedback">
          <span slot="label">
            <el-tooltip
              :content="useLanguageMessage('feedbackTip')"
              placement="top"
            >
              <span>{{ useLanguageMessage('feedback') }}</span>
            </el-tooltip>
          </span>
          <el-button
            class="button-margin-right"
            size="small"
            type="primary"
            @click="jumpCopyPluginData"
          >
            {{ useLanguageMessage('openFeedback') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">{{ useLanguageMessage('cancel') }}</el-button>
      <el-button
        type="primary"
        @click="confirmFn"
      >
        {{ useLanguageMessage('save') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'SettingPage',
  inject: ['getSetting', 'settingUpdate', 'updateArr', 'initData'],
  props: {
    showDialog: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ruleForm: {
      },
      rules: {
        time: [
          {
            required: true, type: 'number', message: '必须为数字值', trigger: 'blur',
          },
        ],
        matchClosePage: [
          {
            required: true, type: 'number', message: '必须为数字值', trigger: 'blur',
          },
        ],
        checkoutStudy: [
          {
            required: true, type: 'number', message: '必须为数字值', trigger: 'blur',
          },
        ],
      },
      rightTipOptions: [
        {
          label: this.useLanguageMessage('open'),
          value: 'open',
        },
        {
          label: this.useLanguageMessage('closeRestTimeStatistics'),
          value: 'closeRestTimeStatistics',
        },
        {
          label: this.useLanguageMessage('close'),
          value: 'close',
        },
      ],
      lookCodeOptions: [
        {
          label: this.useLanguageMessage('open'),
          value: 'open',
        },
        {
          label: this.useLanguageMessage('close'),
          value: 'off',
        },
      ],
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.showDialog
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
        this.ruleForm = this.getSetting()
      }
    },
  },
  methods: {
    jumpCopyPluginData() {
      this.close()
      this.$nextTick(() => {
        this.$emit('showCopyDataFn')
      })
    },
    close() {
      this.$emit('close', 'showSetting', false)
    },
    resetFields(done) {
      done()
    },
    confirmFn() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.settingUpdate(this.ruleForm)
          this.$message.success('设置更新成功~')
          this.close()
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.form-class {
  max-height: 470px;
  overflow: auto;
  overflow-x: hidden;
}
.input-width{
  width: 260px;
}
.button-margin-right {
  margin-right: 10px;
}
</style>
