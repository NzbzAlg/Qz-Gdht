<template>
  <div>
    <el-row>
      <el-col :span="3">
        <img src="../../assets/img/logo.png" alt :class="$style.f_logo">
      </el-col>
      <el-col :span="6" :offset="15">
        <div>
          <i class="el-icon-user" :class="$style.f_name" @click="user">
            <span>{{name}}</span>
          </i>
          <i class="el-icon-setting" :class="$style.f_mima" @click="code">
            <span>修改密码</span>
          </i>
          <el-badge v-if="num!=null" :value="num" class="item">
            <i class="el-icon-bell" :class="$style.f_bell" @click="bell"></i>
          </el-badge>
          <el-badge v-if="num===null" :value="num" class="item">
            <i class="el-icon-bell" :class="$style.f_bell" @click="bell"></i>
          </el-badge>
          <i class="el-icon-switch-button" :class="$style.f_exc" @click="esc">
            <span>退出</span>
          </i>
        </div>
      </el-col>
    </el-row>
    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="iinfo" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="用户姓名：">
          <el-input v-model="formLabelAlign.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="formLabelAlign.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="formLabelAlign.Email" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iinfo = false">取 消</el-button>
        <el-button type="primary" @click="iinfo = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="changecode" width="30%" :before-close="codeClose">
      <el-form :label-position="labelPosition" label-width="100px" :model="formcode">
        <el-form-item label="旧密码：">
          <el-input v-model="formcode.oldpassowrd" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="formcode.newpassword" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="formcode.affirmpassword" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      name: JSON.parse(window.sessionStorage.getItem("name")),
      passowrd: JSON.parse(window.sessionStorage.getItem("mima")),
      iinfo: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        phone: '',
        Email: ''
      },
      changecode: false,
      formcode: {
        oldpassowrd: '',
        newpassword: '',
        affirmpassword: ''
      },
      num: 2
    }
  },
  methods: {
    user () {
      console.log(this.name)
      this.iinfo = true
      let object = {
        name: '张三',
        phone: 123432131,
        Email: '99999@qq.com'
      }
      this.formLabelAlign = object
    },
    handleClose (done) {
      done();
    },
    // 修改密码
    code () {
      this.changecode = true
    },
    determine () {
      let oldcode = this.formcode.oldpassowrd
      let newcode = this.formcode.newpassword
      let affirmcode = this.formcode.affirmpassword
      if (newcode != affirmcode) {
        this.$message.error('两次密码输入的不一致能重新输入');
        newcode = '';
        affirmcode = ''
      } else if (oldcode === '') {
        this.$message.error('旧密码不能为空');
      } else {
        this.$message({
          message: '修改成功，请重新登陆',
          type: 'success'
        });
        this.$router.push('/')
        window.sessionStorage.clear();
      }
    },
    codeClose (done) {
      this.formcode = {}
      done();
    },
    cancel () {
      this.formcode = {},
        this.changecode = false
    },
    // 消息中心
    bell () {
      const h = this.$createElement;

      this.$notify({
        title: '通知',
        message: h('i', { style: 'color: teal' }, '有消息尚未处理'),
        position: 'bottom-right'
      });
    },
    // 退出
    esc () {
      this.$confirm('确定要退出登陆', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已退出登陆!'
        });
        this.$router.push('/')
        window.sessionStorage.clear();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  created () {
    this.bell();
  }
}
</script>

<style lang='scss' module>
.f_logo {
  margin-top: 10px;
}
.f_name {
  margin-top: 20px;
  cursor: pointer;
  span {
    font-size: 16px;
  }
}
.f_mima,
.f_exc,
.f_bell {
  margin-left: 10px;
  cursor: pointer;
  span {
    font-size: 14px;
  }
}
.el-form-item__label {
  color: #000;
}
</style>
