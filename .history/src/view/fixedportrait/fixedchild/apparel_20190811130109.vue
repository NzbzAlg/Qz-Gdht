<template>
  <div>
    <el-row style="margin-top:20px;">
      <el-button :class="$style.f_btn" style="float:left;margin-left:20px;" size="medium">导出报表</el-button>
      <div style="float: right; margin-right: 20px;">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button :class="$style.f_btn" @click="dianji3" size="medium">查询</el-button>
      </div>
    </el-row>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc}}</span>
      <div id="myChart488" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart489" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart40" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart41" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart42" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart43" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart44" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc7}}</span>
      <div id="myChart45" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc8}}</span>
      <div id="myChart46" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc9}}</span>
      <div id="myChart47" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc10}}</span>
      <div id="myChart48" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc11}}</span>
      <div id="myChart49" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc12}}</span>
      <div id="myChart50" style="position: static; width:280px;height:300px;left:4%;"></div>
    </div>
    <br>

    <div :class="$style.f_hx3">
      <div id="myChart467" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart468" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart469" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart470" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart471" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart472" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart475" style="position: static; width:100%;height:300px;left:4%;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      mc: '配饰品类偏好',
      mc1: '配饰价位偏好',
      mc2: '大类偏好',
      mc3: '女装价位偏好',
      mc4: '女装风格偏好',
      mc5: '箱包品类偏好',
      mc6: '男装价位偏好',
      mc7: '男装风格偏好',
      mc8: '鞋类偏好',
      mc9: '运动户外品牌偏好',
      mc10: '运动户外价位偏好',
      mc11: '内衣家居价位偏好',
      mc12: '内衣家居服品类偏好',
      id: '',
      value1:''
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
      this.$http.get(`pc/fixedPortrait/selectClothing?taskId=${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.drawLine9(data);
          this.drawLine10(data);
          this.drawLine11(data);
          this.drawLine12(data);
          this.drawLine13(data);
          this.drawLine14(data);
          this.drawLine15(data);
          this.drawLine16(data);
          this.drawLine1(data);
          this.drawLine2(data);
          this.drawLine3(data);
          this.drawLine4(data);
          this.drawLine5(data);

          this.drawLine17(data);
          this.drawLine18(data);
          this.drawLine19(data);
          this.drawLine20(data);
          this.drawLine21(data);
          this.drawLine22(data);
          this.drawLine25(data);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    dianji3 () {
      console.log(this.checkboxGroup2.join(','))
      console.log(this.checkboxGroup1.join(','))
    },
    drawLine9 (data) {
      let accessories = []
      data.accessories.forEach(item => {
        accessories.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart488"));
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
          data: accessories
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
            data: data.accessories
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine10 (data) {
      let accessoriesPrice = []
      data.accessoriesPrice.forEach(item => {
        accessoriesPrice.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart489"));
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
          data: accessoriesPrice
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
            data: data.accessoriesPrice
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine11 (data) {
      let clothing = []
      data.clothing.forEach(item => {
        clothing.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart40"));
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
          data: clothing
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
            data: data.clothing
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine12 (data) {
      let girlPrice = []
      data.girlPrice.forEach(item => {
        girlPrice.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart41"));
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
          data: girlPrice
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
            data: data.girlPrice
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine13 (data) {
      let girlStyle = []
      data.girlStyle.forEach(item => {
        girlStyle.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart42"));
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
          data: girlStyle
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
            data: data.girlStyle
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine14 (data) {
      let luggageCategories = []
      data.luggageCategories.forEach(item => {
        luggageCategories.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart43"));
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
          data: luggageCategories
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
            data: data.luggageCategories
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine15 (data) {
      let menWearPrice = []
      data.menWearPrice.forEach(item => {
        menWearPrice.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart44"));
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
          data: menWearPrice
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
            data: data.menWearPrice
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine16 (data) {
      let menswearStyle = []
      data.menswearStyle.forEach(item => {
        menswearStyle.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart45"));
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
          data: menswearStyle
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
            data: data.menswearStyle
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine1 (data) {
      let shoes = []
      data.shoes.forEach(item => {
        shoes.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart46"));
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
          data: shoes
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
            data: data.shoes
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine2 (data) {
      let sportsOut = []
      data.sportsOut.forEach(item => {
        sportsOut.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart47"));
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
          data: sportsOut
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
            data: data.sportsOut
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine3 (data) {
      let sportsOutPrice = []
      data.sportsOutPrice.forEach(item => {
        sportsOutPrice.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart48"));
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
          data: sportsOutPrice
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
            data: data.sportsOutPrice
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine4 (data) {
      let underwearHomePrice = []
      data.underwearHomePrice.forEach(item => {
        underwearHomePrice.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
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
          data: underwearHomePrice
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
            data: data.underwearHomePrice
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine5 (data) {
      let underwearHomeType = []
      data.underwearHomeType.forEach(item => {
        underwearHomeType.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart50"));
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
          data: underwearHomeType
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
            data: data.underwearHomeType
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine17 (data) {
      let luggageBrand = []
      let luggageBrandvalue = []
      data.luggageBrand.forEach(item => {
        luggageBrand.push(item.name)
        luggageBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart467"));
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: luggageBrand,
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
            data: luggageBrandvalue,

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
      let menShoes = []
      let menShoesvalue = []
      data.menShoes.forEach(item => {
        menShoes.push(item.name)
        menShoesvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart468"));
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: menShoes,
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
            data: menShoesvalue,

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
      let menWearBrand = []
      let menWearBrandvalue = []
      data.menWearBrand.forEach(item => {
        menWearBrand.push(item.name)
        menWearBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart469"));
      let option = {
        title: {
          text: '男装品牌偏好'
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
            data: menWearBrand,
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
            data: menWearBrandvalue,

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
      let sportsOutBrand = []
      let sportsOutBrandvalue = []
      data.sportsOutBrand.forEach(item => {
        sportsOutBrand.push(item.name)
        sportsOutBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart470"));
      let option = {
        title: {
          text: '运动户外品牌偏好'
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
            data: sportsOutBrand,
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
            data: sportsOutBrandvalue,

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
    drawLine21 (data) {
      let underwearHomeBrand = []
      let underwearHomeBrandvalue = []
      data.underwearHomeBrand.forEach(item => {
        underwearHomeBrand.push(item.name)
        underwearHomeBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart471"));
      let option = {
        title: {
          text: '内衣家居品牌偏好'
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
            data: underwearHomeBrand,
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
            data: underwearHomeBrandvalue,

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
    drawLine22 (data) {
      let woMenShoes = []
      let woMenShoesvalue = []
      data.woMenShoes.forEach(item => {
        woMenShoes.push(item.name)
        woMenShoesvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart472"));
      let option = {
        title: {
          text: '女鞋品牌偏好'
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
            data: woMenShoes,
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
            data: woMenShoesvalue,

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
    drawLine25 (data) {
      let girlBrand = []
      let girlBrandvalue = []
      data.girlBrand.forEach(item => {
        girlBrand.push(item.name)
        girlBrandvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart475"));
      let option = {
        title: {
          text: '女装品牌偏好'
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
            data: girlBrand,
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
            data: girlBrandvalue,

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
