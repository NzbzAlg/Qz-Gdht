<template>
  <div class="content">
    <el-container>
      <el-header>
        <!-- <Header/> -->
        <el-row>
          <el-col :span="3">
            <img src="../assets/img/logo.png" alt :class="$style.f_logo">
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
                <i class="el-icon-bell" :class="$style.f_bell" @click="bell1"></i>
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
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          :class="$style.f_tabs"
          closable
          @tab-click="dianji1"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="index+''"
          ></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- <Leftnav/> -->
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#515777"
            active-text-color="#000"
            unique-opened
            router
          >
            <el-submenu
              v-for="(item ,i ) in data"
              :key="i"
              :index="item.name"
              v-if="item.child&&list.includes(item.id)"
            >
              <template slot="title">
                <span :class="$style.f_yjname">{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(link , index) in item.child "
                  :key="index"
                  :index="link.path"
                  @click="dj(link)"
                  v-if="list.includes(link.id)"
                  :class="$style.f_cbl"
                >{{link.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main :class="$style.main">
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {          name: '系统管理', id: '0', child: [
            // { name: "业务日志", path: '/index/business.vue', id: '1' },
            // { name: "权限管理", path: '/index/purview.vue', id: '2' },
            // { name: "角色管理", path: '/index/role.vue', id: '3' },
            { name: "用户管理", path: '/index/user.vue', id: '4' }
          ]        },
        {          name: '客户管理', id: '5', child: [
            { name: "客户创建", path: '/index/client.vue', id: '6' },
            { name: "客户列表", path: '/index/clientele.vue', id: '8' },
          ]        },
        {          name: '任务管理', id: '10', child: [
            { name: "任务管理", path: '/index/list.vue', id: '12' },
            { name: "任务广场", path: '/index/tasklist.vue', id: '27' },
          ]        },
        {          name: '终端管理', id: '15', child: [
            { name: "终端版本", path: '/index/version.vue', id: '16' },
            { name: "终端列表", path: '/index/terminallist.vue', id: '17' },
          ]        },
        {          name: '数据订单', id: '17', child: [
            { name: "所有订单", path: '/index/allorders.vue', id: '18' },
            { name: "未审批订单", path: '/index/notapproved.vue', id: '19' },
            { name: "未发布订单", path: '/index/notunpublished.vue', id: '20' },
            { name: "已发布订单", path: '/index/published.vue', id: '21' },
          ]        },
        {          name: '画像订单', id: '22', child: [
            { name: "所有订单", path: '/index/ikonorders.vue', id: '23' },
            { name: "未审批订单", path: '/index/ikonapproved.vue', id: '24' },
          ]        },
        {          name: '固定画像', id: '35', child: [
            { name: "所有固定画像", path: '/index/fixedikon.vue', id: '36' },
            { name: "未审批订单", path: '/index/fixedapproved.vue', id: '37' },
          ]        },
        // {          name: '任务广场', id: '25', child: [
        //   ]        },
        // {          name: '数据诱探', id: '30', child: [
        //     { name: "SSID管理", path: '/index/ssid.vue', id: '31' },
        //   ]        },
        {          name: '财务管理', id: '32', child: [
            { name: "财务统计", path: '/index/financialstatistics.vue', id: '36' },
            { name: "青竹数据", path: '/index/bamboodata.vue', id: '35' },
            { name: "充提管理", path: '/index/rush.vue', id: '34' },
            { name: "客户财务", path: '/index/finance.vue', id: '33' },
          ]        },
        {          name: "场景配置", id: '47', child: [
            { name: "人群标签配置", path: '/index/crowdlabel.vue', id: '49' },
            { name: "区域数据配置", path: '/index/scenes.vue', id: '48' },
            { name: "行业数据配置", path: '/index/industrydata.vue', id: '50' },
            { name: "场景名称配置", path: '/index/scenesname.vue', id: '51' },
          ]        },
        // {          name: '基础设置', id: '38', child: [
        //     { name: "数据分成", path: '/index/sharing.vue', id: '39' },
        //     { name: "数据定价", path: '/index/pricing.vue', id: '40' },
        //     { name: "IPFS存储费用", path: '/index/ipfs.vue', id: '41' },
        //     { name: "确权费用", path: '/index/confirm.vue', id: '42' },
        //     { name: "节点配置", path: '/index/node.vue', id: '43' },
        //     { name: "算力阶梯", path: '/index/power.vue', id: '44' },
        //     { name: "交易手续费", path: '/index/transaction.vue', id: '45' },
        //     { name: "MAP标签价格", path: '/index/basismap.vue', id: '46' },
        //   ]        },
      ],
      id: null,
      list: JSON.parse(window.sessionStorage.getItem("data")),
      name: JSON.parse(window.sessionStorage.getItem("name")),
      input: '',
      name: JSON.parse(window.sessionStorage.getItem("name")),
      passowrd: JSON.parse(window.sessionStorage.getItem("mima")),
      info:JSON.parse(window.sessionStorage.getItem('info')),
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
      num: 2,
      editableTabsValue: '/index',
      editableTabs: [{
        title: '首页',
        name: '/index',
      }],
      tabIndex: 0,
      arr: [],
      isRouterAlive: true,
      ljlink: {},
      ljid: [],
      tzid: '',
    };
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  created () {
    // this.bell();
    this.tjpush();
    // console.log(this.list)
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    tjpush () {
      this.$store.commit('mArry', this.editableTabs)
      this.tjtz()
    },
    tjtz () {
      this.$store.commit('myval', this.tabIndex)
    },
    tjname () {
      this.$store.commit('myval1', this.editableTabsValue)
    },
    dj (link) {
      let newTabName = ++this.tabIndex + '';
      console.log(newTabName)
      this.editableTabsValue = newTabName
      let flag = this.editableTabs.some(item => {
        return item.name === link.path
      })
      if (flag) {
        this.editableTabsValue = link.path
      } else {
        this.editableTabs.push({
          title: link.name,
          name: link.path,
        })
        this.editableTabsValue = link.path
        // console.log(this.editableTabsValue)
      }
      // this.tjtz()
    },
    user () {
      this.iinfo = true
      console.log(this.info)
      let object = {
        name: this.info.name,
        phone: this.info.phone,
        Email: this.info.email
      }
      this.formLabelAlign = object
    },
    handleClose () {
      this.iinfo = false
    },
    // 修改密码
    code () {
      this.changecode = true
      console.log(this.passowrd)
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
        let info ={
          password:this.pa
        }
        this.$http.post(`sys/user/update_password`)
        this.$message({
          message: '修改成功，请重新登陆',
          type: 'success'
        });
        this.$router.push('/')
        window.sessionStorage.clear();
      }
    },
    codeClose () {
      this.formcode = {}
      this.changecode = false
    },
    cancel () {
      this.formcode = {},
        this.changecode = false
    },
    // 消息中心
    bell () {
      this.$router.push('/index/tz.vue')
      // const h = this.$createElement;

      // this.$notify({
      //   title: '通知',
      //   message: h('i', { style: 'color: teal' }, '有消息尚未处理'),
      //   position: 'bottom-right'
      // });

    },
    bell1 () {
      alert('暂无消息')
    },
    // 退出
    esc () {
      this.$confirm('确定要退出登陆', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`sys/user/logout`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$message({
              type: 'success',
              message: '已退出登陆!'
            });
            this.$router.push('/')
            window.sessionStorage.clear();
            window.localStorage.clear();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    removeTab (targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue
      let title
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === this.editableTabs[targetName].name) {
            // console.log(targetName)
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              // console.log(nextTab)
              activeName = nextTab.name;
              title = nextTab.title
            }
          }
        });
      }
      this.editableTabsValue = activeName
      // this.editableTabs = tabs.filter(tab => tab.name !== this.editableTabs[targetName].name);
      // console.log(targetName)
      if (targetName > -1) {
        this.editableTabs.splice(targetName, 1)
      }
      this.$router.push(this.editableTabsValue)
    },
    dianji1 (tab, event) {
      // console.log(this.editableTabs[tab.name])
      if (this.editableTabs[tab.name].name === '/index/ikonxq.vue') {
        this.$http.get(`modules/order/detail/${this.editableTabs[tab.name].id}`).then(res => {
          var { code, data } = res.data
          if (code === 1000) {
            this.$store.commit('mydigital', data)
          }
        }).catch((err) => {
          console.log('错误信息' + err)
        })
      }
      this.$router.push(this.editableTabs[tab.name].name)
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style  lang='scss' module>
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
.f_tabs {
  margin-top: 28px;
  margin-left: 200px;
}
.main {
  margin-top: 58px;
}
.f_yjname {
  font-weight: 700;
  font-size: 16px;
}
.f_cbl {
  padding-left: 70px !important;
  font-size: 14px;
}
</style>
