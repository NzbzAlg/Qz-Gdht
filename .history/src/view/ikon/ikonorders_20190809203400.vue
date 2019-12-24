<template>
  <div>
    <sx></sx>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :style="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{all}}</span>
          <p>总数量</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{end}}</span>
          <p>已完成数量</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{undone}}</span>
          <p>未完成数量</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{submit}}</span>
          <p>未审批数量</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{pass}}</span>
          <p>分析中数量</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <!-- <el-input placeholder="请输入内容任务编号" v-model="input1" :class="$style.f_ipt1" clearable></el-input>
      <el-input placeholder="请输入内容任务名称" v-model="input2" :class="$style.f_ipt1" clearable></el-input> -->
    </div>
    <!-- 筛选 -->
    <div :class="$style.f_sx">
      <el-input placeholder="请输入内容客户名称" v-model="input" :class="$style.f_sxk" clearable></el-input>
      <el-select v-model="value" clearable placeholder="请选择代理商类型" :class="$style.f_sxk">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value2" clearable placeholder="请选择任务状态" :class="$style.f_sxk1">
        <el-option
          v-for="item in dingdan"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :class="$style.f_sxk1"></el-date-picker>
      <el-button type="primary" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="订单名称"></el-table-column>
        <el-table-column  label="订单编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="bh(scope.row)">{{ scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="提交日期" ></el-table-column>
        <el-table-column prop="source_data" label="源数据量" ></el-table-column>
        <!-- <el-table-column prop="sjsl" label="实际数据量" ></el-table-column> -->
        <el-table-column prop="merchant" label="客户名称" ></el-table-column>
        <el-table-column label="客户类型" >
          <template slot-scope="scope">
            <span v-if="scope.row.proxy_type===1">省级运营中心</span>
            <span v-if="scope.row.proxy_type===2">市级运营中心</span>
            <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
            <span v-if="scope.row.proxy_type===4">大客户</span>
            <span v-if="scope.row.proxy_type===5">清竹数据</span>
          </template>
        </el-table-column>
        <el-table-column prop="ddqy" label="代理区域" >
          <template slot-scope="scope">
            <span>{{scope.row.province}}\{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">提交</span>
            <span v-if="scope.row.status===2">通过</span>
            <span v-if="scope.row.status===3">驳回</span>
            <span v-if="scope.row.status===4">取消</span>
            <span v-if="scope.row.status===5">待发布</span>
            <span v-if="scope.row.status===6">结束</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
  components:{
    sx
  },
  data () {
    return {
      input: '',
      input1: '',
      input2: '',
      value1: '',
      options: [{
        value: 1,
        label: '大客户'
      }, {
        value: 2,
        label: '省级运营中心'
      }, {
        value: 3,
        label: '市级运营中心'
      }, {
        value: 4,
        label: '一般代理'
      },
      ],
      dingdan: [
        {
          value:1,
          label:'提交'
        },
        {
          value:2,
          label:'审核'
        },
        {
          value:3,
          label:'发布'
        },
        {
          value:4,
          label:'已完成'
        },
        {
          value:5,
          label:'分析'
        }
      ],
      value2: '',
      value: '',
      tableData:[],
      currentPage4: 1,
      total: null,
      obj:{},
      all:'',
      end:'',
      undone:'',
      submit:'',
      pass:"",
      sizes:10,
      pages:0,
    }
  },
  mounted () {
    this.total = 6
    this.getCount()
    this.getList()
  },
  methods:{
    getCount(){
      this.$http.get(`modules/orderData/countOrder`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          this.all = data.ALL
          this.end = data.END
          this.undone = data.UNDONE
          this.submit = data.SUBMIT
          this.pass = data.PASS 
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    getList(){
      this.$http.get(`modules/persona?size=${this.sizes}&page=${this.pages}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          this.tableData = data.content
          this.total = data.total
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    bh(row){
        this.obj={
          title:'订单详情',
          name:'/index/ikonxq.vue',
          id:row.id
        }
        this.$store.commit('mypush',this.obj)
        this.$store.commit('myid',row.id)
      this.$router.push({path:'/index/ikonxq.vue',query:{id:row.id}})
    },
    search(){
      if(this.value1===null){
        this.value1=;
      }
    },
    handleEdit(index,row){
        this.obj={
          title:'订单画像',
          name:'/index/ikonhx.vue',
          id:row.id
        }
        this.$store.commit('mypush',this.obj)
      this.$router.push({parh:'/index/ikonhx.vue',query:{id:row.id}})
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`modules/persona?size=${val}&page=${this.pages}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          this.tableData = data.content
          this.total = data.total
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    handleCurrentChange (val) {
      this.pages=val
       this.$http.get(`modules/persona?size=${this.sizes}&page=${val-1}`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
           this.tableData = data.content
          this.total = data.total
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
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
    width: calc(100% - 75%);
    float: left;
  }
  .f_ipt1 {
    margin-left: 20px;
  }
}
.f_sx {
  height: 40px;
  margin-bottom: 10px;
  .f_sxk,
  .f_sxk1 {
    width: calc(100% - 85%);
    float: left;
    margin-left: 20px;
  }
  .f_sxk1 {
    margin-left: 20px;
  }
}
.f_row {
  margin-bottom:20px;
  .f_da,
  .f_sheng {
    margin: 0 24px;
  }
}
.f_sl {
  margin-top: 0;
  font-family:'MicrosoftYaHei', '微软雅黑';
  font-size: 28px;
}
p{
  margin: 0;
  font-family:'MicrosoftYaHei', '微软雅黑';
  font-size:14px;
  color:#999999;
}
.f_bh{
  cursor: pointer;
  color: #252cdc;
}
</style>
