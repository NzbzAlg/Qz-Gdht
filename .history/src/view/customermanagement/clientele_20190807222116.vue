<template>
  <div>
    <sx></sx>
    <!-- 客户统计 -->
    <el-row :class="$style.f_row">
      <el-col :span="4" :style="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{all}}</span>
          <p>全部</p>
        </el-card>
      </el-col>
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{bigkh}}</span>
          <p>大客户</p>
        </el-card>
      </el-col>
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{shengjyyzx}}</span>
          <p>省级运营中心</p>
        </el-card>
      </el-col>
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{sjyyzx}}</span>
          <p>市级运营中心</p>
        </el-card>
      </el-col>
      <el-col :span="4" :class="$style.f_sheng">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{ybdl}}</span>
          <p>一般代理</p>
        </el-card>
      </el-col>
    </el-row>
    <el-input placeholder="请输入客户名称" v-model="name" :class="$style.name" clearable></el-input>
    <el-select v-model="value" placeholder="请选择" :class="$style.office">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <!-- <el-input placeholder="请输入企业名称" v-model="ip" :class="$style.ip" clearable></el-input> -->
    <!-- <div class="block" :class="$style.date">
      <el-date-picker v-model="value1" type="date" placeholder="请选择创建日期"></el-date-picker>
    </div>-->
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>

    <!-- 表格 -->
    <div :class="$style.table">
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column label="客户名称" sortable>
          <template slot-scope="scope">
            <div
              @click="khname(scope.$index, scope.row)"
              :class="$style.f_khnam"
            >{{scope.row.contact}}</div>
          </template>
        </el-table-column>
        <el-table-column property="companyName" label="企业名称" sortable></el-table-column>
        <el-table-column property="stamp" label="类型" sortable></el-table-column>
        <el-table-column property="region" label="区域" sortable></el-table-column>
        <el-table-column label="操作" width="400" style="text-align:center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row)"
            >重置密码</el-button>
            <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">停用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
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
    <!-- 详情 -->
    <el-dialog title="提示" :visible.sync="full" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="客户名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formLabelAlign.qyname"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="formLabelAlign.stamp"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="full = false">取 消</el-button>
        <el-button type="primary" @click="full = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 客户详情 -->
    <el-dialog
      title="客户详情"
      :visible.sync="khfull"
      width="40%"
      :before-close="handleClose1"
      :class="$style.f_khxq"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formkhfull"
        :class="$style.f_from"
      >
        <el-divider content-position="left" style="margin:16px 0;">基本信息</el-divider>
        <el-row>
          <el-col :span="12" :class="$style.f_span">
            <el-form-item label="客户名称:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.name" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.qyname" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.user" :disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:">
              <div :class="$style.code">
                <!-- <span>{{ formkhfull.date|dateformat}}</span> -->
                <el-input :placeholder="formkhfull.date|dateformat" :disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">客户类型</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理商:">
              <div :class="$style.code">
                <el-select v-model="formkhfull.stamp" :disabled="jy">
                  <el-option
                    v-for="item in lx"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.region" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left" v-if="formkhfull.stamp==='大客户'">数据共享</el-divider>
        <el-row v-if="formkhfull.stamp==='大客户'">
          <el-col :span="8">
            <span>是否共享：</span>
            <el-switch
              v-model="gongxiang"
              active-color="#13ce66"
              v-if="gongxiang===false"
              @change="queren"
              inactive-color="#ff4949"
            ></el-switch>
            <el-switch
              v-model="gongxiang"
              active-color="#13ce66"
              v-if="gongxiang===true"
              disabled
              inactive-color="#ff4949"
            ></el-switch>
          </el-col>
        </el-row>
        <el-divider content-position="left">联系方式</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.contact" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.contactnum" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系邮箱:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.contaemail" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.contaaddress" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">所属客服</el-divider>
        <el-form-item label="专属客服:">
          <div :class="$style.code">
            <el-input v-model="formkhfull.customer" :disabled="jy"></el-input>
          </div>
        </el-form-item>
        <el-divider content-position="left">区块链</el-divider>
        <el-form-item label="区块链账号:">
          <div :class="$style.code">
            <el-input v-model="formkhfull.qkl" :disabled="jy"></el-input>
          </div>
        </el-form-item>
        <el-divider content-position="left">备注</el-divider>
        <el-form-item label="备注:">
          <div :class="$style.code">
            <el-input v-model="formkhfull.bz" type="textarea" autosize></el-input>
          </div>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="khfull = false">取 消</el-button>
        <el-button type="primary" @click="khfull = false">确 定</el-button>
      </span>
    </el-dialog>
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
      all: null,
      bigkh: null,
      shengjyyzx: null,
      sjyyzx: null,
      ybdl: null,
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
      full: false,
      labelPosition: 'right',
      formLabelAlign: {
      },
      khfull: false,
      formkhfull: {},
      gongxiang: false,
      leixing: '',
      lx: [
        {
          value: '选项5',
          label: '大客户'
        },
        {
          value: '选项6',
          label: '省级运营中心'
        },
        {
          value: '选项7',
          label: '市级运营中心'
        },
        {
          value: '选项8',
          label: '一般代理'
        },
      ],
      jy: true
    }
  },
  mounted () {
    this.num = 7
    // this.getList()
    this.getTotle()
  },
  methods: {
    getTotle () {
      this.$http.get(`modules/merchant`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.tableData = data.content
          // province 省
          let province = ''
          this.tableData.forEach(item => {
            province = item.province
            this.getAera(province)
          })

        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getAera (province) {
      this.$http.get(`modules/area/areaByPid?pid=${province}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // console.log(data)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getCity(city){
      
    },
    // async getTotle(){
    //   var res = await this.$http.request({
    //     url:'modules/merchant/merchantCount',
    //     methods:'get'
    //   })
    //   var {code,data}=res.data
    //   if(code===1000){
    //     console.log(data)
    //     this.bigkh=data.大客户
    //     this.shengjyyzx =data.省级运营中心
    //     this.sjyyzx =data.市级运营中心
    //     this.ybdl=data.市级一般代理商
    //     this.all=this.bigkh+this.shengjyyzx+this.sjyyzx+this.ybdl
    //     console.log(this.all)
    //   }
    // },
    // async getList(){
    //   var res = await this.$http.request({
    //     url:'modules/merchant',
    //     methods:'get'
    //   })
    //   var {code,data}=res.data
    //   if(code===1000){
    //     this.tableData=data.content
    //   }
    // },
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
      this.formLabelAlign = row
      this.full = true
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    handleClose () {
      this.full = false
    },
    khname (index, row) {
      console.log(row.stamp)
      this.$http.get('modules/merchant/:id').then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
        }
      }).catch(function (error) {
        console.log('错误信息' + error)
      })
      if (row.stamp === '大客户') {
        console.log(1)
        this.jy = true
        this.khfull = true
        this.formkhfull = row
      } else {
        console.log(2)
        this.jy = false
        this.khfull = true
        this.formkhfull = row
      }
      // this.khfull = true
      // this.formkhfull = row
      // this.$router.push('/index/clientele.vue/clientelxq.vue')
    },
    queren () {
      this.$confirm('此操作将永久生效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.gongxiang = true
      }).catch(() => {
        this.gongxiang = false
      });
    },
    handleClose1 () {
      console.log(1)
      this.khfull = false
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
.f_khnam {
  cursor: pointer;
  color: #252cdc;
}
.f_khxq {
  .el-dialog {
    margin-top: 0;
  }
}
p {
  margin: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 14px;
  color: #999999;
}
.code {
  float: left;
}
.f_gx {
  float: left;
  margin-top: 10px;
}
</style>
