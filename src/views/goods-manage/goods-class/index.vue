<template>
    <p class="title">this is goods class</p>
    <button @click="back">返回</button>
</template>
import { router } from '@/router'
<script lang="ts">
import router from '@/router'
export default {
    setup() {
        const back = () => {
            router.push('/')
        };
        return {
            back
        }
    }
}
</script>

<style scoped>
.title {
    background-color: brown;
}
</style>