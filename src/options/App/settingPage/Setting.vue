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
      {{ '设置' }}
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
              :content="'网址摸鱼网址匹配规则: 包含=> 包含,通常输入一个域名即可, 开头全等 => 前面的必须一模一样，严格相等=>一模一样'"
              placement="top"
            >
              <span>{{ '摸鱼网址匹配规则' }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.matchRule"
            label="includes"
          >
            {{ '包含' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.matchRule"
            label="start"
          >
            {{ '开头全等' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.matchRule"
            label="strict"
          >
            {{ '严格相等' }}
          </el-radio>
        </el-form-item>
        <el-form-item
          prop="checkoutStudy"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'当需要放松时,一键关闭所有摸鱼网站检测，间隔几分钟将再次开启检测'"
              placement="top"
            >
              <span>{{ '一键开启全局休息' }}</span>
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
              :content="'匹配摸鱼网站后, 如果未点击休息一下，将在倒计时后关闭页面, 设置成0则关闭该功能'"
              placement="top"
            >
              <span>{{ '匹配后倒计时关闭' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.matchClosePage"
            min="0"
            class="input-width"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="time"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'点击关闭弹窗后, 点击关闭停留几秒关闭网页'"
              placement="top"
            >
              <span>{{ '点击关闭停留几秒' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.time"
            min="0"
            class="input-width"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="jump"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'网址匹配后，不关闭页面，跳转到其他页面'"
              placement="top"
            >
              <span>{{ '跳转' }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.jump"
            :label="true"
          >
            {{ '开启' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.jump"
            :label="false"
          >
            {{ '关闭' }}
          </el-radio>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.jump"
          prop="jumpUrl"
        >
          <span slot="label">
            <el-tooltip
              :content="'为空则使用全局跳转链接'"
              placement="top"
            >
              <span>{{ '关闭页面跳转链接' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model="ruleForm.jumpUrl"
            class="input-class"
            :placeholder="'为空则使用全局跳转链接'"
          />
        </el-form-item>
        <el-form-item
          prop="log"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'插入网页的代码是否开启日志，方便定位问题'"
              placement="top"
            >
              <span>{{ '网页日志' }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.log"
            :label="true"
          >
            {{ '开启' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.log"
            :label="false"
          >
            {{ '关闭' }}
          </el-radio>
        </el-form-item>
        <el-form-item
          prop="log"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'关闭摸鱼检测后，网站的右侧是否展示摸鱼提示，以及关闭右侧今日休息时间展示但仍显示倒计时和摸鱼表格'"
              placement="top"
            >
              <span>{{ '右侧摸鱼提示' }}</span>
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
              :content="'在Github仓库中内嵌按钮, 通过在线版本的 VS Code 来打开 GitHub 上的代码'"
              placement="top"
            >
              <span>{{ '查看代码功能' }}</span>
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
              :content="'反馈问题必须复制插件数据'"
              placement="top"
            >
              <span>{{ '插件数据与反馈' }}</span>
            </el-tooltip>
          </span>
          <el-button
            class="button-margin-right"
            size="small"
            type="primary"
            @click="jumpCopyPluginData"
          >
            打开插件数据与反馈问题弹窗
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmFn"
      >保 存</el-button>
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
        jumpUrl: [
          { required: true, message: '请输入跳转网址', trigger: 'blur' },
          {
            min: 8, message: '至少8个字符', trigger: 'blur',
          },
        ],
      },
      rightTipOptions: [
        {
          label: '开启',
          value: 'open',
        },
        {
          label: '只展示倒计时，不展示休息统计',
          value: 'closeRestTimeStatistics',
        },
        {
          label: '关闭',
          value: 'close',
        },
      ],
      lookCodeOptions: [
        {
          label: '开启',
          value: 'open',
        },
        {
          label: '关闭',
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
