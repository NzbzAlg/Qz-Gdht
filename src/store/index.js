import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'
import { Message } from 'element-ui';
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState(
    {
      storage: window.sessionStorage
    }
  )],
  state: {
    arr: [],
    val: '',
    val1: '',
    row: {},
    id: '',
    data: {},
    option: [],
    userinfo:{}
  },
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
      let newTabName = ++state.val + '';
      state.arr.push(res)
      state.val1 = res.path
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
    },
    updateUserInfo(state,res){
      state.userinfo = res
    }
  },
  actions: {
    getSearch({},pid=1){
      return new Promise((resolve,reject) =>{
        axios.get('modules/area/areaByPid',{params:{pid}}).then(res=>{
          var {code,data}=res.data
          if(code===1000){
            resolve(data)
          }else{
            Message.error(res.data.message)
          }
        }).catch((err)=>{
          console.log('错误信息'+err)
        })
      })
    }
  },
  getters: {
    forList(state) {
      let n = state.id ;
      return n;
    },
    forLive(state) {
      let n = state.id ;
      return n;
    },
    forList1(state) {
      let n = state.id ;
      return n;
    },
    forLive1(state) {
      let n = state.id ;
      return n;
    }
  }
})

export default store