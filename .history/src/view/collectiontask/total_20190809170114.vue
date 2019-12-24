<template>
  <div>
    <sx></sx>平台任务
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="errand" border style="width: 100%">
      <el-table-column prop="taskCode" label="任务编号" style="width: 25%"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
    </el-table>
    <el-table :data="Basic" border style="width: 100%">
      <el-table-column  label="任务类型">
        <template slot-scope="scope">
          <span v-if="scope.row.taskType===1">平台任务</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="radius" label="采集距离"></el-table-column>
      <el-table-column prop="status" label="任务状态"></el-table-column>
    </el-table>
    <el-divider content-position="left">任务奖励</el-divider>
    <el-table :data="missionrewards" style="width: 100%">
      <el-table-column label="奖金池">
        <el-table-column prop="overall" label="奖金总量"></el-table-column>
        <el-table-column prop="Obtained" label="已获奖励"></el-table-column>
        <el-table-column label="百分比">
          <template slot-scope="scope">
            <span>{{scope.row.percentage}}%</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="任务量">
        <el-table-column prop="amountCount" label="任务总量"></el-table-column>
        <el-table-column prop="dataNum" label="已完成任务量"></el-table-column>
        <el-table-column label="百分比">
          <template slot-scope="scope">
            <span>{{scope.row.percent}}%</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="price" label="单条奖励"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集时间</el-divider>
    <el-table :data="Acquisitiontime" border style="width: 100%">
      <el-table-column prop="date" label="采集日期"></el-table-column>
      <el-table-column prop="time" label="采集时段"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集场景</el-divider>
    <el-table :data="Scenes" border style="width: 100%">
      <el-table-column label="地理位置">
        <template slot-scope="scope">
          <span>{{scope.row.province}}\{{scope.row.city}}\{{scope.row.}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cjhy" label="区域\行业"></el-table-column>
      <el-table-column prop="cj" label="场景"></el-table-column>
      <el-table-column prop="cjmc" label="场景名称"></el-table-column>
      <el-table-column prop="cjsj" label="数据类型"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集者信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="dlsmc" label="代理商名称"></el-table-column>
      <el-table-column prop="lx" label="类型"></el-table-column>
      <el-table-column prop="dlqy" label="代理区域"></el-table-column>
      <el-table-column prop="cjzd" label="采集终端"></el-table-column>
      <el-table-column prop="cjsl" label="采集终端的数量"></el-table-column>
      <el-table-column prop="cjsjl" label="采集数据量"></el-table-column>
      <el-table-column prop="yhjl" label="已获奖励"></el-table-column>
      <el-table-column prop="cjstatus" label="工作状态"></el-table-column>
    </el-table>
    <el-divider content-position="left">任务备注</el-divider>
    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
export default {
  components: {
    sx
  },
  data () {
    return {
      tableData: [],
      errand: [],
      Basic: [],
      Acquisitiontime:[],
      missionrewards:[],
      Scenes:[],
      textarea: '',
      id: ''
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
          let errand = {
            'taskCode': data.taskCode,
            'taskName': data.taskName
          }
          let basic = {
            'createTime': data.createTime,
            'taskType': data.taskType,
            'radius': data.radius,
            'status':data.status
          }
          let fromtime = ''
          let totime = ''
          if(data.fromTime<10){
            fromtime="0"+data.fromTime+":00"
          }else if(data.fromTime>9){
            fromtime=data.fromTime+":00"
          }
          if(data.toTime<10){
            totime="0"+data.toTime+":00"
          }else if(data.toTime>9){
            totime=data.toTime+":00"
          }
          let tiontime ={
            'date':data.fromDate+'至'+data.toDate,
            'time':fromtime+'至'+totime
          }
          let rewards={
            'overall':data.amountCount*data.price,
            'Obtained':data.dataNum*data.price,
            'percentage':(data.dataNum*data.price/data.amountCount*data.price)*100,
            'amountCount':data.amountCount,
            'dataNum':data.dataNum,
            'percent':(data.dataNum/data.amountCount)*100,
            'price':data.price
          }
          this.Scenes = data.collectList
          this.errand.push(errand)
          this.Basic.push(basic)
          this.missionrewards.push(rewards)
          this.Acquisitiontime.push(tiontime)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
  }
}
</script>

<style>
</style>
