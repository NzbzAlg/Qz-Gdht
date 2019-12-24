<template>
  <div>
    <sx></sx>
    <el-input placeholder="请输入姓名" v-model="user" :class="$style.name" clearable style="width:20%"></el-input>
    <!-- <el-select v-model="value" clearable placeholder="请输入角色" :class="$style.ip">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input placeholder="请输入姓名" v-model="name" :class="$style.user" clearable></el-input>-->
    <div :class="$style.f_btn">
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="success" @click="create">创建</el-button>
    </div>
    <!-- 表格 -->
    <div :class="$style.table">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange1"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column property="username" label="登录账户"></el-table-column>
        <el-table-column label="角色" property='appellation'></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="phone" label="电话"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">正常</span>
            <span v-if="scope.row.status===2">冻结</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="255">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="warning"
              v-if="scope.row.status===1"
              @click="freeze(scope.$index, scope.row)"
            >冻结</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status===2"
              @click="thaw(scope.$index, scope.row)"
            >解冻</el-button>
            <el-button
            style="margin-top:10px;"
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row)"
            >重置密码</el-button>
            <!-- <el-button type="primary" style="width:95px;height:30px;margin-top:10px;line-height: 0;">重置密码</el-button> -->
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
    <!-- 创建 -->
    <div>
      <el-dialog title="创建用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="登录用户名" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth" class="manufacture">
            <el-select v-model="form.region" placeholder="请选择角色" style="width:100%">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 个人信息 -->
    <div>
      <el-dialog title="用户详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="personal">
          <el-form-item label="登录账户" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.status" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.createTime" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="登陆ip" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.lastLoginIP" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="最后登陆时间" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.lastLoginTime" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" class="manufacture">
            <el-input v-model="personal.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibles">确 定</el-button>
        </span>
      </el-dialog>
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
    // var idNumReg = /^[\u4e00-\u9fa5]{1,}$/
    //   var validateIdNum = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('身份证号不能为空!!'))
    //   }
    //   setTimeout(() => {
    //     if (!idNumReg.test(value)) {
    //     callback(new Error('格式有误'))
    //     } else {
    //     callback()
    //     }
    //   }, 500)
    // }
    return {
      user: '',
      value: '',
      part: '',
      name: '',
      value1: '',
      tableData: [],
      currentRow: null,
      currentPage4: 1,
      total: null,
      sizes: 10,
      dialogFormVisible: false,
      form: {
        username: '',
        name: '',
        region: '',
        email: "",
        phone: "",
      },
      // rules: {
      //   phone:[{ required: true, validator: validateIdNum, trigger: 'blur' }],
      // },
      personal: {},
      formLabelWidth: '120px',
      options: [],
      dialogVisible: false,
      pages: 0,
      
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`sys/user`, {
        params: {
          size: this.sizes,
          page: this.pages
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          let Character=''
          this.tableData.forEach(item=>{
            // console.log(item.roles[0].name)
            item.roles.forEach(item1=>{
              console.log(item1.name)
              Character = item1.name
            })
            item.appellation = Character
          })
          // console.log(this.tableData)
          this.total = data.total
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
      let fields = 'keyword.fields'
      let value = 'keyword.value'
      this.$http.get(`sys/user`, {        
        params: {
            'keyword.fields': 'name,username',
            'keyword.value': this.user
          }      
        }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          console.log(this.tableData)
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
      console.log('dan')
      this.pages = val - 1
      this.$http.get(`sys/user`, {
        params: {
          size: this.sizes,
          page: val - 1
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          let Character=''
          this.tableData.forEach(item=>{
            // console.log(item.roles[0].name)
            item.roles.forEach(item1=>{
              console.log(item1.name)
              Character = item1.name
            })
            item.appellation = Character
          })
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
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`sys/user`, {
        params: {
          size: val,
          page: this.pages
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          let Character=''
          this.tableData.forEach(item=>{
            // console.log(item.roles[0].name)
            item.roles.forEach(item1=>{
              console.log(item1.name)
              Character = item1.name
            })
            item.appellation = Character
          })
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
    handleCurrentChange1 (val) {
      console.log(val)
    },
     handleDelete (index, row) {
      this.$confirm('确认要重置密码?, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let info = {
          'id': row.id
        }
        this.$http.post('sys/user/resetPassword', info).then(res => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    create () {
      this.dialogFormVisible = true
      this.form = {}
      this.$http.get(`sys/role/items`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.options = data
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
    determine () {
      let info = {
        'username': this.form.username,
        'name': this.form.name,
        'roles': this.form.region,
        'email': this.form.email,
        'phone': this.form.phone,
      }
      // console.log(info)
      if (!info.username) {
        this.$message.error('登录用户名不能为空');
      } else if (!info.name) {
        this.$message.error('姓名不能为空');
      } else if (!info.roles) {
        this.$message.error('角色不能为空');
      }else if(!info.phone){
        this.$message.error('手机号不能为空');
      }else if(!info.email){
        this.$message.error('邮箱不能为空');
      } else if (/[\u4E00-\u9FA5]/g.test(info.username)) {
        this.$message.error('用户名输入有误');
      } 
      // else if (/^[1][3,4,5,7,8][0-9]{9}$/.test(info.phone)) {
      //   this.$message.error('手机号输入有误');
      // } 
      else {
        this.$http.post(`sys/user`, info).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.dialogFormVisible = false
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
      }
    },
    dialogVisibles(){
      this.dialogVisible = false
      let info = {
        'username': this.personal.username,
        'name': this.personal.name,
        'roles': this.personal.remark,
        'phone': this.personal.phone,
        'email': this.personal.email,
        'userId': this.personal.id
      }
      this.$http.post(`sys/user/editUser`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.dialogFormVisible = false
          this.getList()
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleEdit (index, row) {
      this.dialogVisible = true
      this.$http.get(`sys/user/${row.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.personal = data
          if (this.personal.status === 1) {
            this.personal.status = '正常'
          } else if (this.personal.status === 2) {
            this.personal.status = '冻结'
          }
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
    handleClose () {
      this.dialogVisible = false
    },
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
.user {
  width: calc(100% - 80%);
  float: left;
  margin-left: 20px;
}
.table {
  margin-top: 20px;
}
.f_btn {
  text-align: right;
  margin-right: 80px;
}
</style>
