<template>
  <p class="title">this is goods class</p>
  <img src="../../../assets/d.jpg" alt="" />
  <button @click="back">返回</button>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import { ThreeEngine } from "@/utils/three/TEngine";
import { basicObjectList } from "@/utils/three/TBasicObject";
import { lightsList } from "@/utils/three/TLights";
import { helperList } from "@/utils/three/THelper";
import { codeModelList } from "@/utils/three/TCodeModel";
import { framePromise } from "@/utils/three/TLoaderModel";
export default {
  setup() {
    //获取dom
    const threeTarget = ref(null);
    const back = () => {
      router.push("/");
    };
    onMounted(() => {
      const TE = new ThreeEngine(threeTarget.value!);
      // TE.addObject(...basicObjectList);
      TE.addObject(...lightsList);
      TE.addObject(...helperList);
      // TE.addObject(...codeModelList);
      framePromise.then((group) => {
         const model = group.scene
        TE.addObject(model)
      });
    });
    return {
      back,
      threeTarget,
    };
  },
};
</script>

<style scoped>
.title {
  background-color: brown;
}

.three-canvas {
  width: 100%;
  height: 600px;
  /* background-color: rgb(162, 215, 199); */
}
</style>