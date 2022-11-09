import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]


//需要先声明其类型，不然会出现==>(类型 "Router" 没有调用签名)
const router:any = createRouter({
  history: createWebHashHistory(),
  routes
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes
  })
  //版本升级：router.matcher => router.resolve
  router.resolve = newRouter.resolve // reset router
}

export default router
