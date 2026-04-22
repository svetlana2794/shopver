<script setup>
import Search from "./Search.vue"

import { useClientStore } from "../stores/client.js"

const storeClient=useClientStore()
</script>

<template>
<header>

<h1 class="p-2 pb-0 flex justify-between">

<RouterLink to="/" class="font-[Tilda_Script] text-5xl xl:text-6xl 2xl:text-9xl text-[#ffbc0a] py-3">
Fashion
</RouterLink>

<div class="text-[#f69d0d] text-4xl">

<RouterLink to="/login" v-show="!storeClient.auth" class="p-2 inline-block hover:text-[#f45608] transition duration-500 ease-in">
<font-awesome-icon icon="fa-solid fa-user"/>
</RouterLink>

<RouterLink to="/lk" v-show="storeClient.auth" class="p-2 inline-block hover:text-[#f45608] transition duration-500 ease-in">{{storeClient.client?.name || ""}}</RouterLink>

<RouterLink to="/cart" class="p-2 inline-block hover:text-[#f45608] transition duration-500 ease-in">
<font-awesome-icon icon="fa-solid fa-shopping-cart"/>
</RouterLink>

</div>

</h1>

<div class="flex flex-col md:flex-row items-stretch relative">

<RouterLink to="/catalog" class="m-2 px-4 py-2 xl:text-lg rounded-lg text-white text-center  bg-[#f69d0d] hover:bg-[#f45608] transition duration-500 ease-in">
В КАТАЛОГ
<font-awesome-icon icon="fa-solid fa-arrow-right"/>
</RouterLink>

<Search/>

</div>

</header>
</template>

<style scoped></style>
