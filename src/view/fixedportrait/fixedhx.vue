<template>
  <div>
    <sx></sx>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户画像" name="first">
        <portrait :message="id"></portrait>
      </el-tab-pane>
      <el-tab-pane label="应用分析" name="second">
        <analysis :message="id"></analysis>
      </el-tab-pane>
      <el-tab-pane label="常住地址" name="third">
        <regionikon :message="id"></regionikon>
      </el-tab-pane>
      <el-tab-pane label="客群来源" name="third1">
        <kequn :message="id"></kequn>
      </el-tab-pane>
      <el-tab-pane label="家居画像" name="third2">
        <jiaju :message="id"></jiaju>
      </el-tab-pane>
      <el-tab-pane label="服饰画像" name="fourth">
        <apparel :message="id"></apparel>
      </el-tab-pane>
      <el-tab-pane label="饮食画像" name="fourth2">
        <dite :message="id"></dite>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
import portrait from './fixedchild/portrait'
import analysis from './fixedchild/analysis'
import regionikon from './fixedchild/regionikon'
import apparel from './fixedchild/apparel'
import tour from './fixedchild/tourikon'
import dite from './fixedchild/diteikon'
import kequn from './fixedchild/kequn'
import jiaju from './fixedchild/jiaju'
const cityOptions = [
  {
    value: 0,
    label: '男'
  }, {
    value: 1,
    label: '女'
  }]
