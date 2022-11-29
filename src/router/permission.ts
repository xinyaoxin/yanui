import store from '../store/index'
import router from './index'
import i18n from '@/i18n'


router.beforeEach((to: any, from: any, next: any) => {
    console.log('进入路由导航守卫1')
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