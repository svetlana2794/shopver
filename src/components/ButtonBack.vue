<script setup>
import { useRouter } from "vue-router"

const router=useRouter()
</script>

<template>
<button @click="router.go(-1)" class="absolute p-2 top-0 left-0 hover:text-[#ec7d10] transition duration-500 ease-in">
<font-awesome-icon icon="fa-solid fa-arrow-left"/>
</button>
</template>

<style scoped></style>
