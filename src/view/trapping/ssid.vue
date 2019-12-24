<template>
  <div>
    <sx></sx>
    <el-button type="primary" :class="$style.f_sc" @click="shangchuan">
      上传
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="SSID名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 上传 -->
    <el-dialog title="提示" :visible.sync="sc" width="30%" :before-close="handleClose">
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
        <el-button @click="sc = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 分页 -->
     <div>
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

      tableData: [
        {
          index: 1,
          name: '一二三',

        },
        {
          index: 2,
          name: '一二三',

        },
        {
          index: 3,
          name: '一二三',

        },
        {
          index: 4,
          name: '一二三',

        },
        {
          index: 5,
          name: '一二三',

        },
      ],
      sc: false,
      currentPage4: 1,
      num: null,
    }
  },
  mounted () {
    this.num = 6
  },
  methods: {
    handleDelete () {
      console.log(1)
    },
    shangchuan () {
      console.log(1)
      this.sc = true
    },
    handleClose(){
      this.sc = false
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    },
  }
}
</script>

<style lang='scss' module>
.f_sc {
  float: left;
  margin-bottom: 10px;
}
</style>
