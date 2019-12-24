<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
  

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
