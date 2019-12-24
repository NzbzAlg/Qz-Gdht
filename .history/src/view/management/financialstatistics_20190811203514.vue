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
        <el-table-column label="青竹平台余额">
          <el-table-column prop="bamboovkt" label="VKT"></el-table-column>
          <el-table-column prop="bamboocny" label="CNY"></el-table-column>
        </el-table-column>
        <el-table-column prop="banboo" label="青竹数据余额(VKT)"></el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">充值</el-divider>
    <div>
      <el-table :data="recharge" border style="width: 100%">
        <el-table-column label="VKT充值">
          <el-table-column prop="total" label="总充值"></el-table-column>
          <el-table-column label="代理商充值">
          <el-table-column prop="merchantPt" label="平台充值">
          <!-- <el-table-column prop="zjmc" label="人民币花费"></el-table-column>
          <el-table-column prop="zjmc" label="平均换算率"></el-table-column> -->
          </el-table-column>
          <el-table-column prop="merchantTo" label="自动充"></el-table-column>
          </el-table-column>
          <el-table-column label="大客户充值">
          <el-table-column prop="specialPt" label="平台充值"></el-table-column>
          <el-table-column prop="specialTo" label="自动充"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="totalCNY" label="CNY充值">
        </el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">VKT收益</el-divider>
    <div>
      <el-table :data="income" border style="width: 100%">
        <el-table-column label="青竹平台收益">
          <el-table-column prop="collectProeVkt" label="采集确权收益"></el-table-column>
          <el-table-column prop="incomeVkt" label="收益确权"></el-table-column>
          <el-table-column prop="ipfs" label="IPFS收益"></el-table-column>
          <el-table-column prop="fixedVkt" label="固定画像收益"></el-table-column>
          <el-table-column prop="personaVkt" label="数据服务收益"></el-table-column>
          <el-table-column prop="dataVkt" label="数据画像收益"></el-table-column>
        </el-table-column>
        <el-table-column label="青竹数据收益">
          <el-table-column prop="qzDataIncomeVKT" label="数据收益"></el-table-column>
          <el-table-column prop="qzrewardVKT" label="任务收益"></el-table-column>
        </el-table-column>
        <el-table-column label="客户收益">
          <el-table-column prop="proxyIncomeVKT" label="数据收益"></el-table-column>
          <el-table-column prop="proxyRewardVKT" label="任务收益"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">支出</el-divider>
    <div>
      <el-table :data="outlay" border style="width: 100%">
        <el-table-column prop="payFor"  label="数据回购">
        </el-table-column>
      </el-table>
    </div>
    <el-divider content-position="left">提现</el-divider>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Totalbalance:[],
      recharge:[],
      tableData: [],
      outlay:[],
      cashOut:[],
      income:[]
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      this.$http.get(`modules/financeAfter/balanceCount`).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          console.log(data)
          let balance={
            vkt:data.balance.countVktBalance,
            cny:data.balance.countCnyBalance,
            chant:data.balance.merchantVktBalance,
            specialVkt:data.balance.specialVktBalance,
            specialCny:data.balance.specialVktBalance,
            bamboocny:data.balance.qingZhuCnyBalance,
            bamboovkt:data.balance.qingZhuVktBalance,
            banboo:data.balance.qzDataVktBalance
          }
          let recharge={
            total:data.recharge.totalVKT,
            merchantTo:data.recharge.merchantTo,
            merchantPt:data.recharge.merchantPt,
            specialTo:data.recharge.specialTo,
            specialPt:data.recharge.specialPt,
            totalCNY:data.recharge.totalCNY
          }
          let earnings ={
            collectProeVkt:data.income.collectProeVkt,
            incomeVkt:data.income.incomeVkt,
            ipfs:data.income.ipfs,
            fixedVkt:data.income.fixedVkt,
            personaVkt:data.income.personaVkt,
            dataVkt:data.income.dataVkt,
            qzDataIncomeVKT:data.income.qzDataIncomeVKT,
            qzrewardVKT:data.income.qzrewardVKT,
            proxyIncomeVKT:data.income.proxyIncomeVKT,
            proxyRewardVKT:data.income.proxyRewardVKT,
          }
          let withdraw ={
            proxyTxVKT:data.cashOut.proxyTxVKT,
            proxyTxCNY:data.cashOut.proxyTxCNY,
            specialTxVKT:data.cashOut.specialTxVKT,
            specialTxCNY:data.cashOut.specialTxCNY,
          }
          this.Totalbalance.push(balance)
          this.recharge.push(recharge)
          this.income.push(earnings)
          this.outlay.push(data.payFor)
          this.cashOut.push(withdraw)
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
    }
  }
}
</script>

<style>
</style>
