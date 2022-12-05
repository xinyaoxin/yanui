<template>
  <p class="title">this is goods class</p>
  <img src="../../../assets/d.jpg" alt="" />
  <button @click="back">返回</button>
  <p @click="change">点击查看isPopoverasd</p>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="el-titile">零件详情</span>
      </div>
    </template>
    <!-- <div v-for="item in tableData" :key="item.name" class="text item">{{ item.name}}</div> -->
    <div class="item">零件名称: {{ modelName }}</div>
    <div class="item">展现方式:
      <el-button class="operate" @click="handleOnlyShow">独显</el-button>
      <el-button class="operate" @click="handleHide">隐藏</el-button>
      <el-button class="operate" @click="handleShow">全部展示</el-button>
    </div>
  </el-card>

  <!-- <div id="name" style="position: absolute;color: #f09c3b;font-size: 18px;" v-if="isPopover"
    :style="{ left: left + 180 + 'px', top: top - 24 + 'px' }"><span>{{ modelName }}</span></div>
  <div v-cloak style="position: absolute;pointer-events:none;" v-if="isPopover"
    :style="{ left: left + 'px', top: top + 'px' }">
    <img src="@/assets/1.png" alt="" style="" width="250">
  </div> -->
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, computed } from "vue";
import router from "@/router";
import { Mesh, Object3D, MeshPhongMaterial,MeshPhysicalMaterial, Color } from "three";
import { ThreeEngine } from "@/utils/three/TEngine";
import { basicObjectList } from "@/utils/three/TBasicObject";
import { lightsList } from "@/utils/three/TLights";
import { helperList } from "@/utils/three/THelper";
import { codeModelList } from "@/utils/three/TCodeModel";
import { framePromise } from "@/utils/three/TLoaderModel";
import { fbxFramePromise } from "@/utils/three/TLoaderModel";
import { useStore } from "vuex";
import { enumBooleanMember } from "@babel/types";

export default {
  setup() {
    const store = useStore();
    let isPopover = computed(() => ref(store.state.user.isPopover).value)
    let modelName = computed(() => ref(store.state.user.elName).value)
    let left = computed(() => ref(store.state.user.position.left).value)
    let top = computed(() => ref(store.state.user.position.top).value)
    console.log('***123', isPopover.value)
    //获取dom
    const threeTarget = ref(null);
    const back = () => {
      router.push("/");
    };
    const TE = ref();
    let model: Object3D
    onMounted(() => {
      TE.value = new ThreeEngine(threeTarget.value!);
      TE.value.addObject(...basicObjectList);
      TE.value.addObject(...lightsList);
      TE.value.addObject(...helperList);
      // TE.addObject(...codeModelList);
      fbxFramePromise.then((group) => {
        model = group;
        model.rotation.x = (Math.PI / 180) * 2;
        model.traverse((object) => {
          if (object.type === 'Mesh') {
            // MeshArr.push(object);
            (object as Mesh).material = new MeshPhysicalMaterial({
              color:((object as Mesh).material as MeshPhysicalMaterial).color,
              metalness: 1.0,
              roughness: 0.6,
            });
            ((object as Mesh).material as any).selfColor = new Color().copy(((object as Mesh).material as MeshPhysicalMaterial).color)
          }
        })
        TE.value.addObject(model);
        console.log(model);
      });

      // framePromise.then((group) => {
      //   const model = group.scene;
      //   TE.value.addObject(model);
      //   console.log("####group2", group);
      // });
    });
    const change = () => {
      console.log(store.state.user.position.left);
    };
    const handleHide = () => {
      const name = store.state.user.elName
      console.log(store.state.user.id, model)
      model.children[0].children.forEach((item) => {
        if (item.name === name) {
          ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = false
          console.log('隐藏')
        }
        // console.log(item)
      })
    };
    const handleOnlyShow = () => {
      const name = store.state.user.elName
      console.log(store.state.user.id, model)
      model.children[0].children.forEach((item) => {
        if (item.name !== name) {
          ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = false
          console.log('隐藏')
        }
        // console.log(item)
      })
      console.log('独显');
    };
    const handleShow = () => {
      model.children[0].children.forEach((item) => {
        ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = true
      })
    };

    return {
      change,
      TE,
      back,
      threeTarget,
      isPopover,
      modelName,
      left,
      top,
      handleOnlyShow,
      handleHide,
      handleShow
    };
  },
};
</script>

<style scoped lang="scss">
.title {
  background-color: brown;
}

.three-canvas {
  width: 100%;
  height: 600px;
  /* background-color: rgb(162, 215, 199); */
}

.box-card {
  width: 250px;
  height: 200px;
  position: absolute;
  right: 20px;
  opacity: 0.8;

  .card-header {
    text-align: center;
  }

  .item {
    margin-bottom: 10px;

    .operate {
      text-align: center;
      width: 50px;
    }
  }
}
</style>