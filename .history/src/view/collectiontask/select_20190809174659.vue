<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="errand" border style="width: 100%">
      <el-table-column prop="taskCode" label="任务编号" style="width: calc(100% - 75%)"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
    </el-table>
    <el-table :data="Basic" border style="width: 100%">
      <el-table-column prop="taskType" label="任务类型"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="radius" label="采集距离"></el-table-column>
      <el-table-column prop="status" label="任务状态"></el-table-column>
    </el-table>
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="client" border style="width: 100%">
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column label="客户类型">
        <template slot-scope="scope">
          <span v-if="scope.row.proxyType===1">省级运营中心</span>
          <span v-if="scope.row.proxyType===2">市级运营中心</span>
          <span v-if="scope.row.proxyType===3">市级一般代理商</span>
          <span v-if="scope.row.proxyType===4">大客户</span>
          <span v-if="scope.row.proxyType===5">清竹数据</span>
        </template>
      </el-table-column>
      <el-table-column prop="khqy" label="区域"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集时间</el-divider>
    <el-table :data="Acquisitiontime" border style="width: 100%">
      <el-table-column prop="date" label="采集日期"></el-table-column>
      <el-table-column prop="time" label="采集时段"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集场景</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjwz" label="地理位置"></el-table-column>
      <el-table-column prop="cjsj" label="数据类型"></el-table-column>
      <el-table-column label="区域\行业">
        <el-table-column prop="cjqy" label="区域"></el-table-column>
        <el-table-column prop="cjhy" label="行业"></el-table-column>
      </el-table-column>
      <el-table-column label="场景">
        <el-table-column prop="cjdl" label="场景大类"></el-table-column>
        <el-table-column prop="cjxf" label="场景细分"></el-table-column>
      </el-table-column>
      <el-table-column prop="cjmc" label="人群标签"></el-table-column>
      <el-table-column prop="cjmc" label="场景名称"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集终端</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjzd" label="终端编号"></el-table-column>
      <el-table-column prop="fz" label="分组"></el-table-column>
      <el-table-column prop="cjsjl" label="采集数据量"></el-table-column>
      <el-table-column prop="cjstatus" label="采集状态"></el-table-column>
      <el-table-column prop="datastatus" label="时间状态"></el-table-column>
      <el-table-column prop="wzstatus" label="位置状态"></el-table-column>
      <el-table-column prop="lwstatus" label="联网状态"></el-table-column>
      <el-table-column prop="wzxinx" label="位置信息">
        <template slot-scope="scope">
          <span @click="renwuzb(scope.row)" :class="$style.f_renwuid">{{scope.row.wzxinx}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">任务备注</el-divider>
    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
    <!-- 坐标 -->
    <el-dialog
      title="位置信息"
      :visible.sync="jbmap"
      width="30%"
      class="f_zbxx"
      :before-close="handleClose"
    >
      <div>
        <baidu-map :class="$style.map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
          <bm-marker
            :position="{lng: 116.404, lat: 39.915}"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          >
            <bm-label
              content="我爱北京天安门"
              :labelStyle="{color: 'red', fontSize : '14px'}"
              :offset="{width: -35, height: 30}"
            />
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          </bm-marker>
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
export default {
  components: {
    sx
  },
  created () {
    console.log(this)
  },
  data () {
    return {
      tableData: [],
      errand: [],
      Basic: [],
      Acquisitiontime:[],
      client:[],
      textarea: '',
      jbmap: false,
      id: '',
      province:'',
      provinceid:null,
      city:'',
      cityid:null,
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getContent()
  },
  methods: {
    getContent () {
      this.$http.get(`modules/task/detail/${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          let errand = {
            'taskCode': data.taskCode,
            'taskName': data.taskName
          }
          let basic = {
            'createTime': data.createTime,
            'taskType': data.taskType,
            'radius': data.radius,
            'status': data.status
          }
          let fromtime = ''
          let totime = ''
          if (data.fromTime < 10) {
            fromtime = "0" + data.fromTime + ":00"
          } else if (data.fromTime > 9) {
            fromtime = data.fromTime + ":00"
          }
          if (data.toTime < 10) {
            totime = "0" + data.toTime + ":00"
          } else if (data.toTime > 9) {
            totime = data.toTime + ":00"
          }
          let tiontime = {
            'date': data.fromDate + '至' + data.toDate,
            'time': fromtime + '至' + totime
          }
          let client={
            'name':data.merchantInfo.name,
            'proxyType':data.merchantInfo.proxyType
          }
          this.provinceid = data.merchantInfo.province
          this.cityid = data.merchantInfo.city
          this.errand.push(errand)
          this.Basic.push(basic)
          this.Acquisitiontime.push(tiontime)
          this.client.push(client)
          this.getmerInfo()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getmerInfo(){
      this.$http.get(`modules/area/areaByPid?pid=1`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          data.forEach(item=>{
            if(this.provinceid===item.id){
              this.province=item.name
            }
          })
          console.log(this.province)
          let provinceid= this.provinceid
          this.getprovince(provinceid)
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    getprovince(provinceid){
      this.$http.get(`modules/area/areaByPid?pid=${provinceid}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          data.forEach(item=>{
            if(this.cityid===item.id){
              this.city=item.name
            }
          })
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    renwuzb () {
      this.jbmap = true
    },
    handleClose () {
      this.jbmap = false
    }
  }
}
</script>

<style lang='scss' module>
.f_renwuid {
  cursor: pointer;
  color: #252cdc;
}
.map {
  height: 400px;
}
</style>
