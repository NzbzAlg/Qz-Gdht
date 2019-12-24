<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:40px">
        <span style="display: inline-block; float: left; margin-top: 10px;">客户名称:</span>
        <el-input placeholder="请输入内容" v-model="name" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="8">
        <span style="display: inline-block; float: left; margin-top: 10px;">企业名称:</span>
        <el-input placeholder="请输入内容" v-model="companyName" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="8">
        <span style="display: inline-block; float: left; margin-top: 10px;">用户名:</span>
        <el-input placeholder="请输入内容" @blur="away" v-model="username" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">客户类型</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:70px">
        <span style="display: inline-block; float: left; margin-top: 10px;">类型:</span>
        <el-select v-model="leixing" @change="stamp" placeholder="请选择" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;">
          <el-option v-for="item in xzlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="leixing!=4&leixing!=''&leixing!=6">
        <span style="display: inline-block; float: left; margin-top: 10px;">省:</span>
        <el-select v-model="province" @change="provinceevent" placeholder="请选择" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;">
          <el-option v-for="item in Provinceoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="leixing!=4&leixing!=''&leixing!=1&leixing!=6">
        <span style="display: inline-block; float: left; margin-top: 10px;">市:</span>
        <el-select v-model="city" @change="cityevent" placeholder="请选择" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;">
          <el-option v-for="item in Cityoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="leixing!=4&leixing!=''&leixing!=1&leixing!=6">
        <span style="display: inline-block; float: left; margin-top: 10px;">区:</span>
        <el-select v-model="area"  placeholder="请选择" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;">
          <el-option v-for="item in Areaoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing!=1&leixing!=6&leixing!=''">上级客户</el-divider>
    <el-row>
      <!-- 市级一般代理的上级客户 -->
      <el-col :span="7" style="margin-left:38px;display:block" v-if="leixing!=4&leixing!=6&leixing!=''&leixing!=1&leixing!=2">
        <span style="display: inline-block; float: left; margin-top: 10px;">市级运营中心:</span>
        <el-select v-model="value2" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;" placeholder="请选择" clearable :disabled="stop5" @change="getshiji">
            <el-option v-for="item in shijiyunying" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7" style="margin-left:38px" v-if="leixing!=4&leixing!=6&leixing!=''&leixing!=1">
        <span style="display: inline-block; float: left; margin-top: 10px;display:block;">合资公司:</span>
        <el-select v-model="value1" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;" placeholder="请选择" :disabled="stop4" @change="getFinds">
            <el-option v-for="item in optionsd" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <!-- 大客户的上级客户 -->
      <el-col :span="7" style="margin-left:38px;display:block" v-if="leixing!=6&leixing!=''&leixing!=1&leixing!=2&leixing!=3">
        <span style="display: inline-block; float: left; margin-top: 10px;">市级一般代理商:</span>
        <el-select v-model="value3" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;" clearable placeholder="请选择" :disabled="stop3" @change="getyiban">
            <el-option v-for="item in shijiyiban" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7" style="margin-left:10px;display:block" v-if="leixing!=6&leixing!=''&leixing!=1&leixing!=2&leixing!=3">
        <span style="display: inline-block; float: left; margin-top: 10px;">市级运营中心:</span>
        <el-select v-model="value2"  style=" display: inline-block;width: 50%;float: left;margin-left: 10px;" clearable placeholder="请选择" :disabled="stop2" @change="getshiji">
            <el-option v-for="item in shijiyunying" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7" style="margin-left:10px;display:block" v-if="leixing!=6&leixing!=''&leixing!=1&leixing!=2&leixing!=3">
        <span style="display: inline-block; float: left; margin-top: 10px;">合资公司:</span>
        <el-select v-model="value1" style=" display: inline-block;width: 50%;float: left;margin-left: 10px;" clearable placeholder="请选择" :disabled="stop1" @change="getFinds">
            <el-option v-for="item in optionsd" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left" v-if="leixing===4">数据价格</el-divider>
    <el-row v-if="leixing===4">
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
        <span style="display: inline-block; float: left; margin-top: 10px;">订购数据单价:</span>
        <el-input placeholder="请输入内容" v-model="dataPrice" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
        <span style="display: inline-block; float: left; margin-top: 10px;">订购画像价格:</span>
        <el-input placeholder="请输入内容" v-model="personaPrice" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
        <span style="display: inline-block; float: left; margin-top: 10px;">订购固定画像价格:</span>
        <el-input placeholder="请输入内容" v-model="fixedPrice" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
    </el-row>
     <el-divider content-position="left">联系方式</el-divider>
    <el-row>
      <el-col :span="5" style="margin-left:48px">
        <span style="display: inline-block; float: left; margin-top: 10px;">联系人:</span>
        <el-input placeholder="请输入内容"  v-model="contact" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="6">
        <span style="display: inline-block; float: left; margin-top: 10px;">联系电话:</span>
        <el-input placeholder="请输入内容"  v-model="phone" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="6">
        <span style="display: inline-block; float: left; margin-top: 10px;">联系邮箱:</span>
        <el-input placeholder="请输入内容" type="email" v-model="email" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
      <el-col :span="6">
        <span style="display: inline-block; float: left; margin-top: 10px;">联系地址:</span>
        <el-input placeholder="请输入内容" v-model="address" clearable style=" display: inline-block;width: 50%;float: left;margin-left: 10px;"></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">所属客服</el-divider>
    <el-row>
      <el-col :span="7">
        <span>所属客服:</span>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-divider content-position="left">备注</el-divider>
    <el-row style="margin-top:10px">
      <el-col :span="23">
        <span style="float:left;margin-left:40px;margin-top:15px">备注：</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="textarea2"
          :class="$style.f_fwb"
        ></el-input>
      </el-col>
    </el-row>
    <el-button type="primary" @click="create" :class="$style.f_cj">创建</el-button>
  </div>
