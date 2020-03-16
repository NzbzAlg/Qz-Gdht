<template>
  <div>
    <el-row :class="$style.f_row">
      <div :class="$style.f_da">
        <el-card shadow="hover">
          <span :class="$style.f_sl">{{peopellabel}}</span>
          <p>人群标签</p>
        </el-card>
      </div>
    </el-row>
    <!-- 操作 -->
    <div style="margin-bottom: 20px;text-align: left;">
      <el-input placeholder="请输入标签名称"  v-model="search1" clearable style=" width: calc(100% - 80%);float:left"></el-input>
      <el-button type="success" size="medium" icon="el-icon-search" style="margin-left:20px;" @click="search">搜索</el-button>
      <el-button size="medium" type="primary" @click="zengjia">增加</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="name" label="标签名称"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination> -->
    <!-- 上传 -->
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 增加 -->
    <div>
      <el-dialog title="增加" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose1">
        <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="appdefine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改 -->
    <div>
      <el-dialog title="修改" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
        <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      input: "",
      dialogVisible2: false,
      input1: '',
      tableData: [],
      id: '',
      currentPage4: 1,
      sizes:10,
      total:null,
      peopellabel:'',
      pages: 0,
      search1:''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/signCrowd/all`, {
        params: {
          size: this.sizes,
          page: this.pages,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
          console.log(data.length)
          this.total = data.length
          this.peopellabel = data.length
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
    search(){
      this.$http.get(`modules/signCrowd/list`, {
        params: {
          size: this.sizes,
          page: this.pages,
          keyWord:this.search1
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
          console.log(data.length)
          this.total = data.length
          this.peopellabel = data.length
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
    handleEdit (index, row) {
      this.id = row.id
      this.dialogVisible2 = true
      this.input1 = row.name
    },
    define () {
      console.log(this.input1)
      let info = {
        id:this.id,
        name:this.input1
      }
      this.$http.put(`modules/signCrowd`,info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialogVisible2 = false
          this.getList()
        }  else if (code == 2001) {
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
      console.log(2)
      this.$http.delete(`modules/signCrowd/${row.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
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
    handleClose2 () {
      this.dialogVisible2 = false
    },
    shangchuan () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    zengjia () {
      this.dialogVisible1 = true
    },
    appdefine () {
      this.dialogVisible1 = false
      // let info = new FormData()
      // info.append('name', this.input)
      let info={
        'name':this.input
      }
      this.$http.post('modules/signCrowd', info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
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
      this.input = ''
    },
    handleSizeChange (val) {
      this.sizes= val
      this.$http.get(`modules/signCrowd/all`, {
        params: {
          size: val,
          page: this.pages,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.$http.get(`modules/signCrowd/all`, {
        params: {
          size: this.sizes,
          page: val - 1,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data
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
      console.log(`当前页: ${val}`);
    },
    handleClose1 () {
      this.dialogVisible1 = false
      this.input = ''
    }
  }
}
</script>

<style lang='scss' module>
.f_row {
  margin-bottom: 20px;
  .f_da {
    width: 330px;
    margin: 0 auto;
  }
  .f_sheng {
    margin: 0 24px;
  }
}
.f_sl {
  margin-top: 0;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-size: 28px;
}
</style>
