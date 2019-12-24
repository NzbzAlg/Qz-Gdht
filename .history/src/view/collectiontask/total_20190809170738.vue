<template>
  <div>
    <sx></sx>平台任务
    <el-divider content-position="left">基本信息</el-divider>
    <el-table :data="errand" border style="width: 100%">
      <el-table-column prop="taskCode" label="任务编号" style="width: 25%"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
    </el-table>
    <el-table :data="Basic" border style="width: 100%">
      <el-table-column  label="任务类型">
        <template slot-scope="scope">
          <span v-if="scope.row.taskType===1">平台任务</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="radius" label="采集距离"></el-table-column>
      <el-table-column prop="status" label="任务状态"></el-table-column>
    </el-table>
    <el-divider content-position="left">任务奖励</el-divider>
    <el-table :data="missionrewards" style="width: 100%">
      <el-table-column label="奖金池">
        <el-table-column prop="overall" label="奖金总量"></el-table-column>
        <el-table-column prop="Obtained" label="已获奖励"></el-table-column>
        <el-table-column label="百分比">
          <template slot-scope="scope">
            <span>{{scope.row.percentage}}%</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="任务量">
        <el-table-column prop="amountCount" label="任务总量"></el-table-column>
        <el-table-column prop="dataNum" label="已完成任务量"></el-table-column>
        <el-table-column label="百分比">
          <template slot-scope="scope">
            <span>{{scope.row.percent}}%</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="price" label="单条奖励"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集时间</el-divider>
    <el-table :data="Acquisitiontime" border style="width: 100%">
      <el-table-column prop="date" label="采集日期"></el-table-column>
      <el-table-column prop="time" label="采集时段"></el-table-column>
    </el-table>
    <el-divider content-position="left">采集场景</el-divider>
    <el-table :data="Scenes" border style="width: 100%">
      <el-table-column label="地理位置">
        <template slot-scope="scope">
           <span @click="examine(scope.$index, scope.row)" class="f_bh">{{scope.row.province}}\{{scope.row.city}}\{{scope.row.area}}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域\行业">
        <template slot-scope="scope">
          <span>{{scope.row.regionParent}}\{{scope.row.region}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cj" label="场景">
        <template slot-scope="scope">
          <span>{{scope.row.regionTypeParent}}\{{scope.row.regionType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="scencesName" label="场景名称"></el-table-column>
      <el-table-column label="数据类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type==='1'">区域</span>
          <span v-if="scope.row.type==='2'">行业</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">采集者信息</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="dlsmc" label="代理商名称"></el-table-column>
      <el-table-column prop="lx" label="类型"></el-table-column>
      <el-table-column prop="dlqy" label="代理区域"></el-table-column>
      <el-table-column prop="cjzd" label="采集终端"></el-table-column>
      <el-table-column prop="cjsl" label="采集终端的数量"></el-table-column>
      <el-table-column prop="cjsjl" label="采集数据量"></el-table-column>
      <el-table-column prop="yhjl" label="已获奖励"></el-table-column>
      <el-table-column prop="cjstatus" label="工作状态"></el-table-column>
    </el-table>
    <el-divider content-position="left">任务备注</el-divider>
    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
    <!-- 地图 -->

     <div class="f_dg f_map"  v-show="Fence">
      <div class="f_backdrop" @click="stop"></div>
      <div id="allmap" style="height:400px;"></div>
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
      errand: [],
      Basic: [],
      Acquisitiontime:[],
      missionrewards:[],
      Scenes:[],
      textarea: '',
      id: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getContent()
  },
  methods: {
    getContent () {
      this.$http.get(`modules/task/detail/${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          let errand = {
            'taskCode': data.taskCode,
            'taskName': data.taskName
          }
          let basic = {
            'createTime': data.createTime,
            'taskType': data.taskType,
            'radius': data.radius,
            'status':data.status
          }
          let fromtime = ''
          let totime = ''
          if(data.fromTime<10){
            fromtime="0"+data.fromTime+":00"
          }else if(data.fromTime>9){
            fromtime=data.fromTime+":00"
          }
          if(data.toTime<10){
            totime="0"+data.toTime+":00"
          }else if(data.toTime>9){
            totime=data.toTime+":00"
          }
          let tiontime ={
            'date':data.fromDate+'至'+data.toDate,
            'time':fromtime+'至'+totime
          }
          let rewards={
            'overall':data.amountCount*data.price,
            'Obtained':data.dataNum*data.price,
            'percentage':(data.dataNum*data.price/data.amountCount*data.price)*100,
            'amountCount':data.amountCount,
            'dataNum':data.dataNum,
            'percent':(data.dataNum/data.amountCount)*100,
            'price':data.price
          }
          this.Scenes = data.collectList
          this.errand.push(errand)
          this.Basic.push(basic)
          this.missionrewards.push(rewards)
          this.Acquisitiontime.push(tiontime)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    examine(index,row){
        this.Fence = true
        // console.log(row)
      var str = row.lbs
      // var str = '[[{\"lng\":120.360538,\"lat\":36.11021},{\"lng\":120.406244,\"lat\":36.11021},{\"lng\":120.408687,\"lat\":36.083497},{\"lng\":120.356082,\"lat\":36.078596},{\"lng\":120.347459,\"lat\":36.088397}]]'
      var strObj = JSON.parse(str)
      var points = strObj[0];
      // 百度坐标系坐标(地图中需要使用这个)
      var bPoints = new Array();
      //创建标注点并添加到地图中
      function addMarker (points) {
        //循环建立标注点
        // points.forEach(item=>{
        // console.log(item)
        var polygon = new BMap.Polygon(points, { strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5 });  //创建多边形
        map.addOverlay(polygon);   //增加多边形
        // })
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
          // console.log(bPoints)
          // var myIcon = new BMap.Icon(tb1, new BMap.Size(20, 32), { //图片大小 
          //   anchor: new BMap.Size(10, 25),  //标注相对point的偏移位置
          // });
          // myIcon.setImageSize(new BMap.Size(20, 32))
          var marker = new BMap.Polygon(point); //将点转化成标注点
          map.addOverlay(marker);  //将标注点添加到地图上
          // marker.addEventListener("mouseout", attribute1);
        }
      }
      // 根据点的数组自动调整缩放级别
      function setZoom (bPoints) {
        var view = map.getViewport(eval(bPoints));
        var mapZoom = view.zoom;
        var centerPoint = view.center;
        map.centerAndZoom(centerPoint, mapZoom);
      }
      //创建地图

      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(112.591886, 26.905407), 14); // 设置中心点
      addMarker(points);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);
      setTimeout(function () {
        setZoom(bPoints);
      }, 3000)
    },
  }
}
</script>

<style>

.f_bh {
  cursor: pointer;
  color: #66a6ff;
}
.f_backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 0;
  top: 0;
  left: 0;
  opacity: 0.7;
}
.f_map {
  width: 700px;
  height: 400px;
  position: fixed;
  top: 20%;
  background: #fff;
  z-index: 3;
  left: 30%;
}
</style>
