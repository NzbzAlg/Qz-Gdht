<template>
  <div :class="$style.f_bj">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      :class="$style.f_dl"
    >
      <h2 :class="$style.f_bt">清竹后台管理系统</h2>
      <el-form-item :class="$style.f_yhmc" class="denglu">
        <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" :class="$style.f_yhdl"></el-input>
      </el-form-item>
      <el-form-item :class="$style.f_yhmc1" class="denglu">
        <el-input
          v-model="formLabelAlign.passowrd"
          placeholder="请输入密码"
          :class="$style.f_yhdl"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item class="denglu" :class="$style.f_yhmc1">
        <div class="drag" ref="dragDiv">
          <div class="drag_bg"></div>
          <div class="drag_text">{{confirmWords}}</div>
          <div
            ref="moveDiv"
            @mousedown="mousedownFn($event)"
            :class="{'handler_ok_bg':confirmSuccess}"
            class="handler handler_bg"
            style="position: absolute;top: 0px;left: 0px;  cursor: pointer;"
          ></div>
        </div>
      </el-form-item>
      <el-button type="primary" @click="go" :class="$style.f_btndl">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5';
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        passowrd: '',
        Check: "",
      },
      beginClientX: 20,           /*距离屏幕左端距离*/
      mouseMoveStata: false,     /*触发拖动状态  判断*/
      maxwidth: '',               /*拖动最大宽度，依据滑块宽度算出来的*/
      confirmWords: '拖动滑块验证',   /*滑块文字*/
      confirmSuccess: false           /*验证成功判断*/
    };
  },
  methods: {
    go () {
      let username = this.formLabelAlign.username
      let passowrd = this.formLabelAlign.passowrd
      // let md = this.$md5(passowrd)
      // let md = this.$md5(this.formLabelAlign.passowrd);
      console.log(md5('holle') )
      // this.$http.post(`sys/user/login`, { username: username, password: passowrd }).then(res => {
      //   let token = res.headers.api_token
      //   window.sessionStorage.setItem("token", token);
      //   console.log(1)
      //   let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51']
      //   let name = username
      //   let mima = passowrd
      //   window.sessionStorage.setItem('data', JSON.stringify(arr))
      //   window.sessionStorage.setItem('name', JSON.stringify(name))
      //   window.sessionStorage.setItem('mima', JSON.stringify(mima))
      //   this.$router.push("./index");
      // })
      // if (username === 'admin' && passowrd === '123456') {
      //   console.log(1)
      //   let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47','48','49','50','51']
      //   let name = username
      //   let mima = passowrd
      //   window.sessionStorage.setItem('data', JSON.stringify(arr))
      //   window.sessionStorage.setItem('name', JSON.stringify(name))
      //   window.sessionStorage.setItem('mima', JSON.stringify(mima))
      //   this.$router.push("./index");
      // } else if (username === 'kefujl' && passowrd === '123456') {
      //   console.log(2)
      //   let arr = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '22', '23', '24', '25', '26', '27', '28', '29', '31', '31', '35', '36', '37']
      //   let name = username
      //   let mima = passowrd
      //   window.sessionStorage.setItem('data', JSON.stringify(arr))
      //   window.sessionStorage.setItem('name', JSON.stringify(name))
      //   window.sessionStorage.setItem('mima', JSON.stringify(mima))
      //   this.$router.push("./index");
      // } else if (username === 'kefu' && passowrd === '123456') {
      //   console.log(2)
      //   let arr = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '22', '23', '24', '25', '26', '27', '28', '29', '31', '31', '35', '36', '37']
      //   let name = username
      //   let mima = passowrd
      //   window.sessionStorage.setItem('data', JSON.stringify(arr))
      //   window.sessionStorage.setItem('name', JSON.stringify(name))
      //   window.sessionStorage.setItem('mima', JSON.stringify(mima))
      //   this.$router.push("./index");
      // } else if (username === 'dcry' && passowrd === '123456') {
      //   console.log(2)
      //   let arr = ['17', '20', '21']
      //   let name = username
      //   let mima = passowrd
      //   window.sessionStorage.setItem('data', JSON.stringify(arr))
      //   window.sessionStorage.setItem('name', JSON.stringify(name))
      //   window.sessionStorage.setItem('mima', JSON.stringify(mima))
      //   this.$router.push("./index");
      // } else if (username === 'caiwu1' && passowrd === '123456') {
      //   console.log(2)
      //   let arr = ['32', '33', '34','35','36']
      //   let name = username
      //   let mima = passowrd
      //   window.sessionStorage.setItem('data', JSON.stringify(arr))
      //   window.sessionStorage.setItem('name', JSON.stringify(name))
      //   window.sessionStorage.setItem('mima', JSON.stringify(mima))
      //   this.$router.push("./index");
      // }
    },
    tp () {
      console.log(1)
    },
    mousedownFn: function (e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true;
        this.beginClientX = e.clientX;
      }
    },        //mousedoen 事件
    successFunction () {
      this.confirmSuccess = true
      this.confirmWords = '验证通过';
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => { });
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#fff'
      document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
      document.getElementsByClassName('drag_bg')[0].style.width = 346 + 'px';
    },                //验证成功函数
    mouseMoveFn (e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = width + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    },                   //mousemove事件
    moseUpFn (e) {
      this.mouseMoveStata = false;
      var width = e.clientX - this.beginClientX;
      if (width < this.maxwidth) {
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
      }
    }                       //mouseup事件
  },
  mounted () {
    this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
  }
}
</script>

<style lang='scss' module>
.f_bj {
  width: 100%;
  background: url("../assets/img/清竹后台登录页.png") no-repeat;
  background-size: 100% 100%;
  min-height: 100%;
  #lizi {
    min-height: 100%;
  }
  .f_dl {
    width: 480px;
    height: 428px;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -214px;
    margin-left: -240px;
    text-align: center;
    background: #fff;
    border: 1px solid #979797;
    .f_bt {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #1e4ef5;
      letter-spacing: 0;
      text-align: center;
      margin-bottom: 0px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eeeeee;
    }
    .f_yhmc {
      margin-top: 49px;
      margin-bottom: 0px !important;
      .el-form-item__label {
        color: #fff !important;
      }
    }
    .f_yhmc1 {
      margin-top: 30px;
      margin-bottom: 0px !important;
      .el-form-item__label {
        color: #fff !important;
      }
    }
  }
  .f_btndl {
    margin-top: 13px;
    width: 360px;
    background: #1e4ef5;
    border-radius: 4px;
    border-color: #1e4ef5;
  }
}
</style>
