<template>
  <div>
    <sx></sx>平台充值记录详情
    <el-divider content-position="left">基本信息</el-divider>
    <div style="text-align: left;  margin-left: 30px;">单号:{{danhao}}</div>
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column prop="zjmc" label="客户类型">
        <template slot-scope="scope">
          <span v-if="scope.row.proxy_type===1">省级运营中心</span>
          <span v-if="scope.row.proxy_type===2">市级运营中心</span>
          <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
          <span v-if="scope.row.proxy_type===4">大客户</span>
          <span v-if="scope.row.proxy_type===5">清竹数据</span>
        </template>
      </el-table-column>
      <el-table-column label="区域">
        <template slot-scope="scope">
          <span>{{scope.row.province}}\{{scope.row.city}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">类型</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="充值类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1">平台充值</span>
          <span v-if="scope.row.type===2">平台提现</span>
          <span v-if="scope.row.type===3">自充值</span>
          <span v-if="scope.row.type===4">自提现</span>
          <span v-if="scope.row.type===5">数据收益</span>
          <span v-if="scope.row.type===6">任务奖励</span>
          <span v-if="scope.row.type===7">订购数据</span>
          <span v-if="scope.row.type===8">数据画像</span>
          <span v-if="scope.row.type===9">固定画像</span>
          <span v-if="scope.row.type===10">数据收益方上级收益</span>
          <span v-if="scope.row.type===11">数据购买方上级收益</span>
          <span v-if="scope.row.type===12">数据服务</span>
          <span v-if="scope.row.type===13">采集确权</span>
          <span v-if="scope.row.type===14">收益确权</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="时间"></el-table-column>
      <el-table-column prop="amount" label="充值数量">
        <!-- <el-table-column prop="rwsl" label="CNY">
        <template slot-scope="scope">-->
        <!-- <span v-if="scope.row.rwsl !==''">{{scope.row.rwsl}}</span>
        <span v-if="scope.row.rwsl ===''">未使用CNY充值</span>-->
        <!-- </template> -->
        <!-- </el-table-column>
        <el-table-column label="VKT">
          <el-table-column prop="rwpercent" label="实际人民币"></el-table-column>
          <el-table-column prop="rwpercent" label="换算比例"></el-table-column>
          <el-table-column prop="rwpercent" label="VKT数量"></el-table-column>
        </el-table-column>-->
      </el-table-column>
    </el-table>
    <el-divider content-position="left">转账记录</el-divider>
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
    <!-- <el-divider content-position="left" v-if="row.zje==='自充值'">任务备注</el-divider> -->
    <!-- <el-input
      v-if="row.zje==='自充值'"
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      v-model="textarea"
    ></el-input>-->
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
      danhao: '',
      tableData: [],
      textarea: '',
      trx_id: ''
    }
  },
  mounted () {
    this.trx_id = this.$route.query.trx_id
    this.$root.$eventBus.on(
      "data",
      function (data) {
        console.log(data)
        this.danhao=data
      },
      this
    );
    this.getDetails()
  },
  methods: {
    getDetails () {
      console.log(this.danhao)
      this.$http.get(`modules/financeAfter/listBytrxId?trxId=${this.trx_id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.danhao = data[0].trx_id
          this.tableData = data
        }  else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
  },
}
</script>

<style>
</style>
