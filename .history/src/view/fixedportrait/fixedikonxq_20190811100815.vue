<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">任务流程信息</el-divider>
    <div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="提交" :description="create_time" style="flex-basis: 30%; margin-right: 0px;"></el-step>
        <el-step title="审核" :description="pass" style="flex-basis: 30%; margin-right: 0px;"></el-step>
        <el-step title="发布" :description="end" style="flex-basis: 30%; margin-right: 0px;"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
    <!-- 基本信息 -->
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="Information" border style="width: 100%">
      <el-table-column prop="code" label="画像编号"></el-table-column>
      <el-table-column prop="name" label="画像名称"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="服务状态"></el-table-column>
      <el-table-column prop="ddzt" label="有效期"></el-table-column>
    </el-table>
    <!-- 客户信息 -->
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="khmc" label="客户名称"></el-table-column>
      <el-table-column prop="khlx" label="客户类型">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType===1">省级运营中心</span>
          <span v-if="scope.row.merchantType===2">市级运营中心</span>
          <span v-if="scope.row.merchantType===3">市级一般代理商</span>
          <span v-if="scope.row.merchantType===4">大客户</span>
          <span v-if="scope.row.merchantType===5">清竹数据</span>
        </template>
      </el-table-column>
      <el-table-column prop="qy" label="区域"></el-table-column>
    </el-table>
    <!-- 采集终端 -->
    <el-divider content-position="left">采集终端</el-divider>
    <el-table :data="deviceList" border style="width: 100%">
      <el-table-column prop="code" label="终端编号"></el-table-column>
      <el-table-column prop="groupName" label="分组"></el-table-column>
      <el-table-column prop="cjsjl" label="工作状态"></el-table-column>
      <el-table-column prop="sjsc" label="联网状态">
        <template slot-scope="scope">
          <span v-if="scope.row.isNet===1">是</span>
          <span v-if="scope.row.isNet===2">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="sjsc" label="位置信息">
        <template slot-scope="scope">
          <span
            @click="renwuzb(scope.$index,scope.row)"
            class="f_renwuid"
            v-if="obscure"
          >{{scope.row.lat}}\{{scope.row.lng}}</span>
          <span
            class="f_renwuid"
            @click="address(scope.$index,scope.row)"
            v-if="!obscure"
          >{{scope.row.addressname}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 操作信息 -->
    <el-divider content-position="left">操作信息</el-divider>
    <el-table :data="Operational" border style="width: 100%">
      <el-table-column prop="userName" label="操作者"></el-table-column>
      <el-table-column prop="createTime" label="操作时间"></el-table-column>
      <el-table-column label="操作类型">
        <template slot-scope="scope">
          <span v-if="scope.row.operationType===1">提交</span>
          <span v-if="scope.row.operationType===2">通过</span>
          <span v-if="scope.row.operationType===3">驳回</span>
          <span v-if="scope.row.operationType===4">取消</span>
          <span v-if="scope.row.operationType===5">待发布</span>
          <span v-if="scope.row.operationType===6">结束</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="操作备注"></el-table-column>
    </el-table>
    <!-- 操作 -->
    <el-divider content-position="left">操作</el-divider>
    <el-button size="mini" v-if="status===1" @click="bohui">驳回</el-button>
    <el-button size="mini" v-if="status===1" @click="shenhe">审核</el-button>
    <el-button size="mini" v-if="status===5" @click="fabu">发布</el-button>
    <!-- 驳回 -->
    <el-dialog title="提示" :visible.sync="bh" width="30%" :before-close="handleClose">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bh = false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发布 -->
    <el-dialog title="提示" :visible.sync="emancipate" width="30%" :before-close="handleClose1">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bh = false">取 消</el-button>
        <el-button type="primary" @click="certain">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog title="提示" :visible.sync="sh" width="30%" :before-close="handleClose2">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea1"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sh = false">取 消</el-button>
        <el-button type="primary" @click="review">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 坐标 -->
    <el-dialog
      title="位置信息"
      :visible.sync="jbmap"
      width="30%"
      class="f_zbxx"
      :before-close="handleClose"
    >
      <div>
        <baidu-map :class="$style.map" :center="center" :zoom="15">
          <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label
              :content="addressname"
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
      active: 1,
      date: '135421312',
      tableData: [],
      Information: [],
      Operational: [],
      deviceList: [],
      id: '',
      create_time: '',
      pass: '',
      end: '',
      status: null,
      textarea1: '',
      textarea: '',
      emancipate: false,
      sh: false,
      bh: false,
      obscure: true,
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.$http.get(`pc/fixed/selectFixedById?taskId=${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          let info = {
            'code': data.name.code,
            'name': data.name.name,
            'create_time': data.timePoint.create_time,
            'status': data.name.status,
          }
          this.status = data.name.status
          this.Information.push(info)
          this.Operational = data.record
          this.create_time = data.timePoint.create_time
          this.pass = data.timePoint.pass
          this.end = data.timePoint.end
          let deviceList = data.deviceList
          if (this.create_time != undefined) {
            this.active = 1
          } else if (this.create_time === undefined) {
            this.active = 0
          }
          if (this.pass != undefined) {
            this.active = 2
          }
          if (this.end != undefined) {
            this.active = 3
          }
          this.adjunction(deviceList)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    adjunction (deviceList) {
      let lng = ''
      let lat = ''
      deviceList.forEach(item => {
        lng = item.lng
        lat = item.lat
        this.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS&callback=renderReverse&location=${lat},${lng}&output=json&pois=1 `).then(res => {
          // var {code,data}=res.data
          this.addressname = res.result.formatted_address
          item.addressname = this.addressname
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      })
      this.deviceList = deviceList
    },
    // next () {
    //   if (this.active++ > 2) this.active = 0;
    // }
    bohui () {
      console.log(1)
      this.bh = true
    },
    handleClose () {
      this.bh = false
      this.textarea = ''
    },
    reject () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 3)
      info.append('remark', this.textarea)
      this.$http.post(`modules/order/verify`, { 'orderId': this.id, 'type': 3, 'remark': this.textarea }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.$message({
            message: '已驳回',
            type: 'success'
          });
          this.textarea = ''
          this.getContent()
          this.$router.push('/index/ikonorders.vue')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.bh = false
    },
    // 审核
    shenhe () {
      this.sh = true
    },
    handleClose2 () {
      this.sh = false
      this.textarea = ''
    },
    review () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 2)
      info.append('remark', this.textarea1)
      this.$http.post(`modules/order/verify`, { 'orderId': this.id, 'type': 2, 'remark': this.textarea }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.$message({
            message: '已通过',
            type: 'success'
          });
          this.getContent()
          this.$router.push('/index/ikonorders.vue')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.sh = false
    },
    // 发布
    fabu () {
      this.emancipate = true
    },
    certain () {
      let info = new FormData()
      info.append('orderId', this.id)
      info.append('type', 6)
      info.append('remark', this.textarea1)
      this.$http.post(`modules/order/verify`, { 'orderId': this.id, 'type': 6, 'remark': this.textarea }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.$message({
            message: '已发布',
            type: 'success'
          });
          this.getContent()
          this.$router.push('/index/ikonorders.vue')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.emancipate = false
      this.textarea = ''
    },
    handleClose1 () {
      this.emancipate = false
      this.textarea = ''
    },
  }
}
</script>

<style>
.is-process,
.is-wait {
  text-align: center;
}
.f_renwuid {
  cursor: pointer;
  color: #252cdc;
}
</style>
