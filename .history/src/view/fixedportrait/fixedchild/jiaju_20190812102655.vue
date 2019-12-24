<template>
  <div>
    <el-row style="margin-top:20px;">
      <!-- <el-button :class="$style.f_btn" style="float:left;margin-left:20px;" size="medium">导出报表</el-button> -->
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
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart27" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart28" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart29" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart30" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart31" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart32" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart33" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <div id="myChart34" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart35" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart36" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart37" style="position: static; width:100%;height:300px;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      mc: '装修材料类',
      mc1: '家居风格偏好',
      mc2: '家具大类',
      mc3: '关注点',
      mc4: '家纺类品牌',
      mc5: '生活用品类',
      mc6: '价格范围',
      id: '',
      value1: ''
    }
  },
  computed: {
    ...mapGetters(['forList1'])
  },
  mounted () {
    this.id = this.$store.getters.forList1
    this.getList();
  },
  methods: {
    getList () {
      this.$http.get(`pc/fixedPortrait/selectFurniture`, {        params: {
          taskId: this.id,
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {

          this.drawLine27(data);
          this.drawLine10(data);
          this.drawLine11(data);
          this.drawLine12(data);
          this.drawLine13(data);
          this.drawLine14(data);
          this.drawLine15(data);
          this.drawLine17(data);
          this.drawLine18(data);
          this.drawLine19(data);
          this.drawLine20(data);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    dianji3 () {
      console.log(this.value1.join(','))
      this.$http.get(`pc/fixedPortrait/selectFurniture`, {        params: {
          taskId: this.id,
          dateStr4Start: this.value1[0],
          dateStr4Start: this.value1[1]
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.drawLine27(data);
          this.drawLine10(data);
          this.drawLine11(data);
          this.drawLine12(data);
          this.drawLine13(data);
          this.drawLine14(data);
          this.drawLine15(data);
          this.drawLine17(data);
          this.drawLine18(data);
          this.drawLine19(data);
          this.drawLine20(data);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    drawLine27 (data) {
      let decorationMaterials = []
      data.decorationMaterials.forEach(item => {
        decorationMaterials.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart27"));
      let option = {
        color: ['#8C99AD', '#41E0FC', '#0079FE', '#B8E986', '#FF8F00'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: decorationMaterials
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.decorationMaterials
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine10 (data) {
      let furniture = []
      data.furniture.forEach(item => {
        furniture.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart28"));
      let option = {
        color: ['#41E0FC ', '#0079FE', '#B8E986'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: furniture
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.furniture
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine11 (data) {
      let furnitureCategory = []
      data.furnitureCategory.forEach(item => {
        furnitureCategory.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart29"));
      let option = {
        color: ['#8C99AD', '#41E0FC', '#B8E986', '#FF8F00'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: furnitureCategory
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.furnitureCategory
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine12 (data) {
      let furnitureFocus = []
      data.furnitureFocus.forEach(item => {
        furnitureFocus.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart30"));
      let option = {
        color: ['#0079FE', '#41E0FC', '#B8E986', '#FB745B', '#8C99AD', '#9013FE', '#53237E', '#F6D707', '#0079FE'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: furnitureFocus
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.furnitureFocus
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine13 (data) {
      let homeTextiles = []
      data.homeTextiles.forEach(item => {
        homeTextiles.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart31"));
      let option = {
        color: ['#8C99AD', '#41E0FC', '#FB745B', '#0079FE'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: homeTextiles
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.homeTextiles
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine14 (data) {
      let living = []
      data.living.forEach(item => {
        living.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart32"));
      let option = {
        color: ['#9013FE', '#41E0FC', '#B8E986', '#0079FE '], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: living
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.living
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine15 (data) {
      let priceRange = []
      data.priceRange.forEach(item => {
        priceRange.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart33"));
      let option = {
        color: ['#8C99AD', '#41E0FC', '#FB745B', '#9013FE'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: priceRange
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '45%'], // 饼图定位
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.priceRange
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine17 (data) {
      let decorationMaterialsBrand = []
      let decorationMaterialsBrandvalue = []
      data.decorationMaterialsBrand.forEach(item => {
        decorationMaterialsBrand.push(item.name)
        decorationMaterialsBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart34"));
      let option = {
        title: {
          text: '装修材料类品牌'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: decorationMaterialsBrand,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              },
              show: true,
              interval: 0,
              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 1; //一行显示几个字
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
            }
          }
        ],
        yAxis: [
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
            data: decorationMaterialsBrandvalue,

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
    drawLine18 (data) {
      let furniturePreference = []
      let furniturePreferencevalue = []
      data.furniturePreference.forEach(item => {
        furniturePreference.push(item.name)
        furniturePreferencevalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart35"));
      let option = {
        title: {
          text: '家居风格偏好'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: furniturePreference,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          }
        ],
        yAxis: [
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
            data: furniturePreferencevalue,

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
    drawLine19 (data) {
      let homeTextilesBrand = []
      let homeTextilesBrandvalue = []
      data.homeTextilesBrand.forEach(item => {
        homeTextilesBrand.push(item.name)
        homeTextilesBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart36"));
      let option = {
        title: {
          text: '家纺类品牌'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: homeTextilesBrand,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          }
        ],
        yAxis: [
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
            data: homeTextilesBrandvalue,

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
    drawLine20 (data) {
      let livingBrand = []
      let livingBrandvalue = []
      data.livingBrand.forEach(item => {
        livingBrand.push(item.name)
        livingBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart37"));
      let option = {
        title: {
          text: '生活用品类品牌'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: livingBrand,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            axisLine: {
              lineStyle: {
                color: '#58afed', // X轴及其文字颜色
              }
            }
          }
        ],
        yAxis: [
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
            data: livingBrandvalue,

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

<style lang='scss' module>
.f_hx1 {
  width: 30%;
  border: 1px solid #e6e9f0;
  display: inline-block;
  margin-top: 20px;
  margin-right: 2%;
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
.f_hx3 {
  border: 1px solid #e6e9f0;
  display: block;
  margin-top: 10px;
  margin-right: 1%;
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
