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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="奖金池">
        <el-table-column prop="amount" label="奖金总量"></el-table-column>
        <el-table-column prop="award" label="已获奖励"></el-table-column>
        <el-table-column prop="percent" label="百分比"></el-table-column>
      </el-table-column>
      <el-table-column label="任务量">
        <el-table-column prop="rwamount" label="任务总量"></el-table-column>
        <el-table-column prop="completed" label="已完成任务量"></el-table-column>
        <el-table-column prop="rwpercent" label="百分比"></el-table-column>
      </el-table-column>
      <el-table-column prop="single" label="单条奖励"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集时间</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjdate" label="采集日期"></el-table-column>
      <el-table-column prop="cjsd" label="采集时段"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集场景</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjwz" label="地理位置"></el-table-column>
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
          console.log(data)
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
          this.errand.push(errand)
          this.Basic.push(basic)
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
