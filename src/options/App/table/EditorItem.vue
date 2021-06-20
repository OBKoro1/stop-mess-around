<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 15:18:00
 * LastEditors  : OBKoro1
 * LastEditTime : 2021-06-16 15:56:56
 * FilePath     : /stop-mess-around/src/options/App/table/EditorItem.vue
 * Description  : 编辑摸鱼网站
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog :visible.sync="dialogVisible"
             :before-close="resetFields"
             width="550px">
    <div class="title"
         slot="title">{{'编辑摸鱼网站'}}</div>
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
            <el-tooltip :content="'检测到摸鱼网址显示的提示'"
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
                 @click="confirmFn">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'editor-item',
  props: {
    showCreateItem: {
      require: true,
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
  inject: ['tableDataSpliceUpdate', 'getTableData'],
  data() {
    return {
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
        this.syncData()
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
    // 同步数组配置
    syncData() {
      const obj = JSON.parse(JSON.stringify(this.item.row))
      for (const key in this.ruleForm) {
        if (obj[key] === undefined) {
          obj[key] = this.ruleForm[key]
        }
      }
      this.ruleForm = obj
    },
    // 摸鱼网站是否添加过
    hasAdd() {
      const arr = this.getTableData()
      return arr.find((item) => {
        // 编辑的这条链接 跳过
        if (item.site === this.item.row.site) {
          return false
        }
        return item.site === this.ruleForm.site
      })
    },
    confirmFn() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.hasAdd() === undefined) {
            // 替换
            const obj = JSON.parse(JSON.stringify(this.ruleForm))
            this.tableDataSpliceUpdate(this.item.index, 1, obj)
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
      this.$emit('closeEditor')
    },
    resetFields(done) {
      this.$refs.ruleForm.resetFields()
      done()
    },
  },
}
</script>

<style scoped>
.title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.form-class {
  width: 90%;
}
</style>>
