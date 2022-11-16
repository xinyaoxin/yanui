import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/indexDb',
    name: 'IndexDB',
    component: () => import('../views/indexDB/index.vue')
  },
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
