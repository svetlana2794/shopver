<script setup>
import { useRouter } from "vue-router"

const {product}=defineProps(["product"])

const router=useRouter()
</script>

<template>
<div class="w-2xs 2xl:w-sm m-3 p-4 border border-[#ffbc0a] xl:text-lg relative">

<div v-if="product.hit" class="absolute -top-2 -left-2 -rotate-30 size-16 rounded-full bg-red-500 text-white font-bold text-xl flex justify-center items-center anim-hit">ХИТ</div>

<div v-if="product.newly" class="absolute -top-2 -right-2 rotate-30 size-16 rounded-full bg-lime-500 text-white font-bold text-xl flex justify-center items-center anim-new">NEW</div>

<img :src="product.img[0]" class="w-3xs 2xl:w-xs">

<p class="flex m-2" v-if="product.img.length>1">
<span v-for="(img, index) in product.img" :key="index" class="inline-block rounded-[50%] w-8 h-8 m-2 border border-black" :style="{backgroundColor: img.match(/.+\d-(\w+)\.webp/)[1]}"></span>
</p>

<p>
<span v-if="product.promo" class="text-[#fc2f00] text-xl font-bold p-2">{{product.promo}}</span>
<span :class="[product.promo && 'line-through', 'p-2']">{{product.price}}</span>
</p>

<p class="p-2">{{product.name}}</p>

<button @click="router.push('/product/'+product.id)" class="p-2 rounded-lg bg-[#f45608] text-white text-center w-full">Подробнее</button>
</div>
</template>

<style scoped>
@keyframes hit {
0%, 25% {
transform: scale(1.5);
}
}

@keyframes new {
75%, 100% {
transform: scale(1.5);
}
}

.anim-hit {
text-shadow: 0 0 10px #c20000;
animation-name: hit;
animation-duration: 1s;
animation-timing-function: ease-in;
animation-iteration-count: infinite;
animation-direction: alternate;
}

.anim-new {
text-shadow: 0 0 10px #64b000;
animation-name: new;
animation-duration: 1s;
animation-timing-function: ease-in;
animation-iteration-count: infinite;
animation-direction: alternate;
}
</style>
