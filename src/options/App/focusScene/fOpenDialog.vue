<template>
  <div class="card-body">
    <CountDown ref="CountDown" />
  </div>
</template>

<script>

import CountDown from '@/components/CountDown.vue'

export default {
  components: {
    CountDown,
  },
  data() {
    return {}
  },
  methods: {
    onOpen() {
      this.$refs.CountDown.onOpen()
    },
  },
}
</script>

<style scoped>
.card-body {
  min-width: 450px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 0 auto;
}
</style>
