<template>
  <div>
    <sx></sx>
    <el-divider content-position="left">基本信息</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:40px">
        <span :class="$style.f_khmc">客户名称:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span :class="$style.f_khmc">企业名称:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="8">
        <span :class="$style.f_khmc">用户名:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">客户类型</el-divider>
    <el-row>
      <el-col :span="7" style="margin-left:70px">
        <span :class="$style.f_khmc">类型:</span>
        <el-select v-model="leixing" :class="$style.f_khipt" @change="dj" placeholder="请选择">
          <el-option v-for="item in xzlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">省:</span>
        <el-select v-model="province" :class="$style.f_khipt" @change="dj(value)" placeholder="请选择">
          <el-option v-for="item in Provinceoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">市:</span>
        <el-select v-model="city" :class="$style.f_khipt" @change="dj(value)" placeholder="请选择">
          <el-option v-for="item in City" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span :class="$style.f_khmc">区:</span>
        <el-select v-model="area" :class="$style.f_khipt" @change="dj(value)" placeholder="请选择">
          <el-option v-for="item in xzlx" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
    <el-divider content-position="left">联系方式</el-divider>
    <el-row>
      <el-col :span="5" style="margin-left:48px">
        <span :class="$style.f_khmc">联系人:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span :class="$style.f_khmc">联系电话:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span :class="$style.f_khmc">联系邮箱:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span :class="$style.f_khmc">联系地址:</span>
        <el-input placeholder="请输入内容" :class="$style.f_khipt" v-model="input" clearable></el-input>
      </el-col>
    </el-row>
    <el-divider content-position="left">所属客服</el-divider>
    <el-row>
      <el-col :span="7">
        <span>所属客服:</span>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
    <el-button type="primary" @click="cj" :class="$style.f_cj">创建</el-button>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
      province:'',
      Provinceoptions:[],
      city:'',
      area:'',
    }
  },
  methods: {
    cj () {
      console.log(1)
    },
    dj (val) {
      console.log(this)
    }
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
