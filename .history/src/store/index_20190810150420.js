import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    arr: [],
    val: '',
    val1: '',
    row: {},
    id: '',
    data: {},
    option: []
  },
  plugins: [createPersistedState()],
  mutations: {
    mArry(state, res) {
      state.arr = res
    },
    myval(state, res) {
      state.val1 = res
    },
    myval1(state, res) {
      state.val = res
    },
    mypush(state, res) {
      // console.log(2)
      let newTabName = ++state.val + '';
      state.arr.push(res)
      state.val1 = res.path
      // console.log(newTabName)
    },
    myrow(state, res) {
      state.row = res
    },
    myid(state, res) {
      state.id = res
    },
    mydigital(state, res) {
      state.data = res
    },
    myoption(state, res) {
      state.option.push(res)
    }
  },
  actions: {

  },
  getters: {
    forList(state){
      let n = state.num + 1000;
      return n;
  },
  forLive(state){
      let n = state.num + 900;
      return n;
  }
--------------------- 
版权声明：本文为CSDN博主「zxd10001」的原创文章，遵循CC 4.0 by-sa版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zxd10001/article/details/80778166
  }
})

export default store
