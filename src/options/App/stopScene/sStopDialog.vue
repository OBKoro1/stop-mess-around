<template>
  <SDialog
    v-bind="$attrs"
    @ok="onOk"
    @close="onClose"
  >
    <template v-slot:title>
      <div class="title-body-1">
        添加瞎逛网站
      </div>
    </template>
    <template v-slot:body>
      <div class="add-body">
        <div class="body-header">
          <el-input
            v-model.trim="keyWord"
            class="mr-10"
            size="medium"
            placeholder="请输入网站或关键字"
            clearable
            @input="onInput"
          />
          <el-button
            type="success"
            icon="el-icon-plus"
            circle
            size="medium"
            :disabled="disabled"
            @click="onAdd('keyWord')"
          />
        </div>
        <div class="body-content mt-10">
          <div class="mb-20 mt-20">
            <span class="title-body-3">要阻止的网站</span>
            <div
              v-if="keyWordList.length"
              class="body-list mt-10"
            >
              <template v-for="(item,index) in keyWordList">
                <div
                  :key="index"
                  class="item-content"
                >
                  <span class="mr-10">{{ item.labelName }}</span>
                  <el-button
                    :key="index"
                    type="success"
                    icon="el-icon-check"
                    size="mini"
                    circle
                    class="cursor-pointer"
                    :disabled="item.checked"
                    @click="onAdd('default',item)"
                  />
                </div>
              </template>
            </div>
            <div v-else>
              <el-empty
                description="暂无网站"
                :image-size="30"
                style="height: 90px; background: rgb(238, 238, 238); border-radius: 5px;margin: 10px 0;"
              />
            </div>
          </div>
          <div class="mb-20 mt-20">
            <span class="title-body-3">默认阻止的网站</span>
            <div class="body-list mt-10">
              <template v-for="(item,index) in config.defaultStops">
                <div
                  :key="index"
                  class="item-content"
                >
                  <span class="mr-10">{{ item.labelName }}</span>
                  <el-button
                    :key="index"
                    type="success"
                    :icon="!item.checked?'el-icon-plus':'el-icon-check'"
                    size="mini"
                    circle
                    class="cursor-pointer"
                    :disabled="battleLen || item.checked"
                    @click="onAdd('default',item)"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div>
        已阻止{{ stopLen }}/{{ maxLen }}
      </div>
    </template>
  </SDialog>
</template>

<script>
import SDialog from '@/components/SDialog.vue'
import { checkURL, getURLInfo } from '@/utils/utils-func'

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
      keyWordList: [],
      disabled: true,
    }
  },
  computed: {
    maxLen() {
      return this.config.blockMax || 50
    },
    stopLen() {
      const stopLen = (this.config.blockSite || []).length
      const len = this.keyWordList.length + (this.config.defaultStops || []).filter((t) => t.checked).length
      return stopLen < len ? len : stopLen
    },
    stopList() {
      const arrs = [];
      [...this.keyWordList, ...this.config.defaultStops, ...this.config.blockSite].forEach((t) => {
        const item = arrs.find((v) => v.site === t.site)
        if (t.checked && !item) arrs.push(t)
      })
      return arrs
    },
    battleLen() {
      return this.maxLen <= this.stopLen
    },
  },
  methods: {
    async onOk() {
      await this.$root.$options.store.dispatch('asyncUpdateConfig', [this.stopList, 'blockSite'])
      await this.$root.$options.store.dispatch('asyncUpdateConfig', [this.config.defaultStops, 'defaultStops'])
      this.$emit('success', this.stopList)
      this.keyWordList = []
    },
    onClose() {
      this.$emit('cancel')
    },
    onInput(url) {
      const bool = !checkURL(url)
      const item = (this.config.blockSite || this.keyWordList).find((t) => t.site === url)
      this.disabled = bool || !!item || this.battleLen
    },
    onAdd(type, item) {
      if (type === 'keyWord') {
        this.keyWordList.push({
          site: this.keyWord,
          labelName: getURLInfo(this.keyWord).origin,
          checked: true,
          hide: false,
          default: false,
        })
        this.keyWord = ''
      } else if (type === 'default') {
        item.checked = !item.checked
      }
    },
  },
}
</script>

<style scoped>
.body-header{
  display: flex;
}
.body-list{
  display: flex;
  flex-wrap: wrap;
  background: rgb(238, 238, 238);
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
}
.item-content{
  display: flex;
  align-items: center;
  width: 100%;
  margin: 5px;
  justify-content:space-between;
  padding: 5px;
}
.item-content:hover{
  background:#fff;
  opacity: .75;
  border-radius: 5px;
}
</style>
