<template>
  <div class="focus-content">
    <div class="flex-column mb-20">
      <div class="title-body-1 mb-10 header">
        <span>专注模式</span>
        <div>
          <el-button
            type="primary"
            size="medium"
            @click="onSet"
          >
            一键设置
          </el-button>
        </div>
      </div>
      <div class="title-body-2 text-color-1">
        要专注于一项任务并提高工作效率，请使用专注模式来设置您的工作时间和休息时间间隔
      </div>
    </div>
    <div
      v-if="isConfigPage"
      class="config-action mt-20 mb-20"
    >
      <el-button
        type="primary"
        @click="onOpen"
      >
        开启专注模式
      </el-button>
      <div class="title-body-4 mb-20 mt-20">
        时间设置
      </div>
      <template v-for="(item,index) in focusConfig">
        <div
          :key="index"
          class="flex-row item"
        >
          <div class="flex-column">
            <span class="title-body-3">{{ item.label }}</span>
            <span>{{ item.tip }}</span>
          </div>
          <el-input-number
            v-if="item.type === 'input-number'"
            v-model="item.value"
            size="small"
            :min="item.min"
            :max="item.max"
          />
          <el-switch v-else />
        </div>
        <el-divider :key="index" />
      </template>
    </div>
    <fOpenDialogVue
      v-else
      ref="OpenDialog"
    />
  </div>
</template>

<script>
import { nextTick } from 'vue'
import fOpenDialogVue from './fOpenDialog.vue'

export default {
  components: {
    fOpenDialogVue,
  },
  data() {
    return {
      focusConfig: [
        {
          label: '专注时间',
          value: '',
          tip: '设置所需的聚焦时间,已阻止的站点将被阻止（分钟）。',
          type: 'input-number',
          field: 'focusTime',
          min: 1,
        },
        {
          label: '专注模式下开启白噪音',
          value: '',
          tip: '您希望开启白噪音提高工作效率。',
          type: 'switch',
          field: 'openNoise',
          min: 1,
        },
        {
          label: '休息时间',
          value: '',
          tip: '设置所需的休息时间并从您的列表中自由访问这些网站（分钟）。',
          type: 'input-number',
          field: 'resetTime',
          min: 1,
        },
        {
          label: '循环次数',
          value: '',
          tip: '您希望自动运行的专注时间和休息的周期数（周期）。',
          type: 'input-number',
          field: 'cycleNum',
          min: 1,
        },
        {
          label: '重大突破',
          value: '',
          tip: '您想延长休息多长时间(分钟)。',
          type: 'input-number',
          field: 'delayNum',
          min: 0,
          max: 45,
        },
      ],
      isConfigPage: true,
    }
  },
  computed: {
    getFoucConfig() {
      return this.focusConfig.reduce((pre, cur) => {
        pre[cur.field] = cur.value
        return pre
      }, {})
    },
  },
  methods: {
    onSet() {},
    onOpen() {
      this.isConfigPage = false
      nextTick(() => {
        this.$refs.OpenDialog.onOpen()
      })
    },
  },
}
</script>

<style scoped>
.focus-content{
  padding: 35px;
}
.config-action{
  width: 100%;
}
.item{
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
</style>
