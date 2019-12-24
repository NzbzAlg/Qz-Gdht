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
      <el-tab-pane label="服饰画像" name="fourth">
        <apparel :message="id"></apparel>
      </el-tab-pane>
      <el-tab-pane label="酒旅画像" name="fourth1">
        <tour :message="id"></tour>
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
export default {
  components: {
    sx,
    portrait,
    analysis,
    regionikon,
    apparel,
    tour,
    dite
  },
  data () {
    return {
      activeName: 'first',
      id: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab);
      this.id = this.$store.state.id
    },
  }
}
</script>

<style>
</style>
