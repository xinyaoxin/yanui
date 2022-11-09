import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n';

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'

//创建iconfont字体：
//下载至本地加入assets，在mian.js中引用
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.js'

if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)

// 新增代码：注册特定组件
app.use(ElementPlus)

app.mount('#app')
