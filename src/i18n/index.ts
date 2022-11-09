/**
 * npm i vue-i18n
 * 配置i18n文件夹
 * 增加语言包
 * 在main.js中引入并使用
 * html中{{ $t("common.login") }}
 * script中 $t('month')
 * 获取本地语言window.navigator.language
 * window.localStorage.getItem('loacle')(使用失败获取结果为null)
 */


import { createI18n } from 'vue-i18n'

import zh from './zh'
import en from './en'
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: window.navigator.language || 'zh',
    messages: {
        zh,
        en
    }
})

export default i18n