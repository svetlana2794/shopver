<script setup>
import { useRouter } from "vue-router"

const router=useRouter()
</script>

<template>
<h2 class="text-4xl text-center mt-10 font-bold">Страница не найдена</h2>

<button @click="router.go(-1)" class="block mt-10 mx-auto py-2 w-3xs bg-[#f69d0d] text-white text-center text-xl">Назад</button>
</template>

<style scoped></style>
