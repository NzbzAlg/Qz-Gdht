<template>
  <div>
    <sx></sx>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl" >{{totalrecharge}}</span>
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
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{specialTo}}</span>
          <p>大客户自充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{specialPt}}</span>
          <p>大客户平台充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{totalCNY}}</span>
          <p>CNY总充值</p>
        </el-card>
      </el-col>
       <el-col :span="3" :class="$style.f_sheng" style="margin-top:10px;">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{cnyAmount}}</span>
          <p>VKT总花费</p>
        </el-card>
      </el-col>
       <el-col :span="3" :class="$style.f_sheng" style="margin-top:10px;">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{bigCustomersCny}}</span>
          <p>大客户cny充值</p>
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
        <el-table-column
            label="序号"
            width="70px">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
        </el-table-column>
        <el-table-column prop="index" label="充值编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="getDetails(scope.$index, scope.row)">{{ scope.row.trx_id}}</span>
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
        <!-- <el-table-column label="区域">
          <template slot-scope="scope">
            <span>{{scope.row.province}}\{{scope.row.city}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="create_time" label="时间"></el-table-column>
        <el-table-column prop="amount" label="数量"></el-table-column>
        <!-- <el-table-column  v-show="scope.row.ycsl!==''" prop="ycsl" label="单位" >
        </el-table-column>-->

        <el-table-column label="单位">
          <template slot-scope="scope">
            <!-- <span v-show="scope.row.ycsl!==''">{{scope.row.ycsl}}</span>
            <span v-show="scope.row.rwsl!==''">{{scope.row.rwsl}}</span>-->
            <span v-if="scope.row.currency===1">vkt</span>
            <span v-if="scope.row.currency===2">cny</span>
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
            <el-form-item label="vkt花费" v-show="value2===1">
              <div :class="$style.code">
                <el-input
                  v-show="value2===1"
                  placeholder="请输入实际CNY金额"
                  v-model="formkhfull.cny"
                  @blur="away"
                  :disabled="jy"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="vkt单价" v-show="value2===1">
              <div :class="$style.code">
                <el-input
                  v-show="value2===1"
                  placeholder="请输入换算比例"
                  v-model="formkhfull.bl"
                  @blur="faroff"
                  :disabled="jy1"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="充值金额" v-show="value2===1">
              <div :class="$style.code">
                <el-input v-show="value2===1" v-model="formkhfullvkt" :disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="充值金额" v-show="value2===2">
              <div :class="$style.code">
                <el-input
                  v-show="value2===2"
                  placeholder="请输入CNY充值金额"
                  v-model="formkhfull.cny1  "
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
    <!-- <el-button type="text" @click="hd = true">点击打开 Dialog</el-button> -->
    <el-dialog
      title="提示"
      :visible.sync="hd"
      width="40%"
      :before-close="handleClose"
      >
       <el-form 
       :model="formkhfulls" 
       label-width="80px">
          <el-divider content-position="left" style="margin:16px 0;">充值编号</el-divider>
            <el-form-item label="充值编号">
              <el-input v-model="formkhfulls.tx_code" :disabled="true"></el-input>
            </el-form-item>
          <el-divider content-position="left" style="margin:16px 0;">客户信息</el-divider>
        <el-row>
            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-input v-model="formkhfulls.name" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="客户类型">
                <!-- <el-input v-model="formkhfulls.proxy_type" :disabled="true"></el-input> -->
                <div>
                  <el-select v-model="formkhfulls.proxy_type" :disabled="true">
                    <el-option
                      v-for="item in lx"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="区域">
                <el-input v-model="formkhfulls.province" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">类型</el-divider>
          <el-form-item label="充值编号">
              <el-input v-model="formkhfulls.tx_code" :disabled="true"></el-input>
            </el-form-item>
            <el-divider content-position="left">充值数量</el-divider>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="CNY数量">
                <el-input v-model="formkhfulls.amount" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="CNY花费">
                <el-input v-model="formkhfulls.cny_amount" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="VKT单价">
                <el-input v-model="formkhfulls.vkt_price" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="VKT数量">
              <el-input v-model="formkhfulls.amount" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">充值时间</el-divider>
              <el-form-item label="充值时间">
              <el-input v-model="formkhfulls.create_time" :disabled="true"></el-input>
            </el-form-item>
        <el-divider content-position="left">区块链转账记录</el-divider>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="转出账号">
                <el-input v-model="formkhfulls.from_account" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="转入账号">
                <el-input v-model="formkhfulls.to_account" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="转入金额">
                <el-input v-model="formkhfulls.amount" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="转账时间">
              <el-input v-model="formkhfulls.create_time" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="TX ID">
              <el-input v-model="formkhfulls.trx_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-input
          :rows="2"
          placeholder="备注"
          v-model="formkhfulls.memo">
        </el-input>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hd = false">取 消</el-button>
        <el-button type="primary" @click="hd = false">确 定</el-button>
      </span>
    </el-dialog>
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
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        lx: [
         {
          id: 1,
          name: '省级运营中心'
        },
        {
          id: 2,
          name: '市级运营中心'
        },
        {
          id: 3,
          name: '市级一般代理商'
        },
        {
          id: 4,
          name: '大客户'
        },
        {
          id: 5,
          name: '清竹数据'
        },
        {
          id:6,
          name:'全国代理'
        }
      ],
      dialogVisible: false,
      hd:false,
      jy: false,
      clientname: '',
      serial: '',
      quantity: '',
      value1: '',
      value2: '',
      formkhfull: {},
      formkhfulls:{},
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
      totalrecharge: '',
      merchantTo: '',
      merchantPt: '',
      specialTo: '',
      specialPt: '',
      totalCNY: '',
      cnyAmount:'',
      bigCustomersCny:'',
      jy1:true,
      formkhfullvkt:null,
      // biabhao:'',
      // name:'',
      // proxy_type:'',
      // province:'',
      // city:'',
      // type:'',
      // amount:'',
      // cny_amount:'',
      // vkt_price:'',
      // create_time:'',
      // remark:'',
      // from_account:'',
      // to_account:'',
      // amount:'',
      // create_time:'',
      // memo:''

    }
  },
  mounted () {
    this.getList()
    this.getCount()
  },
  methods: {
    getDetails(index,row){
      console.log(row)
      this.hd = true
      this.$http.get(`modules/financeAfter/listBytxCode`,{params:{txCode:row.tx_code}}).then(res=>{
        // console.log(res)
        var {code,data} = res.data
        // console.log(data)
        if(code === 1000){
          console.log(data)
          this.formkhfulls = data[0]
        }else if (code === 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
        }else{
            this.$message.error(res.data.message);
        }
      }).catch(err=>{
         console.log('错误信息' + err)
      })
    },
    getCount () {
      this.$http.get(`modules/account/rechargeCount`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // console.log(data)
          this.totalrecharge = data.allRechargeVkt
          this.merchantTo = data.myselfRechargeVkt
          this.merchantPt = data.ptRechargeVkt
          this.specialTo = data.bigCustomersMyVkt
          this.specialPt = data.bigCustomersVkt
          this.totalCNY = data.allRechargeCny
          this.cnyAmount = data.cnyAmount
          this.bigCustomersCny = data.bigCustomersCny
        }
      }).catch(err => {
        console.log('错误信息' + err)
      })
    },
    away(){
      this.jy1=false
    },
    faroff(){
      let vkt = null
      vkt= this.formkhfull.cny/this.formkhfull.bl  //formkhfullvkt  总金额   formkhfull.cny 花费  formkhfull.bl单价
      let reg = /^(.*\..{4}).*$/;
      vkt = String(vkt).replace(reg,"$1");
      vkt = Number(vkt);
      this.formkhfullvkt  = vkt
      console.log(this.formkhfullvkt)
    },
    getList () {
      this.$http.post(`modules/financeAfter/list`, {
        size: this.sizes,
        page: this.pages,
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
          'price': this.formkhfullvkt,
          'remark': this.formkhfull.bz,      //formkhfullvkt  总金额   formkhfull.cny 花费  formkhfull.bl单价
          'cnyAmount':this.formkhfull.cny,
          'vktPrice':this.formkhfull.bl
        }
        this.$http.post(`modules/account/recharge`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            this.$message({
              message: '已充值',
              type: 'success'
            });
            this.getList()
            this.getCount()
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
        let info = {
          'merchantId': this.formkhfull.name,
          'currency': this.value2,
          'price': this.formkhfull.cny1,
          'remark': this.formkhfull.bz,
          'cnyAmount':this.formkhfull.cny,
          'vktPrice':this.formkhfull.bl 
        }
        this.$http.post(`modules/account/recharge`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            console.log(data)
            this.$message({
              message: '已充值',
              type: 'success'
            });
            this.getList()
            this.getCount()
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
      this.getoptions()
    },
    handleClose () {
      this.dialogVisible = false
      this.formkhfull = {}
      this.value2 = ''
    },
    search () {
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
    handleSizeChange (val) {
      this.sizes = val
      this.$http.post(`modules/financeAfter/list`, {
        size: val,
        page: this.pages,
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
        size: this.sizes,
        page: val - 1,
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
    // hd(){
    //   this.xixixi = true;
    // },
    handleClose(done) {
        done();
      }
    },
    // khname(index,row){
    //   console.log(row)
    //   this.$http.get(`modules/financeAfter/listBytxCode/${row.id}`).then(res=>{
    //     console.log(res)
    //     var { code, data } = res.data
    //     if(code === 1000){
    //       console.log(data)
    //     }
    //   })
    // }
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
  color: #252cdc;
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
  font-size: 20px;
}
</style>