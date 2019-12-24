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
    forList(state) {
      let n = state.id + 1000;
      return n;
    },
    forLive(state) {
      let n = state.num + 900;
      return n;
    }
  }
})

export default store
