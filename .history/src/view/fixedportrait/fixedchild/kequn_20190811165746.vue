<template>
  <div>
    <el-row :class="$style.f_row1">
      <h6 :class="$style.f_xb">性别</h6>
      <el-checkbox-group v-model="gender1" @change="dj1" :class="$style.f_dx">
        <el-checkbox-button
          v-for="city in cities"
          style="margin-left:20px;"
          :label="city.value"
          :value="city.value"
          :key="city.value"
        >{{city.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row :class="$style.f_row1">
      <h6 :class="$style.f_xb">年龄</h6>
      <el-checkbox-group v-model="age1" @change="dj" :class="$style.f_dx">
        <el-checkbox-button
          v-for="(city1,i) in cities1"
          style="margin-left:20px;"
          :label="city1.value"
          :value="city1.value"
          :key="i"
        >{{city1.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row :class="$style.f_row1">
      <h6 :class="$style.f_xb">教育</h6>
      <el-checkbox-group v-model="Education1" :class="$style.f_dx">
        <el-checkbox-button
          v-for="city2 in cities2"
          style="margin-left:20px;"
          :label="city2.value"
          :value="city2.value"
          :key="city2.value"
        >{{city2.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row :class="$style.f_row1">
      <h6 :class="$style.f_xb">收入</h6>
      <el-checkbox-group v-model="checkboxGroup4" :class="$style.f_dx">
        <el-checkbox-button
          v-for="city3 in cities3"
          style="margin-left:20px;"
          :label="city3.value"
          :value="city3.value"
          :key="city3.value"
        >{{city3.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row :class="$style.f_row1">
      <h6 :class="$style.f_xb">有无孩子</h6>
      <el-checkbox-group v-model="checkboxGroup5" :class="$style.f_dx">
        <el-checkbox-button
          v-for="city4 in cities4"
          style="margin-left:20px;"
          :label="city4.value"
          :value="city4.value"
          :key="city4.value"
        >{{city4.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row :class="$style.f_row1">
      <h6 :class="$style.f_xb">区域</h6>
      <el-radio-group v-model="radio6" :class="$style.f_dx">
        <el-radio-button label="1" style="margin-left: 29px;">小区</el-radio-button>
        <el-radio-button label="2" style="margin-left:20px;">办公</el-radio-button>
        <el-radio-button label="3" style="margin-left:20px;">商圈</el-radio-button>
        <el-radio-button label="4" style="margin-left: 29px;">省级</el-radio-button>
        <el-radio-button label="5" style="margin-left:20px;">市级</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row>
      <el-button :class="$style.f_btn" style="float:left;margin-left:20px;" size="medium">导出报表</el-button>
      <div style="float: right; margin-right: 20px;">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button :class="$style.f_btn" @click="dianji3" size="medium">查询</el-button>
      </div>
    </el-row>
    <div :class="$style.f_hx2">
      <div id="myChart26" style="position: static; width:49%;height:300px; display: inline-block;"></div>
      <div id="allmap" style="height:330px; width:49%; display: inline-block;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
const gender = [
  {
    value: 0,
    label: '男'
  }, {
    value: 1,
    label: '女'
  }]
const age = [{ value: 5, label: '45岁以上' }, { value: 6, label: '35-44岁', }, { value: 7, label: '25-34岁', }, { value: 8, label: '18-24岁' }, { value: 9, label: '18岁以下' }]
const Education = [{ value: 6, label: '高中以上' }, { value: 7, label: '专科' }, { value: 8, label: '本科' }, { value: 9, label: '硕士以上' }]
const Salary = [{ value: 3, label: '3k以下' }, { value: 4, label: '3-5k' }, { value: 5, label: '5-10k' }, { value: 6, label: '10-20k' }, { value: 7, label: '20k以下' }]
const infant = [{ value: 2, label: '无未成年子女' }, { value: 3, label: '0-3岁' }, { value: 4, label: '4-6岁' }, { value: 5, label: '7-12岁' }, { value: 6, label: '13-17岁' }]
const region = [{ value: 1, label: '工作区域' }, { value: 2, label: '居住区域' }, { value: 3, label: '拜访区域' }]
export default {
  data () {
    return {
      gender1: [],
      age1: [],
      Education1: [],
      checkboxGroup4: [],
      checkboxGroup5: [],
      checkboxGroup6: [],
      cities: gender,
      cities1: age,
      cities2: Education,
      cities3: Salary,
      cities4: infant,
      cities5: region,
      radio1: '',
      radio2: '',
      radio3: '',
      radio4: '',
      radio5: '1',
      radio6: '1',
      value1: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
      },
      data: [],
      id: ''
    }
  },
  mounted () {
    this.id = this.$store.getters.forList1
    this.getList()
  },
  computed: {
    ...mapGetters(['forList1'])
  },
  methods: {
    getList () {
      let id = this.id
      this.$http.post(`pc/fixedPortrait/selectCustomerAddr`, { taskId: id ,aireType:1}).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.data = data
          var points = this.data;
          // 百度坐标系坐标(地图中需要使用这个)
          var bPoints = new Array();
          //创建标注点并添加到地图中
          function addMarker (points) {
            for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
              var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
              bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
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
          var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
          map.addOverlay(heatmapOverlay);
          heatmapOverlay.setDataSet({ data: points, max: 100 });
          heatmapOverlay.show();
          setTimeout(function () {
            setZoom(bPoints);
          }, 3000)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.$http.post(`pc/fixedPortrait/selectCustomer`, { taskId: id, aireType: 1 }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.drawLine(data)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    dj () {
      console.log(this.age1)
    },
    dj1 () {
      console.log(this.gender1)
    },
    drawLine (data) {
      let name = []
      let value = []
      data.forEach(item => {
        value.push(item.count)
        name.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart26"));
      let option = {
        title: {
          text: '客群来源'
        },
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
        yAxis: [
          {
            type: 'category',
            data: name,
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                // console.log(params)
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
              },
            }
          }
        ],
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
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: value,

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
    dianji3 () {
      let info = {}
      if (this.value1 === ''&&this.radio6!='4'&&this.radio6!='5') {
        info = {
          'taskId': this.id,
          // "startDate":this.value1[0],
          // 'endDate':this.value1[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.checkboxGroup4,
          'aireType': this.radio6,
          'income': this.checkboxGroup5,
        }
      } else if(this.value1 != ''&&this.radio6!='4'&&this.radio6!='5') {
        info = {
          'taskId': this.id,
          "startDate": this.value1[0],
          'endDate': this.value1[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.checkboxGroup4,
          'aireType': this.radio6,
          'income': this.checkboxGroup5,
        }
      }else if(this.value1 === ''&&this.radio6==='4'){
        info={
          'taskId': this.id,
          "startDate": this.value1[0],
          'endDate': this.value1[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.checkboxGroup4,
          'nationalType': '4',
          'income': this.checkboxGroup5,
        }
      }else if(this.value1 === ''&&this.radio6==='5'){
        info={
          'taskId': this.id,
          "startDate": this.value1[0],
          'endDate': this.value1[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.checkboxGroup4,
          'nationalType': '5',
          'income': this.checkboxGroup5,
        }
      }else if(this.value1 != ''&&this.radio6==='4'){
        info={
          'taskId': this.id,
          "startDate": this.value1[0],
          'endDate': this.value1[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.checkboxGroup4,
          'nationalType': '4',
          'income': this.checkboxGroup5,
        }
      }else if(this.value1 != ''&&this.radio6==='5'){
        info={
          'taskId': this.id,
          "startDate": this.value1[0],
          'endDate': this.value1[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.checkboxGroup4,
          'nationalType': '5',
          'income': this.checkboxGroup5,
        }
      }
      // console.log(info)
      this.$http.post(`pc/fixedPortrait/selectCustomerAddr`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.data = data
          var points = this.data;
          // 百度坐标系坐标(地图中需要使用这个)
          var bPoints = new Array();
          //创建标注点并添加到地图中
          function addMarker (points) {
            for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
              var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
              bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
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
          var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
          map.addOverlay(heatmapOverlay);
          heatmapOverlay.setDataSet({ data: points, max: 100 });
          heatmapOverlay.show();
          setTimeout(function () {
            setZoom(bPoints);
          }, 3000)
        } else {
          console.log(data)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
      this.$http.post(`pc/fixedPortrait/selectCustomer`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.drawLine(data)
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
  }
}
</script>

<style   lang='scss' module>
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
.f_row1 {
  margin: 20px;
  border-bottom: 1px solid #edf1f9;

  .f_xb {
    float: left;
    font-size: 14px;
    color: #3b4859;
    letter-spacing: 0;
    text-align: center;
    line-height: 41px;
    margin: 0;
  }
  .f_dx {
    float: left;
    margin-left: 20px;
    line-height: 41px;
  }
}
.f_btn {
  display: inline-block;
  height: 36px;
  background: #d9b4fa;
  border: 1px solid #9013fe;
  color: #5800a0;
  border-radius: 4px;
  margin-right: 10px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0;
  cursor: pointer;
}
.f_btn:hover {
  background: #9013fe;
  color: #fff;
  border: 1px solid #9013fe;
}
</style>
