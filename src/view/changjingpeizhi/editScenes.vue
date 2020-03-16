<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:40px">
        <span :class="$style.f_khmc">场景名称:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
    </el-row>
    <!-- <el-divider content-position="left">数据去重</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:40px">
        <span :class="$style.f_khmc">数据去重:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="quchong" clearable :disabled="true"></el-input>
      </el-col>
    </el-row>-->
    <el-divider content-position="left">采集地点</el-divider>
    <el-row>
      <!-- -->
       <div>
        <el-col :span="5" style="margin-left:40px">
          <span :class="$style.f_khmc">采集场地:</span>
          <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="collectionSite" clearable></el-input>
        </el-col>
      </div>
      <el-col :span="5" style="margin-left: 84px;">
        <span :class="$style.f_khmc">省:</span>
        <el-select
          v-model="sheng"
          :class="$style.f_khipt"
          @focus="provinec1"
          @change="province"
          placeholder="请选择"
        >
          <el-option v-for="item in sheng1" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">市:</span>
        <el-select
          v-model="shi"
          :class="$style.f_khipt"
          @focus="city1"
          @change="city"
          placeholder="请选择"
        >
          <el-option v-for="item in shi1" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">区:</span>
        <el-select
          v-model="qu"
          :class="$style.f_khipt"
          @focus="area1"
          @change="area"
          placeholder="请选择"
        >
          <el-option v-for="item in qu1" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left">数据类型</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left: 71px;">
        <span :class="$style.f_khmc">类型:</span>
        <el-select
          v-model="leixing"
          :class="$style.f_khipt"
          @change="dj(value)"
          :disabled="true"
          placeholder="请选择"
        >
          <el-option v-for="item in xzlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===1">区域类型</el-divider>
    <el-row v-if="leixing===1">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">区域类型:</span>
        <el-select
          v-model="zone"
          :class="$style.f_khipt"
          @focus="regioncase1"
          @change="regioncase"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionParent"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <span :class="$style.f_khmc">区域细分:</span>
        <el-select
          v-model="zoneSubdivision"
          :class="$style.f_khipt"
          @change="regionSubdivisioncase"
          @focus="regionSubdivisioncase1"
          placeholder="请选择"
        >
          <el-option v-for="item in region" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===2">行业类型</el-divider>
    <el-row v-if="leixing===2">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">行业类型:</span>
        <el-select
          v-model="zone"
          :class="$style.f_khipt"
          @focus="regioncase1"
          @change="regioncase"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionParent"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <span :class="$style.f_khmc">行业细分:</span>
        <el-select
          v-model="zoneSubdivision"
          :class="$style.f_khipt"
          @change="regionSubdivisioncase"
          @focus="regionSubdivisioncase1"
          placeholder="请选择"
        >
          <el-option v-for="item in region" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===2||leixing===1">场景类型</el-divider>
    <el-row v-if="leixing===1">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">场景类型:</span>
        <el-select
          v-model="Scenes"
          :class="$style.f_khipt"
          @focus="Scenescase1"
          @change="Scenescase"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionTypeParent"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <span :class="$style.f_khmc">场景细分:</span>
        <el-select
          v-model="ScenesSubdivision"
          :class="$style.f_khipt"
          @change="ScenesSubdivisioncase"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionType"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-if="leixing===2">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">场景类型:</span>
        <el-select
          v-model="Scenes"
          :class="$style.f_khipt"
          @focus="Scenescase1"
          @change="Scenescase"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionTypeParent"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <span :class="$style.f_khmc">场景细分:</span>
        <el-select
          v-model="ScenesSubdivision"
          :class="$style.f_khipt"
          @change="ScenesSubdivisioncase"
          placeholder="请选择"
        >
          <el-option
            v-for="item in regionType"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left">人群标签</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left: 40px;">
        <span :class="$style.f_khmc">人群标签:</span>
        <el-select
          filterable
          v-model="value1"
          multiple
          :class="$style.f_khipt"
          collapse-tags
          @change="chaxun"
          placeholder="请选择"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===2">采集时间</el-divider>
    <el-row v-if="leixing===2" style=" text-align: left;">
      <div style="    display: inline-block;  width: 48%; text-align: left; margin-left: 41px;">
        采集日期
        <el-date-picker
          v-model="valuetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div style="    display: inline-block;  width: 48%; ">
        采集时段
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00'
          }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00',
            minTime: startTime
          }"
        ></el-time-select>
      </div>
    </el-row>
    <!-- 地图 -->
    <el-divider content-position="left">地理围栏</el-divider>
    <div>
      <amap-weilan ref="amapWeilan"></amap-weilan>
    </div>
    <el-button type="primary" @click="cj" :class="$style.f_cj">修改</el-button>
  </div>
