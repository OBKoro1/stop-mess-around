<!--
 * Author       : OBKoro1
 * Date         : 2021-12-29 15:09:18
 * LastEditors  : OBKoro1 obkoro1@foxmail.com
 * LastEditTime : 2022-07-02 16:21:28
 * description  : 网站摸鱼近百日摸鱼时长统计
-->
<template>
  <el-dialog
    append-to-body
    :close-on-press-escape="false"
    class="dialog-class"
    title="近百日摸鱼时长统计"
    :visible.sync="dialogVisible"
    width="70%"
  >
    <div
      slot="title"
      class="title-class"
    >
      <span class="el-dialog__title">近百日摸鱼时长统计</span>
      <img
        alt="GitHub Repo stars"
        class="header-btns-star cursor-pointer title-img"
        src="https://img.shields.io/github/stars/OBKoro1/stop-mess-around?style=social"
        @click="jump"
      >
    </div>
    <div class="random-content">
      <el-table
        :data="statisticsTimeArr"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              v-if="props.row.restSite.length !== 0"
              :data="props.row.restSite"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="restSiteRow">
                  <el-table
                    v-if="restSiteRow.row.restBtnClick.length !== 0"
                    :data="restSiteRow.row.restBtnClick"
                    style="width: 100%"
                  >
                    <el-table-column
                      label="休息一下按钮"
                      width="120"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <div>休息{{ scope.row.time }}分钟</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="count"
                      label="按钮点击次数"
                      width="160"
                      show-overflow-tooltip
                    />
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                prop="labelName"
                label="摸鱼网站名"
                width="160"
                show-overflow-tooltip
              />
              <el-table-column
                prop="site"
                label="摸鱼网址"
                width="200"
                show-overflow-tooltip
              />
              <el-table-column
                prop="time"
                label="摸鱼时间消耗"
                width="140"
              />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="140"
        />
        <el-table-column
          prop="time"
          label="当日摸鱼总时长"
          width="140"
        />
        <el-table-column
          label="摸鱼冠军网址"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.restSite[0]!== undefined">
              {{ scope.row.restSite[0].time }}分钟 / {{ scope.row.restSite[0].labelName }}: {{ scope.row.restSite[0].site }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="摸鱼亚军网址"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.restSite[1]!== undefined">
              {{ scope.row.restSite[1].time }}分钟 / {{ scope.row.restSite[1].labelName }}: {{ scope.row.restSite[1].site }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="摸鱼季军网址"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.restSite[2]!== undefined">
              {{ scope.row.restSite[2].time }}分钟 / {{ scope.row.restSite[2].labelName }}: {{ scope.row.restSite[2].site }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table />
      </el-table>
    </div>
    <div v-if="optionsPage">
      <p class="page-title1">
        分享常用的摸鱼网站集成到插件中,利人利己，让插件更好用, 零配置快速上手~
      </p>
      <el-button
        type="primary"
        @click="openShareDialog"
      >
        打开分享摸鱼网站弹窗
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { utils } from '@/utils/index'
import NET from '@/utils/net'

export default {
  props: {
    showStatistics: {
      require: true,
      type: Boolean,
      default: false,
    },
    optionsPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      statisticsTimeArr: [],
    }
  },
  inject: ['checkOutAppDialog'],
  computed: {
    dialogVisible: {
      get() {
        return this.showStatistics
      },
      set() {
        this.close()
      },
    },
  },
  watch: {
    showStatistics: {
      handler(val) {
        if (val) {
          this.initStatics()
        }
      },
      immediate: true,
    },
  },
  methods: {
    jump() {
      utils.jumpUrl(NET.GITHUBREPO)
    },
    async initStatics() {
      this.statisticsTimeArr = await utils.getChromeStorage(NET.statisticsTime)
      // 按照消耗时间进行排序
    },
    close() {
      this.$emit('close', 'showStatistics', false)
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
.title-class {
  display: flex;
  align-items: center;
}
.title-img {
  margin-left: 10px;
}
.dialog-class {
  z-index: 2147483647 !important;
}

.random-content {
  max-height: 500px;
  overflow: auto;
  overflow-x: hidden;
}
.page-title1 {
  font-size: 16px;
  margin: 15px 0 ;
}
</style>
