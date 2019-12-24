<template>
  <div :class="$style.f_sx">
    <el-button @click="shuaxin" type="success" size="medium">刷新</el-button>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  methods: {
    shuaxin () {
      this.reload()
    },
  }
}
</script>

<style lang='scss' module>
.f_sx{
  position: fixed;
  top: 120px;
  z-index: 999;
  right: 40px;
}
</style>
