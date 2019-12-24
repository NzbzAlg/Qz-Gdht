<template>
  <div>
    <sx></sx>

    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :class="$style.f_da" style="height: 158px;">
        <el-card shadow="hover" style="height: 158px;">
          <span :class="$style.f_sl">{{totalrecharge}}</span>
          <p>VKT总充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{merchantTo}}</span>
          <p>代理商自充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{merchantPt}}</span>
          <p>代理商平台充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng" style="height: 158px;">
        <el-card shadow="hover" style="height: 158px;">
          <span :class="$style.f_sl">{{specialTo}}</span>
          <p>大客户自充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng" style="height: 158px;">
        <el-card shadow="hover" style="height: 158px;">
          <span :class="$style.f_sl">{{specialPt}}</span>
          <p>大客户平台充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng" style="height: 158px;">
        <el-card shadow="hover" style="height: 158px;">
          <span :class="$style.f_sl">{{totalCNY}}</span>
          <p>CNY总充值</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <el-input placeholder="请输入客户名称" v-model="clientname" :class="$style.f_ipt" clearable></el-input>
      <el-input placeholder="请输入编号" v-model="serial" :class="$style.f_ipt1" clearable></el-input>
      <el-input placeholder="请输入数量" v-model="quantity" :class="$style.f_ipt1" clearable></el-input>
      <el-select v-model="value2" clearable placeholder="请选择" :class="$style.f_ipt1">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="value1"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 数据统计 -->
    <div :class="$style.f_row1">
      <el-button type="primary" size="medium" @click="chongzhi1">新建充值</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="记录编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="bh(scope.row)">{{ scope.row.trx_id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column label="客户类型">
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
        <el-table-column prop="create_time" label="时间"></el-table-column>
        <el-table-column prop="amount" label="数量"></el-table-column>
        <!-- <el-table-column  v-show="scope.row.ycsl!==''" prop="ycsl" label="单位" >
        </el-table-column>-->

        <el-table-column label="单位">
          <template slot-scope="scope">
            <!-- <span v-show="scope.row.ycsl!==''">{{scope.row.ycsl}}</span>
            <span v-show="scope.row.rwsl!==''">{{scope.row.rwsl}}</span>-->
            <span>{{scope.row.currency}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zje" label="类型">
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
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 充值 -->
    <div>
      <el-dialog title="充值记录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formkhfull"
          :class="$style.f_from"
        >
          <el-divider content-position="left" style="margin:16px 0;">基本信息</el-divider>
          <el-row>
            <el-form-item label="代理商:">
              <div :class="$style.code">
                <el-select v-model="formkhfull.name" placeholder="请选择">
                  <el-option
                    v-for="item in allproxy"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-row>
          <el-divider content-position="left">充值金额</el-divider>
          <el-row>
            <el-form-item label="充值类型">
              <div :class="$style.colde">
                <el-select v-model="value2" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="实际CNY" v-show="value2===1">
              <div :class="$style.code">
                <el-input
                  v-show="value2===1"
                  placeholder="请输入实际CNY金额"
                  v-model="formkhfull.cny"
                  :disabled="jy"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="换算比例" v-show="value2===1">
              <div :class="$style.code">
                <el-input
                  v-show="value2===1"
                  placeholder="请输入换算比例"
                  v-model="formkhfull.bl"
                  :disabled="jy"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="充值金额" v-show="value2===1">
              <div :class="$style.code">
                <el-input
                  v-show="value2===1"
                  placeholder="请输入VKT充值金额"
                  v-model="formkhfull.vkt"
                  :disabled="jy"
                ></el-input>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="充值金额" v-show="value2===2">
              <div :class="$style.code">
                <el-input
                  v-show="value2===2"
                  placeholder="请输入CNY充值金额"
                  v-model="formkhfull.cny1"
                  :disabled="jy"
                ></el-input>
              </div>
            </el-form-item>
          </el-row>
          <el-divider content-position="left">记录</el-divider>
          <el-form-item label="转账记录:">
            <div :class="$style.code">
              <el-input v-model="formkhfull.qkl" :disabled="jy"></el-input>
            </div>
          </el-form-item>
          <el-divider content-position="left" v-if="value2===1">备注</el-divider>
          <el-form-item label="充值备注:" v-show="value2===1">
            <div :class="$style.code">
              <el-input v-model="formkhfull.bz" placeholder="请输入memo" type="textarea" autosize></el-input>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script> 
import sx from '../components/sxbtn'
import qs from 'qs'
export default {
  components: {
    sx
  },
  data () {
    return {
      dialogVisible: false,
      jy: false,
      clientname: '',
      serial: '',
      quantity: '',
      value1: '',
      value2: '',
      formkhfull: {},
      labelPosition: 'right',
      options1: [
        {
          value: 1,
          label: 'VKT'
        },
        {
          value: 2,
          label: "CNY"
        }
      ],
      options3: [
        {
          value: 1,
          label: 'VKT'
        },
        {
          value: 2,
          label: "CNY"
        }
      ],
      value: '',
      allproxy: [],
      tableData: [],
      currentPage4: 1,
      total: null,
      sizes: 10,
      pages: 0,
      totalrecharge:'',
      merchantTo:'',
      merchantPt:'',
      specialTo:'',
      specialPt:'',
      totalCNY:'',
    }
  },
  mounted () {
    // this.getList()
    // this.getoptions()
    this.getCount()
  },
  methods: {
    getCount(){
      this.$http.get(`modules/financeAfter/balanceCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          this.totalrecharge = data.recharge.totalVKT+data.recharge.totalCNY
          this.merchantTo = data.recharge.merchantTo
          this.merchantPt = data.recharge.merchantPt
          this.specialTo = data.recharge.specialTo
          this.specialPt = data.recharge.specialPt
          this.totalCNY = data.recharge.totalCNY
        }
      }).catch(err=>{
        console.log('错误信息'+err)
      })
    },
    getList () {
      this.$http.post(`modules/financeAfter/list`, {
        params: {
          size: this.sizes,
          page: this.pages,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
    getoptions () {
      this.$http.get(`modules/merchant/merchantAll`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.allproxy = data
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
    determine () {
      if (this.value2 === 1) {
        // let info = new FormData()
        // info.append('merchantId', this.formkhfull.name)
        // info.append('currency', this.value2)
        // info.append('price', this.formkhfull.vkt)
        // info.append('remark', this.formkhfull.bz)
        let info = {
          'merchantId': this.formkhfull.name,
          'currency': this.value2,
          'price': this.formkhfull.vkt,
          'remark': this.formkhfull.bz,
        }
        this.$http.post(`modules/account/rechargez`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
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
      } else if (this.value2 === 2) {
        // let info = new FormData()
        // info.append('merchantId', this.formkhfull.name)
        // info.append('currency', this.value2)
        // info.append('price', this.formkhfull.cny1)
        // info.append('remark', this.formkhfull.bz)
        let info={
           'merchantId': this.formkhfull.name,
          'currency': this.value2,
          'price': this.formkhfull.cny1,
          'remark': this.formkhfull.bz,
        }
        this.$http.post(`modules/account/recharge`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
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
      }
      this.dialogVisible = false
      this.formkhfull = {}
      this.value2 = ''
    },
    chongzhi1 () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
      this.formkhfull = {}
      this.value2 = ''
    },
    search () {
      // let info = new FormData()
      // info.append('name',this.clientname)
      // info.append('trxId',this.serial)
      // info.append('amount',this.quantity)
      // info.append('currency',this.value2)
      // info.append('fromDate',this.value1[0])
      // info.append('toDate',this.value1[1])
      let info = {
        'name': this.clientname,
        'trxId': this.serial,
        'amount': this.quantity,
        'currency': this.value2,
        'fromDate': this.value1[0],
        'toDate': this.value1[1]
      }
      this.$http.post(`modules/financeAfter/list`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
    bh (row) {
      console.log(row)
      if (row.type === 1) {
        this.obj = {
          title: '平台充值详情',
          name: '/index/rushxq.vue'+'?id='+row.trx_id,
          id: row.trx_id
        }
        this.$store.commit('mypush', this.obj)
        this.$store.commit('myoption',row)
        this.$router.push({ path: '/index/rushxq.vue', query: { trxid: row.trx_id } })
      } else if (row.type === 3) {
        this.obj = {
          title: '自充值',
          name: '/index/zcz.vue'+'?id='+row.trx_id,
          id:row.trx_id
        }
        this.$store.commit('mypush', this.obj)
        this.$store.commit('myoption',row)
        this.$router.push({path:'/index/zcz.vue',query: { trxid: row.trx_id } })
      }
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.post(`modules/financeAfter/list`, {
        params: {
          size: val,
          page: this.pages,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
    handleCurrentChange (val) {
      this.$http.post(`modules/financeAfter/list`, {
        params: {
          size: this.sizes,
          page: val - 1,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
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
  }
}
</script>

<style lang='scss' module>
.f_search {
  height: 40px;
  margin-bottom: 10px;
  .f_ipt,
  .f_ipt1 {
    width: calc(100% - 87%);
    float: left;
  }
  .f_ipt1 {
    margin-left: 20px;
  }
}
.f_sx {
  height: 40px;
  .f_sxk,
  .f_sxk1 {
    width: calc(100% - 80%);
    float: left;
  }
  .f_sxk1 {
    margin-left: 20px;
  }
}
.f_row1 {
  float: left;
  margin-top: 20px;
  margin-bottom: 10px;
}
h3 {
  margin-top: 0;
}
.f_bh {
  cursor: pointer;
}
.f_row {
  margin-bottom: 20px;
  .f_da,
  .f_sheng {
    margin: 0 24px;
  }
}
.f_sl {
  margin-top: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
      font-size: 23px;
}
</style>
