<template>
  <p class="title">this is goods class</p>
  <img src="../../../assets/d.jpg" alt="" />
  <button @click="back">返回</button>
  <p @click="change">点击查看isPopoverasd</p>
  <div id="contextmenu" style="position: absolute" :style="{ left: left + 25 + 'px', top: top + 150 + 'px' }"
    v-if="rightPopover">
    <div class="menu" @click="handleOnlyShow()">独显</div>
    <div class="menu" @click="hideClick()">隐藏</div>
  </div>
  <div id="name" style="position: absolute;color: #f09c3b;font-size: 18px;" v-if="isPopover"
    :style="{ left: left + 180 + 'px', top: top - 24 + 'px' }"><span>{{ modelName }}</span></div>
  <div v-cloak style="position: absolute;pointer-events:none;" v-if="isPopover"
    :style="{ left: left + 'px', top: top + 'px' }">
    <img src="/seraphine/modelc/UI/1.png" alt="" style="" width="250">
  </div>
  <div class="tools">
    <ul>
      <li @click="MaxClick"><i><img src="/seraphine/modelc/UI/最大化4.png" alt="" width="20" height="20"></i></li>
      <li @click="SizeClick"><i><img src="/seraphine/modelc/UI/尺寸5.png" alt="" width="20" height="20"></i></li>
      <li @click="SmallerClick"><i><img src="/seraphine/modelc/UI/缩小.png" alt="" width="20" height="20"></i></li>
      <li @click="GreaterClick"><i><img src="/seraphine/modelc/UI/放大.png" alt="" width="20" height="20"></i></li>
      <li @click="zhengClick"><i><img src="/seraphine/modelc/UI/正视图.png" alt="" width="20" height="20"></i></li>
      <li @click="fuClick"><i><img src="/seraphine/modelc/UI/俯视图.png" alt="" width="20" height="20"></i></li>
      <li @click="ceClick"><i><img src="/seraphine/modelc/UI/侧视图.png" alt="" width="20" height="20"></i></li>
      <li @click="zhouClick"><i><img src="/seraphine/modelc/UI/轴测图.png" alt="" width="20" height="20"></i></li>
      <li @click="viewClick"><i><img src="/seraphine/modelc/UI/显示.png" alt="" width="20" height="20"></i></li>
      <li @click="hideAllClick"><i><img src="/seraphine/modelc/UI/隐藏.png" alt="" width="20" height="20"></i></li>
      <!-- <span @click="helperClick" class="helper">
        <i><img src="/seraphine/modelc/UI/帮助.png" alt="" width="20" height="20"></i>
        <div v-show="helperShow" class="helperContent"> 1.旋转：按住左键不放上下左右拖动，可以旋转整个场景<br><br> 2.缩放：滚动鼠标中键可以缩放模型<br><br>
          3.选中：单击可以选中机械装配体中的一个零件，被选中的零件高亮显示，并弹出名称标签<br><br> 4.交互：通过UI按钮可以和对三维模型进行交互操作，预览模型相关信息<br><br>
          5.右键隐藏显示：在某一个零件上右键可以通过弹窗UI隐藏或显示相关模型<br><br> 6.目录树：左侧目录树可以显示每一个零件，通过目录树可以控制模型</div>
      </span> -->
    </ul>

  </div>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, computed } from "vue";
import router from "@/router";
import { Mesh, Object3D, MeshPhongMaterial, MeshPhysicalMaterial, Color } from "three";
import { ThreeEngine } from "@/utils/three/TEngine";
import { basicObjectList } from "@/utils/three/TBasicObject";
import { lightsList } from "@/utils/three/TLights";
import { helperList } from "@/utils/three/THelper";
import { codeModelList } from "@/utils/three/TCodeModel";
import { framePromise } from "@/utils/three/TLoaderModel";
import { fbxFramePromise } from "@/utils/three/TLoaderModel";
import { useStore } from "vuex";
import { enumBooleanMember } from "@babel/types";
import { pictures } from '@/utils/three/TTexture'

export default {
  setup() {
    const helperShow = ref(false)
    const store = useStore();
    let isPopover = computed(() => ref(store.state.user.isPopover).value)
    let rightPopover = computed(() => ref(store.state.user.rightPopover).value)
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
      console.log('this is pictures', pictures)
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
              color: ((object as Mesh).material as MeshPhysicalMaterial).color,
              metalness: 1.0,
              roughness: 0.6,
              // envMap: pictureTexture
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
    const hideClick = () => {
      const name = store.state.user.elName
      console.log(store.state.user.id, model)
      model.children[0].children.forEach((item) => {
        if (item.name === name) {
          ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = false
        }
      })
    };
    const handleOnlyShow = () => {
      const name = store.state.user.elName
      console.log(store.state.user.id, model)
      model.children[0].children.forEach((item) => {
        if (item.name !== name) {
          ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = false
        }
      })
    };
    const viewClick = () => {
      model.children[0].children.forEach((item) => {
        ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = true
      })
    };
    const zhouClick = () => {

    }
    const ceClick = () => {

    }
    const fuClick = () => {

    }
    const zhengClick = () => {

    }
    const MaxClick = () => {

    }
    const SizeClick = () => {

    }
    const SmallerClick = () => {

    }
    const GreaterClick = () => {

    }

    const hideAllClick = () => {
      const name = store.state.user.elName
      console.log(store.state.user.id, model)
      model.children[0].children.forEach((item) => {
        ((item.children[0] as Mesh).material as MeshPhongMaterial).visible = false
      })
    }

    const helperClick = () => {
      helperShow.value = !helperShow.value
    }

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
      rightPopover,
      pictures,
      viewClick,
      hideClick,
      zhouClick,
      ceClick,
      fuClick,
      zhengClick,
      MaxClick,
      SizeClick,
      SmallerClick,
      GreaterClick,
      hideAllClick,
      helperClick,
      helperShow
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

.tools {
  width: 87.5%;
  height: 70px;
  position: absolute;
  top: 271px;
  background-color: rgb(212, 212, 212);
  opacity: 0.9;
  text-align: center;

  li {
    list-style: none;
    display: inline-block;
    // margin-left: 40px;
    margin: 20px 40px 0 0;
  }

  .helperContent {
    width: 550px;
    height: 330px;
    border-radius: 2%;
    padding: 10px;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(285px,160px);
    text-align: left;
    background-color: white;
  }


}

// .tools:hover {
//   opacity: 1;
//   text-align: center;
//   li{
//     list-style: none;
//     display: inline-block;
//     // margin-left: 40px;
//     margin: 20px 40px 0 0;
//   }
// }

.menu {
  background-color: red;
  opacity: 0.4;
  width: 50px;
  height: 50px;
}
</style>