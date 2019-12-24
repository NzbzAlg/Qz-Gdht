<template>
  <div>
    <div :class="$style.f_hx2">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div
        id="myChart6"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div id="allmap" style="height:300px;"></div>
    </div>
    <div :class="$style.f_hx2">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div
        id="myChart7"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div id="allmap1" style="height:300px;"></div>
    </div>
    <div :class="$style.f_hx2">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div
        id="myChart8"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div id="allmap2" style="height:300px;"></div>
    </div>
  </div>
</template>

<script>
import tb1 from '../../../assets/img/坐标1.gif'
import tb2 from '../../../assets/img/坐标2.gif'
import tb3 from '../../../assets/img/坐标3.gif'
import { mapGetters } from 'vuex';
export default {
  props:['message'],
}
</script>

<style  lang='scss' module>
.f_hx2 {
  border: 1px solid #e6e9f0;
  display: block;
  margin-top: 20px;
  margin-right: 2%;
  margin-left: 2%;
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
.map {
  display: inline-block;
  width: 50%;
  height: 300px;
}
</style>

