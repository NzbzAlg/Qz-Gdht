<template>
  <div>
    <sx></sx>
    <!-- <el-input placeholder="请输入客户名称" v-model="name" :class="$style.name" clearable></el-input> -->
    <el-input
      placeholder="请输入姓名"
      v-model="input"
      clearable
      style=" width: calc(100% - 80%);float: left;"
    ></el-input>

    <!-- <el-input placeholder="请输入企业名称" v-model="ip" :class="$style.ip" clearable></el-input> -->
    <el-button
      type="primary"
      icon="el-icon-search"
      @click="search"
      style="float:left;margin-left:30px;margin-bottom:20px"
    >搜索</el-button>
    <!-- 表格 -->
    <div :class="$style.table">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column property="name" label="用户名"></el-table-column>
        <el-table-column property="company_name" label="公司名称"></el-table-column>
        <el-table-column property="phone" label="联系方式"></el-table-column>
        <el-table-column property="province" label="所在城市"></el-table-column>
        <el-table-column property="city" label="所在区域"></el-table-column>
        <el-table-column property="visiting_time" label="到访时间"></el-table-column>
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
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import sx from "../components/sxbtn";
export default {
  components: {
    sx
  },
  data() {
    return {
      input: "",
      name: "",
      value: "",
      ip: "",
      value1: "",
      tableData: [],
      currentRow: null,
      currentPage4: 1,
      num: null,
      full: false,
      labelPosition: "right",
      formLabelAlign: {},
      total: null,
      sizes: 10,
      pages: 0,
    };
  },
  mounted() {
    // this.num = 7;
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .get(`pc/visitor`, {
          params: {
            size: this.sizes,
            page: this.pages
          }
        })
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.tableData = data.content;
            this.total = data.total;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    search() {
      console.log(this.value);
    },
    handleSizeChange(val) {
      this.sizes = val;
      this.$http
        .get(`pc/visitor`, {
          params: {
            size: val,
            page: this.pages
          }
        })
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.tableData = data.content;
            this.total = data.total;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    handleCurrentChange(val) {
      this.pages = val - 1;
      this.$http
        .get(`pc/visitor`, {
          params: {
            size: this.sizes,
            page: val - 1
          }
        })
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.tableData = data.content;
            this.total = data.total;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.formLabelAlign = row;
      this.full = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    create() {
      console.log(1);
    }
  }
};
</script>

<style lang='scss' module>
.name {
  width: calc(100% - 80%);
  float: left;
}
.office {
  width: calc(100% - 80%);
  float: left;
  margin-left: 20px;
}
.ip {
  width: calc(100% - 80%);
  float: left;
  margin-left: 20px;
}
.date {
  width: calc(100% - 80%);
  float: left;
  margin-left: 20px;
}
.table {
  margin-top: 20px;
}
</style>
