<template>
  <div>
    <sx></sx>
    <el-row style="text-align: left;">
      <el-col :span="4" style="margin-left: 20px;">客户信息:{{name}}</el-col>
      <el-col :span="4" style="margin-left: 20px;">客户类型:{{proxy_type}}</el-col>
      <el-col :span="4" style="margin-left: 20px;">区域:{{province}}\{{city}}</el-col>
    </el-row>
    <el-row style="text-align: left;margin-top:30px;margin-bottom:20px;">
      <el-col :span="4" style="margin-left: 20px;">账户余额(VKT):{{vkt_amount}}</el-col>
      <el-col :span="4" style="margin-left: 20px;">账户余额(CNY):{{cny_amount}}</el-col>
    </el-row>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :style="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">2000</span>
          <p>数据服务</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">2000</span>
          <p>数据收益</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">2000</span>
          <p>任务奖励</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">2000</span>
          <p>平台充值</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">2000</span>
          <p>自充值</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <div class="block" :class="$style.date">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <el-select v-model="value2" clearable placeholder="请选择" :class="$style.f_ipt1">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="时间" sortable>
          <template slot-scope="scope">
            <span :class="$style.f_bh">{{ scope.row.create_time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable></el-table-column>
        <el-table-column label="类型">
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
        <el-table-column prop="amount" label="数量" sortable></el-table-column>
        <el-table-column label="单位" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.currency===1">VKT</span>
            <span v-if="scope.row.currency===2">CNY</span>
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
        :total="num"
      ></el-pagination>
    </div>
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
      name: "",
      proxy_type: '',
      province: '',
      city: '',
      vkt_amount: '',
      cny_amount: '',
      dialogVisible: false,
      input: '',
      input1: '',
      input2: '',
      value1: '',
      value2: '',
      formkhfull: {},
      options1: [
        {
          value: 1,
          label: '平台充值'
        },
        {
          value: 2,
          label: "平台提现"
        },
        {
          value: 3,
          label: "自充值"
        },
        {
          value: 4,
          label: "自提现"
        },
        {
          value: 5,
          label: "数据收益"
        },
        {
          value: 6,
          label: "任务奖励"
        },
        {
          value: 7,
          label: "订购数据"
        },
        {
          value: 8,
          label: "数据画像"
        },
        {
          value: 9,
          label: "固定画像"
        },
        {
          value: 10,
          label: "数据收益方上级收益"
        },
        {
          value: 11,
          label: "数据购买方上级收益"
        },
        {
          value: 12,
          label: "数据服务"
        },
        {
          value: 13,
          label: "采集确权"
        },
        {
          value: 14,
          label: "收益确权"
        }
      ],
      value: '',
      tableData: [],
      currentPage4: 1,
      num: null,
      name: '',
      ids: ""
    }
  },
  mounted () {
    this.num = 6
    this.id = this.$route.query.id
    this.getCustomer()
  },
  methods: {
    getCustomer () {
      this.$http.get(`modules/financeAfter/customerListByid?id=${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.name = data[0].name
          if (data[0].proxy_type === 1) {
            this.proxy_type = "省级运营中心"
          } else if (data[0].proxy_type === 2) {
            this.proxy_type = '市级运营中心'
          } else if (data[0].proxy_type === 3) {
            this.proxy_type = '市级一般代理商'
          } else if (data[0].proxy_type === 4) {
            this.proxy_type = '大客户'
          } else if (data[0].proxy_type === 5) {
            this.proxy_type = '清竹数据'
          }
          this.province = data[0].province
          this.city = data[0].city
          this.vkt_amount = data[0].vkt_amount
          this.cny_amount = data[0].cny_amount
          this.ids = data[0].id
          this.getList(data)
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
    getList (data) {
      this.$http.get(`modules/financeAfter/TrRecordList?id=${this.ids}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
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
    search () {
      this.$http.get(`modules/financeAfter/TrRecordList?toDate=${this.value1[0]}&fromDate=${this.value1[1]}&type=${this.value2}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
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
.date {
  float: left;
  margin-left: 20px;
}
.f_sl {
  margin-top: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 28px;
}
</style>
