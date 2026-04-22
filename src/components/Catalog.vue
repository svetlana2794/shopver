<script setup>
import Filter from "./Filter.vue"
import ProductCard from "./ProductCard.vue"
import Loader from "./Loader.vue"
import TextErr from "./TextErr.vue"

import { ref, watchEffect, onUnmounted } from "vue"
import { useRoute } from "vue-router"

import { useCatalogStore } from "../stores/catalog.js"
import { useFetch } from "../utils/fetch.js"

const catalog=ref(null)
const textErr=ref(null)
const route=useRoute()
const storeCatalog=useCatalogStore()

watchEffect(
async () => {
let regexp=/.+\/catalog\/(promo|hit|new).*/
if (route.params.promo && !regexp.test(storeCatalog.address)) {
storeCatalog.address+="/"+route.params.promo
}
let url=new URL(storeCatalog.address)
url.searchParams.set("start", storeCatalog.start)
url.searchParams.set("end", storeCatalog.end)
const {answer, error}=await useFetch(url)
catalog.value=answer.value.ans
storeCatalog.size=answer.value.size
textErr.value=error.value
})

onUnmounted(() => {
storeCatalog.address=storeCatalog.address.match(/(.+\/catalog)\/(promo|hit|new).*/)[1]
storeCatalog.start=0
storeCatalog.end=5
})

</script>

<template>

<Filter/>

<TextErr v-if="textErr" :text="textErr"/>

<div v-else-if="catalog" class="flex flex-col md:flex-row md:flex-wrap justify-center md:justify-around content-around items-center">
<ProductCard v-for="product in catalog" :key="product.id" :product="product"/>

<div class="my-4 mx-auto w-xs flex justify-center text-[#ffbc0a] xl:text-lg">

<button class="m-2 p-2 disabled:text-slate-300 hover:text-[#ec7d10]" :disabled="storeCatalog.start==0" @click="storeCatalog.startPage()">
<font-awesome-icon icon="fa-solid fa-angles-left"/>
</button>

<button class="m-2 p-2 disabled:text-slate-300 hover:text-[#ec7d10]" :disabled="storeCatalog.start==0" @click="storeCatalog.prevPage()"><font-awesome-icon icon="fa-solid fa-angle-left"/>
</button>

<span class="m-2 p-2">{{storeCatalog.page}}</span>

<button class="m-2 p-2 disabled:text-slate-300 hover:text-[#ec7d10]" :disabled="storeCatalog.end>=storeCatalog.size" @click="storeCatalog.nextPage()">
<font-awesome-icon icon="fa-solid fa-angle-right"/>
</button>

<button class="m-2 p-2 disabled:text-slate-300 hover:text-[#ec7d10]" :disabled="storeCatalog.end>=storeCatalog.size" @click="storeCatalog.endPage()">
<font-awesome-icon icon="fa-solid fa-angles-right"/>
</button>

</div>

</div>

<Loader v-else :load="true" class="block text-6xl md:text-9xl text-[#f69d0d] text-center mt-10"/>
</template>

<style scoped></style>
