<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 22:45:36
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-06-15 15:12:29
 * FilePath     : /stop-mess-around/src/options/App/settingPage/Setting.vue
 * Description  : 全局设置
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog :visible.sync="dialogVisible"
             width="550px"
             :before-close="resetFields">
    <div class="dialog_title"
         slot="title">{{'设置'}}</div>
    <div class="form-class">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="150px">
        <el-form-item prop="time"
                      required>
          <span slot="label">
            <el-tooltip :content="'检测到摸鱼网址后，停留几秒关闭网页'"
                        placement="top">
              <span>{{'停留几秒'}}</span>
            </el-tooltip>
          </span>
          <el-input v-model.number="ruleForm.time"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkoutStudy"
                      required>
          <span slot="label">
            <el-tooltip :content="'当需要放松时,一键关闭所有摸鱼网站检测，间隔几分钟将再次开启检测'"
                        placement="top">
              <span>{{'自动检测'}}</span>
            </el-tooltip>
          </span>
          <el-input v-model.number="ruleForm.checkoutStudy"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="open"
                      required>
          <span slot="label">
            <el-tooltip :content="'新增摸鱼网站时,是否自动启用'"
                        placement="top">
              <span>{{'是否启用检测'}}</span>
            </el-tooltip>
          </span>
          <el-radio v-model="ruleForm.open"
                    :label="true">{{'开启'}}</el-radio>
          <el-radio v-model="ruleForm.open"
                    :label="false">{{'关闭'}}</el-radio>
        </el-form-item>
        <el-form-item prop="jump"
                      required>
          <span slot="label">
            <el-tooltip :content="'网址匹配后，不关闭页面，跳转到其他页面'"
                        placement="top">
              <span>{{'跳转'}}</span>
            </el-tooltip>
          </span>
          <el-radio v-model="ruleForm.jump"
                    :label="true">{{'开启'}}</el-radio>
          <el-radio v-model="ruleForm.jump"
                    :label="false">{{'关闭'}}</el-radio>
        </el-form-item>
        <el-form-item prop="jumpUrl"
                      v-if="ruleForm.jump">
          <span slot="label">
            <el-tooltip :content="'为空则使用全局跳转链接'"
                        placement="top">
              <span>{{'关闭页面跳转链接'}}</span>
            </el-tooltip>
          </span>
          <el-input class="input-class"
                    v-model="ruleForm.jumpUrl"
                    :placeholder="'为空则使用全局跳转链接'"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer"
          class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary"
                 @click="confirmFn">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'Setting',
  inject: ['getSetting', 'settingUpdate'],
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
  width: 90%;
}
</style>
