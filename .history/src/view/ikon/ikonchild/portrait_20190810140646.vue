<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  props:['message'],
  mounted(){
    console.log(this.meage)
  }
}
</script>

<style>

</style>
