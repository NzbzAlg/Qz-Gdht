<template>
  <div>
    <el-divider content-position="left">余额</el-divider>
    <div>
      <el-table :data="Totalbalance" border style="width: 100%">
        <el-table-column label="总余额">
          <el-table-column prop="vkt" label="VKT"></el-table-column>
          <el-table-column prop="cny" label="CNY"></el-table-column>
        </el-table-column>
        <el-table-column prop="chant" label="代理商余额"></el-table-column>
        <el-table-column  label="大客户余额">
          <el-table-column prop="specialVkt" label="VKT"></el-table-column>
          <el-table-column prop="specialCny" label="CNY"></el-table-column>
        </el-table-column>
        <!-- <el-table-column label="清竹平台余额">
          <el-table-column prop="bamboovkt" label="VKT"></el-table-column>
          <el-table-column prop="bamboocny" label="CNY"></el-table-column>
        </el-table-column>
        <el-table-column prop="banboo" label="清竹数据余额(VKT)"></el-table-column> -->
        <el-table-column prop="bamboovkt" label="清竹平台"></el-table-column>
          <el-table-column prop="bamboocny" label="清竹数据"></el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">充值</el-divider>
    <div>
      <el-table :data="recharge" border style="width: 100%">
          <el-table-column prop="total" label="vkt总充值"></el-table-column>
          <el-table-column prop="merchantPt" label="vkt平台充值"></el-table-column>
          <el-table-column prop="merchantTo" label="vkt自充值"></el-table-column>
          <el-table-column prop="specialPt" label="cny总充值"></el-table-column>
          <el-table-column prop="specialTo" label="cny代理商充值"></el-table-column>
          <el-table-column prop="totalCNY" label="cny大客户充值"></el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">VKT收益</el-divider>
    <div>
      <el-table :data="earnings" border style="width: 100%">
        <el-table-column label="清竹平台收益">
          <el-table-column prop="totalIncome" label="总收益"></el-table-column>
          <el-table-column prop="collectProeVkt" label="采集确权收益"></el-table-column>
          <el-table-column prop="incomeVkt" label="收益权确权收益"></el-table-column>
          <el-table-column prop="useData" label="数据使用权确权收益"></el-table-column>
          <el-table-column prop="ipfs" label="IPFS收益"></el-table-column>
          <el-table-column prop="fixedVkt" label="固定画像收益"></el-table-column>
          <el-table-column prop="dataVkt" label="数据服务收益"></el-table-column>
          <el-table-column prop="personaVkt" label="数据画像收益"></el-table-column>
        </el-table-column>
        <el-table-column label="清竹数据收益">
          <el-table-column prop="dataIncomeVKT" label="数据收益"></el-table-column>
          <el-table-column prop="rewardVKT" label="任务收益"></el-table-column>
        </el-table-column>
        <el-table-column label="客户收益">
          <el-table-column prop="proxyIncomeVKT" label="数据收益"></el-table-column>
          <el-table-column prop="proxyRewardVKT" label="任务收益"></el-table-column>
          <el-table-column prop="fuwuFanXian" label="下级服务返现"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">支出</el-divider>
    <div>
      <el-table :data="outlay" border style="width: 100%">
        <el-table-column prop="specialByPay"  label="大客户购买数据"></el-table-column>
        <el-table-column prop="proxyByPay"  label="代理商购买数据"></el-table-column>
        <el-table-column prop="qingzhuPay"  label="清竹回购数据"></el-table-column>
        <el-table-column prop="specialFanXian"  label="大客户返现vkt"></el-table-column>
      </el-table>
    </div>
    <!-- <el-divider content-position="left">提现</el-divider>
    <div>
      <el-table :data="cashOut" border style="width: 100%">
        <el-table-column label="大客户提现">
          <el-table-column prop="specialTxCNY" label="CNY"></el-table-column>
          <el-table-column prop="specialTxVKT" label="VKT"></el-table-column>
        </el-table-column>
        <el-table-column label="代理商提现">
          <el-table-column prop="proxyTxCNY" label="CNY"></el-table-column>
          <el-table-column prop="proxyTxVKT" label="VKT"></el-table-column>
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      Totalbalance:[],
      recharge:[],
      earnings:[],
      // tableData: [],
      outlay:[],
      // cashOut:[],
      // income:[]
    }
  },
  mounted(){
    this.getList()
    this.getList1()
    this.getList2()
    this.getList3()
  },
  methods:{
    getList(){
      this.$http.get(`modules/finance/balanceCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          let balance={
            vkt:data.countVktBalance,
            cny:data.countCNYBalance,
            chant:data.merchantVktBalance,
            specialVkt:data.specialVktBalance,
            specialCny:data.specialCnyBalance,
            bamboovkt:data.qingZhuVktBalance,
            bamboocny:data.qzDataVktBalance,
          }
          this.Totalbalance.push(balance)
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    getList1(){
      this.$http.get(`modules/finance/rechargeCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          let recharge={
            total:data.totalVKT,   //vkt总充值
            merchantPt:data.merchantPt,//vkt平台充值
            merchantTo:data.merchantTo,//vkt自充值
            specialPt:data.totalCNY,//cny总充值
            specialTo:data.cnyAmount,//cny代理商充值
            totalCNY:data.specialCny//cny大客户充值
          }
          
          this.recharge.push(recharge)
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    getList2(){
      this.$http.get(`modules/finance/incomeCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          let earnings ={
            totalIncome:data.totalIncome,//总收益
            collectProeVkt:data.collectProeVkt,//采集确权收益
            incomeVkt:data.incomeVkt,//收益权确权收益
            useData:data.useData,//数据使用权确权收益
            ipfs:data.ipfs,//IPFS收益
            fixedVkt:data.fixedVkt,//固定画像收益
            dataVkt:data.dataVkt,//数据服务收益
            personaVkt:data.personaVkt,//数据画像收益
            dataIncomeVKT:data.dataIncomeVKT,//数据收益
            rewardVKT:data.rewardVKT,//任务收益
            proxyIncomeVKT:data.proxyIncomeVKT,//数据收益
            proxyRewardVKT:data.proxyRewardVKT,//任务收益
            fuwuFanXian:data.fuwuFanXian,//下级服务返现
          }
          this.earnings.push(earnings)
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
    getList3(){
      this.$http.get(`modules/finance/payForCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          let outlay ={
            specialByPay:data.specialByPrice,
            proxyByPay:data.proxyByPrice,
            qingzhuPay:data.qingzhu,
            specialFanXian:data.specialFanXian,
          }
          this.outlay.push(outlay)
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    },
  }
}
</script>

<style>
</style>
