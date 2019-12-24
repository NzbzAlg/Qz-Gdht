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
        <!-- <regionikon :message="id"></regionikon> -->

        <div>
          <el-row :class="$style.f_row1">
            <h6 :class="$style.f_xb">性别</h6>
            <el-checkbox-group v-model="checkboxGroup1" @change="dj1" :class="$style.f_dx">
              <el-checkbox-button
                v-for="city in cities"
                style="margin-left:20px;"
                :label="city.value"
                :value="city.value"
                :key="city.value"
              >{{city.label}}</el-checkbox-button>
            </el-checkbox-group>
          </el-row>
          <el-row :class="$style.f_row1">
            <h6 :class="$style.f_xb">年龄</h6>
            <el-checkbox-group v-model="checkboxGroup2" @change="dj" :class="$style.f_dx">
              <el-checkbox-button
                v-for="(city1,i) in cities1"
                style="margin-left:20px;"
                :label="city1.value"
                :value="city1.value"
                :key="i"
              >{{city1.label}}</el-checkbox-button>
            </el-checkbox-group>
          </el-row>
          <el-row :class="$style.f_row1">
            <h6 :class="$style.f_xb">教育</h6>
            <el-checkbox-group v-model="checkboxGroup3" :class="$style.f_dx">
              <el-checkbox-button
                v-for="city2 in cities2"
                style="margin-left:20px;"
                :label="city2.value"
                :value="city2.value"
                :key="city2.value"
              >{{city2.label}}</el-checkbox-button>
            </el-checkbox-group>
          </el-row>
          <el-row :class="$style.f_row1">
            <h6 :class="$style.f_xb">收入</h6>
            <el-checkbox-group v-model="checkboxGroup4" :class="$style.f_dx">
              <el-checkbox-button
                v-for="city3 in cities3"
                style="margin-left:20px;"
                :label="city3.value"
                :value="city3.value"
                :key="city3.value"
              >{{city3.label}}</el-checkbox-button>
            </el-checkbox-group>
          </el-row>
          <el-row :class="$style.f_row1">
            <h6 :class="$style.f_xb">有无孩子</h6>
            <el-checkbox-group v-model="checkboxGroup5" :class="$style.f_dx">
              <el-checkbox-button
                v-for="city4 in cities4"
                style="margin-left:20px;"
                :label="city4.value"
                :value="city4.value"
                :key="city4.value"
              >{{city4.label}}</el-checkbox-button>
            </el-checkbox-group>
          </el-row>
          <el-row :class="$style.f_row1">
            <h6 :class="$style.f_xb">区域</h6>
            <el-radio-group v-model="radio6" :class="$style.f_dx">
              <el-radio-button label="1" style="margin-left: 29px;">工作区域</el-radio-button>
              <el-radio-button label="2" style="margin-left:20px;">居住区域</el-radio-button>
              <el-radio-button label="3" style="margin-left:20px;">拜访区域</el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row>
            <el-button :class="$style.f_btn" style="float:left;margin-left:20px;" size="medium">导出报表</el-button>
            <div style="float: right; margin-right: 20px;">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-button :class="$style.f_btn" :disabled="jy2" @click="dianji3" size="medium">查询</el-button>
            </div>
          </el-row>
          <div :class="$style.f_hx2">
            <div id="allmap" style="height:330px;"></div>
          </div>
        </div>
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
  mounted () {
    this.id = this.$store.state.id
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab);
      // console.log(this.id)
      // this.id = this.$store.state.id
      this.$store.commit('myid', this.id)
    },
  }
}
</script>

<style>
</style>
