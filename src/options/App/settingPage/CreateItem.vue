<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 15:18:00
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-06-16 15:56:46
 * FilePath     : /stop-mess-around/src/options/App/settingPage/CreateItem.vue
 * Description  : 新增摸鱼网站
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog :visible.sync="dialogVisible"
             :show-close="false"
             :before-close="resetFields"
             width="550px">
    <div class="dialog_title"
         slot="title">{{'新增摸鱼网站'}}</div>
    <div class="form-class">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="150px">
        <el-form-item prop="labelName"
                      required>
          <span slot="label">{{'摸鱼网站名'}}: </span>
          <el-input class="input-class"
                    :placeholder="'添加摸鱼网站名'"
                    v-model="ruleForm.labelName"></el-input>
        </el-form-item>
        <el-form-item prop="site"
                      required>
          <span slot="label">{{'摸鱼网址'}}: </span>
          <el-input class="input-class"
                    :placeholder="'添加摸鱼网址'"
                    v-model="ruleForm.site"></el-input>
        </el-form-item>
        <el-form-item prop="tip">
          <span slot="label">
            <el-tooltip :content="'为空默认使用全局内卷提示'"
                        placement="top">
              <span>{{'内卷提示'}}</span>
            </el-tooltip>
          </span>
          <el-input class="input-class"
                    v-model="ruleForm.tip"
                    :placeholder="'为空则为随机内卷提示'"></el-input>
        </el-form-item>
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
        <el-form-item prop="strict"
                      required>
          <span slot="label">
            <el-tooltip :content="'默认网址匹配为包含，只要包含这个网址则表示匹配到, 严格匹配网址必须一模一样，才能匹配到。'"
                        placement="top">
              <span>{{'网址严格相等'}}</span>
            </el-tooltip>
          </span>
          <el-radio v-model="ruleForm.strict"
                    :label="true">{{'开启'}}</el-radio>
          <el-radio v-model="ruleForm.strict"
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
        <el-form-item prop="open"
                      required>
          <span slot="label">
            <span>{{'是否启用'}}</span>
          </span>
          <el-radio v-model="ruleForm.open"
                    :label="true">{{'开启'}}</el-radio>
          <el-radio v-model="ruleForm.open"
                    :label="false">{{'关闭'}}</el-radio>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary"
                 @click="confirmFn">添 加</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'create-item',
  props: {
    showCreateItem: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  inject: ['tableDataSpliceUpdate', 'getSetting', 'getTableData'],
  data() {
    return {
      Setting: {},
      ruleForm: {
        labelName: '', // 摸鱼网站名字
        site: '', // 摸鱼网站地址
        strict: false, // 网站地址是否严格相等
        time: 0, // 是否立即关闭摸鱼网站
        jump: false, // 检测到摸鱼网址后 跳转到哪个页面
        jumpUrl: '', // 跳转页面
        open: true, // 是否检测该摸鱼网站
        tip: '', // 内卷提示
      },
      rules: {
        labelName: [
          { required: true, message: '请输入摸鱼网站名', trigger: 'blur' },
        ],
        site: [
          { required: true, message: '请输入摸鱼网址', trigger: 'blur' },
          {
            min: 8, message: '至少8个字符', trigger: 'blur',
          },
        ],
        tip: [
          { message: '请输入内卷提示', trigger: 'blur' },
        ],
        time: [
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
  watch: {
    // 初始化数据
    dialogVisible(val) {
      if (val) {
        this.Setting = this.getSetting()
        this.initRuleForm()
      }
    },
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
  methods: {
    // 将全局设置放入新增中
    initRuleForm() {
      Object.keys(this.Setting).forEach((key) => {
        if (key === 'tip') return // tip不赋值
        if (this.ruleForm[key] !== undefined) {
          this.ruleForm[key] = this.Setting[key]
        }
      })
    },
    // 摸鱼网站是否添加过
    hasAdd(arr) {
      return arr.find((item) => item.site === this.ruleForm.site)
    },
    confirmFn() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const arr = this.getTableData()
          if (this.hasAdd(arr) === undefined) {
            // 添加到第一个
            const obj = JSON.parse(JSON.stringify(this.ruleForm))
            // 添加到末尾
            this.tableDataSpliceUpdate(arr.length, 0, obj)
            // 判断
            this.close()
          } else {
            this.$message.error('摸鱼网址重复, 请重新输入')
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.$refs.ruleForm.resetFields()
      this.$emit('close', 'showCreateItem', false)
    },
    resetFields(done) {
      this.$refs.ruleForm.resetFields()
      done()
    },
  },
}
</script>

<style scoped>
.form-class {
  width: 90%;
}
</style>>
