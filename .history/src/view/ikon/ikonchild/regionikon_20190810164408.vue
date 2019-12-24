<template>
  <div>
    <div :class="$style.f_hx2">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div
        id="myChart6"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div
        id="myChart6"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div id="allmap" style="height:300px;"></div>
    </div>
    <div :class="$style.f_hx2">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div
        id="myChart7"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div id="allmap1" style="height:300px;"></div>
    </div>
    <div :class="$style.f_hx2">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div
        id="myChart8"
        style="position: static; width:348px;height:300px; display: inline-block; float:left;"
      ></div>
      <div id="allmap2" style="height:300px;"></div>
    </div>
  </div>
</template>

<script>
import tb1 from '../../../assets/img/坐标1.gif'
import tb2 from '../../../assets/img/坐标2.gif'
import tb3 from '../../../assets/img/坐标3.gif'
import { mapGetters } from 'vuex';
export default {
  props: ['message'],
  data () {
    return {
      mc1: '工作区域',
      mc2: '居住区域',
      mc3: '拜访区域',
      id: '',
      place: {},
      work: [],
      workname: [],
      worknum: [],
      live: [],
      livename: [],
      livenum: [],
      dwell: {},
      visit: [],
      visitname: [],
      visitnum: [],
      deposit: {}
    }
  },
  computed: {
    ...mapGetters(['forList'])
  },
  mounted () {
    console.log(this.$store.getters.forLive)
    this.id = this.$store.getters.forLive
    // this.id = this.$store.state.id
    // console.log(this.id)
    this.getList()
  },
  methods:{
    getList () {
      this.$http.get(`modules/persona/dataView?orderId=${this.id}&type=postion`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          data.work.forEach(item => {
            this.place = {
              lng: Number(item.lng),
              lat: Number(item.lat),
              name: item.name
            }
            this.workname.push(item.name)
            this.worknum.push(item.y)
            this.work.push(this.place)
            // lat = name1.split(')')
          })
          data.live.forEach(item => {
            this.dwell = {
              lng: Number(item.lng),
              lat: Number(item.lat),
              name: item.name
            }
            this.livename.push(item.name)
            this.livenum.push(item.y)
            this.live.push(this.dwell)
          })
          data.visit.forEach(item => {
            this.deposit = {
              lng: Number(item.lng),
              lat: Number(item.lat),
              name: item.name
            }
            this.visitname.push(item.name)
            this.visitnum.push(item.y)
            this.visit.push(this.deposit)
            // lat = name1.split(')')
          })
          this.ditu()
          this.ditu1()
          this.ditu2()
          this.drawLine6()
          this.drawLine7()
          this.drawLine8()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    ditu () {
      var points = this.work;
      // console.log(points)
      // 百度坐标系坐标(地图中需要使用这个)
      var bPoints = new Array();
      //创建标注点并添加到地图中
      function addMarker (points) {
        //循环建立标注点
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
          var myIcon = new BMap.Icon(tb1, new BMap.Size(20, 32), { //图片大小 
            anchor: new BMap.Size(10, 25),  //标注相对point的偏移位置
          });
          myIcon.setImageSize(new BMap.Size(20, 32))
          var marker2 = new BMap.Marker(point, { icon: myIcon });
          // var marker = new BMap.Marker(point); //将点转化成标注点
          map.addOverlay(marker2);  //将标注点添加到地图上
          marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
          marker2.addEventListener("click", attribute);
          // marker.addEventListener("mouseout", attribute1);
        }
      }

      function attribute (e) {
        var p = e.target;
        for (let i in points) {
          if (p.getPosition().lng === points[i].lng) {
            console.log(points[i])
            var content = "<table>";
            content = content + "<tr><td>地点:" + points[i].name + "</td></tr>";
            content += "</table>";
            var infowindow = new BMap.InfoWindow(content);
            this.openInfoWindow(infowindow);
          } else {

          }
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
    ditu1 () {
      var points = this.live;
      // 百度坐标系坐标(地图中需要使用这个)
      var bPoints = new Array();
      //创建标注点并添加到地图中
      function addMarker (points) {
        //循环建立标注点
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
          var myIcon = new BMap.Icon(tb2, new BMap.Size(20, 32), { //图片大小 
            anchor: new BMap.Size(10, 25),  //标注相对point的偏移位置
          });
          myIcon.setImageSize(new BMap.Size(20, 32))
          var marker2 = new BMap.Marker(point, { icon: myIcon });
          // var marker = new BMap.Marker(point); //将点转化成标注点
          map.addOverlay(marker2);  //将标注点添加到地图上
          marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
          marker2.addEventListener("click", attribute);
          // marker.addEventListener("mouseout", attribute1);
        }
      }
      function attribute (e) {
        var p = e.target;
        // console.log( p.getPosition().lng + "," + p.getPosition().lat )
        for (let i in points) {
          if (p.getPosition().lng === points[i].lng) {
            var content = "<table>";
            content = content + "<tr><td>地点:" + points[i].name + "</td></tr>";
            content += "</table>";
            var infowindow = new BMap.InfoWindow(content);
            this.openInfoWindow(infowindow);
          } else {

          }
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
      var map = new BMap.Map("allmap1");
      map.centerAndZoom(new BMap.Point(112.591886, 26.905407), 14); // 设置中心点
      addMarker(points);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);

      setTimeout(function () {
        setZoom(bPoints);
      }, 3000)
    },
    ditu2 () {
      var points = this.visit;
      // 百度坐标系坐标(地图中需要使用这个)
      var bPoints = new Array();
      //创建标注点并添加到地图中
      function addMarker (points) {
        //循环建立标注点
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
          var myIcon = new BMap.Icon(tb3, new BMap.Size(20, 32), { //图片大小 
            anchor: new BMap.Size(10, 25),  //标注相对point的偏移位置
          });
          myIcon.setImageSize(new BMap.Size(20, 32))
          var marker2 = new BMap.Marker(point, { icon: myIcon });
          // var marker = new BMap.Marker(point); //将点转化成标注点
          map.addOverlay(marker2);  //将标注点添加到地图上
          marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
          marker2.addEventListener("click", attribute);
          // marker.addEventListener("mouseout", attribute1);
        }
      }
      function attribute (e) {
        var p = e.target;
        // console.log( p.getPosition().lng + "," + p.getPosition().lat )
        for (let i in points) {
          if (p.getPosition().lng === points[i].lng) {
            var content = "<table>";
            content = content + "<tr><td>地点:" + points[i].name + "</td></tr>";
            content += "</table>";
            var infowindow = new BMap.InfoWindow(content);
            this.openInfoWindow(infowindow);
          } else {

          }
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
      var map = new BMap.Map("allmap2");
      map.centerAndZoom(new BMap.Point(112.591886, 26.905407), 14); // 设置中心点
      addMarker(points);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);

      setTimeout(function () {
        setZoom(bPoints);
      }, 3000)
    },
    drawLine6 () {
      let myChart = this.$echarts.init(document.getElementById("myChart6"));
      console.log(myChart)
      let option = {
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.workname,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 8; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.worknum,

            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A']; //每根柱子的颜色
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option);
    },
    drawLine7 () {
      let myChart = this.$echarts.init(document.getElementById("myChart7"));
      let option = {
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.visitname,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 8; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.visitnum,

            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A']; //每根柱子的颜色
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option);
    },
    drawLine8 () {
      let myChart = this.$echarts.init(document.getElementById("myChart8"));
      let option = {
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.visitname,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 8; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.visitnum,

            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A']; //每根柱子的颜色
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option);
    },
  }
}
</script>

<style  lang='scss' module>
.f_hx2 {
  border: 1px solid #e6e9f0;
  display: block;
  margin-top: 20px;
  margin-right: 2%;
  margin-left: 2%;
  margin-bottom: 30px;
  height: 330px;
  .f_mc {
    float: left;
    padding-top: 10px;
    padding-left: 10px;
    font-size: 15px;
    color: #1f2e4d;
    letter-spacing: 0;
  }
  .f_bgnr {
    padding-top: 39px;
    padding-left: 34px;
    padding-right: 34px;
    padding-bottom: 20px;
  }
  .f_db {
    background: #f7f9fc;
    height: 60px;
    line-height: 60px;
    span {
      font-size: 15px;
      color: #1f2e4d;
      letter-spacing: 0;
      text-align: center;
    }
    .f_z {
      float: left;
      padding-left: 2%;
    }
    .f_y {
      float: right;
      padding-right: 7%;
    }
  }
}
.map {
  display: inline-block;
  width: 50%;
  height: 300px;
}
</style>

