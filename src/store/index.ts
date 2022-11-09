import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import createPersistedstate from 'vuex-persistedstate'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user,
  },
  strict: debug,
  //配置插件vuex-persistedstate，用于持久化存储
  plugins: debug ? [createLogger(),
    createPersistedstate({
      //本地存储的名称，可以在控制台查看
      key:'vuex-store',
      //存储的模块
      paths:['user']
    })
  ] : []
})
