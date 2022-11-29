<template>
  <p>this is echarts-notes</p>
  <button @click="bacTokHome">返回</button>
</template>
<script lang="ts">
import { reactive, ref, computed, getCurrentInstance, onMounted } from "vue";
import router from '@/router';

export default {
  setup() {
    let instance: any;
    let _this: any;
    const initThis = () => {
      instance = getCurrentInstance();
    };
    onMounted(() => {
      initThis();
      if (instance !== null) {
        _this = instance.appContext.config.globalProperties; //vue3获取当前this
      }
    });
    const bacTokHome = () => {
      router.push("/goodsclass");
    };
    return {
        bacTokHome
    }
  },
};
</script>
