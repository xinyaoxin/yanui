<template>
  <p class="title">this is goods class</p>
  <img src="../../../assets/d.jpg" alt="" />
  <button @click="back">返回</button>
  <p @click="change">点击查看isPopoverasd</p>
  <div v-if="isPopover">显示弹窗{{ elName }}</div>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, computed } from "vue";
import router from "@/router";
import { Object3D } from "three";
import { ThreeEngine } from "@/utils/three/TEngine";
import { basicObjectList } from "@/utils/three/TBasicObject";
import { lightsList } from "@/utils/three/TLights";
import { helperList } from "@/utils/three/THelper";
import { codeModelList } from "@/utils/three/TCodeModel";
import { framePromise } from "@/utils/three/TLoaderModel";
import { fbxFramePromise } from "@/utils/three/TLoaderModel";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let isPopover =  computed(()=>ref(store.state.user.isPopover).value)
    let elName =  computed(()=>ref(store.state.user.elName).value)
    console.log('***123',isPopover.value)
    //获取dom
    const threeTarget = ref(null);
    const back = () => {
      router.push("/");
    };
    const TE = ref();
    onMounted(() => {
      TE.value = new ThreeEngine(threeTarget.value!);
      TE.value.addObject(...basicObjectList);
      TE.value.addObject(...lightsList);
      TE.value.addObject(...helperList);
      // TE.addObject(...codeModelList);
      fbxFramePromise.then((group) => {
        const model = group;
        model.rotation.x = (Math.PI / 180) * 2;
        TE.value.addObject(model);
        console.log("####group", group);
      });

      // framePromise.then((group) => {
      //   const model = group.scene;
      //   TE.value.addObject(model);
      //   console.log("####group2", group);
      // });
    });
    const change = () => {
      console.log(isPopover.value);
    };

    return {
      change,
      TE,
      back,
      threeTarget,
      isPopover,
      elName
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