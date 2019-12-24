import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/login/login.vue')
const Index = () => import('@/view/index.vue')
// 系统管理---system
const Business = () => import('@/view/system/business.vue')
const Purview = () => import('@/view/system/purview.vue')
const Role = () => import('@/view/system/role.vue')
const User = () => import('@/view/system/user.vue')
// 客户管理---customermanagement   
const Client = () => import('@/view/customermanagement/client.vue')
const Filter = () => import('@/view/customermanagement/filter.vue')
const Clientele = () => import('@/view/customermanagement/clientele.vue')
const Addup = () => import('@/view/customermanagement/addup.vue')
// const Clientelxq =()=>import ('@/view/customermanagement/zihtml/clien/telxq.vue')
// 采集任务---collectiontask     
const Total = () => import('@/view/collectiontask/total.vue')
const List = () => import('@/view/collectiontask/list.vue')
const Select = () => import('@/view/collectiontask/select.vue')
const Search = () => import('@/view/dataorder/search.vue')
// 终端管理-----terminalmanagement  
const Version = () => import('@/view/terminalmanagement/version.vue')
const Terminallist = () => import('@/view/terminalmanagement/terminallist.vue')
// 数据订单----dataorder    
const Allorders = () => import('@/view/dataorder/allorders.vue')
const Notapproved = () => import('@/view/dataorder/notapproved.vue')
const Notunpublished = () => import('@/view/dataorder/notunpublished.vue')
const Published = () => import('@/view/dataorder/published.vue')
const Wspdd = () => import('@/view/dataorder/wspdd.vue')
// 画像订单----ikon  
const Ikonorders = () => import('@/view/ikon/ikonorders.vue')
const Ikonnotapproved = () => import('@/view/ikon/ikonapproved.vue')
const Ikonhx = () => import('@/view/ikon/ikonhx.vue')
const Ikonxq = () => import('@/view/ikon/ikonxq.vue')
const Notikonxq = () => import('@/view/ikon/notikonxq.vue')
// 任务广场----task    
const Tasknum = () => import('@/view/task/tasknum.vue')
const Tasklist = () => import('@/view/task/tasklist.vue')
const Taskfilter = () => import('@/view/task/taskfilter.vue')
const Tasksearch = () => import('@/view/task/tasksearch.vue')
// 数据诱探----trapping 
const Ssid = () => import('@/view/trapping/ssid.vue')
// 财务管理----management  
const Finance = () => import('@/view/management/finance.vue')
const Rush = () => import('@/view/management/rush.vue')
const Rushxq = () => import('@/view/management/rushxq.vue')
const Financialstatistics = () => import('@/view/management/financialstatistics.vue')
const Bamboodata = () => import('@/view/management/bamboodata.vue')
const Caiwuxiangqing = () => import('@/view/management/caiwuxiangqing.vue')
const Zcz = () => import('@/view/management/zcz.vue')
// 固定画像---fixedportrait   
const Fixedikon = () => import('@/view/fixedportrait/fixedikon.vue')
const Fixedapproved = () => import('@/view/fixedportrait/fixedapproved.vue')
const Fixedikonxq = () => import('@/view/fixedportrait/fixedikonxq.vue')
const Fixedapprovedxq = () => import('@/view/fixedportrait/fixedapprovedxq.vue')
const Fixedhx = () => import('@/view/fixedportrait/fixedhx.vue')
// 基础设置---basicsettings      
const Sharing = () => import('@/view/basicsettings/sharing.vue')
const Pricing = () => import('@/view/basicsettings/pricing.vue')
const IPFS = () => import('@/view/basicsettings/ipfs.vue')
const Confirm = () => import('@/view/basicsettings/confirm.vue')
const Node = () => import('@/view/basicsettings/node.vue')
const Power = () => import('@/view/basicsettings/power.vue')
const Tutransactionsiness = () => import('@/view/basicsettings/transaction.vue')
const Basismap = () => import('@/view/basicsettings/basismap.vue')
const Tz = () => import('@/view/tz/tz.vue')
// 场景配置
const Scenes = () => import('@/view/basicsettings/scenes.vue')
const Crowdlabel = () => import('@/view/changjingpeizhi/crowdlabel.vue')
const Industrydata = () => import('@/view/changjingpeizhi/industrydata.vue')
const Scenesname = () => import('@/view/changjingpeizhi/scenesname.vue')
const Newadd = () => import('@/view/changjingpeizhi/newadd.vue')
const EditScenes = () => import('@/view/changjingpeizhi/editScenes.vue')
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [

        {
          path: 'tz.vue',
          component: Tz
        },
        // 系统管理---system
        {
          path: 'business.vue',
          component: Business
        },
        {
          path: 'purview.vue',
          component: Purview
        },
        {
          path: 'role.vue',
          component: Role
        },
        {
          path: 'user.vue',
          component: User
        },
        // 客户管理---customermanagement   
        {
          path: 'client.vue',
          component: Client
        },
        {
          path: 'filter.vue',
          component: Filter
        },
        {
          path: 'clientele.vue',
          component: Clientele,
          // children:[
          //   {
          //     path:'clientelxq.vue',
          //     component:Clientelxq
          //   }
          // ]
        },
        {
          path: 'addup.vue',
          component: Addup
        },
        // 采集任务---collectiontask
        {
          path: 'total.vue',
          component: Total
        },
        {
          path: 'list.vue',
          component: List
        },
        {
          path: 'select.vue',
          component: Select
        },
        {
          path: 'search.vue',
          component: Search
        },
        // 终端管理-----terminalmanagement
        {
          path: 'version.vue',
          component: Version
        },
        {
          path: 'terminallist.vue',
          component: Terminallist
        },
        // 数据订单----dataorder
        {
          path: 'allorders.vue',
          component: Allorders
        },
        {
          path: 'notapproved.vue',
          component: Notapproved
        },
        {
          path: 'notunpublished.vue',
          component: Notunpublished
        },
        {
          path: 'published.vue',
          component: Published
        },
        {
          path: 'wspdd.vue',
          component: Wspdd
        },
        // 画像订单----ikon
        {
          path: 'ikonorders.vue',
          component: Ikonorders
        },
        {
          path: 'ikonapproved.vue',
          component: Ikonnotapproved
        },
        {
          path: 'ikonhx.vue',
          component: Ikonhx
        },
        {
          path: 'ikonxq.vue',
          component: Ikonxq
        },
        {
          path: 'notikonxq.vue',
          component: Notikonxq
        },
        // 任务广场----task
        {
          path: 'tasknum.vue',
          component: Tasknum
        },
        {
          path: 'tasklist.vue',
          component: Tasklist
        },
        {
          path: 'taskfilter.vue',
          component: Taskfilter
        },
        {
          path: 'tasksearch.vue',
          component: Tasksearch
        },
        // 数据诱探----trapping
        {
          path: 'ssid.vue',
          component: Ssid
        },
        // 财务管理----management
        {
          path: 'finance.vue',
          component: Finance
        },
        {
          path: 'rush.vue',
          component: Rush
        },
        {
          path: 'rushxq.vue',
          component: Rushxq
        },
        {
          path: "financialstatistics.vue",
          component: Financialstatistics
        },
        {
          path: 'bamboodata.vue',
          component: Bamboodata
        },
        {
          path: "caiwuxiangqing.vue",
          component: Caiwuxiangqing
        },
        {
          path: "zcz.vue",
          component: Zcz
        },
        // 固定画像---fixedportrait
        {
          path: 'fixedikon.vue',
          component: Fixedikon
        },
        {
          path: 'fixedapproved.vue',
          component: Fixedapproved
        },
        {
          path: 'fixedikonxq.vue',
          component: Fixedikonxq
        },
        {
          path: 'fixedapprovedxq.vue',
          component: Fixedapprovedxq
        },
        {
          path: 'fixedhx.vue',
          component: Fixedhx
        },
        // 基础设置---basicsettings
        {
          path: 'sharing.vue',
          component: Sharing
        },
        {
          path: 'pricing.vue',
          component: Pricing
        },
        {
          path: 'ipfs.vue',
          component: IPFS
        },
        {
          path: 'confirm.vue',
          component: Confirm
        },
        {
          path: 'node.vue',
          component: Node
        },
        {
          path: 'power.vue',
          component: Power
        },
        {
          path: 'transaction.vue',
          component: Tutransactionsiness
        },
        {
          path: 'basismap.vue',
          component: Basismap
        },
        // 场景配置
        {
          path: "crowdlabel.vue",
          component: Crowdlabel
        },
        {
          path: 'scenes.vue',
          component: Scenes
        },
        {
          path: 'industrydata.vue',
          component: Industrydata
        },
        {
          path: 'scenesname.vue',
          component: Scenesname
        },
        {
          path: 'newadd.vue',
          component: Newadd
        },
        {
          path: 'editScenes.vue',
          component: EditScenes
        }
      ]
    }
  ]
})
