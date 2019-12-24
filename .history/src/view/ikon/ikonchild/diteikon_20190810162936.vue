<template>
  <div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart39" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart40" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart41" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart42" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart43" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <div id="myChart44" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart45" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart46" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart47" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart48" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart49" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart50" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:['message'],
  data () {
    return {
      mc: '画像名称',
      id: null,
      // 饼状图
      cuisineList: [], //菜系
      cuisineListname: [],

      dineTimeList: [],//堂食次数
      dineTimeListname: [],

      appList: [], //常用app
      appListname: [],

      awayTimeList: [], //外卖次数
      awayTimeListname: [],

      priceList: [], //价格
      priceListname: [],
      // 柱状图
      tasteList: [], //口味
      tasteListname: [],
      tasteListnum: [],

      fastList: [], //快餐
      fastListname: [],
      fastListnum: [],

      chineseList: [], //中餐
      chineseListname: [],
      chineseListnum: [],

      desssertList: [], //饮食甜品
      desssertListname: [],
      desssertListnum: [],

      foreignList: [], //外国料理
      foreignListname: [],
      foreignListnum: [],

      snackList: [], //零食
      snackListname: [],
      snackListnum: [],

      otherList: [], //其他餐饮类型
      otherListname: [],
      otherListnum: [],
    }
  },
  computed: {
    ...mapGetters(['forList'])
  },
  mounted () {
    this.id = this.$store.state.id
    this.getList()
  },
}
</script>

<style lang='scss' module>
.f_hx1 {
  width: 30%;
  border: 1px solid #e6e9f0;
  display: inline-block;
  margin-top: 20px;
  margin-right: 2%;
  margin-bottom: 30px;
  height: 330px;
  .f_mc {
    float: left;
    padding-top: 10px;
    padding-left: 10px;
    font-size: 15px;
    color: #1f2e4d;
    letter-spacing: 0;
  }
  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
    padding-bottom: 20px;
  }
  .f_db {
    background: #f7f9fc;
    height: 60px;
    line-height: 60px;
    span {
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
      text-align: center;
    }
    .f_z {
      float: left;
      padding-left: 2%;
    }
    .f_y {
      float: right;
      padding-right: 7%;
    }
  }
}
.f_hx3 {
  width: 44%;
  border: 1px solid #e6e9f0;
  display: block;
  margin-top: 10px;
  margin-right: 1%;
  margin-bottom: 30px;
  height: 330px;
  display: inline-block;
  .f_mc {
    float: left;
    padding-top: 10px;
    padding-left: 10px;
    font-size: 15px;
    color: #1f2e4d;
    letter-spacing: 0;
  }
  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
    padding-bottom: 20px;
  }
  .f_db {
    background: #f7f9fc;
    height: 60px;
    line-height: 60px;
    span {
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
      text-align: center;
    }
    .f_z {
      float: left;
      padding-left: 2%;
    }
    .f_y {
      float: right;
      padding-right: 7%;
    }
  }
}
</style>

