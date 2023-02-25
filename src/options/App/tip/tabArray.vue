<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="useLanguageMessage('tipArrTip')"
        name="tipArr"
      >
        <TipActive
          :tip-arr="tipArr"
          @showEditDialog="showEdit"
          @handleDelete="handleDelete"
          @tipChooseListChange="tipSetTipChooseList"
        />
      </el-tab-pane>
      <el-tab-pane
        :label="useLanguageMessage('titleArrTip')"
        name="titleArr"
      >
        <div class="random-content">
          <el-table
            :data="titleArr"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="50"
            />
            <el-table-column
              :label="useLanguageMessage('tipTitle')"
              show-overflow-tooltip
              width="300"
            >
              <template slot-scope="scope">
                <p>{{ scope.row }}</p>
              </template>
            </el-table-column>
            <el-table-column :label="useLanguageMessage('tipArrTipAction')">
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
                    :disabled="titleArr.length === 1"
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
      </el-tab-pane>
      <el-tab-pane
        :label="useLanguageMessage('confirmArrTip')"
        name="confirmArr"
      >
        <div class="random-content">
          <el-table
            :data="confirmArr"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="50"
            />
            <el-table-column
              :label="useLanguageMessage('tipBtn')"
              show-overflow-tooltip
              width="300"
            >
              <template slot-scope="scope">
                <p>{{ scope.row }}</p>
              </template>
            </el-table-column>
            <el-table-column :label="useLanguageMessage('tipArrTipAction')">
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
                    :disabled="confirmArr.length === 1"
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
      </el-tab-pane>
      <el-tab-pane
        :label="useLanguageMessage('add')"
        name="add"
      >
        <AddActive
          :tip-arr="tipArr"
          :title-arr="titleArr"
          :confirm-arr="confirmArr"
        />
      </el-tab-pane>
    </el-tabs>
    <EditorContent
      :inner="inner"
      :active-name="activeName"
      @closeEditor="closeEditor"
    />
  </div>
</template>

<script>
import EditorContent from './EditorContent.vue'
import TipActive from './TipActive.vue'
import AddActive from './AddActive.vue'

export default {
  inject: ['tipUpdateSettingArr', 'tipSetTipChooseList'],
  components: {
    EditorContent,
    AddActive,
    TipActive,
  },
  props: {
    activeNameChange: {
      type: Function,
      default: () => {},
    },
    tipArr: {
      type: Array,
      default: () => [],
    },
    titleArr: {
      type: Array,
      default: () => [],
    },
    confirmArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeName: 'tipArr',
      inner: {
        textarea: '',
        index: 0,
        innerVisible: false,
      },
    }
  },
  watch: {
    activeName(val) {
      this.activeNameChange(val)
    },
  },
  methods: {
    /**
     * @description: 删除tab中的某条数据
     * @param {type} index
     */
    handleDelete(index) {
      const arr = this[this.activeName]
      arr.splice(index, 1)
      this.$message.success('删除成功')
      this.tipUpdateSettingArr(arr, this.activeName)
    },
    /**
     * @description: 展示编辑弹窗
     * @param {type} index
     * @param {type} row
     */
    showEdit(index, row) {
      this.inner.textarea = row
      this.inner.index = index
      this.inner.innerVisible = true
    },
    /**
     * @description: 关闭编辑弹窗
     */
    closeEditor() {
      this.inner.innerVisible = false
    },
  },
}
</script>

<style>

</style>
