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
  props: ['message'],
  data () {
    return {
      mc1: '工作区域',
      mc2: '居住区域',
      mc3: '拜访区域',
      id: '',
      place: {},
      work: [],
      workname: [],
      worknum: [],
      live: [],
      livename: [],
      livenum: [],
      dwell: {},
      visit: [],
      visitname: [],
      visitnum: [],
      deposit: {}
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
    this.getData()
  },
  methods:{

    getList () {
      this.$http.get(`modules/persona/dataView?orderId=${this.id}&type=postion`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          data.work.forEach(item => {
            this.place = {
              lng: Number(item.lng),
              lat: Number(item.lat),
              name: item.name
            }
            this.workname.push(item.name)
            this.worknum.push(item.y)
            this.work.push(this.place)
            // lat = name1.split(')')
          })
          data.live.forEach(item => {
            this.dwell = {
              lng: Number(item.lng),
              lat: Number(item.lat),
              name: item.name
            }
            this.livename.push(item.name)
            this.livenum.push(item.y)
            this.live.push(this.dwell)
          })
          data.visit.forEach(item => {
            this.deposit = {
              lng: Number(item.lng),
              lat: Number(item.lat),
              name: item.name
            }
            this.visitname.push(item.name)
            this.visitnum.push(item.y)
            this.visit.push(this.deposit)
            // lat = name1.split(')')
          })
          this.ditu()
          this.ditu1()
          this.ditu2()
          this.drawLine6()
          this.drawLine7()
          this.drawLine8()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
  }
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

