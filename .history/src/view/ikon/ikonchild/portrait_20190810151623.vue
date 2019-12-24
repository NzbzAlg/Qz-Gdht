<template>
  <div>
    <!-- 用户画像 -->
    <div>
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
      <div :class="$style.f_hx2">
        <span :class="$style.f_mc">{{mc6}}</span>
        <div id="myChart6" style="position: static; width:100%;height:500px;"></div>
      </div>
      <div :class="$style.f_hx2">
        <span :class="$style.f_mc">{{mc7}}</span>
        <div id="myChart7" style="position: static; width:100%;height:500px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['message'],
  data () {
    return {
      id: '',
      mc: '性别',
      mc1: '年龄',
      mc2: '学历',
      mc3: '收入',
      mc4: '子女',
      mc5: '汽车',
      mc6: '职业',
      mc7: '人群',
      array: [],
      id: '',
      agebin: [],
      car: [],
      edu: [],
      gender: [],
      income: [],
      kids: [],
      occupation: [],
      segment: []
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
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get(`modules/persona/dataView?orderId=${this.id}&type=basic`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          console.log(data)
          this.agebin = data.agebin
          this.car = data.car
          this.edu = data.edu
          this.gender = data.gender
          this.income = data.income
          this.kids = data.kids
          this.occupation = data.occupation
          this.segment = data.segment
          this.drawLine();
          this.drawLine1();
          this.drawLine2();
          this.drawLine3();
          this.drawLine4();
          this.drawLine5();
          this.drawLine6();
          this.drawLine7();
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    drawLine () {
      console.log(this.gender)
      let sex = []
      sex.push(this.gender[0].name, this.gender[1].name)
      this.gender.forEach(item => {
        item.value = item.y
      })
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
        let option = {
            color: ['#8E16FE', ' #8C99AD'], //环形图每块的颜色
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal', //图例列表的布局朝向。 horizontal - 横向 ， vertical - 竖向
              x: 'center', // 居中显示
              bottom: 10, //  距离底部距离
              data: sex
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
                data: this.gender
              }
            ]
          };
          myChart.setOption(option);
    },
    drawLine1 () {
       let age = []
          age.push(this.agebin[0].name, this.agebin[1].name, this.agebin[2].name, this.agebin[3].name, this.agebin[4].name, )
          this.agebin.forEach(item => {
            item.value = item.y
          })
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart1.setOption(option);
    },
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart2.setOption(option);
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart3.setOption(option);
    },
    drawLine4 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart4.setOption(option);
    },
    drawLine5 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart5 = this.$echarts.init(document.getElementById("myChart5"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart5.setOption(option);
    },
    drawLine6 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart4 = this.$echarts.init(document.getElementById("myChart6"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart4.setOption(option);
    },
    drawLine7 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart5 = this.$echarts.init(document.getElementById("myChart7"));
      // 绘制图表
      let option = {
        title: {
          text: "男女比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 123, name: "男" },
              { value: 411, name: "女" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart5.setOption(option);
    }
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
.f_hx2 {
  width: 564px;
  border: 1px solid #e6e9f0;
  display: inline-block;
  margin-top: 20px;
  // margin-right: 2%;
  margin-bottom: 30px;
  height: 530px;
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
.f_jz {
  margin-top: 20px;
  text-align: center;
}
</style>
