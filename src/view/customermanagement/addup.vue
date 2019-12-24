<template>
  <div>
    <sx></sx>
    <!-- <el-input placeholder="请输入客户名称" v-model="name" :class="$style.name" clearable></el-input> -->
    <el-select v-model="value" placeholder="请选择地区" :class="$style.office">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <!-- <el-input placeholder="请输入企业名称" v-model="ip" :class="$style.ip" clearable></el-input> -->
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <!-- 表格 -->
    <div :class="$style.table">
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column property="address" label="地区" sortable></el-table-column>
        <el-table-column property="all" label="全部" sortable></el-table-column>
        <el-table-column property="da" label="大客户" sortable></el-table-column>
        <el-table-column property="sheng" label="省级运营中心" sortable></el-table-column>
        <el-table-column property="shi" label="市级运营中心" sortable></el-table-column>
        <el-table-column property="yi" label="一般代理" sortable></el-table-column>
        <!-- <el-table-column property="date" label="创建时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row. date|dateformat}}</span>
          </template>
        </el-table-column> -->
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
  components:{
    sx
  },
  data () {
    return {
      name: '',
      options: [
        {
          value: '选项1',
          label: '北京'
        },
        {
          value: '选项2',
          label: '上海'
        },
        {
          value: '选项3',
          label: '广东'
        },
        {
          value: '选项4',
          label: '深圳'
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
        }, 
        {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, 
        {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      tableData: [{
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }, {
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }, {
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }, {
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }, {
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }, {
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }, {
        address: '北京',
        all: 100,
        da: 10,
        sheng: 40,
        shi: 40,
        yi:10
      }],
      currentRow: null,
      currentPage4: 1,
      num: null,
      full: false,
      labelPosition: 'right',
      formLabelAlign: {
      }
    }
  },
  mounted () {
    this.num = 7
  },
  methods: {
    search () {
      console.log(this.value)
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.formLabelAlign=row
      this.full = true
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    create () {
      console.log(1)
    }
  }
}
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
