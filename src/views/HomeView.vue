<template>
  <div>
    <h2>Home View</h2>
    <button class="btn btn-primary" @click="goToAbout()"> About 으로 이동</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
console.log('route.path: ', route.path)  
console.log('route.name: ', route.name)
const router = useRouter()
const goToAbout = () => router.push('/about')

</script>

<style lang="scss" scoped>

</style>