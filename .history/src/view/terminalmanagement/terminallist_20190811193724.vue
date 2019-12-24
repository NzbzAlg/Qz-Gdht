<template>
  <div>
    <sx></sx>
    <!-- 搜索 -->
    <div>
      <el-input placeholder="请输入任务名称" v-model="input" clearable :class="$style.f_rwinpt"></el-input>
      <el-select v-model="value" clearable placeholder="请选择工作状态" :class="$style.f_gzstsus">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="value1" clearable placeholder="请选择客户类型" :class="$style.f_khlx">
        <el-option v-for="item in khlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" fixed="left" label="序号" width="50"></el-table-column>
        <el-table-column label="绑定状态" fixed="left" property="pinless">
          <template slot-scope="scope">
            <span v-if="scope.row.merchantId===1">是</span>
            <span v-if="scope.row.merchantId===2">否</span>
          </template>
        </el-table-column>
        <el-table-column label="工作状态">
          <el-table-column property="cjzt" label="采集状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1">采集</span>
              <span v-if="scope.row.status===2">未采集</span>
            </template>
          </el-table-column>
          <el-table-column property="lwzt" label="联网状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isNet===1">在线</span>
              <span v-if="scope.row.isNet===2">离线</span>
            </template>
          </el-table-column>
          <el-table-column label="位置信息">
            <template slot-scope="scope">
              <span @click="renwuzb(scope.row)" :class="$style.f_renwuid">{{scope.row.address}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="客户">
          <el-table-column property="merchantName" label="用户名称"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.proxy_type===1">省级运营中心</span>
              <span v-if="scope.row.proxy_type===2">市级运营中心</span>
              <span v-if="scope.row.proxy_type===3">市级一般代理商</span>
              <span v-if="scope.row.proxy_type===4">大客户</span>
            </template>
          </el-table-column>
          <el-table-column property="suoshu" label="所属区域"></el-table-column>
          <el-table-column property="groupName" label="分组"></el-table-column>
        </el-table-column>
        <el-table-column label="任务">
          <el-table-column label="采集任务">
            <el-table-column property="taskName" label="任务名称"></el-table-column>
            <el-table-column property="rwid" label="任务编号">
              <template slot-scope="scope">
                <!-- <span @click="renwuid(scope.row)" :class="$style.f_renwuid">{{scope.row.taskCode}}</span> -->
                <span @click="renwuid(scope.row)">{{scope.row.taskCode}}</span>
              </template>
            </el-table-column>
            <el-table-column property="dataCount" label="采集数据"></el-table-column>
            <el-table-column property="rwzt" label="任务状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status===1">采集</span>
                <span v-if="scope.row.status===2">未采集</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="固定画像">
            <el-table-column property="fixedName" label="任务名称"></el-table-column>
            <el-table-column property="hxid" label="任务编号">
              <template slot-scope="scope">
                <!-- <span
                  @click="hxrenwuid(scope.row)"
                  :class="$style.f_renwuid"
                >{{scope.row.fixedCode}}</span>-->
                <span @click="hxrenwuid(scope.row)">{{scope.row.fixedCode}}</span>
              </template>
            </el-table-column>
            <el-table-column property="mac_num" label="采集数据"></el-table-column>
            <el-table-column property="hxzt" label="任务状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status===1">采集</span>
                <span v-if="scope.row.status===2">未采集</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">解绑</el-button>
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
    <!-- 坐标 -->
    <el-dialog
      title="位置信息"
      :visible.sync="map"
      width="30%"
      class="f_zbxx"
      :before-close="handleClose"
    >
      <div>
        <baidu-map :class="$style.map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
          <bm-marker
            :position="{lng: 116.404, lat: 39.915}"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          >
            <bm-label
              content="我爱北京天安门"
              :labelStyle="{color: 'red', fontSize : '14px'}"
              :offset="{width: -35, height: 30}"
            />
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          </bm-marker>
        </baidu-map>
      </div>
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
      tableData: [],
      input: '',
      options: [
        {
          id: 1,
          name: '采集中'
        }, {
          id: 2,
          name: '待采集'
        }, {
          id: 3,
          name: '已联网'
        },
      ],
      khlx: [
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
      ],
      value: '',
      value1: '',
      dialogVisible: false,
      currentPage4: 1,
      total: null,
      obj: {},
      map: false,
      sizes: 10,
      pages: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/device/adminList`, {
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
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleClose () {
    },
    handleEdit (index, row) {
      let info = {
        'deviceId': row.id
      }
      this.$http.post('pc/device/untied', info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.getList()
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    shangchuan () {
      this.dialogVisible = true
    },
    search(){
       this.$http.get(`modules/device/adminList?proxy=${this.value1}`, {
        params: {
          size: this.sizes,
          search: this.input,
          type: this.value,
          proxy: this.sizes,
          page: this.pages
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    renwuid (row) {
      console.log(1)
      // this.obj = {
      //   title: '采集任务详情',
      //   name: '/index/total.vue',
      //   id: '13'
      // }
      // this.$store.commit('mypush', this.obj)
      // this.$router.push({path:'/index/total.vue',query:{id:row.id}})
    },
    hxrenwuid (row) {
      console.log(1)
      // this.obj = {
      //   title: '固定画像详情',
      //   name: '/index/total.vue',
      //   id: '13'
      // }
      // this.$store.commit('mypush', this.obj)
      // this.$router.push('/index/total.vue')
    },
    handleSizeChange (val) {
      this.sizes = val
      this.$http.get(`modules/device/adminList?size=${val}&page=${this.pages}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    handleCurrentChange (val) {
      this.pages = val
      this.$http.get(`modules/device/adminList?size=${val}&page=${this.pages - 1}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = data.content
          this.total = data.total
          this.tableData.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city
            }
          })
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    renwuzb () {
      this.map = true
    },
    handleClose () {
      this.map = false
    }
  }
}
</script>

<style lang='scss' module>
.f_rwinpt {
  width: calc(100% - 80%);
  float: left;
}
.f_gzstsus,
.f_khlx {
  width: calc(100% - 80%);
  float: left;
  margin-left: 20px;
}
.f_renwuid {
  cursor: pointer;
  color: #252cdc;
}
.map {
  height: 400px;
}
</style>
