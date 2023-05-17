<template>
  <el-dialog
    width="50%"
    :visible.sync="dialogVisible"
    append-to-body
    :before-close="closeBefore"
  >
    <div
      slot="title"
      class="dialog_title"
    >
      {{ '选择恢复已删除的励志语录' }}
    </div>
    <div class="random-content">
      <el-table
        :data="showList"
        tooltip-effect="dark"
        stripe
        row-key="site"
        max-height="1000"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="已删除的励志语录"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <p>{{ scope.row }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeBefore">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmFn"
      >恢 复</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { useDefalutList } from '@/utils/Default'

const { tipArr } = useDefalutList()

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    activeName: {
      type: String,
      default: 'tipArr',
    },
  },
  inject: ['getSetting', 'tipUpdateSettingArr'],
  data() {
    return {
      defaultTipArr: tipArr,
      tipArr: [],
      showList: [],
      chooseList: [],
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getList()
      }
    },
  },
  methods: {
    closeBefore() {
      this.$emit('close', 'resetTipDialogShow', false)
    },
    getList() {
      this.setting = this.getSetting()
      this.tipArr = this.setting.tipArr
      // 获取已删除的励志语录
      this.showList = this.defaultTipArr.filter((item) => !this.tipArr.includes(item))
    },

    handleSelectionChange(val) {
      this.chooseList = val
    },
    confirmFn() {
      if (this.chooseList.length === 0) {
        this.$message.warning('请选择要恢复的励志语录')
        return
      }
      this.tipArr = [...this.tipArr, ...this.chooseList]
      this.tipUpdateSettingArr(this.tipArr, this.activeName)
      this.closeBefore()
    },
  },

}
</script>

<style scoped>
.random-content {
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
}
</style>
