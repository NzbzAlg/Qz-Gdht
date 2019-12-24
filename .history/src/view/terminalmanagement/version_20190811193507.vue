<template>
  <div>
    <sx></sx>
    <!-- 上传固件 -->
    <div :class="$style.f_sc">
      <el-button type="primary" size="medium" :class="$style.f_btn" @click="scbtn">
        上传固件
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="上传序号" width="200"></el-table-column>
        <el-table-column prop="version" label="固件版本" width="180"></el-table-column>
        <el-table-column prop="remarks" label="更新信息" width="180"></el-table-column>
        <el-table-column prop="createTime" label="上传日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.status===2"
              @click="release(scope.$index, scope.row)"
            >发布</el-button>
            <el-button
              size="mini"
              v-if="scope.row.status===2"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除固件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 上传信息 -->
    <div>
      <el-dialog title="上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="固件版本">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="更新信息">
            <el-input type="textarea" v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="上传固件">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="handleChange"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </span>
      </el-dialog>
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
      tableData: [],
      dialogVisible: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      action: 'modules/deviceVersion',
      fileList: [],
      file: {},
      currentPage4: 1,
      total: null,
      sizes: 10,
      pages: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/deviceVersion`, {
        params: {
          size: this.sizes,
          page: this.pages
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`modules/deviceVersion`, {
        params: {
          size: this.sizes,
          page: val - 1
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      this.$http.get(`modules/deviceVersion?page=${val - 1}&size=${this.sizes}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    release (index, row) {
      this.$http.put(`modules/deviceVersion/public/${row.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
          message: '发布成功',
          type: 'success'
        })
          this.getList()
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleDelete (index, row) {
      this.$http.delete(`modules/deviceVersion/${row.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList()
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    define () {
      // console.log()
      // let info = new FormData()
      // info.append('version', this.formLabelAlign.name)
      // info.append('remarks', this.formLabelAlign.region)
      // info.append('url', this.file.raw.type)
      let info = {
        'version': this.formLabelAlign.name,
        'remarks': this.formLabelAlign.region,
        'url': '123'
      }
      this.$http.post(this.action, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.$refs.upload.submit();
          this.dialogVisible = false
          this.formLabelAlign = {}
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    scbtn () {
      console.log(1)
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleChange (file, fileList) {
      this.file = file
      console.log(file)
      console.log(fileList)
      this.fileList = fileList.slice(-3);
    },
  }
}
</script>

<style lang='scss' module>
.f_sc {
  .f_btn {
    float: left;
    margin: 10px 0;
  }
}
</style>