</template>

<script>
import AmapWeilan from "./AMapWeilan";
import sx from "../components/sxbtn";
import $ from "jquery";
import qs from "qs";
const lbs = [];
export default {
  components: {
    sx,
    AmapWeilan
  },
  data() {
    return {
      collectionSite:'',
      startTime: "",
      endTime: "",
      input: "",
      value2: [],
      options: [],
      value1: [],
      value: "",
      crowd: "",
      textarea2: "",
      gongxiang: false,
      qqcs: [
        {
          id: 1,
          name: "一年去重"
        },
        {
          id: 2,
          name: "一天去重"
        }
      ],
      xzlx: [
        {
          id: 1,
          name: "区域数据"
        },
        {
          id: 2,
          name: "行业数据"
        }
      ],
      sheng1: [],
      district: [],
      shi1: [],
      qu1: [],
      leixing: "",
      sheng: "",
      shi: "",
      qu: "",
      address_detail: "",
      userlocation: { lng: "", lat: "" },
      id: "",
      zone: "",
      zoneSubdivision: "",
      Scenes: "",
      ScenesSubdivision: "",
      zoneid: "",
      zoneSubdivisionid: "",
      Scenesid: "",
      ScenesSubdivisionid: "",
      deduplication: "",
      regionParent: [],
      region: [],
      regionTypeParent: [],
      regionType: [],
      array: [],
      ids: [],
      crowdSet: [],
      shengid: "",
      shiid: "",
      quid: "",
      quchong: "",
      valuetime: []
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .get(`modules/scencesName/${this.id}`)
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.input = data.name;
            this.collectionSite = data.collectionSite
            this.leixing = data.type;
            this.sheng = data.province.name;
            this.shi = data.city.name;
            this.qu = data.area.name;
            this.shengid = data.province.id;
            this.shiid = data.city.id;
            this.quid = data.area.id;
            this.quchong = data.deduplication;
            let name = [];
            let id = [];
            console.log(data);
            data.crowdSet.forEach(item => {
              name.push(item.name);
              id.push(item.id);
            });
            this.crowdSet = data.crowdSet;
            if (data.type === 1) {
              this.zone = data.regionParent.name;
              this.zoneSubdivision = data.region.name;
              this.Scenes = data.regionTypeParent.name;
              this.ScenesSubdivision = data.regionType.name;
              this.zoneid = data.regionParent.id;
              this.zoneSubdivisionid = data.region.id;
              this.Scenesid = data.regionTypeParent.id;
              this.ScenesSubdivisionid = data.regionType.id;
            } else if (data.type === 2) {
              this.zone = data.industryParent.name;
              this.zoneSubdivision = data.industry.name;
              this.Scenes = data.industryTypeParent.name;
              this.ScenesSubdivision = data.industryType.name;
              this.zoneid = data.industryParent.id;
              this.zoneSubdivisionid = data.industry.id;
              this.Scenesid = data.industryTypeParent.id;
              this.ScenesSubdivisionid = data.industryType.id;
              let time = [];
              time.push(data.fromDate, data.toDate);
              let fromTime = "";
              let toTime = "";
              if (data.fromTime < 10) {
                fromTime = "0" + data.fromTime + ":00";
              } else if (data.toTime >= 10) {
                fromTime = data.fromTime + ":00";
              }
              if (data.toTime < 10) {
                toTime = "0" + data.toTime + ":00";
              } else if (data.toTime >= 10) {
                toTime = data.toTime + ":00";
              }
              this.valuetime = time;
              console.log(this.valuetime);
              this.startTime = fromTime;
              this.endTime = toTime;
            }
            this.value1 = name;
            this.value2 = id;
            let lbs = data.lbs;
            let province = data.province;
            this.getProvince(province);
            // this.ditu(lbs);
            this.$refs.amapWeilan.loadLbs(lbs);

            this.getCrow();
            if (this.leixing === 1) {
              this.getRegionParent();
            } else if (this.leixing === 2) {
              this.getSing();
            }
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    getCrow() {
      // console.log(crowdSet)
      this.$http
        .get(`modules/signCrowd/all`)
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.options = data;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    getProvince(province) {
      this.$http
        .get(`modules/area/areaByPid`, {
          params: {
            pid: 1
          }
        })
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.sheng1 = data;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    ditu(lbs) {
      var str = lbs;
      // var str = '[[{\"lng\":120.360538,\"lat\":36.11021},{\"lng\":120.406244,\"lat\":36.11021},{\"lng\":120.408687,\"lat\":36.083497},{\"lng\":120.356082,\"lat\":36.078596},{\"lng\":120.347459,\"lat\":36.088397}]]'
      var strObj = JSON.parse(str);
      var points = strObj;
      // 百度坐标系坐标(地图中需要使用这个)
      var bPoints = new Array();
      //创建标注点并添加到地图中
      function addMarker(points) {
        //循环建立标注点
        // points.forEach(item=>{
        // console.log(item)
        var polygon = new BMap.Polygon(points, {
          strokeColor: "red",
          strokeWeight: 2,
          strokeOpacity: 0.5
        }); //创建多边形
        map.addOverlay(polygon); //增加多边形
        // })
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
          var marker = new BMap.Polygon(point); //将点转化成标注点
          map.addOverlay(marker); //将标注点添加到地图上
          // marker.addEventListener("mouseout", attribute1);
        }
      }
      // 根据点的数组自动调整缩放级别
      function setZoom(bPoints) {
        var view = map.getViewport(eval(bPoints));
        var mapZoom = view.zoom;
        var centerPoint = view.center;
        map.centerAndZoom(centerPoint, mapZoom);
      }
      //创建地图

      var map = new BMap.Map("allmap", { enableMapClick: false });
      map.centerAndZoom(new BMap.Point(112.591886, 26.905407), 14); // 设置中心点
      addMarker(points);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);
      setTimeout(function() {
        setZoom(bPoints);
      }, 3000);
      var strObj = JSON.parse(lbs);
      var th = this;
      // //样式
      var styleOptions = {
        strokeColor: "red", //边线颜色。
        fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" //边线的样式，solid或dashed。
      };

      var regino = strObj; //已存在围栏回显
      th.array = regino;
      var reginoJson = null;
      if (regino != "") {
        reginoJson = regino;
      }
      var data = []; //存储所有的的多边形对象数组
      if (reginoJson != null) {
        data = reginoJson;
      }
      // // 百度地图API功能
      // var map = new BMap.Map('map');
      // var point = new BMap.Point(116.401394, 39.940387);
      // map.centerAndZoom(point, 12);//设置中心点坐标和地图级别
      // map.enableScrollWheelZoom(); //启用鼠标滚动对地图放大缩小
      createSearch();
      createAutocomlete();
      $("#s_p_search_btn").click(function() {
        searchPlace($("#searchplace").val());
      });
      //添加原有覆盖物
      for (var i = 0; i < data.length; i++) {
        var polygon = new BMap.Polygon();
        polygon.setPath(data[i]); //设置多边型的点数组
        map.addOverlay(polygon);
      }
      setZoom(data);

      //实例化鼠标绘制工具
      var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingMode: BMAP_DRAWING_POLYGON, //绘制模式  多边形
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [BMAP_DRAWING_POLYGON]
        },
        polygonOptions: styleOptions //多边形的样式
      });
      //鼠标绘制完成回调方法获取各个点的经纬度
      var overlays = [];
      var overlaycomplete = function(e) {
        data = [];
        overlays.push(e.overlay);
        var path = e.overlay.getPath(); //Array<Point> 返回多边型的点数组
        // console.info(path);
        data.push(path);
        // this.dj1()
        th.array = data;
      };
      //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener("overlaycomplete", overlaycomplete);
      $("#clearAll").on("click", function() {
        map.clearOverlays();
        overlays.length = 0;
        data = [];
      });

      var btnSaveCallback = function($dialog, $widget, $pjq) {
        // nice validator
        submitNow($dialog, $widget, $pjq);
      };
      function createSearch() {
        var map = window.map;
        var local = new BMap.LocalSearch(map, {
          renderOptions: { map: map, panel: "searchlist" }
        });
        window.local = local;
      }
      var addr;
      function createAutocomlete() {
        var map = window.map;
        var ac = new BMap.Autocomplete({ //建立一个自动完成的对象
          input: "searchplace",
          location: map
        });
        ac.addEventListener("onconfirm", function(e) {
          //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          addr =
            _value.business +
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.streetNumber;
          this.address_detail = addr;
          searchPlace();
        });
      }
      //搜索
      function searchPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          th.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation)); //添加标注
        }

        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun,
          renderOptions: { map: map, panel: "searchlist" }
        });
        local.search(addr);
      }
      // function searchPlace (value) {
      //   console.log(window.local.search)
      //   console.log(window.local)
      //   window.local.search(value);
      // }
    },
    province() {
      this.sheng1.forEach(item => {
        if (this.sheng === item.name) {
          console.log(item);
          this.shengid = item.id;
        }
      });
      this.shi = "";
      this.qu = "";
      this.getcity();
    },
    provinec1() {
      this.sheng = "";
    },
    getcity() {
      this.$http
        .get(`modules/area/areaByPid`, {
          params: {
            pid: this.sheng
          }
        })
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.shi1 = data;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    city() {
      this.shi1.forEach(item => {
        if (this.shi === item.name) {
          this.shiid = item.id;
        }
      });
      this.getArea();
    },
    city1() {
      this.shi = "";
    },
    getArea() {
      this.$http
        .get(`modules/area/areaByPid`, {
          params: {
            pid: this.shi
          }
        })
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.qu1 = data;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    area1() {
      this.qu = "";
    },
    area() {
      this.qu1.forEach(item => {
        if (this.qu === item.name) {
          this.quid = item.id;
        }
      });
    },
    getRegionParent() {
      this.$http
        .get(`modules/signRegion/listByParent`)
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.regionParent = data;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    getSing() {
      this.$http
        .get(`modules/signIndustry/listByParent`)
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.regionParent = data;
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    regioncase1() {
      this.zone = "";
    },
    regioncase() {
      this.regionParent.forEach(item => {
        if (this.zone === item.name) {
          this.zoneid = item.id;
        }
      });
      this.zoneSubdivision = "";
      this.Scenes = "";
      this.ScenesSubdivision = "";
      this.getzoneSubdivision();
    },
    getzoneSubdivision() {
      if (this.leixing === 1) {
        this.$http
          .get(`modules/signRegion/listByParent`, {
            params: {
              pid: this.zoneid
            }
          })
          .then(res => {
            var { code, data } = res.data;
            if (code === 1000) {
              this.region = data;
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log("错误信息" + err);
          });
      } else if (this.leixing === 2) {
        this.$http
          .get(`modules/signIndustry/listByParent`, {
            params: {
              pid: this.zoneid
            }
          })
          .then(res => {
            var { code, data } = res.data;
            if (code === 1000) {
              this.region = data;
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log("错误信息" + err);
          });
      }
    },
    regionSubdivisioncase() {
      this.region.forEach(item => {
        if (this.zoneSubdivision === item.name) {
          this.zoneSubdivisionid = item.id;
        }
      });
      this.getScenes();
    },
    regionSubdivisioncase1() {
      this.zoneSubdivision = "";
    },
    getScenes() {
      if (this.leixing === 1) {
        this.$http
          .get(`modules/signRegion/listByParent`, {
            params: {
              pid: this.zoneSubdivisionid
            }
          })
          .then(res => {
            var { code, data } = res.data;
            if (code === 1000) {
              this.regionTypeParent = data;
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log("错误信息" + err);
          });
      } else if (this.leixing === 2) {
        this.$http
          .get(`modules/signIndustry/listByParent`, {
            params: {
              pid: this.zoneSubdivisionid
            }
          })
          .then(res => {
            var { code, data } = res.data;
            if (code === 1000) {
              this.regionTypeParent = data;
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log("错误信息" + err);
          });
      }
    },
    Scenescase1() {
      this.Scenes = "";
    },
    Scenescase() {
      this.regionTypeParent.forEach(item => {
        if (this.Scenes === item.name) {
          this.Scenesid = item.id;
        }
      });
      this.getScenesSubdivision();
    },
    getScenesSubdivision() {
      if (this.leixing === 1) {
        this.$http
          .get(`modules/signRegion/listByParent`, {
            params: {
              pid: this.Scenesid
            }
          })
          .then(res => {
            var { code, data } = res.data;
            if (code === 1000) {
              this.regionType = data;
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log("错误信息" + err);
          });
      } else if (this.leixing === 2) {
        this.$http
          .get(`modules/signIndustry/listByParent`, {
            params: {
              pid: this.Scenesid
            }
          })
          .then(res => {
            var { code, data } = res.data;
            if (code === 1000) {
              this.regionType = data;
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log("错误信息" + err);
          });
      }
    },
    ScenesSubdivisioncase() {
      this.regionType.forEach(item => {
        if (this.ScenesSubdivision === item.name) {
          this.ScenesSubdivisionid = item.id;
        }
      });
    },
    xuanze() {
      console.log(this.value2);
    },
    chaxun1() {
      this.value1 = [];
      this.value2 = [];
    },
    chaxun() {
      this.$http
        .get(`modules/signCrowd/all`)
        .then(res => {
          var { code, data } = res.data;
          if (code === 1000) {
            this.ids = this.value1;
            console.log(this.ids);
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push("/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    },
    cj() {
      const amapWeilan = this.$refs.amapWeilan;
      if (amapWeilan.isEdit) {
        // alert('请先点击结束按钮')
        this.$message.error('请先点击结束按钮');
        return;
      }

      let arr = this.array[0];
      let arr1 = arr;
      let arr2 = JSON.stringify(arr1);
      arr2 = amapWeilan.lbs
      console.log('edit', arr2)
      let ids = this.ids;
      if (this.value2[0] === undefined) {
        if (this.leixing === 1) {
          let info = {
            name: this.input,
            type: 1,
            province: this.shengid,
            city: this.shiid,
            area: this.quid,
            lbs: arr2,
            regionParent: this.zoneid,
            region: this.zoneSubdivisionid,
            regionTypeParent: this.Scenesid,
            regionType: this.ScenesSubdivisionid,
            signCrowdSet: ids,
            id: this.id,
            deduplication: this.quchong,
            collectionSite:this.collectionSite,

          };
          console.log(arr2);
          console.log("quchong", this.deduplication);

          this.$http
            .put(`modules/scencesName/region`, info)
            .then(res => {
              var { code, data } = res.data;
              if (code === 1000) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.push(`/index/scenesname.vue`);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log("错误信息" + err);
            });
        } else if (this.leixing === 2) {
          let info = {
            name: this.input,
            type: 2,
            province: this.shengid,
            city: this.shiid,
            area: this.quid,
            lbs: arr2,
            industryParent: this.zoneid,
            industry: this.zoneSubdivisionid,
            industrytypeParent: this.Scenesid,
            industrytype: this.ScenesSubdivisionid,
            signCrowdSet: ids,
            id: this.id,
            fromDate: this.valuetime[0],
            toDate: this.valuetime[1],
            fromTime: this.startTime.slice(0, 2),
            toTime: this.endTime.slice(0, 2),
            deduplication: this.quchong,
            'collectionSite':this.collectionSite,
          };
          console.log("quchong1", this.deduplication);
          console.log(arr2);
          this.$http
            .put(`modules/scencesName/industry`, info)
            .then(res => {
              var { code, data } = res.data;
              if (code === 1000) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.push(`/index/scenesname.vue`);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log("错误信息" + err);
            });
        }
      } else {
        let id = [];
        this.crowdSet.forEach(item => {
          id.push(item.id);
        });
        // console.log(id)
        if (this.leixing === 1) {
          let arr = JSON.stringify(this.array[0]);
          let info = {
            name: this.input,
            type: 1,
            province: this.shengid,
            city: this.shiid,
            area: this.quid,
            lbs: arr2,
            regionParent: this.zoneid,
            region: this.zoneSubdivisionid,
            regionTypeParent: this.Scenesid,
            regionType: this.ScenesSubdivisionid,
            signCrowdSet: id,
            id: this.id,
            deduplication: this.quchong,
            collectionSite:this.collectionSite,
          };
          console.log(arr2);
          console.log("quchong2", this.deduplication);
          this.$http
            .put(`modules/scencesName/region`, info)
            .then(res => {
              var { code, data } = res.data;
              if (code === 1000) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.push(`/index/scenesname.vue`);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log("错误信息" + err);
            });
        } else if (this.leixing === 2) {
          let info = {
            name: this.input,
            type: 2,
            province: this.shengid,
            city: this.shiid,
            area: this.quid,
            lbs: arr2,
            industryParent: this.zoneid,
            industry: this.zoneSubdivisionid,
            industrytypeParent: this.Scenesid,
            industrytype: this.ScenesSubdivisionid,
            signCrowdSet: id,
            id: this.id,
            fromDate: this.valuetime[0],
            toDate: this.valuetime[1],
            fromTime: this.startTime.slice(0, 2),
            toTime: this.endTime.slice(0, 2),
            deduplication: this.quchong,
            collectionSite:this.collectionSite,
          };
          console.log(arr2);
          console.log(this.valuetime);
          console.log(this.startTime);
          console.log(this.startTime.slice(0, 2));
          console.log(this.endTime);
          this.$http
            .put(`modules/scencesName/industry`, info)
            .then(res => {
              var { code, data } = res.data;
              if (code === 1000) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.push(`/index/scenesname.vue`);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log("错误信息" + err);
            });
        }
      }
    },
    dj(val) {
      console.log(this);
    },
    dj1() {
      console.log(1);
    },
    dj2() {
      console.log(2);
    },
    dj3() {
      console.log(3);
    }
  }
};
</script>

<style lang='scss' module>
.f_khmc {
  display: inline-block;
  float: left;
  margin-top: 10px;
}
.f_khipt {
  display: inline-block;
  width: calc(100% - 50%);
  float: left;
  margin-left: 10px;
}
.f_bz {
  display: inline-block;
  height: 54px;
  line-height: 54px;
}
.f_fwb {
  width: calc(100% - 10%);
}
.f_cj {
  margin-top: 20px;
}
.f_khipt1 {
  width: 50%;
}
.f_qingchu {
  display: inline-block;
  cursor: pointer;
}
.f_dlwl {
  height: 40px;
  line-height: 40px;
}
</style>
