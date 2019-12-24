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
      <div id="myChart" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc1}}</span>
      <div id="myChart1" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc2}}</span>
      <div id="myChart2" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc3}}</span>
      <div id="myChart3" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc4}}</span>
      <div id="myChart4" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc5}}</span>
      <div id="myChart5" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc6}}</span>
      <div id="myChart6" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc7}}</span>
      <div id="myChart7" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc8}}</span>
      <div id="myChart8" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc9}}</span>
      <div id="myChart9" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc10}}</span>
      <div id="myChart10" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc11}}</span>
      <div id="myChart11" style="position: static; width:100%;height:300px;"></div>
    </div>
    <div :class="$style.f_hx1">
      <span :class="$style.f_mc">{{mc12}}</span>
      <div id="myChart12" style="position: static; width:100%;height:300px;"></div>
    </div>
    <br>
    <div :class="$style.f_hx3">
      <div id="myChart18" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart24" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart22" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart21" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart23" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart19" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart25" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart17" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
    <div :class="$style.f_hx3">
      <div id="myChart20" style="position: static; width:388px;height:300px;left:4%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mc: '收入',
      mc1: '性别',
      mc2: '特定时期',
      mc3: '价位',
      mc4: '年龄',
      mc5: '房产',
      mc6: '有无车产',
      mc7: '国籍',
      mc8: '学历',
      mc9: '语言',
      mc10: '是否备孕',
      mc11: '婚姻',
      mc12: '有无小孩',
      id: '',
      value1: '',

    }
  },
  mounted () {
    this.id = this.$store.state.id
    // console.log(this.id)
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`pc/fixedPortrait/selectUserScore?taskId=${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.drawLine(data)
          this.drawLine1(data)
          this.drawLine2(data)
          this.drawLine3(data)
          this.drawLine4(data)
          this.drawLine5(data)
          this.drawLine6(data)
          this.drawLine7(data)
          this.drawLine8(data)
          this.drawLine9(data)
          this.drawLine10(data)
          this.drawLine11(data)
          this.drawLine12(data)
          this.drawLine17(data);
          this.drawLine18(data);
          this.drawLine19(data);
          this.drawLine20(data);
          this.drawLine21(data);
          this.drawLine22(data);
          this.drawLine23(data);
          this.drawLine24(data);
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
    drawLine (data) {
      let income = []
      data.income.forEach(item => {
        income.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: income
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
            data: data.income
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine1 (data) {
      let gender = []
      data.gender.forEach(item => {
        gender.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: gender
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
            data: data.gender
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine2 (data) {
      let specialTime = []
      data.specialTime.forEach(item => {
        specialTime.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: specialTime
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
            data: data.specialTime
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine3 (data) {
      let model_level = []
      data.model_level.forEach(item => {
        model_level.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: model_level
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
                  fontSize: '24',
                  fontWeight: 'bold',
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.model_level
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine4 (data) {
      let agebin = []
      data.agebin.forEach(item => {
        agebin.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: agebin
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
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.agebin
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine5 (data) {
      let house = []
      data.house.forEach(item => {
        house.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart5"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: house
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
            data: data.house
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine6 (data) {
      let cars = []
      data.cars.forEach(item => {
        cars.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart6"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: cars
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
            data: data.cars
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine7 (data) {
      let nationality = []
      data.nationality.forEach(item => {
        nationality.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart7"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: nationality
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
            data: data.nationality
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine8 (data) {
      let edu = []
      data.edu.forEach(item => {
        edu.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart8"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: edu
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
            data: data.edu
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine9 (data) {
      let language_name = []
      data.language_name.forEach(item => {
        language_name.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart9"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: language_name
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
                  fontSize: '24',
                  fontWeight: 'bold',
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.language_name
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine10 (data) {
      let gestation = []
      data.gestation.forEach(item => {
        gestation.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart10"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: gestation
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
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.gestation
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine11 (data) {
      let married = []
      data.married.forEach(item => {
        married.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart11"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: married
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
            data: data.married
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine12 (data) {
      let kids = []
      data.kids.forEach(item => {
        kids.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart12"));
      let option = {
        color: ['#9013FE', '#0079FE', '#FF8F00', '#41E0FC ', '#B8E986', '#8C99AD ', '#FB745B', '#53237E', '#F6D707', '#38579A'], //环形图每块的颜色
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
          x: 'center', // 居中显示
          bottom: 10, //  距离底部距离
          data: kids
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
            data: data.kids
          }
        ]
      };
      myChart.setOption(option);
    },

    drawLine18 (data) {
      let occupation = []
      let occupationvalue = []
      data.occupation.forEach(item => {
        occupation.push(item.name)
        occupationvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart18"));
      let option = {
        title: {
          text: '职业'
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
            data: occupation,
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
            data: occupationvalue,

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
    drawLine24 (data) {
      let segment = []
      let segmentvalue = []
      data.segment.forEach(item => {
        segment.push(item.name)
        segmentvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart24"));
      let option = {
        title: {
          text: '人群偏好'
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
            data: segment,
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
            data: segmentvalue,

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
      let carrier = []
      let carriervalue = []
      data.carrier.forEach(item => {
        carrier.push(item.name)
        carriervalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart22"));
      let option = {
        title: {
          text: '运营商'
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
            data: carrier,
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
            data: carriervalue,

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
      let cell_factory = []
      let cell_factoryvalue = []
      data.cell_factory.forEach(item => {
        cell_factory.push(item.name)
        cell_factoryvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart21"));
      let option = {
        title: {
          text: 'cell_factory'
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
            data: cell_factory,
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
            data: cell_factoryvalue,

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
    drawLine23 (data) {
      let identity = []
      let identityvalue = []
      data.identity.forEach(item => {
        identity.push(item.name)
        identityvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart23"));
      let option = {
        title: {
          text: '特殊身份'
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
            data: identity,
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
            data: identityvalue,

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
      let industry = []
      let industryvalue = []
      data.industry.forEach(item => {
        industry.push(item.name)
        industryvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart19"));
      let option = {
        title: {
          text: '行业'
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
            data: industry,
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
            data: industryvalue,

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
      let model = []
      let modelvalue = []
      data.model.forEach(item => {
        model.push(item.name)
        modelvalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart25"));
      let option = {
        title: {
          text: 'Android型号'
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
            data: model,
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
            data: modelvalue,

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
    drawLine17 (data) {
      let screensize = []
      let screensizevalue = []
      data.screensize.forEach(item => {
        screensize.push(item.name)
        screensizevalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart17"));
      let option = {
        title: {
          text: 'Android分辨率'
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
            data: screensize,
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
            data: screensizevalue,

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
      let sysver = []
      let sysvervalue = []
      data.sysver.forEach(item => {
        sysver.push(item.name)
        sysvervalue.push(item.value)
      })
      let myChart = this.$echarts.init(document.getElementById("myChart20"));
      let option = {
        title: {
          text: 'Android操作系统'
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
            data: sysver,
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
            data: sysvervalue,

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
