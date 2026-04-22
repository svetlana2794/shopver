<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"

import { useFetch } from "../utils/fetch.js"

const search=ref("")
const list=ref([])
const router=useRouter()

function showProduct(id) {
router.push('/product/'+id)
search.value=""
list.value.length=0
}

watch(search, async (newValue, oldValue) => {
if (newValue.length>0) {
let url=new URL("https://shopnode.vercel.app/api/search")
url.searchParams.append("clothes", search.value)
const {answer}=await useFetch(url)
list.value=answer.value
}
})
</script>

<template>
 <input type="search" v-model="search" placeholder="Поиск" class="border border-[#ffbc0a] m-2 py-2 px-4 rounded-full lg:w-sm xl:text-lg">

<ul v-show="search.length>0" class="absolute w-full lg:w-sm h-[300px] overflow-auto z-50 top-full bg-white xl:text-lg">
<li v-for="elem in list" :key="elem.id" @click="showProduct(elem.id)" class="flex items-center hover:bg-[#f45608] transition duration-500 ease-in hover:text-white">
<img :src="elem.img[0]" class="size-16 m-2">
<span class="m-2">{{elem.name}}</span>
</li>
</ul>
</template>

<style scoped></style>
