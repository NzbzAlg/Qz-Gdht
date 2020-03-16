<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:40px">
        <span :class="$style.f_khmc">场景名称:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="name" clearable></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">采集地点</el-divider>
    <el-row>
      <div>
        <el-col :span="5" style="margin-left:40px">
          <span :class="$style.f_khmc">采集场地:</span>
          <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="collectionSite" clearable></el-input>
        </el-col>
      </div>
      <el-col :span="5" style="margin-left: 84px;">
        <span :class="$style.f_khmc">省:</span>
        <el-select v-model="sheng" :class="$style.f_khipt" @change="province" placeholder="请选择">
          <el-option v-for="item in sheng1" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">市:</span>
        <el-select v-model="shi" :class="$style.f_khipt" @change="city" placeholder="请选择">
          <el-option v-for="item in shi1" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">区:</span>
        <el-select v-model="qu" :class="$style.f_khipt" placeholder="请选择">
          <el-option v-for="item in qu1" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left">数据类型</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left: 71px;">
        <span :class="$style.f_khmc">类型:</span>
        <el-select v-model="leixing" :class="$style.f_khipt" @change="stamp" placeholder="请选择">
          <el-option v-for="item in xzlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left">数据去重</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left: 71px;">
        <span :class="$style.f_khmc">数据去重:</span>
        <el-select v-model="deduplication" :class="$style.f_khipt"  placeholder="请选择">
          <el-option v-for="item in ssqc" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===1">区域类型</el-divider>
    <el-row v-if="leixing===1">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">区域类型:</span>
        <el-select v-model="zone" :class="$style.f_khipt" @change="regioncase" placeholder="请选择">
          <el-option
            v-for="item in regionParent"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <span :class="$style.f_khmc">区域细分:</span>
        <el-select
          v-model="zoneSubdivision"
          :class="$style.f_khipt"
          @change="regionSubdivisioncase"
          placeholder="请选择"
        >
          <el-option v-for="item in region" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===2">行业类型</el-divider>
    <el-row v-if="leixing===2">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">行业类型:</span>
        <el-select v-model="zone" :class="$style.f_khipt" @change="regioncase" placeholder="请选择">
          <el-option
            v-for="item in regionParent"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <span :class="$style.f_khmc">行业细分:</span>
        <el-select
          v-model="zoneSubdivision"
          :class="$style.f_khipt"
          @change="regionSubdivisioncase"
          placeholder="请选择"
        >
          <el-option v-for="item in region" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===2||leixing===1">场景类型</el-divider>
    <el-row v-if="leixing===1">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">场景类型:</span>
        <el-select v-model="Scenes" :class="$style.f_khipt" @change="Scenescase" placeholder="请选择">
          <el-option
            v-for="item in regionTypeParent"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
          <el-option v-for="item in regionType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-if="leixing===2">
      <el-col :span="7" style="margin-left: 42px;">
        <span :class="$style.f_khmc">场景类型:</span>
        <el-select v-model="Scenes" :class="$style.f_khipt" @change="Scenescase" placeholder="请选择">
          <el-option
            v-for="item in regionTypeParent"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
          <el-option v-for="item in regionType" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
          v-model="value2"
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
              end: '24:00'
            }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: startTime
          }"
        ></el-time-select>
      </div>
    </el-row>
    <!-- 地图 -->
  <el-divider content-position="left">地理围栏</el-divider>
    <amap-weilan ref="amapWeilan"></amap-weilan>
    <el-button type="primary" @click="cj" :class="$style.f_cj">创建</el-button>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
import AmapWeilan from './AMapWeilan'

