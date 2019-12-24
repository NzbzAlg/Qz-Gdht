<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">数据收益</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column prop="date" label="省级运营商"></el-table-column>
      <el-table-column prop="name" label="市级运营商"></el-table-column>
      <el-table-column prop="address" label="一般代理"></el-table-column>
    </el-table>
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
    <el-divider content-position="left">下级分成</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column prop="date" label="省级运营商"></el-table-column>
      <el-table-column prop="name" label="市级运营商"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num1"
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
      tableData: [
        {

        }
      ],
      currentPage4: 1,
      num: null,
      num1: null,
    }
  },
  mounted () {
    this.num = 6;
    this.num1 = 11;
  },
  methods: {
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    },
    handleSizeChange1 (val) {
      console.log(val)
    },
    handleCurrentChange1 (val) {
      console.log(val)
    },
  }
}
</script>

<style>
</style>
