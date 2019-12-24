<template>
  <div>
    <span>点击</span>
  </div>
</template>

<script>
export default {
  props:['message'],
  mounted(){
    console.log(this.message)
  }
}
</script>

<style>

</style>
