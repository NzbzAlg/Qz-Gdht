<template>
  <div>
    <sx></sx>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :style="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">2000</span>
          <p>未审批数量</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <el-input placeholder="请输入内容客户名称" v-model="input" :class="$style.f_ipt" clearable></el-input>
      <el-select v-model="value2" clearable placeholder="请选择" :class="$style.f_sxk">
        <el-option v-for="item in kehu" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" :class="$style.f_sxk1"></el-date-picker>
      <el-button type="primary" size="medium" icon="el-icon-search" style="float:right;margin-right:30px;margin-top:4px;">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="画像名称"></el-table-column>
        <el-table-column prop="ddid" label="画像编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="bh(scope.row)">{{ scope.row.ddid}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="提交日期"></el-table-column>
        <el-table-column prop="yjlje" label="工作状态"></el-table-column>
        <el-table-column prop="zje" label="客户名称"></el-table-column>
        <!-- <el-table-column prop="sjsl" label="实际数据量" ></el-table-column> -->
        <el-table-column prop="ycsl" label="客户类型"></el-table-column>
        <el-table-column prop="rwsl" label="代理区域"></el-table-column>
        <el-table-column prop="wcjd" label="服务状态"></el-table-column>
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
        label: '待审批'
      }, {
        value: '选项2',
        label: '已驳回'
      }, {
        value: '选项3',
        label: '已取消'
      }, {
        value: '选项4',
        label: '已过期'
      }, {
        value: '选项5',
        label: '服务中'
      },
      ],
      kehu: [
        {
          value: '选项6',
          label: '大客户'
        },
        {
          value: '选项7',
          label: '省级运营中心'
        },
        {
          value: '选项8',
          label: '市级运营中心'
        },
        {
          value: '选项9',
          label: '一般代理'
        },
      ],
      value2: '',
      value: '',
      tableData: [
        {
          index: 1,
          name: '一二三',
          ddid: 123321,
          date: 12333213123,
          ddsl: 123,
          sjsl: 100,
          khmc: 'admin',
          khlx: '大客户',
          ddqy: '北京',
          ddzt: 2,
          yjlje: 1234,
          zje: 20000,
          ycsl: 1234,
          rwsl: 5000,
          wcjd: '20%',
          dlsnum: '1234',
          zdnum: 300,
        },
        {
          index: 2,
          name: '一二三',
          ddid: 123321,
          date: 12333213123,
          ddsl: 123,
          sjsl: 100,
          khmc: 'admin',
          khlx: '大客户',
          ddqy: '北京',
          ddzt: 2,
          yjlje: 1234,
          zje: 20000,
          ycsl: 1234,
          rwsl: 5000,
          wcjd: '20%',
          dlsnum: '1234',
          zdnum: 300,
        },
        {
          index: 3,
          name: '一二三',
          ddid: 123321,
          date: 12333213123,
          ddsl: 123,
          sjsl: 100,
          khmc: 'admin',
          khlx: '大客户',
          ddqy: '北京',
          ddzt: 2,
          yjlje: 1234,
          zje: 20000,
          ycsl: 1234,
          rwsl: 5000,
          wcjd: '20%',
          dlsnum: '1234',
          zdnum: 300,
        },
        {
          index: 4,
          name: '一二三',
          ddid: 123321,
          date: 12333213123,
          ddsl: 123,
          sjsl: 100,
          khmc: 'admin',
          khlx: '大客户',
          ddqy: '北京',
          ddzt: 2,
          yjlje: 1234,
          zje: 20000,
          ycsl: 1234,
          rwsl: 5000,
          wcjd: '20%',
          dlsnum: '1234',
          zdnum: 300,
        },
        {
          index: 5,
          name: '一二三',
          ddid: 123321,
          date: 12333213123,
          ddsl: 123,
          sjsl: 100,
          khmc: 'admin',
          khlx: '大客户',
          ddqy: '北京',
          ddzt: 2,
          yjlje: 1234,
          zje: 20000,
          ycsl: 1234,
          rwsl: 5000,
          wcjd: '20%',
          dlsnum: '1234',
          zdnum: 300,
        },
      ],
      currentPage4: 1,
      num: null,
    }
  },
  mounted () {
    this.num = 6
  },
  methods: {
    bh (row) {
      console.log(row)
      this.$router.push('/index/fixedapprovedxq.vue')
    },
    handleEdit () {
      console.log(1)
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
    width: calc(100% - 85%);
    float: left;
    margin-left: 10px;
  }
  .f_ipt1 {
  }
}
  .f_sxk,
  .f_sxk1 {
    width: calc(100% - 85%);
    float: left;
    margin-left: 10px;
  }
  .f_sxk1 {
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
.f_bh {
  cursor: pointer;
  color: #252cdc;
}
</style>
