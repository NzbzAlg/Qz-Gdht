<template>
  <div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart26" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart27" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart28" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart29" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart30" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart31" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart32" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc7}}</span>
      <div id="myChart33" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc8}}</span>
      <div id="myChart34" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart35" style="position: static; width:500px;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart36" style="position: static; width:500px;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart37" style="position: static; width:500px;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart38" style="position: static; width:500px;height:300px;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['message'],
  data () {
    return {
      mc: '酒店类型',
      mc1: '酒店服务',
      mc2: '出行大区',
      mc3: '出行类型',
      mc4: '出行时长',
      mc5: '交通方式',
      mc6: '酒店评分',
      mc7: '酒店位置',
      mc8: '出行时段',
      // 饼状图

      hotelList: [],   //酒店类型
      hotelListname: [],

      hotelServiceList: [], //酒店服务
      hotelServiceListname: [],

      regionList: [], //出行大区
      regionListname: [],

      trvaelTypeList: [], //出行类型
      trvaelTypeListname: [],

      travelTimeList: [], //出行时长
      travelTimeListname: [],

      transportationList: [], //交通方式
      transportationListname: [],

      hotelScoreList: [], //酒店评分
      hotelScoreListname: [],

      hotelPostionList: [], //酒店位置
      hotelPostionListname: [],

      travelPeriodList: [],  //出行时段
      travelPeriodListname: [],
      // 树状图
      attractionsList: [], //景点
      attractionsListname: [],
      attractionslist: [],

      hotelPriceList: [], //酒店价格
      hotelPriceListname: [],
      hotelpricelist: [],

      hotelBrandList: [], //酒店品牌
      hotelBrandListname: [],
      hotelbrandlist: [],

      hotelLevelList: [], //酒店类型
      hotelLevelListname: [],
      hotellevellist: []
    }
  },
  computed: {
    ...mapGetters(['forList'])
  },
  mounted () {
    console.log(this.$store.getters.forLive)
    this.id = this.$store.getters.forLive
    // this.id = this.$store.state.id
    // console.log(this.id)
    this.getList()
  },
}
</script>

<style>
</style>
