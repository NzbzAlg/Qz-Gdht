<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  props:['message'],
  mounted(){
    console.log(this)
  }
}
</script>

<style>

</style>
