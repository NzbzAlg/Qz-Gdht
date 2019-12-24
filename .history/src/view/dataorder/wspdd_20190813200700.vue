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
    <el-table :data="BasicInformation" border style="width: 100%">
      <el-table-column prop="code" label="订单编号"></el-table-column>
      <el-table-column prop="name" label="订单名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===1">提交</span>
          <span v-if="scope.row.status===2">通过</span>
          <span v-if="scope.row.status===3">驳回</span>
          <span v-if="scope.row.status===4">取消</span>
          <span v-if="scope.row.status===5">待发布</span>
          <span v-if="scope.row.status===6">结束</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 客户信息 -->
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="clientInformation" border style="width: 100%">
      <el-table-column prop="merchant" label="客户名称"></el-table-column>
      <el-table-column label="客户类型">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType===1">大客户</span>
          <span v-if="scope.row.merchantType===2">省级代理</span>
          <span v-if="scope.row.merchantType===3">市级代理</span>
          <span v-if="scope.row.merchantType===4">一般代理商</span>
        </template>
      </el-table-column>
      <el-table-column prop="proxyArea" label="区域"></el-table-column>
    </el-table>
    <!-- 数据信息 -->
    <el-divider content-position="left">数据信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="dgsjl" label="订购数据量"></el-table-column>
      <el-table-column prop="sjshl" label="实际数据量"></el-table-column>
      <el-table-column prop="dgzj" label="订购总价"></el-table-column>
      <el-table-column prop="ysjl" label="源数据量"></el-table-column>
      <el-table-column prop="bqxq" label="标签需求"></el-table-column>
    </el-table>
    <!-- 数据来源 -->
    <el-divider content-position="left">数据来源</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjsj" label="自采数据"></el-table-column>
      <el-table-column prop="sjsc" label="数据市场"></el-table-column>
    </el-table>
    <!-- 媒体账户 -->
    <el-divider content-position="left">媒体账户</el-divider>
    <el-table :data="media" border style="width: 100%">
      <el-table-column prop="mediaId" label="平台">
        <template slot-scope="scope">
          <span v-if="scope.row.mediaId==='1'">今日头条</span>
          <span v-if="scope.row.mediaId==='2'">微博</span>
          <span v-if="scope.row.mediaId==='3'">微信</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账户"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="sjlx" label="数据类型">
        <template slot-scope="scope">
          <el-select v-model="value" v-if="scope.row.merchantInfo===2" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span v-if="scope.row.merchantInfo!=2">IMEI&&MAC</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 操作信息 -->
    <el-divider content-position="left">操作信息</el-divider>
    <el-table :data="operatingInformation" border style="width: 100%">
      <el-table-column prop="userName" label="操作者"></el-table-column>
      <el-table-column prop="createTime" label="操作时间"></el-table-column>
      <el-table-column prop="operationType" label="操作类型">
        <template slot-scope="scope">
          <span v-if="scope.row.operationType===1">提交</span>
          <span v-if="scope.row.operationType===2">通过</span>
          <span v-if="scope.row.operationType===3">驳回</span>
          <span v-if="scope.row.operationType===4">取消</span>
          <span v-if="scope.row.operationType===5">待发布</span>
          <span v-if="scope.row.operationType===6">发布</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="操作备注"></el-table-column>
    </el-table>
    <!-- 操作 -->
    <el-divider content-position="left">操作</el-divider>
    <el-button
      plain
      v-if="name==='kefujl'||name==='admin'||name==='kefu'&&this.tableData[0].ddzt==='待审核'"
      @click="bohui"
    >驳回</el-button>
    <el-button
      plain
      v-if="name==='kefujl'||name==='admin'||name==='kefu'&&this.tableData[0].ddzt==='待发布'"
      @click="shenhe"
    >审核</el-button>
    <!-- <el-button plain @click="exportmac" v-if="name==='dcry'||name==='admin'">导出MAC</el-button> -->
    <a class="export" :href="href" @click="exportmac" v-if="name==='dcry'||name==='admin'">导出MAC</a>
    <a class="export" :href="href1" @click="exportimei" v-if="name==='dcry'||name==='admin'">导出IMEI</a>
    <!-- <el-button plain v-if="name==='dcry'||name==='admin'">导出IMEI</el-button> -->
    <el-button plain @click="release" v-if="name==='dcry'||name==='admin'">发布</el-button>
    <!-- 发布 -->
    <el-dialog title="提示" :visible.sync="emancipate" width="30%" :before-close="handleClose">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bh = false">取 消</el-button>
        <el-button type="primary" @click="certain">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 驳回 -->
    <el-dialog title="提示" :visible.sync="bh" width="30%" :before-close="handleClose">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bh = false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog title="提示" :visible.sync="sh" width="30%" :before-close="handleClose1">
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
      active: null,
      date: '135421312',
      tableData: [],
      name: JSON.parse(window.sessionStorage.getItem("name")),
      ddtz: '',
      bh: false,
      textarea: '',
      sh: false,
      textarea1: '',
      BasicInformation: [],
      clientInformation: [],
      media: [],
      operatingInformation: [],
      create_time: '',
      pass: '',
      end: '',
      options: [{
        value: '选项2',
        label: 'MAC'
      }, {
        value: '选项3',
        label: 'IMEI&&MAC'
      }],
      value: '',
      id: '',
      row: {},
      href: '',
      href1: '',
      emancipate: false,
    }
  },
  created () {
    this.id = this.$route.query.id
    this.row = this.$store.state.row
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/order/detail/${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          var basic = {
            code: data.code,
            name: this.row.name,
            createTime: this.row.createTime,
            status: this.row.status
          }
          var client = {
            merchant: data.merchant,
            merchantType: data.merchantType,
            proxyArea: data.proxyArea
          }
          this.operatingInformation = data.recordList
          this.media = data.mediaList
          this.create_time = data.timePoint.create_time
          this.pass = data.timePoint.pass
          this.end = data.timePoint.end
          if (this.create_time != undefined) {
            this.active = 1
          }
          if(this.pass !=undefined){
            this.active = 2
          }
          if(this.end != undefined){
            this.active = 3
          }
          this.BasicInformation.push(basic)
          this.clientInformation.push(client)
        } else if (code == 2001) {
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
    exportmac () {
      this.href = `http://192.168.1.74:8888/modules/order/export/csv?orderId=${this.id}&type=1`
      console.log(this.href)
    },
    exportimei () {
      this.href1 = `http://192.168.1.74:8888/modules/order/export/csv?orderId=${this.id}&type=2`
    },
    // next () {
    //   if (this.active++ > 2) this.active = 0;
    // }
    bohui () {
      console.log(1)
      this.bh = true
    },
    handleClose () {
      this.bh = false
    },
    reject () {
      console.log(1)
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 3)
      info.append('remark', this.textarea)
      this.$http.post(`modules/order/verify`, {'orderId':this.id,'type':3,'remark':this.textarea}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.getList()
        } else if (code == 2001) {
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
      this.bh = false
    },
    shenhe () {
      this.sh = true
    },
    handleClose1 () {
      this.sh = false
    },
    review () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 2)
      info.append('remark', this.textarea1)
      this.$http.post(`modules/order/verify`, {'orderId':this.id,'type':2,'remark':this.textarea}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.getList()
        } else if (code == 2001) {
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
      this.sh = false
    },
    release () {
      console.log(1)
      this.emancipate = true
    },
    certain () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 6)
      info.append('remark', this.textarea1)
      this.$http.post(`modules/order/verify`, {'orderId':this.id,'type':6,'remark':this.textarea}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.getList()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.emancipate = false
    },
    fabu () {
      console.log(3)
    },
    daochu () {
      console.log(4)
    }
  }
}
</script>

<style>
.is-process,
.is-wait {
  text-align: center;
}
.export {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;
}
.export:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
</style>
