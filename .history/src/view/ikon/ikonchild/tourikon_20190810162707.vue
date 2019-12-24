<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  props:['message'],
  computed: {
    ...mapGetters(['forList'])
  },
}
</script>

<style>

</style>
