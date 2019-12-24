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
          <p>市级一般代理商</p>
        </el-card>
      </el-col>
    </el-row>
    <el-input placeholder="请输入关键字" v-model="name" :class="$style.name" clearable></el-input>
    <el-select v-model="value" placeholder="请选择" :class="$style.office">
      <el-option v-for="item in options" :key="item.id" :label="item.namrm" :value="item.id"></el-option>
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
            <div @click="khname(scope.$index, scope.row)" :class="$style.f_khnam">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column property="company_name" label="企业名称" sortable></el-table-column>
        <el-table-column property="stamp" label="类型" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.proxy_type===1">省级运营中心</span>
            <span v-if="scope.row.proxy_type===2">市级运营中心</span>
            <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
            <span v-if="scope.row.proxy_type===4">大客户</span>
            <span v-if="scope.row.proxy_type===5">青竹数据</span>
          </template>
        </el-table-column>
        <el-table-column property="region" label="区域" sortable></el-table-column>
        <el-table-column label="操作" width="400" style="text-align:center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row)"
            >重置密码</el-button>
            <el-button
              size="mini"
              type="warning"
              v-if="scope.row.status===1"
              @click="Disable(scope.$index, scope.row)"
            >停用</el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.status===2"
              @click="Enable(scope.$index, scope.row)"
            >启用</el-button>
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
      :total="total"
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
                <el-input v-model="formkhfull.companyName" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.username" :disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:">
              <div :class="$style.code">
                <el-input :placeholder="formkhfull.createTime" :disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">客户类型</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理商:">
              <div :class="$style.code">
                <el-select v-model="formkhfull.proxyType" :disabled="jy">
                  <el-option
                    v-for="item in lx"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formkhfull.proxyType!=4">
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
                <el-input v-model="formkhfull.phone" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系邮箱:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.email" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址:">
              <div :class="$style.code">
                <el-input v-model="formkhfull.address" :disabled="jy"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">所属客服</el-divider>
        <el-form-item label="专属客服:">
          <div :class="$style.code">
            <el-input v-model="formkhfull.service" :disabled="jy"></el-input>
          </div>
        </el-form-item>
        <el-divider content-position="left">区块链</el-divider>
        <el-form-item label="区块链账号:">
          <div :class="$style.code">
            <el-input v-model="formkhfull.account" :disabled="jy"></el-input>
          </div>
        </el-form-item>
        <el-divider content-position="left">备注</el-divider>
        <el-form-item label="备注:">
          <div :class="$style.code">
            <el-input v-model="formkhfull.remarks" type="textarea" autosize></el-input>
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
          id: 1,
          name: '省级运营中心'
        },
        {
          id: 2,
          name: '市级运营中心'
        },
        {
          id: 3,
          name: '市级一般代理商'
        },
        {
          id: 4,
          name: '大客户'
        },
        {
          id: 5,
          name: '青竹数据'
        }
      ],
      all: null,
      bigkh: null,
      shengjyyzx: null,
      sjyyzx: null,
      ybdl: null,
      value: '',
      ip: '',
      value1: '',
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
      gongxiang: false,
      leixing: '',
      lx: [
         {
          id: 1,
          name: '省级运营中心'
        },
        {
          id: 2,
          name: '市级运营中心'
        },
        {
          id: 3,
          name: '市级一般代理商'
        },
        {
          id: 4,
          name: '大客户'
        },
        {
          id: 5,
          name: '青竹数据'
        }
      ],
      jy: true,
      sizes: 10,
      pages: 0
    }
  },
  mounted () {
    this.getTotle()
    this.getCount()
  },
  methods: {
    getTotle () {
      this.$http.get(`modules/merchant/list?size=${this.sizes}&page=${this.pages}`, {
        params: {
          size: this.sizes,
          page: this.pages
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.region = ''
            } else if (item.city === null) {
              item.region = item.province
            } else {
              item.region = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    getCount () {
      this.$http.get(`pc/merchant/merchantCount`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.all = data.市级运营中心 + data.省级运营中心 + data.市级一般代理商 + data.大客户
          this.bigkh = data.大客户
          this.shengjyyzx = data.省级运营中心
          this.sjyyzx = data.市级运营中心
          this.ybdl = data.市级一般代理商
        }
      }).catch((err) => {
        console.log('错误信息')
      })
    },
    search () {
      console.log(this.value)
      this.$http.get(`modules/merchant/list?search=${this.name}&proxyType=${this.value}&size=${this.sizes}&page=${this.pages}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.region = ''
            } else if (item.city === null) {
              item.region = item.province
            } else {
              item.region = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`modules/merchant/list?size=${val}&page=${this.pages}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.region = ''
            } else if (item.city === null) {
              item.region = item.province
            } else {
              item.region = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      this.pages = val
      this.$http.get(`modules/merchant/list?size=${this.sizes}&page=${val - 1}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.region = ''
            } else if (item.city === null) {
              item.region = item.province
            } else {
              item.region = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.formLabelAlign = row
      this.full = true
    },
    Enable (index, row) {
      this.$http.put(`modules/merchant/update/${row.id}/status/1`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.getTotle()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    Disable (index, row) {
      this.$http.put(`modules/merchant/update/${row.id}/status/2`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.getTotle()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleDelete (index, row) {
      let info = {
        'id': row.id
      }
      this.$http.post('modules/merchant/resetPassword', info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '已重制密码',
            type: 'success'
          });
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(function (error) {
        console.log('错误信息' + error)
      })
    },
    handleClose () {
      this.full = false
    },
    khname (index, row) {
      console.log(row)
      this.$http.get(`modules/merchant/${row.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          if (row.proxy_type === 4) {
            console.log(1)
            this.jy = true
            this.khfull = true
            this.formkhfull = data
          } else {
            console.log(2)
            this.jy = true
            this.khfull = true
            this.formkhfull = data
             if (this.formkhfull.province === null) {
              this.formkhfull.region = ''
            } else if (this.formkhfull.city === null) {
              this.formkhfull.region = data.province
            } else {
              this.formkhfull.region = data.province + "\\" + data.city
            }
          }
        }
      }).catch(function (error) {
        console.log('错误信息' + error)
      })

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
