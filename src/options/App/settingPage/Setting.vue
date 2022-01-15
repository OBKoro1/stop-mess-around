<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 22:45:36
 * LastEditors  : OBKoro1
 * LastEditTime : 2022-01-15 13:32:45
 * FilePath     : /stop-mess-around/src/options/App/settingPage/Setting.vue
 * Description  : 全局设置
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
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
          prop="time"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'检测到摸鱼网址后，停留几秒关闭网页'"
              placement="top"
            >
              <span>{{ '停留几秒' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.time"
            class="input-width"
            autocomplete="off"
          />
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
              <span>{{ '自动检测' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.checkoutStudy"
            class="input-width"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="matchRule"
          required
        >
          <span slot="label">
            <el-tooltip
              :content="'网址匹配规则: 开头全等 => 前面的必须一模一样，包含=> 包含即可，严格相等=>一模一样'"
              placement="top"
            >
              <span>{{ '匹配规则' }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.matchRule"
            label="start"
          >
            {{ '开头全等' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.matchRule"
            label="includes"
          >
            {{ '包含' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.matchRule"
            label="strict"
          >
            {{ '严格相等' }}
          </el-radio>
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
              :content="'关闭摸鱼检测后，网站的右侧是否展示摸鱼时间以及倒计时提示'"
              placement="top"
            >
              <span>{{ '右侧摸鱼提示' }}</span>
            </el-tooltip>
          </span>
          <el-radio
            v-model="ruleForm.showRightTip"
            :label="true"
          >
            {{ '开启' }}
          </el-radio>
          <el-radio
            v-model="ruleForm.showRightTip"
            :label="false"
          >
            {{ '关闭' }}
          </el-radio>
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
        <el-form-item prop="clear">
          <span slot="label">
            <el-tooltip
              :content="'一键恢复默认设置。'"
              placement="top"
            >
              <span>{{ '重置' }}</span>
            </el-tooltip>
          </span>
          <el-popconfirm
            title="确认清空？"
            @confirm="clearSetting('clearList')"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              清空摸鱼列表
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确认重置？"
            @confirm="clearSetting('clearSetting')"
          >
            <el-button
              slot="reference"
              class="button-margin-right"
              size="small"
              type="danger"
            >
              重置设置
            </el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确认重置？"
            @confirm="clearSetting('statisticsTime')"
          >
            <el-button
              slot="reference"
              size="small"
              type="danger"
            >
              重置摸鱼统计
            </el-button>
          </el-popconfirm>
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
      lookCodeOptions: [
        {
          label: 'github.dev',
          value: 'github.dev',
        },
        {
          label: 'github1s',
          value: 'github1s.com',
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
    close() {
      this.$emit('close', 'showSetting', false)
    },
    resetFields(done) {
      this.$refs.ruleForm.resetFields()
      done()
    },
    // 清空设置
    clearSetting(type) {
      this.close()
      this.initData(type)
    },
    confirmFn() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.settingUpdate(this.ruleForm)
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
