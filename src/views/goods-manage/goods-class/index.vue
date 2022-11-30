<template>
  <p class="title">this is goods class</p>
  <button @click="back">返回</button>
  <div class="three-canvas" ref="threeTarget"></div>
</template>
import { router } from '@/router'
<script lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import { ThreeEngine } from "@/utils/Tengine";
export default {
  setup() {
      //获取dom
    const threeTarget = ref(null);
    const back = () => {
      router.push("/");
    };
    onMounted(() => {
      const TE = new ThreeEngine(threeTarget.value!);
    });
    return {
      back,
      threeTarget
    };
  },
};
</script>

<style scoped>
.title {
  background-color: brown;
}
.three-canvas{
    width: 100%;
    height: 600px;
    background-color: rgb(162, 215, 199);
}
</style>