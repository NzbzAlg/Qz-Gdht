<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">任务流程信息</el-divider>
    <div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="提交" :description="date" style="flex-basis: 30%; margin-right: 0px;"></el-step>
        <el-step title="审核" :description="date" style="flex-basis: 30%; margin-right: 0px;"></el-step>
        <el-step title="发布" :description="date" style="flex-basis: 30%; margin-right: 0px;"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
    <!-- 基本信息 -->
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="ddid" label="订单编号"></el-table-column>
      <el-table-column prop="ddname" label="订单名称"></el-table-column>
      <el-table-column prop="ddtade" label="创建时间"></el-table-column>
      <el-table-column prop="ddzt" label="订单状态"></el-table-column>
    </el-table>
    <!-- 客户信息 -->
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="khmc" label="客户名称"></el-table-column>
      <el-table-column prop="khlx" label="客户类型"></el-table-column>
      <el-table-column prop="qy" label="区域"></el-table-column>
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
      <el-table-column  label="自采数据">
      <el-table-column prop="crwid" label="任务编号"></el-table-column>
      <el-table-column prop="cjrwmc" label="任务名称"></el-table-column>
      <el-table-column prop="cjsjl" label="数据量"></el-table-column>
      </el-table-column>
      <el-table-column prop="sjsc" label="数据市场"></el-table-column>
    </el-table>
    <!-- 媒体账户 -->
    <el-divider content-position="left">媒体账户</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="pt" label="平台"></el-table-column>
      <el-table-column prop="user" label="账户"></el-table-column>
      <el-table-column prop="mima" label="密码"></el-table-column>
      <el-table-column prop="sjlx" label="数据类型"></el-table-column>
    </el-table>
    <!-- 操作信息 -->
    <el-divider content-position="left">操作信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="czname" label="操作者"></el-table-column>
      <el-table-column prop="czdate" label="操作时间"></el-table-column>
      <el-table-column prop="czlx" label="操作类型"></el-table-column>
      <el-table-column prop="czbz" label="操作备注"></el-table-column>
    </el-table>
    <!-- 操作 -->
    <el-divider content-position="left">操作</el-divider>
    <el-table :data="tableData" border style="width: 100%">
       <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="bohui">驳回</el-button>
            <el-button size="mini" @click="shenhe">审核</el-button>
          </template>
        </el-table-column>
    </el-table>
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
      active: 1,
      date: '135421312',
      tableData:[
        {
          ddid:123,
          ddname:'123',
          ddtade:1235124123,
          ddzt:1,
          khmc:'admin',
          khlx:'大客户',
          qy:'北京',
          dgsjl:'123',
          sjshl:'123',
          dgzj:213123,
          ysjl:1234,
          crwid:'1234',
          cjrwmc:'admin',
          cjsjl:'1234',
          pt:'今日头条',
          user:'admin',
          mima:'1234312',
          sjlx:'IMEI',
          czname:'张三',
          czdate:1234123123,
          czlx:'提交',
          czbz:'无'
        }
      ],
      name: JSON.parse(window.sessionStorage.getItem("name")),
    }
  },
  methods: {
    // next () {
    //   if (this.active++ > 2) this.active = 0;
    // }
    bohui(){
      console.log(1)
    },
    shenhe(){
      console.log(2)
    },
    fabu(){
      console.log(3)
    },
    daochu(){
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
</style>
