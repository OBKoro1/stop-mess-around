<!--
 * Author       : OBKoro1
 * Date         : 2021-05-25 15:18:00
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-10-23 17:08:40
 * FilePath     : /src/options/App/table/EditorItem.vue
 * Description  : 编辑摸鱼网站
 * koroFileheader插件
 * Copyright (c) 2021 by OBKoro1, All Rights Reserved.
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    append-to-body
    :visible.sync="dialogVisible"
    :before-close="resetFields"
    width="550px"
  >
    <div
      slot="title"
      class="title"
    >
      {{ '编辑摸鱼网站' }}
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
          <span slot="label">{{ '摸鱼网站名' }}: </span>
          <el-input
            v-model="ruleForm.labelName"
            class="input-class"
            :placeholder="'添加摸鱼网站名'"
          />
        </el-form-item>
        <el-form-item
          prop="site"
          required
        >
          <span slot="label">{{ '摸鱼网址' }}: </span>
          <el-input
            v-model="ruleForm.site"
            class="input-class"
            :placeholder="'添加摸鱼网址'"
          />
        </el-form-item>
        <el-form-item prop="tip">
          <span slot="label">
            <el-tooltip
              :content="'检测到摸鱼网址显示的励志语录'"
              placement="top"
            >
              <span>{{ '励志语录' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model="ruleForm.tip"
            class="input-class"
            :placeholder="'为空则为随机励志语录'"
          />
        </el-form-item>
        <el-form-item prop="time">
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
            :placeholder="'为空则为全局设置的停留时间'"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="checkoutStudy">
          <span slot="label">
            <el-tooltip
              :content="'关闭检测后多少分钟后重新启用检测'"
              placement="top"
            >
              <span>{{ '自动开启' }}</span>
            </el-tooltip>
          </span>
          <el-input
            v-model.number="ruleForm.checkoutStudy"
            :placeholder="'为空则为全局设置的自动开启时间'"
            autocomplete="off"
          />
        </el-form-item>
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
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="close">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="confirmFn(false)"
      >
        保 存
      </el-button>
      <el-tooltip
        placement="top"
        :content="'保存修改,并打开分享摸鱼网站弹窗, 集成到插件的默认配置中, 利人利己, 让插件更好用'"
      >
        <el-button
          type="primary"
          @click="confirmFn(true)"
        >
          保存并分享集成到插件
        </el-button>
      </el-tooltip>
    </div>
  </el-dialog>
</template>

<script>
import { siteTypeTypes } from '@/utils/types'
import { itemSiteType } from '@/utils/tableListUtils'

export default {
  name: 'EditorItem',
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
  inject: ['updateArr', 'getTableData', 'checkOutAppDialog'],
  data() {
    return {
      ruleForm: {
        labelName: '', // 摸鱼网站名字
        site: '', // 摸鱼网站地址
        matchRule: 'includes', // 摸鱼网址匹配规则 start/strict/includes
        time: undefined, // 是否立即关闭摸鱼网站
        checkoutStudy: undefined, // 定时自动开启
        closeTime: 0, // 关闭的时间
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
          { message: '请输入励志语录', trigger: 'blur' },
        ],
        jumpUrl: [
          { required: true, message: '请输入跳转网址', trigger: 'blur' },
          {
            min: 8, message: '至少8个字符', trigger: 'blur',
          },
        ],
      },
      tableList: [],
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
        this.syncData()
      }
    },
  },
  methods: {
    // 初始化填入该摸鱼网站的配置
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
      this.tableList = this.getTableData()
      return this.tableList.find((item) => {
        // 编辑的这条链接 跳过
        if (item.site === this.item.row.site) {
          return false
        }
        return item.site === this.ruleForm.site
      })
    },
    confirmFn(isOpenShare) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.hasAdd() === undefined) {
            // 替换
            const obj = JSON.parse(JSON.stringify(this.ruleForm))
            if (obj.site !== this.item.row.site) {
              // site是否存在于默认摸鱼列表
              obj.siteType = itemSiteType(obj).type
            }
            if (obj.siteType === siteTypeTypes.default) {
              obj.siteType = siteTypeTypes.defaultEditor
            } else if (obj.siteType === siteTypeTypes.create) {
              obj.siteType = siteTypeTypes.createEditor
            }
            this.tableList.splice(this.item.index, 1) // 切割
            this.tableList.unshift(obj) // 插入
            this.updateArr(this.tableList)
            this.$message.success('修改摸鱼网站成功, 网站已前置到表格顶部~')
            if (isOpenShare) {
              this.openShareDialog()
            } else {
              this.close()
            }
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
.title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.form-class {
  width: 90%;
}
</style>>
