import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.js'

const app = createApp(App)
 
app.use(store)
app.use(router)
 
// 新增代码：注册特定组件
app.use(ElementPlus)

app.mount('#app')
