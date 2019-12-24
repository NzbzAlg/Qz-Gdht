<template>
  <div>
     <div :class="$style.f_bgnr">
      <el-table :data="tableData1" border style="width: 100%;">
        <el-table-column type="index" align="center" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" align="center" label="名称"></el-table-column>
        <el-table-column prop="type" align="center" label="应用分类"></el-table-column>
        <el-table-column prop="ratio" align="center" label="活跃渗透率"></el-table-column>
        <el-table-column prop="tgi" align="center" label="TGI"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:['message'],
  data(){
    return{
        tableData1: [
        {
          dls: '微信',
          yyfl: '即使通讯',
          stl: '92%',
          tgi: 117
        },
      ],
      currentPage4:1,
      id:'',
      total:null,
    }
  },
  computed: {
    ...mapGetters(['forList'])
  },
  mounted(){
    this.id = this.$store.getters.forLive
    this.getList();
  },
  methods:{
      getList(){
      this.$http.get(`modules/persona/dataView?orderId=${this.id}&type=medium`,{params:{
        orderId:this.id,
        
      }}).then(res=>{
        var {code,data}=res.data
        if(code===1000){
          this.tableData1 = data
          this.total = data.length
        }
      }).catch((err)=>{
        console.log('错误信息'+err)
      })
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
</style>
