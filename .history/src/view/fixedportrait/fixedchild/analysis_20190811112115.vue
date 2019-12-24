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
    <div :class="$style.f_bgnr">
      <el-table :data="tableData1" border style="width: 100%;">
        <el-table-column type="index" align="center" width="50" label="序号"></el-table-column>
        <el-table-column align="center" label="名称">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt style="width: 50px; height: 50px;margin-left: -50px;">
            <span
              style="    position: absolute; top: 28px;    margin-left: 10px;"
            >{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" align="center" label="应用分类"></el-table-column>
        <el-table-column prop="final_pct" align="center" label="活跃渗透率"></el-table-column>
        <el-table-column prop="index1" align="center" label="TGI"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['message'],
  data () {
    return {
      currentPage4: 1,
      tableData1: [
        {
          dls: '微信',
          yyfl: '即使通讯',
          stl: '92%',
          tgi: 117
        },
      ],
      id: "",
      value1: ''

    }
  },
  computed: {
    ...mapGetters(['forList1'])
  },
  mounted () {
    this.id = this.$store.getters.forList1
    // this.getList()
  },
  methods: {
    getList () {
      this.$http.get(`pc/fixedPortrait/selectAppinfo?taskId=${this.id}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.tableData1 = data
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    dianji3 () {
      console.log(this.checkboxGroup2.join(','))
      console.log(this.checkboxGroup1.join(','))
    },
  }
}
</script>

<style lang='scss' module>
.f_bgnr {
  padding-top: 39px;
  padding-left: 34px;
  padding-right: 34px;
  padding-bottom: 20px;
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
