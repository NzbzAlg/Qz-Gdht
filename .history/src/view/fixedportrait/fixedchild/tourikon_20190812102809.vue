<template>
  <div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart26" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart27" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart28" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart29" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart30" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart31" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart32" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc7}}</span>
      <div id="myChart33" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc8}}</span>
      <div id="myChart34" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart35" style="position: static; width:500px;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart36" style="position: static; width:500px;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart37" style="position: static; width:500px;height:300px;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc}}</span> -->
      <div id="myChart38" style="position: static; width:500px;height:300px;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['message'],
  data () {
    return {
      mc: '酒店类型',
      mc1: '酒店服务',
      mc2: '出行大区',
      mc3: '出行类型',
      mc4: '出行时长',
      mc5: '交通方式',
      mc6: '酒店评分',
      mc7: '酒店位置',
      mc8: '出行时段',
      // 饼状图

      hotelList: [],   //酒店类型
      hotelListname: [],

      hotelServiceList: [], //酒店服务
      hotelServiceListname: [],

      regionList: [], //出行大区
      regionListname: [],

      trvaelTypeList: [], //出行类型
      trvaelTypeListname: [],

      travelTimeList: [], //出行时长
      travelTimeListname: [],

      transportationList: [], //交通方式
      transportationListname: [],

      hotelScoreList: [], //酒店评分
      hotelScoreListname: [],

      hotelPostionList: [], //酒店位置
      hotelPostionListname: [],

      travelPeriodList: [],  //出行时段
      travelPeriodListname: [],
      // 树状图
      attractionsList: [], //景点
      attractionsListname: [],
      attractionslist: [],

      hotelPriceList: [], //酒店价格
      hotelPriceListname: [],
      hotelpricelist: [],

      hotelBrandList: [], //酒店品牌
      hotelBrandListname: [],
      hotelbrandlist: [],

      hotelLevelList: [], //酒店类型
      hotelLevelListname: [],
      hotellevellist: []
    }
  },
  computed: {
    ...mapGetters(['forList'])
  },
  mounted () {
    this.id = this.$store.getters.forLive
    // this.id = this.$store.state.id
    // console.log(this.id)
    // this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`modules/persona/dataView&type=hotelTouring`, {        params: {
          taskId: this.id,
          type:hoteTouring,
        }      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          //酒店类型
          this.hotelList = data.hotelList
          this.hotelList.forEach(item => {
            this.hotelListname.push(item.name)
            item.value = item.y
          })
          //酒店服务
          this.hotelServiceList = data.hotelServiceList
          this.hotelServiceList.forEach(item => {
            this.hotelServiceListname.push(item.name)
            item.value = item.y
          })
          //出行大区
          this.regionList = data.regionList
          this.regionList.forEach(item => {
            this.regionListname.push(item.name)
            item.value = item.y
          })
          //出行类型
          this.trvaelTypeList = data.trvaelTypeList
          this.trvaelTypeList.forEach(item => {
            this.trvaelTypeListname.push(item.name)
            item.value = item.y
          })
          //出行时长
          this.travelTimeList = data.travelTimeList
          this.travelTimeList.forEach(item => {
            this.travelTimeListname.push(item.name)
            item.value = item.y
          })
          //交通方式
          this.transportationList = data.transportationList
          this.transportationList.forEach(item => {
            this.transportationListname.push(item.name)
            item.value = item.y
          })
          //酒店评分
          this.hotelScoreList = data.hotelScoreList
          this.hotelScoreList.forEach(item => {
            this.hotelScoreListname.push(item.name)
            item.value = item.y
          })
          //酒店位置
          this.hotelPostionList = data.hotelPostionList
          this.hotelPostionList.forEach(item => {
            this.hotelPostionListname.push(item.name)
            item.value = item.y
          })
          //出行时段
          this.travelPeriodList = data.travelPeriodList
          this.travelPeriodList.forEach(item => {
            this.travelPeriodListname.push(item.name)
            item.value = item.y
          })
          // 柱状图
          //景点
          this.attractionsList = data.attractionsList
          this.attractionsList.forEach(item => {
            this.attractionsListname.push(item.name)
            this.attractionslist.push(item.y)
          })
          //酒店价格
          this.hotelPriceList = data.hotelPriceList
          this.hotelPriceList.forEach(item => {
            this.hotelPriceListname.push(item.name)
            this.hotelpricelist.push(item.y)
          })
          //酒店品牌
          this.hotelBrandList = data.hotelBrandList
          this.hotelBrandList.forEach(item => {
            this.hotelBrandListname.push(item.name)
            this.hotelbrandlist.push(item.y)
          })
          //酒店类型
          this.hotelLevelList = data.hotelLevelList
          this.hotelLevelList.forEach(item => {
            this.hotelLevelListname.push(item.name)
            this.hotellevellist.push(item.y)
          })
          this.drawLine26()
          this.drawLine27()
          this.drawLine28()
          this.drawLine29()
          this.drawLine30()
          this.drawLine31()
          this.drawLine32()
          this.drawLine33()
          this.drawLine34()
          this.drawLine35()
          this.drawLine36()
          this.drawLine37()
          this.drawLine38()
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    drawLine26 () {
      let myChart = this.$echarts.init(document.getElementById("myChart26"));
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
          data: this.hotelListname
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
            data: this.hotelList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine27 () {
      let myChart = this.$echarts.init(document.getElementById("myChart27"));
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
          data: this.hotelServiceListname
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
            data: this.hotelServiceList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine28 () {
      let myChart = this.$echarts.init(document.getElementById("myChart28"));
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
          data: this.regionListname
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
            data: this.regionList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine29 () {
      let myChart = this.$echarts.init(document.getElementById("myChart29"));
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
          data: this.trvaelTypeListname
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
            data: this.trvaelTypeList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine30 () {
      let myChart = this.$echarts.init(document.getElementById("myChart30"));
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
          data: this.travelTimeListname
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
            data: this.travelTimeList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine31 () {
      let myChart = this.$echarts.init(document.getElementById("myChart31"));
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
          data: this.transportationListname
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
            data: this.transportationList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine32 () {
      let myChart = this.$echarts.init(document.getElementById("myChart32"));
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
          data: this.hotelScoreListname
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
            data: this.hotelScoreList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine33 () {
      let myChart = this.$echarts.init(document.getElementById("myChart33"));
      let option = {
        color: ['#FF8F00', '#41E0FC', '#B8E986', '#0079FE '], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: this.hotelPostionListname
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
            data: this.hotelPostionList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine34 () {
      let myChart = this.$echarts.init(document.getElementById("myChart34"));
      let option = {
        color: ['#FF8F00', '#41E0FC', '#B8E986', '#0079FE '], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: this.travelPeriodListname
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
            data: this.travelPeriodList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine35 () {
      let myChart = this.$echarts.init(document.getElementById("myChart35"));
      let option = {

        title: {
          text: '景点'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '20%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.attractionsListname,
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
            data: this.attractionslist,

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
    drawLine36 () {
      let myChart = this.$echarts.init(document.getElementById("myChart36"));
      let option = {

        title: {
          text: '酒店价格'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '20%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.hotelPriceListname,
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
            data: this.hotelpricelist,

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
    drawLine37 () {
      let myChart = this.$echarts.init(document.getElementById("myChart37"));
      let option = {
        title: {
          text: '酒店品牌'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '20%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.hotelBrandListname,
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
            data: this.hotelbrandlist,

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
    drawLine38 () {
      let myChart = this.$echarts.init(document.getElementById("myChart38"));
      let option = {
        title: {
          text: '酒店类型'
        },
        color: ['#22314F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '20%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.hotelLevelListname,
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
            data: this.hotellevellist,

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
  width: 44%;
  border: 1px solid #e6e9f0;
  display: block;
  margin-top: 10px;
  margin-right: 1%;
  margin-bottom: 30px;
  height: 330px;
  display: inline-block;
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
</style>

