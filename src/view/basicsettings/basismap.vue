<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">数据收益</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column prop="date" label="性别" ></el-table-column>
      <el-table-column prop="name" label="职业" ></el-table-column>
      <el-table-column prop="address" label="工作地"></el-table-column>
      <el-table-column prop="address" label="居住地"></el-table-column>
      <el-table-column prop="address" label="年龄段"></el-table-column>
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
    }
  },
  mounted () {
    this.num = 6;
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
