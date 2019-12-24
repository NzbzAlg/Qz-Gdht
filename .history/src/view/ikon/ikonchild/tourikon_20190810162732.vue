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
  props:['message'],
  computed: {
    ...mapGetters(['forList'])
  },
}
</script>

<style>

</style>
