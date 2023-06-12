<template>
  <div class="box-card">
    <div @click="utils.jumpUrl(NET.OPTIONSPAGE)">
      <div>
        <i class="el-icon-setting" />
      </div>
      <span>管理面板</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Popup',
  data() {
    return {
    }
  },
  methods: {},
}
</script>

<style scoped>
.box-card {
  width: 180px;
  background: #323232;
  color: #e0e0e0;
  font-size: 13.5px;
  padding: 5px 0;
}
.box-card > div > div {
  width: 20px;
  font-size: 20px;
  color: #fff;
  margin-right: 15px;
}
.color-green {
  color: #5c8e23;
}
.color-gray {
  color: gray;
}
.box-card > div {
  cursor: pointer;
  padding: 2px 10px;
  height: 32px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #2a2a2a;
}
.box-card > div:hover {
  background: #7f6026;
}
</style>
