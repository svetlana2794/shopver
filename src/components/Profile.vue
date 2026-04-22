<script setup>
import ButtonBack from "./ButtonBack.vue"

import { ref, watch } from "vue"
import { useRouter } from "vue-router"

import { useFetch } from "../utils/fetch.js"
import { useCartStore } from "../stores/cart.js"
import { useClientStore } from "../stores/client.js"

const orders=ref(null)
const router=useRouter()
const storeCart=useCartStore()
const storeClient=useClientStore()

function logout() {
storeCart.cart.length=0
storeClient.client=null
storeClient.auth=false
localStorage.clear()
router.push("/login")
}

watch(orders,
async (newValue, oldValue) => {
const {answer, error}=await useFetch("https://shopnode.vercel.app/api/orders/"+storeClient.client.id)
if (answer.value) {
orders.value=answer.value
}
},
{
immediate: true,
ince: true
})
</script>

<template>
<h2 class="text-center text-[#ffbc0a] text-2xl 2xl:text-3xl relative my-4 mx-2 p-2">
<ButtonBack/>
Профиль
<RouterLink to="/settings" class="top-2 right-2 absolute hover:text-[#f69d0d] transition duration-500 ease-in">
<font-awesome-icon icon="fa-solid fa-gear"/>
</RouterLink>
</h2>

<p class="ml-10 my-8 xl:text-lg">Баланс бонусов: {{storeClient.client.bonus}}</p>

<h3 class="text-center text-[#ffbc0a] text-xl my-8">Моя корзина</h3>
<p class="text-center my-8 xl:text-lg">Товаров в корзине: {{storeCart.cart.length}}</p>

<RouterLink to="/cart" class="block my-4 mx-auto py-2 w-3xs text-center text-white bg-[#ffbc0a] hover:bg-[#ec7d10] xl:text-lg transition duration-500 ease-in rounded-lg">Перейти в корзину</RouterLink>

<h3 class="text-center text-[#ffbc0a] text-xl my-8">Мои заказы</h3>

<p v-if="orders.length==0" class="text-center my-8 xl:text-lg">У вас пока нет заказов</p>

<ul v-else class="xl:text-lg">
<li v-for="order in orders" class="p-2" :key="order.id">
<p class="p-2">Номер заказа: {{order.id}}</p>
<p class="p-2">Дата заказа: {{order.date}}</p>
<p class="p-2">Статус заказа: {{order.status}}</p>
<p class="p-2">Сумма заказа: {{order.total}}</p>
<button @click="router.push('/order/'+order.id)" class="inline-block my-2 ml-2 p-2 bg-[#ffbc0a] hover:bg-[#ec7d10] text-white transition duration-500 ease-in rounded-lg">Подробнее</button>
</li>
</ul>

<button @click="logout" class="block w-3xs py-2 mb-4 mt-8 mx-auto text-center text-white bg-[#ffbc0a] hover:bg-[#f69d0d] transition duration-500 ease-in xl:text-lg rounded-lg">Выход</button>
</template>

<style scoped></style>
