<template>
  <div>
    <span @click="dianji">点击</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:['message'],
  methods:{
    dianji(){
      console.log(this.message)
    },
  }
}
</script>

<style>

</style>
