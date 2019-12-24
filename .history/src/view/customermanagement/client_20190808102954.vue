<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:40px">
        <span :class="$style.f_khmc">客户名称:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="name" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span :class="$style.f_khmc">企业名称:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="companyName" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span :class="$style.f_khmc">用户名:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="username" clearable></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">客户类型</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:70px">
        <span :class="$style.f_khmc">类型:</span>
        <el-select v-model="leixing" :class="$style.f_khipt" @change="stamp" placeholder="请选择">
          <el-option v-for="item in xzlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="leixing!=4&leixing!=''">
        <span :class="$style.f_khmc">省:</span>
        <el-select
          v-model="province"
          :class="$style.f_khipt"
          @change="provinceevent"
          placeholder="请选择"
        >
          <el-option
            v-for="item in Provinceoptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="leixing!=4&leixing!=''&leixing!=1">
        <span :class="$style.f_khmc">市:</span>
        <el-select v-model="city" :class="$style.f_khipt" @change="cityevent" placeholder="请选择">
          <el-option v-for="item in Cityoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="leixing!=4&leixing!=''&leixing!=1">
        <span :class="$style.f_khmc">区:</span>
        <el-select v-model="area" :class="$style.f_khipt" placeholder="请选择">
          <el-option v-for="item in Areaoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- <el-divider content-position="left" v-if="leixing==='选项6'">数据共享</el-divider>
    <el-row v-if="leixing==='选项6'">
      <el-col :span="3" style="margin-left:40px">
        <span style="float:left">是否共享:</span>
        <el-switch v-model="gongxiang" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-col>
    </el-row>
     <el-row v-if="leixing==='选项6'">
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
         <span :class="$style.f_khmc">数据单价:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt"  v-model="input" clearable></el-input>
      </el-col>
    </el-row>-->
    <el-divider content-position="left" v-if="leixing===4">数据价格</el-divider>
    <el-row v-if="leixing===4">
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
        <span :class="$style.f_khmc">订购数据单价:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="dataPrice" clearable></el-input>
      </el-col>
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
        <span :class="$style.f_khmc">订购画像价格:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="personaPrice" clearable></el-input>
      </el-col>
      <el-col :span="6" style="margin-left:40px;margin-top:20px;">
        <span :class="$style.f_khmc">订购固定画像价格:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="fixedPrice" clearable></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">联系方式</el-divider>
    <el-row>
      <el-col :span="5" style="margin-left:48px">
        <span :class="$style.f_khmc">联系人:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span :class="$style.f_khmc">联系电话:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="phone" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span :class="$style.f_khmc">联系邮箱:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="email" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span :class="$style.f_khmc">联系地址:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="address" clearable></el-input>
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
    <el-row>
      <el-col :span="24">
        <span :class="$style.f_bz">备注：</span>
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
      value: '',
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
    }
  },
  mounted () {
    this.getFind()
  },
  methods: {
    getFind () {
      this.$http.get(`sys/user/findService`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.options = data
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    create () {
      if (this.leixing === 4) {
        let info = {
          'name': this.name,
          'companyName': this.companyName,
          'proxyType': this.proxyType,
          'phone':this.phone,
          'email':this.email,
          'address':this.address,
          'service':this.value,
          'specialPrice.dataPrice':this.dataPrice,
          'specialPrice.personaPrice':this.personaPrice,
          'specialPrice.fixedPrice':this.fixedPrice,
        }
        this.$http.post(`modules/merchant`,info).then(res=>{
          var { code, data } = res.data
        if (code === 1000) {
          this.options = data
        } else {
          this.$message.error(res.data.message);
        }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }else{
         let info = {
          'name': this.name,
          'companyName': this.companyName,
          'proxyType': this.proxyType,
          'phone':this.phone,
          'email':this.email,
          'address':this.address,
          'service':this.value,
          'province':this.province,
          'city':this.city,
        }
        this.$http.post(`modules/merchant`).then().catch((err) => {
          console.log('错误信息' + err)
        })
      }

    },
    stamp () {
      if (this.leixing != 4) {
        this.$http.get(`modules/area/areaByPid?pid=1`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.Provinceoptions = data
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
    },
    provinceevent () {
      this.$http.get(`modules/area/areaByPid?pid=${this.province}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Cityoptions = data
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log('错误信息' + err)
      })
    },
    cityevent () {
      this.$http.get(`modules/area/areaByPid?pid=${this.city}`).then(res => {
        var { code, data } = res.data
        if (code === 1000) {
          this.Areaoptions = data
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