</template>

<script>
import sx from '../components/sxbtn'
export default {
  components: {
    sx
  },
  data () {
    return {
      input: '',
      options: [],
      optionsd:[],
      shijiyunying:{},
      value: '',
      parentId:'',
      value1: '',
      value2:'',
      value3:'',
      stop:false,
      stop1:false,
      stop2:false,
      stop3:false,
      stop4:false,
      stop5:false,
      textarea2: '',
      gongxiang: false,
      xzlx: [
        {
          id: 1,
          name: '省级运营中心'
        },
        {
          id: 2,
          name: '市级运营中心'
        },
        {
          id: 3,
          name: '市级一般代理商'
        },
        {
          id: 4,
          name: '大客户'
        },
        {
          id: 6,
          name: '合资公司'
        }
      ],
      leixing: '',
      province: '',
      Provinceoptions: [],
      city: '',
      Cityoptions: [],
      area: '',
      Areaoptions: [],
      name: '',
      companyName: '',
      username: '',
      dataPrice: '',
      personaPrice: '',
      fixedPrice: '',
      phone: '',
      email: '',
      address: '',
      contact:''
    }
  },
  mounted () {
    this.getFind()
    this.getFinds()
    this.getshiji()
    this.getyiban()
  },
  methods: {
    getFind () {
      this.$http.get(`sys/user/findService`).then(res => {
        var { code, data } = res.data
        console.log(data)
        if (code === 1000) {
          this.options = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    //合资公司  2
    getFinds () {
      if(this.value1 !=""){
        this.stop2 = true
        this.stop3 = true
      }else if(this.value2 != ""){
        this.stop1 = true
        this.stop3 = true
      }else if(this.value3 !=""){
        this.stop1 = true
        this.stop2 = true
      }else if(this.value1 == ""){
        this.stop1 = false
        this.stop2 = false
        this.stop3 = false
      }
      if(this.value1 !=""){
        this.stop5 = true
      }else if(this.value1 == ""){
        this.stop4 = false
        this.stop5 = false
      }
      this.$http.get(`modules/merchant/findCountry`,{
          params:{
          proxyType:6,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.optionsd = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    //市级运营中心  1
    getshiji(){
      if(this.value1 !=""){
        this.stop2 = true
        this.stop3 = true
      }else if(this.value2 != ""){
        this.stop1 = true
        this.stop3 = true
      }else if(this.value3 !=""){
        this.stop1 = true
        this.stop2 = true
      }else if(this.value2 == ""){
        this.stop1 = false
        this.stop2 = false
        this.stop3 = false
      }
      if(this.value2 !=""){
        this.stop4 = true
      }else if(this.value2 == ""){
        this.stop4 = false
        this.stop5 = false
      }
      this.$http.get(`modules/merchant/findCountry`,{
          params:{
          proxyType:2,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.shijiyunying = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    //一般
    getyiban(){
      if(this.value3 !=""){
        this.stop1 = true
        this.stop2 = true
      }else if(this.value3 == ""){
        this.stop1 = false
        this.stop2 = false
        this.stop3 = false
      }
      this.$http.get(`modules/merchant/findCountry`,{
          params:{
          proxyType:3,
        }
      }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.shijiyiban = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    away(){
      // console.log(1)
      if(/[^\w\.\/]/ig.test(this.username)){
        // console.log(1)
        this.$message.error('用户名输入有误，请重新输入')
      }
    },
    create () {
      console.log(this.leixing)
      if (this.leixing != ''&&this.value!='') {
        if (this.leixing === 4) {
          let info = {
            'name': this.name,
            'companyName': this.companyName,
            'username': this.username,
            'proxyType': this.leixing,
            'contact':this.contact,
            'phone': this.phone,
            'email': this.email,
            'address': this.address,
            'service': this.value,
            'specialPrice.dataPrice': this.dataPrice,
            'specialPrice.personaPrice': this.personaPrice,
            'specialPrice.fixedPrice': this.fixedPrice,
            // 'parentId':this.value1,//合资公司
            // 'parentId':this.value2,//市级运营中心
            // 'parentId':this.value3,//市级一般代理
            'parentId':this.value1||this.value2||this.value3
          }
          this.$http.post(`modules/merchant`, info).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              this.$router.push('/index/clientele.vue')
              this.$message({
                message: '创建成功',
                type: 'success'
              });
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push('/')
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            console.log('错误信息' + err)
          })
        } else {
          let info = {
            'name': this.name,
            'companyName': this.companyName,
            'proxyType': this.leixing,
            'username': this.username,
            'contact':this.contact,
            'phone': this.phone,
            'email': this.email,
            'address': this.address,
            'service': this.value,
            'province': this.province,
            'city': this.city,
            // 'parentId':this.value1,//合资公司
            // 'parentId':this.value2,//市级运营中心
            // 'parentId':this.value3,//市级一般代理
            'parentId':this.value1||this.value2||this.value3
          }
          this.$http.post(`modules/merchant`, info).then(res => {
            var { code, data } = res.data
            if (code === 1000) {
              this.$router.push('/index/clientele.vue')
              this.$message({
                message: '创建成功',
                type: 'success'
              });
            } else if (code == 2001) {
              this.$message.error(res.data.message);
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.$router.push('/')
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            console.log('错误信息' + err)
          })
        }
      }else if(this.value!=''&&this.leixing === ''){
        this.$message.error('请选择用户类型')
      }else if(this.value===''&&this.leixing != ''){
        this.$message.error('请选择所属客服')
      }else{
        this.$message.error('选项不能为空')
      }

    },
    //省
    stamp () {
      if (this.leixing != 4) {
        this.$http.get(`modules/area/areaByPid`, {          
            params: {
              pid: 1
            }        
          }).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.Provinceoptions = data
          } else if (code == 2001) {
            this.$message.error(res.data.message);
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$router.push('/')
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    //市
    provinceevent () {
      this.$http.get(`modules/area/areaByPid`, {        
          params: {
            pid: this.province
          }      
        }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Cityoptions = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    //区
    cityevent () {
      this.$http.get(`modules/area/areaByPid`, {        
          params: {
            pid: this.city
          }      
        }).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Areaoptions = data
        } else if (code == 2001) {
          this.$message.error(res.data.message);
          window.sessionStorage.clear();
          window.localStorage.clear();
          this.$router.push('/')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
  }
}
</script>

<style lang='scss' module>
.f_khmc {
  display: inline-block;
  float: left;
  margin-top: 10px;
}
.f_khipt {
  display: inline-block;
  width: calc(100% - 50%);
  float: left;
  margin-left: 10px;
}
.f_bz {
  display: inline-block;
  height: 54px;
  line-height: 54px;
}
.f_fwb {
  width: calc(100% - 10%);
}
.f_cj {
  margin-top: 20px;
}
.f_khipt1 {
  width: 50%;
}
</style>