const cityOptions1 = [{ value: 5, label: '45岁以上' }, { value: 6, label: '35-44岁', }, { value: 7, label: '25-34岁', }, { value: 8, label: '18-24岁' }, { value: 9, label: '18岁以下' }]
const cityOptions2 = [{ value: 6, label: '高中以上' }, { value: 7, label: '专科' }, { value: 8, label: '本科' }, { value: 9, label: '硕士以上' }]
const cityOptions3 = [{ value: 3, label: '3k以下' }, { value: 4, label: '3-5k' }, { value: 5, label: '5-10k' }, { value: 6, label: '10-20k' }, { value: 7, label: '20k以下' }]
const cityOptions4 = [{ value: 2, label: '无未成年子女' }, { value: 3, label: '0-3岁' }, { value: 4, label: '4-6岁' }, { value: 5, label: '7-12岁' }, { value: 6, label: '13-17岁' }]
const cityOptions5 = [{ value: 1, label: '工作区域' }, { value: 2, label: '居住区域' }, { value: 3, label: '拜访区域' }]
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
import tb1 from '../../assets/img/坐标1.gif'
import qs from 'qs'
export default {
  components: {
    sx,
    portrait,
    analysis,
    regionikon,
    apparel,
    tour,
    dite,
    kequn,
    jiaju
  },
  data () {
    return {
      activeName: 'first',
      id: '',
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkboxGroup3: [],
      checkboxGroup4: [],
      checkboxGroup5: [],
      checkboxGroup6: [],
      cities: cityOptions,
      cities1: cityOptions1,
      cities2: cityOptions2,
      cities3: cityOptions3,
      cities4: cityOptions4,
      cities5: cityOptions5,
      radio1: '',
      radio2: '',
      radio3: '',
      radio4: '',
      radio5: '',
      radio6: '1',
      value1: '',
      jy: false,
      jy1: false,
      jy2: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
      },
      data: [],
      gender1: [],
      age1: [],
      Education1: [],
      Salary1: [],
      infant1: [],
      region1: [],
      genderoptions: gender,
      ageoptions: age,
      Educationoptions: Education,
      Salaryoptions: Salary,
      infantoptions: infant,
      regionoptions: region,
      radio7: '',
      radio8: '',
      radio9: '',
      radio10: '',
      radio11: '1',
      radio12: '1',
      value2: '',
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
      },
      data1: [],
    }
  },
  mounted () {
    this.id = this.$store.state.id
    this.getList()
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab);
      // console.log(this.id)
      // this.id = this.$store.state.id
      this.$store.commit('myid', this.id)
    },
    getList () {
      // let info =new FormData()
      // info.append(`taskId`,this.id)
      // info.append(`type`,'1')
      let id = this.id
      let info = {
        'taskId': id,
        'type': '1'
      }
      let data = JSON.stringify(info)
      this.$http.post(`pc/fixedPortrait/selectAddress`, { taskId: id, type: '1' }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.data = data
         var map = new AMap.Map("allmap", {
              zoom: 11
            });
            let heatmap;
            map.plugin(["AMap.Heatmap"], function() {
              //初始化heatmap对象
              heatmap = new AMap.Heatmap(map, {
                radius: 25, //给定半径
                opacity: [0, 0.8]
                /*,
            gradient:{
                0.5: 'blue',
                0.65: 'rgb(117,211,248)',
                0.7: 'rgb(0, 255, 0)',
                0.9: '#ffea00',
                1.0: 'red'
            }
             */
              });
              //设置数据集：该数据为北京部分“公园”数据
              heatmap.setDataSet({
                data: data,
                max: 100
              });

              map.setFitView();
            });
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
    dj () {
      console.log(this.checkboxGroup2)
    },
    dj1 () {
      console.log(this.checkboxGroup1)
    },
    dianji3 () {
      let info = {}
      if (this.value1 === '') {
        info = {
          'taskId': this.id,
          // "startDate":this.value1[0],
          // 'endDate':this.value1[1],
          'gender': this.checkboxGroup1,
          'agebin': this.checkboxGroup2,
          'edu': this.checkboxGroup3,
          'kids': this.checkboxGroup4,
          'type': this.radio6,
          'income': this.checkboxGroup5
        }
      } else {
        info = {
          'taskId': this.id,
          "startDate": this.value1[0],
          'endDate': this.value1[1],
          'gender': this.checkboxGroup1,
          'agebin': this.checkboxGroup2,
          'edu': this.checkboxGroup3,
          'kids': this.checkboxGroup4,
          'type': this.radio6,
          'income': this.checkboxGroup5
        }
      }
      // console.log(this.radio6)
      this.$http.post(`pc/fixedPortrait/selectAddress`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.data = data
          var map = new AMap.Map("allmap", {
              zoom: 11
            });
            let heatmap;
            map.plugin(["AMap.Heatmap"], function() {
              //初始化heatmap对象
              heatmap = new AMap.Heatmap(map, {
                radius: 25, //给定半径
                opacity: [0, 0.8]
                /*,
            gradient:{
                0.5: 'blue',
                0.65: 'rgb(117,211,248)',
                0.7: 'rgb(0, 255, 0)',
                0.9: '#ffea00',
                1.0: 'red'
            }
             */
              });
              //设置数据集：该数据为北京部分“公园”数据
              heatmap.setDataSet({
                data: data,
                max: 100
              });

              map.setFitView();
            });
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
    search () {
      let info = {}
      if (this.value2 === '' && this.radio12 != '4' && this.radio12 != '5') {
        info = {
          'taskId': this.id,
          // "startDate":this.value2[0],
          // 'endDate':this.value2[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.Salary1,
          'aireType': this.radio12,
          'income': this.infant1,
        }
      } else if (this.value2 != '' && this.radio12 != '4' && this.radio12 != '5') {
        info = {
          'taskId': this.id,
          "startDate": this.value2[0],
          'endDate': this.value2[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.Salary1,
          'aireType': this.radio12,
          'income': this.infant1,
        }
      } else if (this.value2 === '' && this.radio12 === '4') {
        info = {
          'taskId': this.id,
          "startDate": this.value2[0],
          'endDate': this.value2[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.Salary1,
          'nationalType': '4',
          'income': this.infant1,
        }
      } else if (this.value2 === '' && this.radio12 === '5') {
        info = {
          'taskId': this.id,
          "startDate": this.value2[0],
          'endDate': this.value2[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.Salary1,
          'nationalType': '5',
          'income': this.infant1,
        }
      } else if (this.value2 != '' && this.radio12 === '4') {
        info = {
          'taskId': this.id,
          "startDate": this.value2[0],
          'endDate': this.value2[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.Salary1,
          'nationalType': '4',
          'income': this.infant1,
        }
      } else if (this.value2 != '' && this.radio12 === '5') {
        info = {
          'taskId': this.id,
          "startDate": this.value2[0],
          'endDate': this.value2[1],
          'gender': this.gender1,
          'agebin': this.age1,
          'edu': this.Education1,
          'kids': this.Salary1,
          'nationalType': '5',
          'income': this.infant1,
        }
      }
      // console.log(info)
      this.$http.post(`pc/fixedPortrait/selectCustomerAddr`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.data1 = data
          var points = this.data1;
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
      this.$http.post(`pc/fixedPortrait/selectCustomer`, info).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.drawLineKequn(data)
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
