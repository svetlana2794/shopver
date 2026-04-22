<script setup>
import Loader from "./Loader.vue"
import ButtonBack from "./ButtonBack.vue"
import TextErr from "./TextErr.vue"

import { ref, watch } from "vue"
import { useRoute } from "vue-router"

import { useFetch } from "../utils/fetch.js"

const orderData=ref(null)
const textErr=ref(null)
const route=useRoute()

watch(() => route.params,
async (newValue, oldValue) => {
const {answer, error}=await useFetch("https://shopnode.vercel.app/api/order/"+route.params.id)
if (answer.value) {
orderData.value=answer.value
}
else {
textErr.value=error.value
}
}, {
immediate: true,
deep: true
})
</script>

<template>
<h2 class="p-2 text-2xl 2xl:text-3xl text-center text-[#ffbc0a]">
<ButtonBack/>
Информация о заказе
</h2>

<TextErr v-if="textErr" :text="textErr"/>

<div v-else-if="orderData" class="p-2 w-full md:w-xs md:mx-auto my-4 xl:text-lg">

<p class="py-2">Дата: {{orderData.date}}</p>
<p class="py-2">Статус: {{orderData.status}}</p>
<p class="py-2">Способ оплаты: {{orderData.pay}}</p>
<p class="py-2">Способ доставки: {{orderData.delivery}}</p>

<h3 class="font-bold text-lg m-2">Состав заказа</h3>

<div v-for="elem in orderData.cart" class="my-4">
<img :src="elem.img" class="size-16 lg:size-24">
<p class="py-2 font-bold">{{elem.name}}</p>
<p class="py-2">Цена: {{elem.price}}</p>
<p class="py-2">Количество: {{elem.quantity}}</p>
<p class="py-2">Сумма: {{elem.price*elem.quantity}}</p>
</div>

<p v-show="orderData.address" class="py-2">Адрес доставки: {{orderData.address}}</p>
<p class="py-2">Стоимость доставки: {{orderData.sumDel || 0}} руб.</p>
<p class="py-2">Использованы бонусы: {{orderData.bonus ? "да" : "нет"}}</p>
<p class="py-2">Сумма заказа: {{orderData.total}}</p>
<RouterLink to="/lk" class="text-center bg-[#ffbc0a] hover:bg-[#f69d0d] text-white block my-4 mx-auto p-2 w-3xs rounded-lg transition duration-500 ease-in">Вернуться в личный кабинет</RouterLink>

</div>

<Loader v-else :load="true" class="text-6xl md:text-9xl text-[#f69d0d] mt-10 mx-auto block text-center"/>
</template>

<style scoped></style>
