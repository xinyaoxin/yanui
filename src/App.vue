<template>
  <router-view />
</template>
<script lang="ts">
import { watch } from '@vue/runtime-core'
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from 'vue-router'
export default {
  //监听路由变化修改title
  setup() {
    const route = useRoute()
    const a: number = 0
    console.log('this is setup')
    // onBeforeRouteUpdate((to: any) => {
    //   debugger
    //   console.log('路由变化', to)
    // })
    // onBeforeRouteLeave((to, from) => {
    //   const answer = window.confirm('你确定离开当前页面吗？')
    //   if (!answer) {
    //     return false;
    //   }
    // })
    watch(() => route.path, (newPath, oldPtah) => {
      console.log('路由信息变化', newPath, oldPtah)
    }, { immediate: true })

    return {
      a,
      onBeforeRouteUpdate
    }
  }
}
</script>
<style lang='scss'>
//纯净基本样式
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>