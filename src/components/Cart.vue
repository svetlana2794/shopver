<script setup>
import ButtonBack from "./ButtonBack.vue"

import { useCartStore } from "../stores/cart.js"

const storeCart=useCartStore()
</script>

<template>
<h2 class="text-2xl 2xl:text-3xl text-center text-[#ffbc0a] mb-8 relative p-2">
<ButtonBack/>
Корзина
</h2>

<p v-if="storeCart.cart.length==0" class="xl:text-lg text-center py-4">В корзине пока пусто</p>

<ul v-else class="m-2 xl:text-lg">
<li v-for="elem in storeCart.cart" :key="elem.id" class="p-2 relative">
<img :src="elem.img" class="size-16 lg:size-24 ml-2">

<div class="inline xl:text-lg">
<p class="p-2 font-bold">{{elem.name}}</p>
<p class="p-2">Размер: {{elem.size}}</p>
<p class="p-2">Цена: {{elem.price}}</p>
<p class="p-2">Количество:
<button @click="elem.quantity==1 ? 1 : elem.quantity--" class="hover:text-[#ffbc0a] transition duration-500 ease-in">
<font-awesome-icon icon="fa-solid fa-minus"/>
</button>
{{elem.quantity}}
<button @click="elem.quantity++" class="hover:text-[#ffbc0a] transition duration-500 ease-in">
<font-awesome-icon icon="fa-solid fa-plus"/>
</button>
</p>
<p class="p-2">Сумма: {{elem.price*elem.quantity}} руб.</p>
<button class="p-2 absolute top-0 right-0 hover:text-[#f69d0d] transition duration-500 ease-in" @click="storeCart.removeProduct(elem.id)">
<font-awesome-icon icon="fa-solid fa-xmark"/>
</button>
</div>
</li>
</ul>

<p v-show="storeCart.cart.length>0" class="font-bold xl:text-lg my-6 mx-2">Итого: {{storeCart.sumCart}} руб.</p>

<RouterLink v-show="storeCart.cart.length>0" to="/order" class="py-2  block my-6 mx-auto bg-[#ec7d10] text-white xl:text-lg text-center hover:bg-[#f45608] w-3xs rounded-lg transition duration-500 ease-in">Оформить заказ</RouterLink>
</template>

<style scoped></style>
