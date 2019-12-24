<template>
  <div>
    <sx></sx>
    <!-- 搜索 -->
    <div>
      <el-input placeholder="请输入终端编号" v-model="input" clearable style=" width: calc(100% - 80%);float: left;"></el-input>
      <el-select v-model="value" clearable placeholder="请选择工作状态" :class="$style.f_gzstsus">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="value1" clearable placeholder="请选择客户类型" :class="$style.f_khlx">
        <el-option v-for="item in khlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="success" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="medium" @click="add">添加</el-button>
    </div>
    <!-- 表格 v-loading="loading" -->
    <div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" fixed="left" label="序号" width="50"></el-table-column>
        <el-table-column fixed="left" property="code" label="编号"></el-table-column>
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
              <span
                @click="renwuzb(scope.row)"
                :class="$style.f_renwuid"
              >{{scope.row.formatted_address||'暂无'}}</span>
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
        :current-page.sync="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 坐标 -->
    <!-- <el-dialog
      v-if="hackReset"
      title="位置信息"
      :visible.sync="map1"
      width="30%"
      class="f_zbxx"
      :before-close="handleClose1"
    >
      <div>
        <baidu-map :class="$style.map" :center="center" :zoom="18">
          <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            <bm-info-window
              :show="show"
              @close="infoWindowClose"
              @open="infoWindowOpen"
            >{{addressname}}</bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
    </el-dialog> -->
    <!-- 绑定新设备 -->
    <div>
      <el-dialog
        title="添加新设备"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input
          v-model="formcode"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 7}"
          placeholder="请输入终端编号,多个终端请另起一行排列"
          autocomplete="off"
        ></el-input>
        <!-- <el-form :model="form">
          <el-form-item label="" :label-width="formLabelWidth">
          </el-form-item>
        </el-form>-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </span>
      </el-dialog>
    </div>
     <el-dialog     
      title="位置信息"
      :visible.sync="map"
      width="60%"
      class="f_zbxx"
      :before-close="handleClose1"
    >
    <gaode :row="item"/>
      
    </el-dialog>
  </div>
 
</template>

<script>
import axios from 'axios'
import sx from '../components/sxbtn'
import gaode from '../map/gaode'
// import Vue from 'Vue'

