// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'  
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css'
import moment from 'moment'
import echarts from 'echarts'
import Store from './store/index'
import BaiduMap from 'vue-baidu-map'
import axios from './assets/js/uniteaxios.js'
import Vuejsonp from 'vue-jsonp'
Vue.use(VueParticles)  
Vue.use(ElementUI);
Vue.use(axios);
Vue.use(Vuejsonp)
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: '1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS'
})
Vue.prototype.$echarts = echarts
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)

})

// 高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '7b2709273be94bf7782a65c261b84863',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// 高德地图

/* eslint-disable no-new */
new Vue({
  store:Store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

