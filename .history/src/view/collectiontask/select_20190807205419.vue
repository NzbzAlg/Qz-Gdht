<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="zjid" label="任务编号" style="width: calc(100% - 75%)"></el-table-column>
      <el-table-column prop="zjmc" label="任务名称"></el-table-column>
    </el-table>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="zjlx" label="任务类型"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="zjjl" label="采集距离"></el-table-column>
      <el-table-column prop="zjstatus" label="任务状态"></el-table-column>
    </el-table>
    <el-divider content-position="left">客户信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="khmc" label="客户名称"></el-table-column>
      <el-table-column prop="khlx" label="客户类型"></el-table-column>
      <el-table-column prop="khqy" label="区域"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集时间</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjdate" label="采集日期"></el-table-column>
      <el-table-column prop="cjsd" label="采集时段"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集场景</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjwz" label="地理位置"></el-table-column>
      <el-table-column prop="cjsj" label="数据类型"></el-table-column>
      <el-table-column label="区域\行业">
        <el-table-column prop="cjqy" label="区域"></el-table-column>
        <el-table-column prop="cjhy" label="行业"></el-table-column>
      </el-table-column>
      <el-table-column label="场景">
        <el-table-column prop="cjdl" label="场景大类"></el-table-column>
        <el-table-column prop="cjxf" label="场景细分"></el-table-column>
      </el-table-column>
      <el-table-column prop="cjmc" label="人群标签"></el-table-column>
      <el-table-column prop="cjmc" label="场景名称"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集终端</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cjzd" label="终端编号"></el-table-column>
      <el-table-column prop="fz" label="分组"></el-table-column>
      <el-table-column prop="cjsjl" label="采集数据量"></el-table-column>
      <el-table-column prop="cjstatus" label="采集状态"></el-table-column>
      <el-table-column prop="datastatus" label="时间状态"></el-table-column>
      <el-table-column prop="wzstatus" label="位置状态"></el-table-column>
      <el-table-column prop="lwstatus" label="联网状态"></el-table-column>
      <el-table-column prop="wzxinx" label="位置信息">
        <template slot-scope="scope">
          <span @click="renwuzb(scope.row)" :class="$style.f_renwuid">{{scope.row.wzxinx}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">任务备注</el-divider>
    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
    <!-- 坐标 -->
    <el-dialog
      title="位置信息"
      :visible.sync="jbmap"
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
  created () {
    console.log(this)
  },
  data () {
    return {
      tableData: [
        {
          zjid: 123,
          zjmc: 'ABC',
          zjlx: '自建任务',
          date: 1235213123,
          zjjl: '100米',
          zjsjl: 123,
          zjstatus: 1,
          khmc: 'admin',
          khlx: '大客户',
          khqy: '北京市海淀区',
          cjdate: 123412312,
          cjsd: '0:00-12:00',
          cjwz: '北京市/北京市/海淀区',
          cjqy: '海淀区',
          cjhy: '互联网',
          cjdl: '会展',
          cjxf: '区域性展会',
          cjmc: '区域性展会',
          cjsj: '行业数据',
          dlsmc: 'admin',
          lx: 'abc',
          cjstatus: '1',
          cjzd: 'QZ-BDEJFESF123',
          cjsjl: 123,
          datastatus: '2',
          wzstatus: '1',
          lwstatus: '2',
          wzxinx: '-23.03,-113.75 四川成都市高新区山河子村鸟不拉屎街023号',
          fz: 'ABC'
        }
      ],
      textarea: '',
      jbmap:false,
    }
  },
  methods:{
    renwuzb () {
      this.jbmap = true
    },
    handleClose () {
      this.jbmap = false
    }
  }
}
</script>

<style lang='scss' module>
.f_renwuid {
  cursor: pointer;
  color: #252cdc;
}
.map {
  height: 400px;
}
</style>
