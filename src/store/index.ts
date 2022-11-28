import createPersistedstate from 'vuex-persistedstate'
import { createStore, createLogger } from 'vuex'
// import { InjectionKey } from 'vue'
// import { Store } from 'vuex'

import user from './modules/user'
import permission from './modules/permission'


const debug = process.env.NODE_ENV !== 'production'

export default createStore<any>({
  modules: {
    user,
    permission
  },
  strict: debug,
  //配置插件vuex-persistedstate，用于持久化存储
  plugins: debug ? [createLogger(),
    createPersistedstate({
      //本地存储的名称，可以在控制台查看
      key:'vuex-store',
      //存储的模块
      paths:['user','permission']
    })
  ] : []
})
