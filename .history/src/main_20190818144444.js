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
Vue.use(axi++++++++++++++++os);
Vue.use(Vuejsonp)
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: '1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS'
})
Vue.prototype.$echarts = echarts
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)

})
/* eslint-disable no-new */
new Vue({
  store:Store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
