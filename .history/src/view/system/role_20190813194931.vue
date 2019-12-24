<template>
  <div>
    <sx></sx>
    <div style="height:40px">
      <el-input placeholder="请输入用户姓名" v-model="name" :class="$style.name" clearable></el-input>
      <el-select v-model="value" placeholder="请选择" :class="$style.office">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入编号" v-model="ip" :class="$style.ip" clearable></el-input>
      <div class="block" :class="$style.date">
        <el-date-picker v-model="value1" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </div>
      <el-button type="primary" @click="create" style="float:left;margin-left:20px;">创建</el-button>
      <el-button type="primary" icon="el-icon-search" @click="search" style="float:left">搜索</el-button>
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
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column property="ip" label="编号"></el-table-column>
        <el-table-column property="name" label="用户"></el-table-column>
        <el-table-column property="office" label="角色职位"></el-table-column>
        <el-table-column property="date" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row. date|dateformat}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      options: [
        {
          value: '选项1',
          label: '平台管理员'
        },
        {
          value: '选项2',
          label: '客服经理'
        },
        {
          value: '选项3',
          label: '导出人员'
        },
        {
          value: '选项4',
          label: '财务'
        }
      ],
      value: '',
      ip: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      tableData: [],
      currentRow: null,
      currentPage4: 1,
      num: null,
    }
  },
  mounted () {
    this.num = 6
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`sys/user?size=10`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    freeze (index, row) {
      this.$http.put(`sys/user/update/${row.id}/status/2`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.getList()
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    thaw (index, row) {
      this.$http.put(`sys/user/update/${row.id}/status/1`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.getList()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    search () {
      console.log(this.value1)
      console.log(this.name)
      console.log(this.ip)
      console.log(this.value)
      // this.$http.get(`sys/user?size=10`).then(res => {
      //   var { code, data } = res.data
      //   if (code === 1000) {
      //     this.tableData = data.content
      //   }
      // }).catch((err) => {
      //   console.log('错误信息' + err)
      // })
    },
    create () {
      console.log(1)
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
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang='scss' module>
.name {
  width: calc(100% - 85%);
  float: left;
}
.office {
  width: calc(100% - 85%);
  float: left;
  margin-left: 20px;
}
.ip {
  width: calc(100% - 85%);
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
