<template>
  <SDialog
    v-bind="$attrs"
    :show-footer="false"
  >
    <template v-slot:title>
      <div class="title-body-1">
        添加瞎逛网站加油格言
      </div>
    </template>
    <template v-slot:body>
      <div class="add-body">
        <div class="body-header mb-10">
          <el-popover
            v-model="popVisible"
            placement="right"
            width="400"
            trigger="click"
          >
            <div class="flex-column pop-body">
              <el-input
                v-model="keyWord"
                size="medium"
                placeholder="请输入内容"
                type="textarea"
                maxlength="100"
                minlength="3"
                show-word-limit
                clearable
                rows="4"
              />
              <div class="mt-10">
                <el-button
                  slot="reference"
                  size="small"
                  @click="onCancle"
                >
                  取消
                </el-button>
                <el-button
                  slot="reference"
                  size="small"
                  type="primary"
                  @click="onSet"
                >
                  确定
                </el-button>
              </div>
            </div>
            <el-button
              slot="reference"
              type="primary"
            >
              自定义加油格言
            </el-button>
          </el-popover>
          <el-button @click="onDefaultSet">
            还原默认设置
          </el-button>
        </div>
        <div class="body-list">
          <template v-for="(item,index) in config.cheers">
            <div
              v-if="!item.hide"
              :key="index"
              class="item-row"
            >
              <div class="row-name flex-row">
                <el-checkbox v-model="item.checked" />
                <span class="ml-10">{{ item.tip }}</span>
              </div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                class="cursor-pointer"
                @click="onDel('single',item)"
              />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="flex-row cheers-footer">
        <div>
          <span class="title-body-3 mr-10">已选中{{ checkedLen }}</span>
          <el-button
            type="danger"
            size="mini"
            @click="onDel('group')"
          >
            删除
          </el-button>
        </div>
        <el-button
          type="defaut"
          @click="onClose"
        >
          关闭
        </el-button>
      </div>
    </template>
  </SDialog>
</template>

<script>
import SDialog from '@/components/SDialog.vue'
import { packCheers } from '@/utils/utils-init'
import { tipArr } from '@/utils/default-setting/tip-arr-en'

export default {
  components: {
    SDialog,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      keyWord: '',
      checkedList: [],
      cheerList: [],
      popVisible: false,
    }
  },
  computed: {
    checkedLen() {
      return (this.config.cheers || []).filter((t) => t.checked && !t.hide).length
    },
  },
  methods: {
    onClose() {
      this.$emit('cancel')
    },
    async onSet() {
      const { cheers } = this.config
      cheers.unshift({
        tip: this.keyWord,
        checked: false,
        hide: false,
        custom: true,
      })
      await this.$root.$options.store.dispatch('asyncUpdateConfig', [cheers, 'cheers'])
      this.onCancle()
    },
    onCancle() {
      this.keyWord = ''
      this.popVisible = false
    },
    async onDel(type, item) {
      if (type === 'group') {
        const cheers = this.config.cheers.map((t) => {
          if (t.checked) {
            t.hide = true
          } else {
            t.hide = false
          }
          return t
        })
        await this.$root.$options.store.dispatch('asyncUpdateConfig', [cheers, 'cheers'])
      } else {
        item.hide = true
      }
    },
    async onDefaultSet() {
      const tips = packCheers(tipArr, this.config.ChromeLang)
      await this.$root.$options.store.dispatch('asyncUpdateConfig', [tips, 'cheers'])
    },
  },
}
</script>

<style scoped>
.body-header{
  display: flex;
  justify-content: space-between;
}
.body-content{
  max-height: 500px;
  overflow-y: auto;
}
.body-list{
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 0 5px;
}
.item-row{
  display: flex;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  justify-content:space-between;
  background:  rgb(238, 238, 238);
  border-radius:5px ;
}
.item-content:hover{
  background:#fff;
  opacity: .75;
  border-radius: 5px;
}
.pop-body{
  align-items: flex-end;
}
.cheers-footer{
  min-width: 605px;
  justify-content: space-between;
  align-items: center;
}
</style>
