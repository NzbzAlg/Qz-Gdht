<template>
  <div>
     <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart9" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart10" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart11" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart12" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart13" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart14" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart15" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc7}}</span>
      <div id="myChart16" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc8}}</span> -->
      <div id="myChart17" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc9}}</span> -->
      <div id="myChart18" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc10}}</span> -->
      <div id="myChart19" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc11}}</span> -->
      <div id="myChart20" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc12}}</span> -->
      <div id="myChart21" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc13}}</span> -->
      <div id="myChart22" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc14}}</span> -->
      <div id="myChart23" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc15}}</span> -->
      <div id="myChart24" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <!-- <span :class="$style.f_mc">{{mc16}}</span> -->
      <div id="myChart25" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:['message'],
  data () {
    return {
      mc: '服饰大类',
      mc1: '男装风格',
      mc2: '男装价位',
      mc3: '女装风格',
      mc4: '女装价格',
      mc5: '内衣分类',
      mc6: '内衣价位',
      mc7: '配饰价位偏好',
      // mc8: '购买习惯',
      // mc9: '男装品牌',
      // mc10: '女装品牌',
      // mc11: '内衣品牌',
      // mc12: '男鞋品牌',
      // mc13: '女鞋品牌',
      // mc14: '户外运动品牌',
      // mc15: '箱包品牌',
      // mc16: '配饰品牌偏好',
      id: '',
      apparelList: [],
      finery: [],
      manStyleList: [],
      StyleList: [],
      manPriceList: [],
      PriceList: [],
      womanStyleList: [],
      womanstyleList: [],
      womanPriceList: [],
      womanpriceList: [],
      undiesList: [],
      undieslist: [],
      undiesPriceList: [],
      undiespriceList: [],
      accessoriesPriceList: [],
      accessoriespriceList: [],
      shopList: [],
      shop: [],
      closely: [],
      manBrandList: [],
      manBrandListname: [],
      BrandList: [],
      womanBrandList: [],
      womanbrandList: [],
      womanBrandListname: [],
      undiesBrandList: [],
      undiesBrandListname: [],
      undiesbrandList: [],
      menShoeBrandList: [],
      menShoeBrandListname: [],
      menshoebrandList: [],
      womanShoeBrandList: [],
      womanShoeBrandListname: [],
      womanshoebrandList: [],
      sportBrandList: [],
      sportBrandListname: [],
      sportbrandList: [],
      luggageBrandList: [],
      luggageBrandListname: [],
      luggagebrandList: [],
      accessoriesBrandList: [],
      accessoriesBrandListname: [],
      accessoriesbrandList: []
    }
  },
  computed: {
    ...mapGetters(['forList'])
  },
  mounted () {
    this.id = this.$store.getters.forLive
    // this.id = this.$store.state.id
    // console.log(this.id)
    this.getList()
  },
  methods:{
    getList () {
      this.$http.get(`modules/persona/dataView?orderId=${this.id}&type=apparel`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          // 服饰大类
          this.apparelList = data.apparelList
          this.apparelList.forEach(item => {
            this.finery.push(item.name)
            item.value = item.y
          })
          // 男装风格
          this.manStyleList = data.manStyleList
          this.manStyleList.forEach(item => {
            this.StyleList.push(item.name)
            item.value = item.y
          })
          // 男装价位
          this.manPriceList = data.manPriceList
          this.manPriceList.forEach(item => {
            this.PriceList.push(item.name)
            item.value = item.y
          })
          // 女装风格
          this.womanStyleList = data.womanStyleList
          this.womanStyleList.forEach(item => {
            this.womanstyleList.push(item.name)
            item.value = item.y
          })
          // 女装价格
          this.womanPriceList = data.womanPriceList
          this.womanPriceList.forEach(item => {
            this.womanpriceList.push(item.name)
            item.value = item.y
          })
          // 内衣分类
          this.undiesList = data.undiesList
          this.undiesList.forEach(item => {
            this.undieslist.push(item.name)
            item.value = item.y
          })
          // 内衣价位
          this.undiesPriceList = data.undiesPriceList
          this.undiesPriceList.forEach(item => {
            this.undiespriceList.push(item.name)
            item.value = item.y
          })
          // 配饰价位偏好
          this.accessoriesPriceList = data.accessoriesPriceList
          this.accessoriesPriceList.forEach(item => {
            this.accessoriespriceList.push(item.name)
            item.value = item.y
          })
          // 柱状图
          // 购买习惯
          this.shopList = data.shopList
          this.shopList.forEach(item => {
            this.shop.push(item.name)
            this.closely.push(item.y)
          })
          // 男装品牌  
          this.manBrandList = data.manBrandList
          this.manBrandList.forEach(item => {
            console.log(item.name)
            this.manBrandListname.push(item.name)
            this.BrandList.push(item.y)
            console.log(this.BrandListname)
            // console.log(this.BrandList)
          })
          // 女装品牌
          this.womanBrandList = data.womanBrandList
          this.womanBrandList.forEach(item => {
            this.womanBrandListname.push(item.name)
            this.womanbrandList.push(item.y)
          })
          // 内衣品牌
          this.undiesBrandList = data.undiesBrandList
          this.undiesBrandList.forEach(item => {
            this.undiesBrandListname.push(item.name)
            this.undiesbrandList.push(item.y)
          })
          // 男鞋品牌
          this.menShoeBrandList = data.menShoeBrandList
          this.menShoeBrandList.forEach(item => {
            this.menShoeBrandListname.push(item.name)
            this.menshoebrandList.push(item.y)
          })
          // 女鞋品牌
          this.womanShoeBrandList = data.womanShoeBrandList
          this.womanShoeBrandList.forEach(item => {
            this.womanShoeBrandListname.push(item.name)
            this.womanshoebrandList.push(item.y)
          })
          // 户外运动品牌
          this.sportBrandList = data.sportBrandList
          this.sportBrandList.forEach(item => {
            this.sportBrandListname.push(item.name)
            this.sportbrandList.push(item.y)
          })
          // 箱包品牌
          this.luggageBrandList = data.luggageBrandList
          this.luggageBrandList.forEach(item => {
            this.luggageBrandListname.push(item.name)
            this.luggagebrandList.push(item.y)
          })
          // 配饰品牌偏好
          this.accessoriesBrandList = data.accessoriesBrandList
          this.accessoriesBrandList.forEach(item => {
            this.accessoriesBrandListname.push(item.name)
            this.accessoriesbrandList.push(item.y)
          })
          this.drawLine9()
          this.drawLine10()
          this.drawLine11()
          this.drawLine12()
          this.drawLine13()
          this.drawLine14()
          this.drawLine15()
          this.drawLine16()
          // 柱状图
          this.drawLine17()
          this.drawLine18()
          this.drawLine19()
          this.drawLine20()
          this.drawLine21()
          this.drawLine22()
          this.drawLine23()
          this.drawLine24()
          this.drawLine25()
          // 购买习惯
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    drawLine9 () {
      let myChart = this.$echarts.init(document.getElementById("myChart9"));
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
          data: this.finery
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
            data: this.apparelList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine10 () {
      let myChart = this.$echarts.init(document.getElementById("myChart10"));
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
          data: this.StyleList
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
            data: this.manStyleList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine11 () {
      let myChart = this.$echarts.init(document.getElementById("myChart11"));
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
          data: this.PriceList
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
            data: this.manPriceList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine12 () {
      let myChart = this.$echarts.init(document.getElementById("myChart12"));
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
          data: this.womanStyleList
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
            data: this.womanStyleList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine13 () {
      let myChart = this.$echarts.init(document.getElementById("myChart13"));
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
          data: this.womanpriceList
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
            data: this.womanPriceList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine14 () {
      let myChart = this.$echarts.init(document.getElementById("myChart14"));
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
          data: this.undieslist
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
            data: this.undiesList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine15 () {
      let myChart = this.$echarts.init(document.getElementById("myChart15"));
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
          data: this.undiespriceList
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
            data: this.undiesPriceList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine16 () {
      let myChart = this.$echarts.init(document.getElementById("myChart16"));
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
          data: this.accessoriespriceList
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
            data: this.accessoriesPriceList
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine17 () {
      let myChart = this.$echarts.init(document.getElementById("myChart17"));
      let option = {
        title: {
          text: '购买习惯'
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
            data: this.shop,
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
            data: this.closely,

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
    drawLine18 () {
      let myChart = this.$echarts.init(document.getElementById("myChart18"));
      let option = {
        title: {
          text: '男装品牌'
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
            data: this.manBrandListname,
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
            data: this.BrandList,

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
    drawLine19 () {
      let myChart = this.$echarts.init(document.getElementById("myChart19"));
      let option = {
        title: {
          text: '女装品牌'
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
            data: this.womanBrandListname,
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
            data: this.womanbrandList,

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
    drawLine20 () {
      let myChart = this.$echarts.init(document.getElementById("myChart20"));
      let option = {
        title: {
          text: '内衣品牌'
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
            data: this.undiesBrandListname,
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
            data: this.undiesbrandList,

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
    drawLine21 () {
      let myChart = this.$echarts.init(document.getElementById("myChart21"));
      let option = {
        title: {
          text: '男鞋品牌'
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
            data: this.menShoeBrandListname,
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
            data: this.menshoebrandList,

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
    drawLine22 () {
      let myChart = this.$echarts.init(document.getElementById("myChart22"));
      let option = {
        title: {
          text: '女鞋品牌'
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
            data: this.womanShoeBrandListname,
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
            data: this.womanshoebrandList,

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
    drawLine23 () {
      let myChart = this.$echarts.init(document.getElementById("myChart23"));
      let option = {
        title: {
          text: '户外运动品牌'
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
            data: this.sportBrandListname,
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
            data: this.sportbrandList,

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
    drawLine24 () {
      let myChart = this.$echarts.init(document.getElementById("myChart24"));
      let option = {
        title: {
          text: '箱包品牌'
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
            data: this.luggageBrandListname,
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
            data: this.luggagebrandList,

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
    drawLine25 () {
      let myChart = this.$echarts.init(document.getElementById("myChart25"));
      let option = {
        title: {
          text: '配饰品牌偏好'
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
            data: this.accessoriesBrandListname,
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
            data: this.accessoriesbrandList,

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

