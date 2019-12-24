<template>
  <div>
     <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart9" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart10" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart11" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart12" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart13" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart14" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart15" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc7}}</span>
      <div id="myChart16" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc8}}</span> -->
      <div id="myChart17" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc9}}</span> -->
      <div id="myChart18" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc10}}</span> -->
      <div id="myChart19" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc11}}</span> -->
      <div id="myChart20" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc12}}</span> -->
      <div id="myChart21" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc13}}</span> -->
      <div id="myChart22" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc14}}</span> -->
      <div id="myChart23" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc15}}</span> -->
      <div id="myChart24" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc16}}</span> -->
      <div id="myChart25" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:['message'],
  data () {
    return {
      mc: '服饰大类',
      mc1: '男装风格',
      mc2: '男装价位',
      mc3: '女装风格',
      mc4: '女装价格',
      mc5: '内衣分类',
      mc6: '内衣价位',
      mc7: '配饰价位偏好',
      // mc8: '购买习惯',
      // mc9: '男装品牌',
      // mc10: '女装品牌',
      // mc11: '内衣品牌',
      // mc12: '男鞋品牌',
      // mc13: '女鞋品牌',
      // mc14: '户外运动品牌',
      // mc15: '箱包品牌',
      // mc16: '配饰品牌偏好',
      id: '',
      apparelList: [],
      finery: [],
      manStyleList: [],
      StyleList: [],
      manPriceList: [],
      PriceList: [],
      womanStyleList: [],
      womanstyleList: [],
      womanPriceList: [],
      womanpriceList: [],
      undiesList: [],
      undieslist: [],
      undiesPriceList: [],
      undiespriceList: [],
      accessoriesPriceList: [],
      accessoriespriceList: [],
      shopList: [],
      shop: [],
      closely: [],
      manBrandList: [],
      manBrandListname: [],
      BrandList: [],
      womanBrandList: [],
      womanbrandList: [],
      womanBrandListname: [],
      undiesBrandList: [],
      undiesBrandListname: [],
      undiesbrandList: [],
      menShoeBrandList: [],
      menShoeBrandListname: [],
      menshoebrandList: [],
      womanShoeBrandList: [],
      womanShoeBrandListname: [],
      womanshoebrandList: [],
      sportBrandList: [],
      sportBrandListname: [],
      sportbrandList: [],
      luggageBrandList: [],
      luggageBrandListname: [],
      luggagebrandList: [],
      accessoriesBrandList: [],
      accessoriesBrandListname: [],
      accessoriesbrandList: []
    }
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