export default {
  components: {
    sx,
    gaode
  },
  data () {
    return {
      item:{},
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
          name: '合资公司'
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
      map1: false,
      sizes: 10,
      pages: 0,
      dialogVisible: false,
      form: {
        code: ''
      },
      formcode: '',
      formLabelWidth: '120px',
      formatted_address: '',
      Grouping: {},
      show: true,
      addressname: '',
      center: {},
      gaocenter: [121.5273285, 31.21515044],
      hackReset:true,
      loading:true
    }
  },
  mounted () {
    this.getlist();
    // this.renwuzb()
  },
  methods: {

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
          this.getlist();
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
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    shangchuan () {
      this.dialogVisible = true
    },
    search () {
      let that=this;
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id ===1){
        infos.id =''
      }
        this.pages = 0
        this.currentPage4 = 1
        // console.log(this.pages)
      this.$http.get(`modules/device/adminList`, {
        params:{
          size: this.sizes,
          deviceCode: this.input,
          type: this.value,
          proxy: this.value1,
          page: this.pages,
          serviceId:infos.id
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = []
          this.total = data.total
          console.log(data)
          // that.tableData=data.content;
          // return false;
          data.content.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city              
            }
            if(item.lng){
               that.generateData(item).then(function (result) { 
                // console.log(result); 
                item.formatted_address = result.formatted_address; 
                item.lng = result.lng; 
                item.lat = result.lat;
                // console.log(item.formatted_address)
                that.tableData.push(item);
              })
            }else{
              that.tableData.push(item);
            }
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
    getdata(item){
      let that=this
      that.center=[0,0];  //初始化时候的赋值
      return new Promise(function(resolve, reject) {
        if(item.lng){ 
          let locations=item.lng+','+item.lat;
          that.$jsonp('https://restapi.amap.com/v3/assistant/coordinate/convert?locations='+item.lng+','+item.lat+'&coordsys=gps&output=json&key=7b2709273be94bf7782a65c261b84863').then(function(res){ 
            // console.log(res)
            locations=res.locations
            item.lng=locations.split(',')[0]; 
            item.lat=locations.split(',')[1]; 
            that.center=[item.lng,item.lat];     
            that.$jsonp('https://restapi.amap.com/v3/geocode/regeo?output=json&location='+locations+'&key=7b2709273be94bf7782a65c261b84863&radius=1000&extensions=all').then(function(res){
              // console.log(res);
              let d = res.regeocode;
              that.address='';
              // console.log(d.formatted_address);
              if (d) {
                that.address = d.formatted_address;//点击选择新地址并获取地址的名称
              } 
              resolve({'lng':item.lng,'lat':item.lat,'formatted_address':that.address});
            }).catch(function (error) {
                console.log(error);
            });
          }).catch(function (error) {
              console.log(error);
          });
        }else{
          console.log('error');
        }
      });
    },
    async generateData (item){
      let that=this;
      let _result = await that.getdata(item);
      return _result;
      
      // return new Promise(function(resolve, reject) {      // 
      // console.log(_result);
          // resolve(_result)
      //  });
      
    },
    getlist(){
      let that=this;
      let infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id ===1){
        infos.id =''
      }
      let params={}
      params.size=this.sizes
      params.page=this.pages
      params.search=this.input
      params.type=this.value
      params.proxy=this.value1
      params.serviceId=infos.id
      this.$http.get(`modules/device/adminList`, {
        params
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.loading = false
          this.tableData = []
          this.total = data.total
          console.log(data)
          data.content.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city              
            }
            if(item.lng){
               that.generateData(item).then(function (result) { 
                  // console.log(result); 
                  item.formatted_address = result.formatted_address; 
                  item.lng = result.lng; 
                  item.lat = result.lat;
                  // console.log(item.formatted_address)
                  that.tableData.push(item);
              })
            }else{
              that.tableData.push(item);
            }
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
    renwuid (row) {
      console.log(1)
    },
    hxrenwuid (row) {
      console.log(1)
    },
    handleSizeChange (val) {
      this.sizes = val
      let that=this;
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id ===1){
        infos.id =''
      }
      this.$http.get(`modules/device/adminList`, {
        params:{
          size: val,
          page: this.pages,
          serviceId:infos.id,
          type: this.value,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = []
          this.total = data.total
          console.log(data)
          // that.tableData=data.content;
          // return false;
          data.content.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city              
            }
            if(item.lng){
              that.generateData(item).then(function (result) { 
                // console.log(result); 
                item.formatted_address = result.formatted_address; 
                item.lng = result.lng; 
                item.lat = result.lat;
                // console.log(item.formatted_address)
                that.tableData.push(item);
              })
            }else{
              that.tableData.push(item);
            }
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
    handleCurrentChange (val) {
      this.pages = val - 1
      let that=this;
      var infos = JSON.parse(sessionStorage.getItem('info'))
      if(infos.id ===1){
        infos.id =''
      }
     this.$http.get(`modules/device/adminList`, {
        params:{
          size: this.sizes,
          page: val - 1,
          serviceId:infos.id,
          type: this.value,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData = []
          this.total = data.total
          console.log(data)
          // that.tableData=data.content;
          // return false;
          data.content.forEach(item => {
            if (item.province === null) {
              item.suoshu = ''
            } else if (item.city === null) {
              item.suoshu = item.province
            } else {
              item.suoshu = item.province + "\\" + item.city              
            }
            if(item.lng){
               that.generateData(item).then(function (result) { 
                  // console.log(result); 
                  item.formatted_address = result.formatted_address; 
                  item.lng = result.lng; 
                  item.lat = result.lat;
                  // console.log(item.formatted_address)
                  that.tableData.push(item);
              })
              
            }else{
              that.tableData.push(item);
            }
            // that.tableData.push(item);
            // console.log(that.tableData)
            

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
    renwuzb (row) {
      console.log(row)
      if(row.lng == null||row.lng == ''){
        this.$message({
          message:'此设备暂时没有位置信息',
          type:'warning'
        })
      }else{
      this.item = row
      this.map = true
      }
      console.log('this.item',this.item)
    },
    handleClose1 () {
      this.gaocenter = [0,0]
      this.formatted_address = ''
      this.map = false 
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    },
    gb () {
      this.ikon = false
    },
    add () {
      this.dialogVisible = true
    },
    define () {
      var string = this.formcode;
      string = string.replace(/\n/g, ",")
      let info = {
        'str': string
      }
      this.$http.post(`modules/device/register`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.dialogVisible = false
          this.getlist();
          this.$message({
            message: '已绑定',
            type: 'success'
          });
          this.formcode = ''
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log('错误信息' + err)
      })
    },
    cancel () {
      this.dialogVisible = false
      this.form = {}
    },
    handleClose () {
      this.dialogVisible = false
      this.form = {}
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