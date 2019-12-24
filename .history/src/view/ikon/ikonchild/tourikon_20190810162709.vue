<template>
  <div>{{message}}</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:['message'],
  computed: {
    ...mapGetters(['forList'])
  },
}
</script>

<style>

</style>
