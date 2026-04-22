<script setup>
import Loader from "./Loader.vue"
import ButtonBack from "./ButtonBack.vue"
import TextErr from "./TextErr.vue"

import { ref, watch, useTemplateRef, computed } from "vue"
import { useRoute } from "vue-router"

import { useCartStore } from "../stores/cart.js"
import { useFetch } from "../utils/fetch.js"

const quantity=ref(1)
const size=ref("")
const win=ref(false)
const product=ref(null)
const textErr=ref(null)
const route=useRoute()
const storeCart=useCartStore()
const image=useTemplateRef()

const inCart=computed(() => {
let prod=storeCart.cart.find(elem => elem.id==product.value.id)
return prod ? true : false
})

function addProduct() {
if (size.value) {
let elem={
id: product.value.id,
name: product.value.name,
quantity: quantity.value,
price: product.value.promo || product.value.price,
img: image.value.src,
size: size.value
}
storeCart.addCart(elem)
} else {
win.value=true
setTimeout(() => {
win.value=false
}, 2000)
}
}

watch(() => route.params,
async (newValue, oldValue) => {
const {answer, error}=await useFetch("https://shopnode.vercel.app/api/product/"+route.params.id)
product.value=answer.value
textErr.value=error.value
}, {
immediate: true,
deep: true
})
</script>

<template>
<TextErr v-if="textErr" :text="textErr"/>

<div v-else-if="product" class="flex justify-around flex-col md:flex-row items-center md:items-start relative">

<ButtonBack class="text-lg text-[#ffbc0a]"/>

<div class="my-4">

<figure class="mx-auto w-3xs lg:w-sm">
<img :src="product.img[0]" class="border border-[#ffbc0a] w-full lg:hover:scale(2) origin-top-left" ref="image">
<figcaption class="text-sm text-slate-400">Наведите на изображение для увеличения</figcaption>
</figure>

<div v-if="product.img.length>1" class="w-3xs mx-auto">
<button v-for="img in product.img" @click="image.src=img" class="border border-black w-8 h-8 rounded-[50%] m-2" :style="{backgroundColor: img.match(/.+\d-(\w+)\.webp/)[1]}"></button>
</div>

</div>

<div class="xl:text-lg">
<h2 class="font-bold m-2">{{product.name}}</h2>

<p class="p-2">
<span v-if="product.promo" class="font-bold text-[#fc2f00] m-2">{{product.promo}}</span>

<span :class="[product.promo && 'line-through', 'm-2']">{{product.price}}</span>
</p>

<span class="p-2">
<button @click="quantity==1 ? 1 : quantity--" class="hover:text-[#ffbc0a]" :disabled="inCart">
<font-awesome-icon icon="fa-solid fa-minus"/>
</button>
{{quantity}}
<button @click="quantity++" class="hover:text-[#ffbc0a]" :disabled="inCart">
<font-awesome-icon icon="fa-solid fa-plus"/>
</button>
</span>

<select v-model="size" class="border border-[#ffbc0a] rounded-lg p-4 w-3xs mx-2">
<option class="p-2" disabled value="">Выберите размер</option>
<option class="p-2" v-for="size in product.size">{{size}}</option>
</select>

<button class="text-white bg-[#f69d0d] hover:bg-[#ec7d10] disabled:bg-[#f45608] p-2 rounded-xl block w-3xs text-center my-8 mx-auto" :disabled="inCart" @click="addProduct">{{inCart ? "Товар добавлен" : "В корзину"}}</button>

<div v-show="win" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-xs py-y border border-red-500 rounded-lg text-red-500 text-center xl:text-lg p-4 bg-white">Выберите размер</div>

<p v-show="inCart" class="text-slate-400 text-sm text-center">Изменить количество можно в корзине</p>

<table class="border-spacing-4 m-2">
<caption class="border-b-2 border-[#ffbc0a] p-4 text-left">Информация о товаре</caption>
<tbody>
<tr>
<td class="p-2 w-[100px]">Страна:</td><td class="p-2 w-[100px]">{{product.country}}</td>
</tr>
<tr>
<td class="p-2 w-[100px]">Сезон:</td><td class="p-2 w-[100px]">{{product.season}}</td>
</tr>
<tr>
<td class="p-2 w-[100px]">Материал:</td><td class="p-2 w-[100px]">{{product.structure}}</td>
</tr>
</tbody>
</table>
</div>

</div>

<Loader v-else :load="true" class="block text-6xl md:text-9xl text-[#f69d0d] text-center mt-10"/>
</template>

<style scoped></style>
