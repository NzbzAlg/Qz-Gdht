<template>
  <div>
    <sx></sx>
    <!-- 数据统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="3" :style="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{all}}</span>
          <p>总数量</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{submit}}</span>
          <p>已完成数量</p>
        </el-card>
      </el-col>
      <el-col :span="3" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{end}}</span>
          <p>未审批数量</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <!-- <div :class="$style.f_search"></div> -->
    <!-- 筛选 -->
    <div :class="$style.f_sx">
      <el-input placeholder="请输入搜索内容" v-model="input" :class="$style.f_sxk" clearable></el-input>
      <el-select v-model="value" clearable placeholder="请选择" :class="$style.f_sxk">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value2" clearable placeholder="请选择" :class="$style.f_sxk1">
        <el-option v-for="item in kehu" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        :class="$style.f_sxk1"
      ></el-date-picker>
      <el-button type="primary" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="画像名称"></el-table-column>
        <el-table-column prop="ddid" label="画像编号">
          <template slot-scope="scope">
            <span :class="$style.f_bh" @click="bh(scope.row)">{{ scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="提交日期"></el-table-column>
        <el-table-column prop="yjlje" label="工作状态">
          <template slot-scope="scope">
            <span v-if="scope.row.wordStatus===1">采集中</span>
            <span v-if="scope.row.wordStatus===2">未采集</span>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" label="客户名称"></el-table-column>
        <!-- <el-table-column prop="sjsl" label="实际数据量" ></el-table-column> -->
        <el-table-column label="客户类型">
          <template slot-scope="scope">
            <span v-if="scope.row.proxy_type===1">大客户</span>
            <span v-if="scope.row.proxy_type===2">省级代理商</span>
            <span v-if="scope.row.proxy_type===3">市级代理商</span>
            <span v-if="scope.row.proxy_type===4">一般代理商</span>
          </template>
        </el-table-column>
        <el-table-column prop="ddqy" label="代理区域"></el-table-column>
        <el-table-column label="服务状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">待审核</span>
            <span v-if="scope.row.status===2">已驳回</span>
            <span v-if="scope.row.status===3">服务中</span>
            <span v-if="scope.row.status===4">已过期</span>
            <span v-if="scope.row.status===5">已取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="dlsnum" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
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
        :total="total"
      ></el-pagination>
    </div>
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
      input: '',
      input1: '',
      input2: '',
      value1: '',
      options: [
        {
          value: 1,
          label: '待审核'
        },
        {
          value: 2,
          label: '已驳回'
        },
        {
          value: 3,
          label: '服务中'
        },
        {
          value: 4,
          label: '已过期'
        },
        {
          value: 5,
          label: '已取消'
        },
      ],
      kehu: [
        {
          value: 1,
          label: '大客户'
        },
        {
          value: 2,
          label: '省级运营中心'
        },
        {
          value: 3,
          label: '市级运营中心'
        },
        {
          value: 4,
          label: '一般代理'
        },
      ],
      value2: '',
      value: '',
      tableData: [],
      currentPage4: 1,
      total: null,
      all: '',
      submit: '',
      end: '',
      sizes: 10,
      pages: 0,
    }
  },
  mounted () {
    this.getCount()
    this.getList()
  },
  methods: {
    getCount () {
      this.$http.get(`modules/fixed/adminCount`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.all = data.ALL
          this.submit = data.SUBMIT
          this.end = data.END
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
    getList () {
      this.$http.get(`modules/fixed/adminList`, {
        params: {
          size: this.sizes,
          page: this.pages,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.total = data.total
          this.tableData = data.content
          this.tableData.forEach(item => {
            if (item.province === '') {
              item.ddqy = ''
            } else if (item.city === '') {
              item.ddqy = item.province
            } else {
              item.ddqy = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    bh (row) {
      this.obj = {
        title: '固定画像详情',
        name: '/index/fixedikonxq.vue'+'?id='+row.id,
        id: '50'
      }
      this.$store.commit('mypush', this.obj)
      this.$store.commit('myrow', row)
      this.$router.push({ path: '/index/fixedikonxq.vue', query: { id: row.id } })
    },
    search () {
      console.log(this.value1)
      if (this.value1 === null) {
        console.log('1')
        this.value1 = ''
        this.$http.get(`modules/fixed/adminList`, {
        params: {
          size: this.sizes,
          page: this.pages,
          createTime: this.value1,
          search:this.input,
          proxyType: this.value2,
          status:this.value
        }
      }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              if (item.province === '') {
                item.ddqy = ''
              } else if (item.city === '') {
                item.ddqy = item.province
              } else {
                item.ddqy = item.province + "\\" + item.city
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      } else {
        this.$http.get(`modules/fixed/adminList`, {
        params: {
          size: this.sizes,
          page: this.pages,
          createTime: this.value1,
          search:this.input,
          proxyType: this.value2,
          status:this.value
        }
      }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              if (item.province === '') {
                item.ddqy = ''
              } else if (item.city === '') {
                item.ddqy = item.province
              } else {
                item.ddqy = item.province + "\\" + item.city
              }
            })
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    handleEdit (index, row) {
       this.obj = {
        title: '固定画像',
        name: '/index/fixedhx.vue'+'?id='+row.id,
        id: row.id
      }
      this.$store.commit('mypush', this.obj)
      this.$store.commit('myid', row.id)
      this.$router.push({ parh: '/index/fixedhx.vue', query: { id: row.id } })
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`modules/fixed/adminList`, {
        params: {
          size: val,
          page: this.pages,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === '') {
              item.ddqy = ''
            } else if (item.city === '') {
              item.ddqy = item.province
            } else {
              item.ddqy = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.pages = val
      this.$http.get(`modules/fixed/adminList`, {
        params: {
          size: this.sizes,
          page: val - 1,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === '') {
              item.ddqy = ''
            } else if (item.city === '') {
              item.ddqy = item.province
            } else {
              item.ddqy = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
  }
}
</script>

<style lang='scss' module>
.f_search {
  height: 40px;
  margin-bottom: 10px;
  .f_ipt1 {
    width: calc(100% - 75%);
    float: left;
    margin-left: 20px;
  }
}
.f_ipt {
  width: calc(100% - 75%);
  float: left;
  margin-right: 20px;
}
.f_sx {
  height: 40px;
  margin-bottom: 10px;
  .f_sxk,
  .f_sxk1 {
    width: calc(100% - 85%);
    float: left;
    margin-left: 20px;
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
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 28px;
}
p {
  margin: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 14px;
  color: #999999;
}
.f_bh {
  cursor: pointer;
  color: #252cdc;
}
</style>
