<template>
  <div>
    <sx></sx>
    <div>
      <el-input placeholder="请输入用户姓名" v-model="name" :class="$style.name" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" :class="$style.btn" @click="search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div :class="$style.table">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="index" width="150"></el-table-column>
        <el-table-column property="name" label="用户"></el-table-column>
        <el-table-column property="log" label="日志类型"></el-table-column>
        <el-table-column property="ip" label="操作ip"></el-table-column>
        <el-table-column property="detail" label="详情"></el-table-column>
        <el-table-column property="date" label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row. date|dateformat}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
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
</template>

<script>
import sx from '../components/sxbtn'
export default {
  components: {
    sx
  },
  data () {
    return {
      name: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      ip: '',
      value1: '',
      tableData: [{
        name: '王小虎',
        log: '312',
        ip: 123514412412,
        detail: '12 1518 弄',
        date: 123123
      }, {
        name: '王小虎',
        log: '312',
        ip: 123514412412,
        detail: '12 1518 弄',
        date: 123123
      }, {
        name: '王小虎',
        log: '312',
        ip: 123514412412,
        detail: '12 1518 弄',
        date: 123123
      }, {
        name: '王小虎',
        log: '312',
        ip: 123514412412,
        detail: '12 1518 弄',
        date: 123123
      }, {
        name: '王小虎',
        log: '312',
        ip: 123514412412,
        detail: '12 1518 弄',
        date: 123123
      }, {
        name: '王小虎',
        log: '312',
        ip: 123514412412,
        detail: '12 1518 弄',
        date: 123123
      }],
      currentRow: null,
      currentPage4: 1,
      num: null,
    }
  },
  mounted () {
    this.num = 6
  },
  methods: {
    search () {
      console.log(this.value1.getTime())
      console.log(this.name)
      console.log(this.ip)
      console.log(this.value)
    },
    handleCurrentChange (val) {
      this.currentRow = val;
      console.log(val)
    }, handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    },
  }
}
</script>

<style lang='scss' module>
.name {
  width: calc(100% - 80%);
  float: left;
  margin-bottom: 10px;
}
.btn {
  // float: left;
  margin-left: 38%;
  margin-bottom: 10px;
}
.table {
  margin-top: 20px;
}
</style>
