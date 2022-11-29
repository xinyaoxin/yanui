import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import store from '../store/index'
import i18n from '@/i18n'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]
//导出动态路由，默认加载根目录Layout
export const DynamicRoutes = [
  {
    path: "/",
    component: Layout,
    name: 'contianer',
    redirect: '/home',
    meta: {
      //需要权限
      requireAuth: true,
      name: '首页'
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: {
          name: '首页',
          icon: 'icon-name'
        }
      }
    ]
  }
]


//需要先声明其类型，不然会出现==>(类型 "Router" 没有调用签名)
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});



router.beforeEach((to: any, from: any, next: any) => {
  console.log('进入路由导航守卫')
  document.title = to.meta.name ? i18n.global.t('common.docuTitle') + ' | ' + to.meta.name : document.title = i18n.global.t('common.docuTitle')
  if (!store.state.user.token) {
    // 未登录
    if (to.matched.length > 0 && !to.matched.some((record: { meta: { requireAuth: any; }; }) => record.meta.requireAuth)) {
      console.log(123)
      next()
    } else {
      console.log('没登录重定向login')
      next({ path: '/login' });
    }
  } else {
    // debugger
    console.log('perList', store.state.permission.permissionList)
    // debugger
    // 用户已经登录  路由的访问权限
    if (!store.state.permission.permissionList) {
      store.dispatch("permission/storePermission", store.state.user.token).then(() => {
        next({
          path: to.path
        })
      })
    } else {
      // store存在权限
      if (to.path !== "/login") {
        console.log(to)
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})


export default router
