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
export default {
  props:['message'],
}
</script>

<style>

</style>
