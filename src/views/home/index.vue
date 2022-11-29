<template>
  <p class="homeHeight">this is home page</p>
  <button @click="go">Go</button>
  <button @click="add">Add</button>
  <p @click="changeMsg">{{ msg }}</p>
</template>

<script lang='ts'>
import router from '@/router'
import { ref } from 'vue'
import { watch } from '@vue/runtime-core';
// import i18n from '@/i18n' i18n.global.t
import { useI18n } from 'vue-i18n'
export default {
  setup() {
    const { t } = useI18n()
    let msg = ref('login')
    let nums = ref(0)
    const go = () => {
      router.push('/echarts-notes')
    }
    const add = () => {
      nums.value = nums.value++
    }
    const changeMsg = () => {
      msg.value = t('common.login')
    }
    watch(nums, (newValue, old) => {
      console.log('nums改变', newValue, old)

    });
    return {
      msg,
      nums,
      go,
      add,
      changeMsg
    }
  },
};
</script>
<style scoped>
.homeHeight {
  height: 500px;
}
</style>
