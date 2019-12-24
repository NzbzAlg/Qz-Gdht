<template>
  <div>
    <sx></sx>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="5" :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{Totalissuance}}</span>
          <p>总发布</p>
        </el-card>
      </el-col>
      <el-col :span="5" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{Totalreward}}</span>
          <p>总获取奖励</p>
        </el-card>
      </el-col>
      <el-col :span="5" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{Totaltask}}</span>
          <p>总任务数</p>
        </el-card>
      </el-col>
      <el-col :span="5" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{processing}}</span>
          <p>进行中任务</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <el-input placeholder="请输入内容任务名称" v-model="input" :class="$style.f_ipt" clearable></el-input>
      <el-input placeholder="请输入内容任务编号" v-model="input1" :class="$style.f_ipt1" clearable></el-input>
      <el-select v-model="value" clearable placeholder="请选择" :class="$style.f_sxk">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" :class="$style.f_sxk1"></el-date-picker>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-search"
        style="float:left;margin-left:20px;"
        @click="search"
      >搜索</el-button>
    </div>
    <!-- 筛选 -->
    <div :class="$style.f_sx"></div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="任务名称"></el-table-column>
        <el-table-column label="任务编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="bh(scope.row)">{{ scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="采集日期">
          <template slot-scope="scope">
            <!-- <span>{{scope.row.from_date}}&nbsp;{{scope.row.from_time}}:00至{{scope.row.to_date}}&nbsp;{{scope.row.to_time}}:00</span> -->
            <span>{{scope.row.from_date}}至{{scope.row.to_date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖励金额">
          <el-table-column label="已奖励金额">
            <template slot-scope="scope">
              <span>{{scope.row.Obtained}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总金额">
            <template slot-scope="scope">
              <span>{{scope.row.totalamount}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="数据数量">
          <el-table-column prop="data_num" label="已采数量"></el-table-column>
          <el-table-column prop="amount_count" label="任务数量"></el-table-column>
          <el-table-column label="完成进度">
            <template slot-scope="scope">
              <span>{{scope.row.wcjd}}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column prop="khlx" label="采集地点"></el-table-column> -->
        <el-table-column prop="merchant_num" label="参与代理商数量"></el-table-column>
        <el-table-column prop="device_num" label="参与终端数"></el-table-column>
        <el-table-column label="任务状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0">待采集</span>
            <span v-if="scope.row.status===1">进行中</span>
            <span v-if="scope.row.status===2">已结束</span>
            <span v-if="scope.row.status===3">已取消</span>
            <span v-if="scope.row.status===4">失效</span>
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
      input: '',
      input1: '',
      input2: '',
      value1: '',
      options: [{
        value: '选项1',
        label: '未开始'
      }, {
        value: '选项2',
        label: '进行中'
      }, {
        value: '选项3',
        label: '结束'
      }, {
        value: '选项4',
        label: '取消'
      },
      ],
      value: '',
      tableData: [],
      currentPage4: 1,
      Totalissuance: '',
      Totalreward: "",
      Totaltask: '',
      processing: '',
      total: null,
      sizes: 10
    }
  },
  mounted () {
    this.getCount()
    this.getList()
  },
  methods: {
    getCount () {
      this.$http.get(`/modules/task/countPlatform`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Totalissuance = data.ISSUE
          this.Totalreward = data.BONUS
          this.Totaltask = data.ALL_NUM
          this.processing = data.ACTIVE_NUM
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getList () {
      this.$http.get(`pc/platform/list?size=10`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item=>{
            item.Obtained = item.price * item.data_num
            item.totalamount=item.amount_count *item.price
          })
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    bh (row) {
      console.log(row.id)
      this.$store.commit('myid', row.id)
      this.$router.push('/index/tasknum.vue')
    },
    handleEdit () {
      this.$router.push('/index/ikonhx.vue')
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`pc/platform/list?size=${val}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.wcjd = (item.data_num / item.amount_count) * 100
          })
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      this.$http.get(`pc/platform/list?size=${this.sizes}&page=${val - 1}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.wcjd = (item.data_num / item.amount_count) * 100
          })
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    search () {
      this.$http.get(`pc/platform/list?search=${this.input}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.tableData.forEach(item => {
            item.wcjd = (item.data_num / item.amount_count) * 100
          })
          this.total = data.total
          console.log(this.tableData)
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
    width: calc(100% - 80%);
    float: left;
  }
  .f_ipt1 {
    margin-left: 20px;
  }
  .f_ipt {
    margin-left: 20px;
  }
}
// .f_sx {
// height: 40px;
.f_sxk {
  width: calc(100% - 80%);
  margin-left: 20px;
  float: left;
}
.f_sxk1 {
  width: calc(100% - 80%);
  float: left;
  margin-left: 20px;
}
// }
.f_row {
  // margin-top: 20px;
  margin-bottom: 20px;
  .f_da {
    margin-left: 20px;
  }
  .f_sheng {
    margin: 0 24px;
  }
}
.f_sl {
  margin-top: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 28px;
}
p {
  margin: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 14px;
  color: #999999;
}
.f_bh {
  cursor: pointer;
  color: #66a6ff;
}
</style>
