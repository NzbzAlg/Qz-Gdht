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
      <el-table-column prop="ddid" label="画像编号"></el-table-column>
      <el-table-column prop="ddname" label="画像名称"></el-table-column>
      <el-table-column prop="ddtade" label="创建时间"></el-table-column>
      <el-table-column prop="ddzt" label="服务状态"></el-table-column>
      <el-table-column prop="ddzt" label="有效期"></el-table-column>
    </el-table>
    <!-- 客户信息 -->
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="khmc" label="客户名称"></el-table-column>
      <el-table-column prop="khlx" label="客户类型"></el-table-column>
      <el-table-column prop="qy" label="区域"></el-table-column>
    </el-table>
    <!-- 采集终端 -->
    <el-divider content-position="left">采集终端</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="crwid" label="终端编号"></el-table-column>
      <el-table-column prop="cjrwmc" label="分组"></el-table-column>
      <el-table-column prop="cjsjl" label="工作状态"></el-table-column>
      <el-table-column prop="sjsc" label="联网状态"></el-table-column>
      <el-table-column prop="sjsc" label="位置信息"></el-table-column>
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
       <el-table-column label="待审核">
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
      tableData:[],
      id:''
    }
  },
  mounted(){
    this.id = this.$route.query.id

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
