<template>
  <div class="random-content">
    <el-table
      ref="multipleTable"
      stripe
      :data="tipArr"
      style="width: 100%"
      @selection-change="handleTipSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        :label="useLanguageMessage('tipArrTipColumn')"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <p>{{ scope.row }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="useLanguageMessage('tipArrTipAction')"
        fixed="right"
        width="170"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showEdit(scope.$index, scope.row)"
          >
            {{ useLanguageMessage('edit') }}
          </el-button>
          <el-popconfirm
            :title="useLanguageMessage('checkDel')"
            @confirm="handleDelete(scope.$index)"
          >
            <el-button
              slot="reference"
              :disabled="tipArr.length === 1"
              size="mini"
              class="marginRL"
              type="danger"
            >
              {{ useLanguageMessage('del') }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tipArr: {
      type: Array,
      default: () => [],
    },
  },
  inject: ['tipSetTipChooseList', 'clearChooseBool', 'resetClearChoose'],
  data() {
    return {

    }
  },
  watch: {
    clearChooseBool(val) {
      console.log('resetClearChoose', val)
      if (val) {
        this.clearChoose()
        this.$nextTick(() => {
          this.resetClearChoose()
        })
      }
    },
  },
  methods: {
    handleDelete(index) {
      this.$emit('handleDelete', index)
    },
    showEdit(index, row) {
      this.$emit('showEditDialog', index, row)
    },
    /**
     * @description: 随机励志语录选中删除
     * @return {type}
     */
    handleTipSelectionChange(val) {
      this.tipSetTipChooseList(val)
    },
    /**
     * @description: 清空选中状态、切换tab、关闭页面、打开内层弹窗
     */
    clearChoose() {
      this.tipSetTipChooseList([])
      this.$refs.multipleTable.clearSelection()
    },
  },
}
</script>

<style>

</style>
