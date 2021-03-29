import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
import Login from '../views/Login/index.vue'
import Admin from '../views/Admin/index.vue'
import UserMessage from '../views/User/UserMessage.vue'
import UserInfo from '../views/User/UserInfo.vue'
import Rights from '../components/power/rights.vue'

const routes = [

  {
    //方法一_重定义自动跳转登陆页面
    path: '/',
    redirect: '/login',//打开页面就加载

  },
  {
    //方法二_登陆页面
    path: '/login',
    name: "登陆",
    component: Login
  },

  {
    //菜单
    path: '/bar',
    name: "导航",
    component: () => import('../views/Bar/index.vue'),
    redirect: '/home',
    children: [
      { path: "/home", component: Home },
      { path: "/userMessage", component: UserMessage },
      { path: "/userInfo", component: UserInfo },
      { path: "/admin", component: Admin },
      { path: "/Rights", component: Rights }
    ]

  },
  {
    //方法二
    path: '/about',
    name: "关于",
    component: () => import('../views/About/index.vue')
  },
  {
    path: '/404',
    component: () => import('../views/404.vue'),//懒加载模式，点击页面才加载，优化进入效果

  },

  // // 404必须在最后 !!!
  // { path: '*', redirect: '/404', hidden: true }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//挂载路由导航首位
router.beforeEach((to, form, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转过来
  //next 函数，表示放行
  if (to.path == '/login') return next();
  //获取token
  const tokenStr = localStorage.getItem('Token');
  if (!tokenStr) return next('/login')
  next()
})
export default router
