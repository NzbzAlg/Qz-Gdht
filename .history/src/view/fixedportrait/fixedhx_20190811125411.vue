<template>
  <div>
    <sx></sx>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户画像" name="first">
        <portrait :message="id"></portrait>
      </el-tab-pane>
      <el-tab-pane label="应用分析" name="second">
        <analysis :message="id"></analysis>
      </el-tab-pane>
      <el-tab-pane label="常住地址" name="third">
        <regionikon :message="id"></regionikon>
      </el-tab-pane>
      <el-tab-pane label="客群来源" name="third1">
        <kequn :message="id"></kequn>
      </el-tab-pane>
      <el-tab-pane label="家居画像" name="third2">
        <jiaju :message="id"></jiaju>
      </el-tab-pane>
      <el-tab-pane label="服饰画像" name="fourth">
        <apparel :message="id"></apparel>
      </el-tab-pane>
      <el-tab-pane label="饮食画像" name="fourth2">
        <dite :message="id"></dite>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
import portrait from './fixedchild/portrait'
import analysis from './fixedchild/analysis'
import regionikon from './fixedchild/regionikon'
import apparel from './fixedchild/apparel'
import tour from './fixedchild/tourikon'
import dite from './fixedchild/diteikon'
import kequn from './fixedchild/kequn'
import jiaju from './fixedchild/jiaju'
export default {
  components: {
    sx,
    portrait,
    analysis,
    regionikon,
    apparel,
    tour,
    dite,
    kequn,
    jiaju
  },
  data () {
    return {
      activeName: 'first',
      id: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab);
      // this.id = this.$store.state.id
      this.$store.commit('myid', this.id)
    },
  }
}
</script>

<style>
</style>
