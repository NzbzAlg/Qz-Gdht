<template>
  <div>
    <sx></sx>
    <!-- 客户统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{GEN_NUM}}</span>
          <p>自建任务</p>
        </el-card>
      </el-col>
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{FINISH_NUM}}</span>
          <p>结束</p>
        </el-card>
      </el-col>
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{ACTIVE_NUM}}</span>
          <p>进行中</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <div :class="$style.f_search">
      <!-- <el-input placeholder="请输入任务编号" v-model="id" :class="$style.id" clearable></el-input>
      <el-input placeholder="请输入客户名称" v-model="name" :class="$style.ip" clearable></el-input>-->
    </div>
    <!-- 筛选 -->
    <div :class="$style.f_sx">
      <el-input placeholder="请输入搜索内容" v-model="rwname" :class="$style.name" clearable style="width:20%"></el-input>
      <el-select
        v-model="value"
        clearable
        placeholder="请选择任务状态"
        :class="$style.f_rstatus"
        @change="status(value)"
      >
        <el-option
          v-for="item in rstatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- <el-select
        v-model="value2"
        clearable
        placeholder="请选择任务类型"
        :class="$style.f_rlx"
        @change="renwulx(value2)"
      >
        <el-option v-for="item in rlx" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select> -->
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        :class="$style.f_rdate"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" style="float: right;" @click="search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div :class="$style.table">
      <el-table ref="filterTable" :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column label="任务编号" width="180">
          <template slot-scope="scope">
            <span :class="$style.f_rwid" @click="handleEdit( scope.row)">{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="180"></el-table-column>
        <el-table-column prop="rwlx" label="任务类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type===0">自建任务</span>
            <span v-if="scope.row.type===1">平台任务</span>
          </template>
        </el-table-column>
        <el-table-column prop="merchant_name" label="客户名称"></el-table-column>
        <el-table-column prop="date" label="构建日期"></el-table-column>
        <el-table-column prop="time" label="构建时间"></el-table-column>
        <!-- <el-table-column prop="to_date" label="结束时间"></el-table-column> -->
        <el-table-column prop="data_num" label="已采数据"></el-table-column>
        <el-table-column prop="status" label="任务状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0">待采集</span>
            <span v-if="scope.row.status===1">进行中</span>
            <span v-if="scope.row.status===2">已结束</span>
            <span v-if="scope.row.status===3">已取消</span>
            <span v-if="scope.row.status===4">失效</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align:center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="compile(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="expurgate(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情页 -->
    <el-dialog
      title="任务详情"
      :visible.sync="compiles"
      width="40%"
      :before-close="handleClose">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="management"
        :class="$style.f_from"
      >
        <el-divider content-position="left" style="margin:16px 0;">基本信息</el-divider>
        <el-row>
          <el-col :span="12" :class="$style.f_span">
            <el-form-item label="任务编号:">
              <div :class="$style.code">
                <el-input v-model="management.taskCode" :disabled="stop"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称:">
              <div :class="$style.code">
                <el-input v-model="management.taskName" :disabled="stop"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类型:">
              <div :class="$style.code">
                <el-input v-model="management.taskType" :disabled="stop"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已采数据:">
              <div :class="$style.code">
                <el-input v-model="management.dataNum" :disabled="stop"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      <el-divider content-position="left" style="margin:16px 0;">修改任务</el-divider>
        <el-row>
          <el-col :span="12" :class="$style.f_span">
            <el-form-item label="起始日期:">
              <div :class="$style.code">
                <el-input v-model="management.fromDate"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" :class="$style.f_span">
            <el-form-item label="结束日期:">
              <div :class="$style.code">
                <el-input v-model="management.toDate"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" :class="$style.f_span">
            <el-form-item label="开始时间:">
              <div :class="$style.code">
                <el-input v-model="management.fromTime"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" :class="$style.f_span">
            <el-form-item label="结束时间:">
              <div :class="$style.code">
                <el-input v-model="management.toTime"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="辐射半径:">
              <div :class="$style.code">
                <el-select v-model="management.radius">
                  <el-option
                    v-for="item in collection"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="compiles = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibles">确 定</el-button>
      </span>
    </el-dialog>
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
import sx from '../components/sxbtn'
export default {
  components: {
    sx
  },
  data () {
    return {
      collection: [
        {
          value: '3',
          label: '3米'
        },
        {
          value: '5',
          label: '5米'
        },
        {
          value: '10',
          label: '10米'
        },
        {
          value: '20',
          label: '20米'
        },
        {
          value: '100',
          label: '20+'
        },
      ],
      stop:true,
      management:{},
      compiles:false,
      name: '',
      value: '',
      id: '',
      rwname: '',
      value1: '',
      value2: '',
      tableData: [],
      currentRow: null,
      currentPage4: 1,
      total: null,
      full: false,
      labelPosition: 'right',
      formLabelAlign: {
      },
      khfull: false,
      formkhfull: {},
       rstatus: [
        {
          value: 0,
          label: '待采集'
        },
        {
          value: 1,
          label: '进行中'
        },
        {
          value: 2,
          label: '已结束'
        },
        {
          value: 3,
          label: '已取消'
        },
        {
          value: 4,
          label: '失效'
        }
      ],
      rlx: [
        {
          value: 0,
          label: '自建任务'
        },
        {
          value: 1,
          label: '平台任务'
        },
      ],
      gridData: [],
      obj: {},
      tzljname: '',
      ALL_NUM: '',
      FINISH_NUM: '',
      ACTIVE_NUM: '',
      GEN_NUM: '',
      PLAT_NUM: '',
      sizes: 10,
      pages: 0,
      loading:true
    }
  },
  mounted () {
    this.getList()
    this.getCount()
  },
  methods: {
    dialogVisibles(){
      let info = {
          'code':this.management.taskCode,
          // 'name':this.management.contact,//联系人
          'radius':this.management.radius,//联系电话
          'fromDate':this.management.fromDate,//联系邮箱
          'toDate':this.management.toDate,//联系地址
          'fromTime':this.management.fromTime.split(':')[0],//id
          'toTime':this.management.toTime.split(':')[0],//客服
        }
      this.$http.post(`modules/task/updateTaskByTime`,info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.compiles = false
          this.getList()
            this.$message({
              message: '修改成功',
              type: 'success'
            });
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    //编辑
    compile(index,row){
      this.compiles = true
      console.log('bianji',row)
      this.$http.get(`modules/task/detail/${row.id}`,{params:{
      }}).then(res => {
        console.log(res)
        var { code, data } = res.data
        if (code === 1000) {
          data.fromDate= data.fromDate.substr(0,10)
          data.toDate= data.toDate.substr(0,10)
          data.fromTime = data.fromTime + ":00"
          data.toTime = data.toTime + ":00"
          this.management = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(function (error) {
        console.log('错误信息' + error)
      })

    },
    //删除
    expurgate(index,row){
      console.log('shanchu',row)
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id === 1){
        this.$confirm('确认要删除吗?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(`modules/task/delTask/${row.id}`, {
              params:{
                // 'id':row.id
                // accountName:'qzcrrohrzez3'
            }
          }).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              this.$message({
                message: '已删除',
                type: 'success'
              });
              this.getList()
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(function (error) {
            console.log('错误信息' + error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }else{
        this.$message.error("请联系管理员删除此任务");
      }
    },
    getList () {
      // console.log(sessionStorage.getItem('infos.id' ))
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id === 1){
        infos.id=''
      }
      this.$http.get(`modules/task/taskList`, {
        params: {
          size: this.sizes,
          page: this.pages,
          serviceId:infos.id
        }
        //this.zs = data.total
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.loading = false
          // console.log('ss',sessionStorage.getItem( "serviceId"))
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
              item.date = item.from_date + "\n" + "至" + "\n" + item.to_date;
              item.time = item.from_time + ":00" + "-" + item.to_time + ":00";
            });
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
    getCount () {
      this.$http.get(`modules/task/countTask`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.ALL_NUM = data.ALL_NUM
          this.FINISH_NUM = data.FINISH_NUM
          this.ACTIVE_NUM = data.ACTIVE_NUM
          this.GEN_NUM = data.GEN_NUM
          this.PLAT_NUM = data.PLAT_NUM
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
    search () {
      console.log(this.value1)
      if (this.value1 === null) {
        this.value1 = ''
        this.$http.get(`modules/task/taskList`, {
        params: {
          size: this.sizes,
          page: this.pages,
          search:this.rwname,
          taskType:this.value2,
          taskStatus:this.value,
          dateRange:this.value1,
        }
      }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + "\n" + "至" + "\n" + item.to_date;
              item.time = item.from_time + ":00" + "-" + item.to_time + ":00";
            });
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
      } else {
        this.$http.get(`modules/task/taskList`, {
        params: {
          size: this.sizes,
          page: this.pages,
          search:this.rwname,
          taskType:this.value2,
          taskStatus:this.value,
          dateRange:this.value1,
        }
      }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.tableData = data.content
            this.total = data.total
            this.tableData.forEach(item => {
              item.date = item.from_date + "\n" + "至" + "\n" + item.to_date;
              item.time = item.from_time + ":00" + "-" + item.to_time + ":00";
            });
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
      }
    },
    status (value) {
      console.log(value)
    },
    renwulx (value2) {
      console.log(value2)
    },
    handleSizeChange (val) {
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id === 1){
        infos.id=''
      }
      this.sizes = val
      this.$http.get(`modules/task/taskList`, {
        params: {
          size: val,
          page: this.pages,
          serviceId:infos.id,
          taskStatus:this.value,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
              item.date = item.from_date + "\n" + "至" + "\n" + item.to_date;
              item.time = item.from_time + ":00" + "-" + item.to_time + ":00";
            });
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
    handleCurrentChange (val) {
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id === 1){
        infos.id=''
      }
      this.pages = val
      this.$http.get(`modules/task/taskList`, {
        params: {
          size: this.sizes,
          page: val - 1,
          serviceId:infos.id,
          taskStatus:this.value,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
              item.date = item.from_date + "\n" + "至" + "\n" + item.to_date;
              item.time = item.from_time + ":00" + "-" + item.to_time + ":00";
            });
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
    handleDelete (index, row) {
      console.log(index, row);
    },
    handleClose () {
      this.full = false
      this.compiles = false
    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter();
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      console.log(column)
      return row[property] === value;
    },
    filterrwlx (value, row, colum) {
      console.log(value, row, colum)
    },
    filterrwstatus (value, row, colum) {
      console.log(value, row, colum)
    },
    handleEdit (row) {
      console.log(row)
      if (row.type === 1) {
        console.log(1)
        this.obj = {
          title: '平台任务',
          name: '/index/total.vue'+'?id='+row.id
        }
        this.$store.commit('mypush', this.obj)
        this.$router.push({ path: '/index/total.vue', query: { id: row.id } })
      } else if (row.type === 0) {
        // console.log(this)
        this.obj = {
          title: '自建任务',
          name: '/index/select.vue'+'?id='+row.id
        }
        this.$store.commit('mypush', this.obj)
        this.$router.push({ path: '/index/select.vue', query: { id: row.id } })
      }
    }
  }
}
</script>

<style lang='scss' module>
.f_search {
  width: 100%;
  height: 40px;
}
.name {
  width: calc(100% - 87%);
  float: left;
  margin-right: 30px;
}
.office {
  width: calc(100% - 57%);
  float: left;
  margin-left: 20px;
}
.ip {
  width: calc(100% - 75%);
  float: left;
  margin-left: 20px;
}
.date {
  width: calc(100% - 75%);
  float: left;
  margin-left: 20px;
}
.table {
  margin-top: 20px;
}
.f_row {
  margin-bottom: 20px;
  .f_da,
  .f_sheng {
    margin-left: 20px;
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
.f_khnam {
  cursor: pointer;
}
.f_khxq {
  .el-dialog {
    margin-top: 0;
  }
}
.code {
  float: left;
}
.id {
  width: calc(100% - 75%);
  float: left;
  margin-left: 20px;
}
.f_sx {
  display: block;
  margin: 10px 0;
  .f_rstatus,
  .f_rlx,
  .f_rdate {
    float: left;
    margin-bottom: 10px;
    width: calc(100% - 87%);
  }
  .f_rlx,
  .f_rdate {
    margin-left: 20px;
  }
}
.f_rwid {
  cursor: pointer;
  color: #252cdc;
}
</style>
