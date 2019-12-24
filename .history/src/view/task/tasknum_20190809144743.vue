<template>
  <div>
    <sx></sx>
    <!-- 基本信息 -->
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="Information" border style="width: 100%">
      <el-table-column prop="taskCode" label="任务编号"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="type" label="任务类型"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="radius" label="采集距离"></el-table-column>
      <el-table-column prop="dataNum" label="采集数据量"></el-table-column>
    </el-table>
    <!-- 任务奖励 -->
    <el-divider content-position="left">任务奖励</el-divider>
    <el-table :data="rewards" border style="width: 100%">
      <el-table-column  label="奖金池">
      <el-table-column prop="bonus" label="奖金总量"></el-table-column>
      <el-table-column prop="beenrewarded" label="已获奖励"></el-table-column>
      <el-table-column  label="百分比">
        <template slot-scope="scope">
          <span>{{scope.row.Percentagebonus}}%</span>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column  label="任务量">
      <el-table-column prop="amountCount" label="任务总量"></el-table-column>
      <el-table-column prop="dataNum" label="已完成任务量"></el-table-column>
      <el-table-column prop="qy" label="百分比">
        <template slot-scope="scope">
          <span>{{scope.row.Percentagetasks}}%</span>
        </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="price" label="单条奖励"></el-table-column>
    </el-table>
    <!-- 采集时间 -->
    <el-divider content-position="left">采集时间</el-divider>
    <el-table :data="fromdate" border style="width: 100%">
      <el-table-column prop="date" label="采集日期"></el-table-column>
      <el-table-column prop="time" label="采集时段"></el-table-column>
    </el-table>
    <!-- 采集场景 -->
    <el-divider content-position="left">采集场景</el-divider>
    <el-table :data="Scenes" border style="width: 100%">
      <el-table-column prop="crwid" label="地理位置">
        <template slot-scope="scope">
          <span @click="examine" class="f_bh">{{scope.row.province}}\{{scope.row.city}}\{{scope.row.area}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="区域\行业">
        <template slot-scope="scope">
          <span v-if="scope.row.type==='1'">{{scope.row.regionTypeParent}}\{{scope.row.region}}</span>
          <span v-if="scope.row.type==='2'">行业数据</span>
        </template>
      </el-table-column>
      <el-table-column  label="场景">
      <el-table-column prop="regionParent" label="大类"></el-table-column>
      <el-table-column prop="regionType" label="细分"></el-table-column>
      </el-table-column>
      <el-table-column prop="scencesName" label="场景名称"></el-table-column>
      <el-table-column  label="数据类型">
         <template slot-scope="scope">
          <span v-if="scope.row.type==='1'">区域数据</span>
          <span v-if="scope.row.type==='2'">行业数据</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 采集者信息 -->
    <el-divider content-position="left">采集者信息</el-divider>
    <el-table :data="Collector" border style="width: 100%">
      <el-table-column prop="name" label="代理商名称"></el-table-column>
      <el-table-column prop="czname" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.proxy_type===1">省级运营中心</span>
          <span v-if="scope.row.proxy_type===2">市级运营中心</span>
          <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
          <span v-if="scope.row.proxy_type===4">大客户</span>
          <span v-if="scope.row.proxy_type===5">清竹数据</span>
        </template>
      </el-table-column>
      <el-table-column prop="czname" label="代理区域">
        <template slot-scope="scope">
          <span>{{scope.row.province}}\{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="czname" label="采集终端"></el-table-column>
      <el-table-column prop="device_num" label="采集终端的数量"></el-table-column>
      <el-table-column prop="data_num" label="采集数据量"></el-table-column>
      <el-table-column prop="czlx" label="已获奖励"></el-table-column>
      <el-table-column prop="czbz" label="工作状态"></el-table-column>
    </el-table>
    <!-- 备注 -->
    <el-divider content-position="left">任务备注</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="remarks" label="备注"></el-table-column>
    </el-table>
     <div class="f_dg" class="f_map" v-show="Fence">
      <div class="f_backdrop" @click="stop"></div>
      <div id="allmap" style="height:400px;"></div>
    </div>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
export default {
  components:{
    sx
  },
  data () {
    return {
      tableData:[],
      Information:[],
      rewards:[],
      fromdate:[],
      Scenes:[],
      Collector:[],
      id:""
    }
  },
  mounted(){
    this.id = this.$store.state.id
    this.getList()
  },
  methods: {
    getList(){
      this.$http.get(`modules/task/detail/${this.id}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          let formation={
            taskCode:data.taskCode,
            taskName:data.taskName,
            type:'平台任务',
            createTime:data.createTime,
            radius:data.radius,
            dataNum:data.dataNum
          }
          let bonus = data.price*data.amountCount
          let beenrewarded = data.price*data.dataNum
          let amountCount = data.amountCount
          let dataNum = data.dataNum
          let Percentagebonus1 = (beenrewarded/bonus)*100
          let Percentagetasks1 = (dataNum/amountCount)*100
          let mission ={
            bonus:data.price*data.amountCount,
            beenrewarded:data.price*data.dataNum,
            Percentagebonus:Percentagebonus1,
            amountCount:data.amountCount,
            dataNum:data.dataNum,
            Percentagetasks:Percentagetasks1,
            price:data.price
          }
          let fromtime={
            date:data.fromDate+'至'+data.toDate,
            time:data.fromTime+':00至'+data.toTime+':00'
          }
          let remarks ={
            remarks:data.remarks
          }
          this.tableData.push(remarks)
          this.Scenes = data.collectList
          this.Collector = data.merchantList
          this.Information.push(formation)
          this.rewards.push(mission)
          this.fromdate.push(fromtime)
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
      // console.log(this.id )
    },
    // next () {
    //   if (this.active++ > 2) this.active = 0;
    // }
    examine(){
      console.log(this.Scenes)
    },
    bohui(){
      console.log(1)
    },
    shenhe(){
      console.log(2)
    },
    fabu(){
      console.log(3)
    }
  }
}
</script>

<style>
.is-process,
.is-wait {
  text-align: center;
}
.f_bh {
  cursor: pointer;
  color: #66a6ff;
}
</style>
