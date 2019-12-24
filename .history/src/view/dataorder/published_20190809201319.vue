<template>
  <div>
    <sx></sx>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :style="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">「」</span>
          <p>已发布数量</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <el-input placeholder="请输入内容客户名称" v-model="input" :class="$style.f_ipt" clearable></el-input>
      <el-input placeholder="请输入内容任务编号" v-model="input1" :class="$style.f_ipt1" clearable></el-input>
      <el-input placeholder="请输入内容任务名称" v-model="input2" :class="$style.f_ipt1" clearable></el-input>
    </div>
    <!-- 筛选 -->
    <div :class="$style.f_sx">
      <el-select v-model="value" clearable placeholder="请选择" :class="$style.f_sxk">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value2" clearable placeholder="请选择" :class="$style.f_sxk1">
        <el-option
          v-for="item in dingdan"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" :class="$style.f_sxk1"></el-date-picker>
      <el-button type="primary" size="medium" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号" ></el-table-column>
        <el-table-column prop="name" label="订单名称"></el-table-column>
        <el-table-column prop="ddid" label="订单编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="bh(scope.row)">{{ scope.row.ddid}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="提交日期" ></el-table-column>
        <el-table-column prop="ddsl" label="订购数据量" ></el-table-column>
        <el-table-column prop="sjsl" label="实际数据量" ></el-table-column>
        <el-table-column prop="khmc" label="客户名称" ></el-table-column>
        <el-table-column prop="khlx" label="客户类型" ></el-table-column>
        <el-table-column prop="ddqy" label="订单区域" ></el-table-column>
        <el-table-column prop="ddzt" label="订单状态" ></el-table-column>
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
        value: '选项1',
        label: '大客户'
      }, {
        value: '选项2',
        label: '省级运营中心'
      }, {
        value: '选项3',
        label: '市级运营中心'
      }, {
        value: '选项4',
        label: '一般代理'
      },
      ],
      dingdan: [
        {
          value: '选项5',
          label: '待审批'
        },
        {
          value: '选项6',
          label: '已驳回'
        },
        {
          value: '选项7',
          label: '已取消'
        },
        {
          value: '选项8',
          label: '分析中'
        },
        {
          value: '选项9',
          label: '待发布'
        },
        {
          value: '选项10',
          label: '完成'
        },
      ],
      value2: '',
      value: '',
      tableData:[
        {
          index:1,
          name:'一二三',
          ddid:123321,
          date:12333213123,
          ddsl:123,
          sjsl:100,
          khmc:'admin',
          khlx:'大客户',
          ddqy:'北京',
          ddzt:2
        },
        {
          index:2,
          name:'一二三',
          ddid:123321,
          date:12333213123,
          ddsl:123,
          sjsl:100,
          khmc:'admin',
          khlx:'大客户',
          ddqy:'北京',
          ddzt:2
        },
        {
          index:3,
          name:'一二三',
          ddid:123321,
          date:12333213123,
          ddsl:123,
          sjsl:100,
          khmc:'admin',
          khlx:'大客户',
          ddqy:'北京',
          ddzt:2
        },
        {
          index:4,
          name:'一二三',
          ddid:123321,
          date:12333213123,
          ddsl:123,
          sjsl:100,
          khmc:'admin',
          khlx:'大客户',
          ddqy:'北京',
          ddzt:2
        },
        {
          index:5,
          name:'一二三',
          ddid:123321,
          date:12333213123,
          ddsl:123,
          sjsl:100,
          khmc:'admin',
          khlx:'大客户',
          ddqy:'北京',
          ddzt:2
        },
      ],
      currentPage4: 1,
      num: null,
      obj:{}
    }
  },
  mounted () {
    this.num = 6
  },
  methods:{
    bh(row){
      console.log(row)
        this.obj={
          title:'已发布订单详情',
          name:'/index/search.vue',
          id:'14'
        }
        this.$store.commit('mypush',this.obj)
      this.$router.push('/index/search.vue')
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
    width: calc(100% - 75%);
    float: left;
  }
  .f_sxk1 {
    margin-left: 20px;
  }
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
}
</style>
