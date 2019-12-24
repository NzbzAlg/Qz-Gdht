<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
   // 提供reload方法
  provide: function () {
    return {
      reload: this.reload
    }
  },
  data: function () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新方法
    reload: function () {
      this.isRouterAlive = false;
      // 该方法会在dom更新后执行
      this.$nextTick(function () { this.isRouterAlive = true })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'MicrosoftYaHei', '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1366px;
}
</style>
