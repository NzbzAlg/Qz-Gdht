<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">任务流程信息</el-divider>
    <div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="提交" :description="create_time" style="flex-basis: 30%; margin-right: 0px;"></el-step>
        <el-step title="审核" :description="pass" style="flex-basis: 30%; margin-right: 0px;"></el-step>
        <el-step title="发布" :description="end" style="flex-basis: 30%; margin-right: 0px;"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
    <!-- 基本信息 -->
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="Information" border style="width: 100%">
      <el-table-column prop="code" label="订单编号"></el-table-column>
      <el-table-column prop="name" label="订单名称"></el-table-column>
      <el-table-column prop="ddtade" label="创建时间"></el-table-column>
      <el-table-column prop="ddzt" label="订单状态"></el-table-column>
    </el-table>
    <!-- 客户信息 -->
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="clientInformation" border style="width: 100%">
      <el-table-column prop="merchant" label="客户名称"></el-table-column>
      <el-table-column label="客户类型">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType===1">省级运营中心</span>
          <span v-if="scope.row.merchantType===2">市级运营中心</span>
          <span v-if="scope.row.merchantType===3">市级一般代理商</span>
          <span v-if="scope.row.merchantType===4">大客户</span>
          <span v-if="scope.row.merchantType===5">清竹数据</span>
        </template>
      </el-table-column>
      <el-table-column prop="proxyArea" label="区域"></el-table-column>
    </el-table>
    <!-- 数据信息 -->
    <el-divider content-position="left">数据信息</el-divider>
    <el-table :data="dataInformation" border style="width: 100%">
      <el-table-column prop="buyPrice" label="订购金额"></el-table-column>
      <el-table-column prop="sourceData" label="源数据量"></el-table-column>
    </el-table>
    <!-- 数据来源 -->
    <el-divider content-position="left">数据来源</el-divider>
    <el-table :data="datasource" border style="width: 100%">
      <!-- <el-table-column  label="自采数据"> -->
      <el-table-column prop="taskCode" label="任务编号"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="taskDataCount" label="数据量"></el-table-column>
      <!-- </el-table-column> -->
      <el-table-column label="数据市场">
        <el-table-column prop="province" label="关键字" width="120"></el-table-column>
        <el-table-column prop="sourceData" label="数量" width="120"></el-table-column>
      </el-table-column>
    </el-table>
    <!-- 操作信息 -->
    <el-divider content-position="left">操作信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userName" label="操作者"></el-table-column>
      <el-table-column prop="createTime" label="操作时间"></el-table-column>
      <el-table-column label="操作类型">
        <template slot-scope="scope">
          <span v-if="scope.row.operationType===1">提交</span>
          <span v-if="scope.row.operationType===2">通过</span>
          <span v-if="scope.row.operationType===3">驳回</span>
          <span v-if="scope.row.operationType===4">取消</span>
          <span v-if="scope.row.operationType===5">待发布</span>
          <span v-if="scope.row.operationType===6">结束</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="操作备注"></el-table-column>
    </el-table>
    <!-- 操作 -->
    <el-divider content-position="left">操作</el-divider>
    <el-button size="mini" @click="bohui">驳回</el-button>
    <el-button size="mini" @click="shenhe">审核</el-button>
    <el-button size="mini" @click="fabu">发布</el-button>
    <!-- 驳回 -->
    <el-dialog title="提示" :visible.sync="bh" width="30%" :before-close="handleClose">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bh = false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发布 -->
    <el-dialog title="提示" :visible.sync="emancipate" width="30%" :before-close="handleClose1">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bh = false">取 消</el-button>
        <el-button type="primary" @click="certain">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog title="提示" :visible.sync="sh" width="30%" :before-close="handleClose2">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea1"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sh = false">取 消</el-button>
        <el-button type="primary" @click="review">确 定</el-button>
      </span>
    </el-dialog>
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
      active: 1,
      date: '135421312',
      tableData: [],
      id: '',
      arr: [],
      Information: [],
      clientInformation: [],
      dataInformation: [],
      datasource: [],
      operating: [],
      digital: {},
      emancipate: false,
      sh: false,
      bh: false,
      textarea: '',
      textarea1: '',
      create_time: '',
      pass: '',
      end: '',
    }
  },
  mounted () {
    this.arr = this.$store.state.arr
    this.id = this.$store.state.id
    this.getContent()
  },
  methods: {
    getContent () {
      this.arr.forEach(item => {
        if (this.id === item.id) {
          // console.log(item.id) 
          this.$http.get(`modules/order/detail/${item.id}`).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              console.log(data)
              let basic = {
                code: data.code,
                name: data.name,
              }
              let client = {
                merchant: data.merchant,
                merchantType: data.merchantType,
                proxyArea: data.proxyArea
              }
              let digital = {
                buyPrice: data.buyPrice,
                sourceData: data.sourceData
              }
              this.create_time = data.timePoint.create_time
              this.pass = data.timePoint.pass
              this.end = data.timePoint.end
              if (this.create_time != undefined) {
                this.active = 1
              } else if (this.create_time === undefined) {
                this.active = 0
              }
              if (this.pass != undefined) {
                this.active = 2
              }
              if (this.end != undefined) {
                this.active = 3
              }
              this.Information.push(basic)
              this.clientInformation.push(client)
              this.dataInformation.push(digital)
              this.datasource = data.taskList
              this.tableData = data.recordList
            }
          }).catch((err) => {
            console.log('错误信息' + err)
          })
        }
      })
    },
    // next () {
    //   if (this.active++ > 2) this.active = 0;
    // }
    // 驳回
    bohui () {
      console.log(1)
      this.bh = true
    },
    handleClose () {
      this.bh = false
      this.textarea = ''
    },
    reject () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 3)
      info.append('remark', this.textarea)
      this.$http.post(`modules/order/verify`, { 'orderId': this.id, 'type': 3, 'remark': this.textarea }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.textarea = ''
          this.getContent()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.bh = false
    },
    // 审核
    shenhe () {
      this.sh = true
    },
    handleClose2 () {
      this.sh = false
      this.textarea = ''
    },
    review () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 2)
      info.append('remark', this.textarea1)
      this.$http.post(`modules/order/verify`, { 'orderId': this.id, 'type': 2, 'remark': this.textarea }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.getContent()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.sh = false
    },
    // 发布
    fabu () {
      this.emancipate = true
    },
    certain () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 6)
      info.append('remark', this.textarea1)
      this.$http.post(`modules/order/verify`, { 'orderId': this.id, 'type': 6, 'remark': this.textarea }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.getContent()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.emancipate = false
      this.textarea = ''
    },
    handleClose1 () {
      this.emancipate = false
      this.textarea = ''
    },
  }
}
</script>

<style>
.is-process,
.is-wait {
  text-align: center;
}
</style>
