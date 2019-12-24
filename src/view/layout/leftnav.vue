<template>
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
      v-if="item.child&&list.includes(item.id)"
      v-for="(item ,i ) in data"
      :key="i"
      :index="item.name"
    >
      <template slot="title">
        <span>{{item.name}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="link in item.child " :key="link.id" :index="link.path" @click="dj(link)">{{link.name}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {name:'系统管理',id:'0',child:[
          {name:"业务日志",path:'/index/business.vue',id:'1'},
          {name:"权限管理",path:'/index/purview.vue',id:'2'},
          {name:"角色管理",path:'/index/role.vue',id:'3'},
          {name:"用户管理",path:'/index/user.vue',id:'4'}
        ]},
        {name:'客户管理',id:'5',child:[
          {name:"客户创建",path:'/index/client.vue',id:'6'},
          // {name:"搜索筛选",path:'/index/filter.vue',id:'7'},
          {name:"客户列表",path:'/index/clientele.vue',id:'8'},
          {name:"客户统计",path:'/index/addup.vue',id:'9'}
        ]},
        {name:'采集任务',id:'10',child:[
          {name:"数量统计",path:'/index/total.vue',id:'11'},
          {name:"列表",path:'/index/list.vue',id:'12'},
          {name:"筛选",path:'/index/select.vue',id:'13'},
          {name:"搜索",path:'/index/search.vue',id:'14'}
        ]},
        {name:'终端管理',id:'15',child:[
          {name:"终端版本",path:'/index/version.vue',id:'16'},
          {name:"终端列表",path:'/index/terminallist.vue',id:'17'},
        ]},
        {name:'数据订单',id:'17',child:[
          {name:"所有订单",path:'/index/allorders.vue',id:'18'},
          {name:"未审批订单(数量)",path:'/index/notapproved.vue',id:'19'},
          {name:"未发布订单(数量)",path:'/index/notunpublished.vue',id:'20'},
          {name:"已发布订单(数量)",path:'/index/published.vue',id:'21'},
        ]},
        {name:'画像订单',id:'22',child:[
          {name:"所有订单",path:'/index/ikonorders.vue',id:'23'},
          {name:"未审批订单(数量)",path:'/index/ikonapproved.vue',id:'24'},
        ]},
        {name:'任务广场',id:'25',child:[
          {name:"数量统计",path:'/index/tasknum.vue',id:'26'},
          {name:"列表",path:'/index/tasklist.vue',id:'27'},
          {name:"筛选",path:'/index/taskfilter.vue',id:'28'},
          {name:"搜索",path:'/index/tasksearch.vue',id:'29'},
        ]},
        {name:'数据诱探',id:'30',child:[
          {name:"SSID管理",path:'/index/ssid.vue',id:'31'},
        ]},
        {name:'财务管理',id:'32',child:[
          {name:"代理商财务",path:'/index/finance.vue',id:'33'},
          {name:"冲提管理",path:'/index/rush.vue',id:'34'},
        ]},
        {name:'固定画像',id:'35',child:[
          {name:"所有固定画像",path:'/index/fixedikon.vue',id:'36'},
          {name:"未审批订单",path:'/index/fixedapproved.vue',id:'37'},
        ]},
        {name:'基础设置',id:'38',child:[
          {name:"数据分成",path:'/index/sharing.vue',id:'39'},
          {name:"数据定价",path:'/index/pricing.vue',id:'40'},
          {name:"IPFS存储费用",path:'/index/ipfs.vue',id:'41'},
          {name:"确权费用",path:'/index/confirm.vue',id:'42'},
          {name:"节点配置",path:'/index/node.vue',id:'43'},
          {name:"算力阶梯",path:'/index/power.vue',id:'44'},
          {name:"交易手续费",path:'/index/transaction.vue',id:'45'},
          {name:"MAP标签价格",path:'/index/basismap.vue',id:'46'},
          {name:"场景配置",path:'/index/scenes.vue',id:'47'},
        ]}
      ],
      id: null,
      list: JSON.parse(window.sessionStorage.getItem("data")),
      name: JSON.parse(window.sessionStorage.getItem("name"))
    };
  },
  created() {
    console.log(this.name);
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    dj(link){
      console.log(link)
    }
  }
};
</script>

<style>
.el-submenu .el-menu-item {
  display: block;
}
.el-ment {
  border-right: none;
}
.el-menu {
  border-right: none;
}
.is-active {
  background: #65afea !important;
  color: #f9fafb !important;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #65afea !important;
  color: #f9fafb !important;
}
.el-submenu__title:focus,
.el-submenu__title:hover {
  background-color: #65afea !important;
  color: #f9fafb !important;
}
</style>