import $ from 'jquery'
export default {
  components: {
    sx,
    AmapWeilan
  },
  data () {
    return {
      name: '',
      collectionSite:'',
      startTime: '',
      endTime: '',
      input: '',
      value2: [],
      options: [],
      value1: [],
      value: '',
      crowd: '',
      textarea2: '',
      deduplication:'',
      gongxiang: false,
      xzlx: [
        {
          id: 1,
          name: '区域数据'
        },
        {
          id: 2,
          name: '行业数据'
        },
      ],
      ssqc: [
        {
          id: 0,
          name: '一年去重'
        },
        {
          id: 1,
          name: '一天去重'
        },
      ],
      sheng1: [],
      district: [],
      shi1: [],
      qu1: [],
      leixing: '',
      sheng: '',
      shi: '',
      qu: "",
      address_detail: '',
      userlocation: { lng: "", lat: "" },
      id: '',
      zone: '',
      zoneSubdivision: '',
      Scenes: '',
      ScenesSubdivision: '',
      zoneid: '',
      zoneSubdivisionid: '',
      Scenesid: '',
      ScenesSubdivisionid: '',
      regionParent: [],
      region: [],
      regionTypeParent: [],
      regionType: [],
      array: [],
      ids: [],
      crowdSet: [],
      shengid: '',
      shiid: '',
      quid: '',

    }
  },
  mounted () {
    // this.ditu();
    this.getprovince();
    this.getpeople()
  },
  methods: {
    ditu () {
      var th = this
      //样式
      var styleOptions = {
        strokeColor: "red",    //边线颜色。
        fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,       //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
      }

      // var regino ='${regino}';//已存在围栏回显
      var reginoJson = null;
      // if(regino!=''){
      //     reginoJson = JSON.parse(regino);
      // }
      var data = [];//存储所有的的多边形对象数组
      if (reginoJson != null) {
        data = reginoJson;
      }

      // 百度地图API功能
      var map = new BMap.Map('map', { enableMapClick: false });
      var point = new BMap.Point(116.401394, 39.940387);
      map.centerAndZoom(point, 12);//设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); //启用鼠标滚动对地图放大缩小
      createSearch();
      createAutocomlete();
      $("#s_p_search_btn").click(function () {
        searchPlace($("#searchplace").val());
      });
      //添加原有覆盖物
      for (var i = 0; i < data.length; i++) {
        var polygon = new BMap.Polygon();
        polygon.setPath(data[i]);//设置多边型的点数组
        map.addOverlay(polygon);
      }
      setZoom(data);

      //实例化鼠标绘制工具
      var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingMode: BMAP_DRAWING_POLYGON,//绘制模式  多边形
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [
            BMAP_DRAWING_POLYGON
          ]
        },
        polygonOptions: styleOptions //多边形的样式
      });



      //鼠标绘制完成回调方法获取各个点的经纬度
      var overlays = [];
      var overlaycomplete = function (e) {
        overlays.push(e.overlay);
        var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
        // console.info(path);
        data.push(path);
        th.array = data
        // console.log('12' + data);
      };
      //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener('overlaycomplete', overlaycomplete);

      $('#clearAll').on('click', function () {
        console.log(1)
        map.clearOverlays();
        overlays.length = 0
        data = [];
      })

      var btnSaveCallback = function ($dialog, $widget, $pjq) {
        // nice validator
        submitNow($dialog, $widget, $pjq);
      };

      // 根据点的数组自动调整缩放级别
      function setZoom (data) {
        var markers = new Array();
        if (data.length != 0) {
          $.each(data, function (idx, item) {
            $.each(item, function (inx, it) {
              var point = new BMap.Point(it.lng, it.lat);
              var marker = new BMap.Marker(point);
              markers.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
            });
          });
          if (markers.length > 1) {
            var view = map.getViewport(eval(markers));
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            map.centerAndZoom(centerPoint, mapZoom);
          } else {
            var point = new BMap.Point(markers[0].lng, markers[0].lat); // 创建点坐标
            map.centerAndZoom(point, 15);
          }
        } else {
          /*            //根据浏览器定位
                      function myFun(result){
                          var center = result.center;
                          map.setCenter(center);
                      }
                      var myCity = new BMap.LocalCity();
                      myCity.get(myFun);*/


          //定位到当前位置
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var mk = new BMap.Marker(r.point);
              //map.addOverlay(mk);
              map.panTo(r.point);
            }
            else {
              alert('failed' + this.getStatus());
            }
          });
        }
      }
      function createSearch () {
        var map = window.map;
        var local = new BMap.LocalSearch(map,
          {
            renderOptions: { map: map, panel: "searchlist" }
          });
        console.log(local)
        window.local = local;
      }
      var addr
      function createAutocomlete () {
        var map = window.map;
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {
            "input": "searchplace",
            "location": map
          });
        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          addr = _value.business + _value.province + _value.city + _value.district + _value.street + _value.streetNumber;
          this.address_detail = addr
          searchPlace();
        });
      }
      //搜索
      function searchPlace () {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun () {
          th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
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
    getpeople () {
      this.$http.get(`modules/signCrowd/all`).then(res => {
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
        console.log('错误信息' + err)
      })
    },
    getprovince () {
      this.$http.get(`modules/area/areaByPid`, {        params: {
          pid: 1
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.sheng1 = data
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
    province () {
      this.$http.get(`modules/area/areaByPid`, {        params: {
          pid: this.sheng
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.shi1 = data
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
    city () {
      this.$http.get(`modules/area/areaByPid`, {        params: {
          pid: this.shi
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.qu1 = data
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
    stamp () {
      if (this.leixing === 1) {
        this.$http.get(`modules/signRegion/listByParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regionParent = data
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
      } else if (this.leixing === 2) {
        this.$http.get(`modules/signIndustry/listByParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regionParent = data
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
    regioncase () {
      if (this.leixing === 1) {
        this.$http.get(`modules/signRegion/listByParent`, {          params: {
            pid: this.zone
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.region = data
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
      } else if (this.leixing === 2) {
        this.$http.get(`modules/signIndustry/listByParent`, {          params: {
            pid: this.zone
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.region = data
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
    regionSubdivisioncase () {
      if (this.leixing === 1) {
        this.$http.get(`modules/signRegion/listByParent`, {          params: {
            pid: this.zoneSubdivision
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regionTypeParent = data
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
      } else if (this.leixing === 2) {
        this.$http.get(`modules/signIndustryType/listByParent`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regionTypeParent = data
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
    Scenescase () {
      if (this.leixing === 1) {
        this.$http.get(`modules/signRegion/listByParent`, {          params: {
            pid: this.Scenes
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regionType = data
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
      } else if (this.leixing === 2) {
        this.$http.get(`modules/signIndustryType/listByParent`, {          params: {
            pid: this.Scenes
          }        }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.regionType = data
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
    ScenesSubdivisioncase () { },
    cj () {
      const amapWeilan = this.$refs.amapWeilan;
      if (amapWeilan.isEdit) {
        // alert('请先点击结束按钮')
        this.$message.error('请先点击结束按钮');
        return;
      }
      let arr = this.array[0]
      console.log(arr)
      let arr1 = arr
      let arr2 = JSON.stringify(arr1)
      arr2 = amapWeilan.lbs
      // 这里是把围栏的数据提交到高德地图
      // amapWeilan.saveWeilan()
      if (this.name != '' && this.leixing != '' && this.sheng != '' && this.shi != '' && this.qu != '' && arr2 != '' && this.ScenesSubdivision != '' && this.zone != '' && this.zoneSubdivision != '' && this.Scenes != '' && this.value1 != '') {
        if (this.leixing === 1) {
          let info = {
            'name': this.name,
            'collectionSite':this.collectionSite,
            'type': 1,
            'province': this.sheng,
            'city': this.shi,
            'area': this.qu,
            'lbs': arr2,
            'regionParent': this.zone,
            'region': this.zoneSubdivision,
            'regionTypeParent': this.Scenes,
            'regionType': this.ScenesSubdivision,
            'signCrowdSet': this.value1,
            'deduplication':this.deduplication,
          }
          // console.log(this.deduplication[0])
          this.$http.post(`modules/scencesName/region`, info).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              this.$router.push(`/index/scenesname.vue`)
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

        } else if (this.leixing === 2) {
          let info = {
            'name': this.name,
            'collectionSite':this.collectionSite,
            'type': 2,
            'province': this.sheng,
            'city': this.shi,
            'area': this.qu,
            'lbs': arr2,
            'industryParent': this.zone,
            'industry': this.zoneSubdivision,
            'industrytypeParent': this.Scenes,
            'industrytype': this.ScenesSubdivision,
            'fromDate': this.value2[0],
            'toDate': this.value2[1],
            'fromTime': this.startTime.slice(0, 2),
            'toTime': this.endTime.slice(0, 2),
            'signCrowdSet': this.value1,
            'deduplication':this.deduplication,
          }
          this.$http.post(`modules/scencesName/industry`, info).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              this.$router.push(`/index/scenesname.vue`)
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
      }else{
        this.$message.error('您输入的信息有误!')
      }
    },
    dj (val) {
      console.log(this)
    },
    dj1 () {
      console.log(1)
    },
    dj2 () {
      console.log(2)
    },
    dj3 () {
      console.log(3)
    }
  }
}
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
