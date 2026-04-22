<script setup>
import Loader from "./Loader.vue"
import ButtonBack from "./ButtonBack.vue"
import TextErr from "./TextErr.vue"

import { ref, computed, watch, onMounted } from "vue"
import { useRouter } from "vue-router"

import { useCartStore } from "../stores/cart.js"
import { useClientStore } from "../stores/client.js"
import { useFetchPost } from "../utils/fetchPost.js"

const tel=ref("")
const email=ref("")
const address=ref("")
const delivery=ref("Самовывоз")
const pay=ref("Наличные")
const sumCart=ref(0)
const bonus=ref(false)
const order=ref(null)
const load=ref(false)
const textErr=ref(null)
const router=useRouter()
const storeCart=useCartStore()
const storeClient=useClientStore()
const sumDel=computed(() => {
return delivery.value=="Курьер" ? 500 : 0
})

function useBonus() {
sumCart.value-=storeClient.client.bonus
storeClient.client.bonus=0
bonus.value=true
}

function createOrder() {
order.value={
cart: storeCart.cart,
userid: storeClient.client.id,
tel: tel.value,
email: email.value,
address: address.value,
delivery: delivery.value,
pay: pay.value,
sumDel: sumDel.value,
bonus: bonus.value,
total: sumCart.value+sumDel.value
}
load.value=true
}

watch(order,
async (newValue, oldValue) => {
const {answer, error}=await useFetchPost("https://shopnode.vercel.app/api/addOrder", order.value)
if (answer.value) {
storeCart.cart.length=0
localStorage.removeItem("cart")
storeClient.client.bonus=answer.value.bonus
router.push("/order/"+answer.value.numOrder)
}
else {
textErr.value=error.value
load.value=false
}
})

onMounted(() => {
tel.value=storeClient.client.tel
email.value=storeClient.client.email
sumCart.value=storeCart.sumCart
})
</script>

<template>
<h2 class="text-2xl 2xl:text-3xl text-center text-[#ffbc0a] my-6 p-2 relative">
<ButtonBack/>
Оформление заказа
</h2>

<form @submit.prevent="createOrder" class="p-2 w-full md:w-[50%] xl:text-lg">

<label class="inline-block w-full
md:w-[48%] py-2">Контактный телефон
<span class="inline-block px-1 text-red-500">*</span>
</label>
<input type="tel" v-model="tel" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="89\d{9}">

<p class="mt-2 px-2 hidden peer-user-invalid:blick text-red-500 text-sm">Введите корректный номер телефона</p>

<label class="inline-block w-full
md:w-[48%] py-2">Контактный email</label>
<input type="email" v-model="email" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%]" pattern="([-\.\w]+@([\w-]+\.)+[\w-]+)?">

<fieldset class="border-0 my-4">
<legend class="text-[#ec7d10]pl-4 py-4">Оплата</legend>

<label class="p-2 pr-5 inline-block m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a]">
<input type="radio" v-model="pay" value="Наличные" class="invisible">Наличные
</label>

<label class="p-2 pr-5 inline-block m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a]">
<input type="radio" v-model="pay"
value="Карта" class="invisible">Карта
</label>
</fieldset>

<fieldset class="border-0 my-4">
<legend class="text-[#ec7d10]pl-4
py-4">Доставка</legend>

<label class="p-2 pr-5 inline-block m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a]">
<input type="radio" v-model="delivery" value="Самовывоз" class="invisible">Самовывоз
</label>

<label class="p-2 pr-5 inline-block m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a]">
<input type="radio" v-model="delivery" value="Курьер" class="invisible">Курьер (500руб.)
</label>
</fieldset>

<label v-if="delivery=='Курьер'" class="inline-block py-2 w-full md:w-[48%] lg:text-right my-2">Адрес доставки</label>
<input v-if="delivery=='Курьер'" type="text" v-model="address" class="my-2 p-2 border border-[#ffbc0a] rounded-lg w-full lg:w-[#48%] user-invalid:border-2 user-invalid:border-red-500" required>

<div>

<h3 class="font-bold px-2 py-6">Сумма заказа</h3>

<p class="p-2">Подитог: {{sumCart}}</p>

<p class="p-2">Баланс бонусов: {{storeClient.client.bonus}}
<button @click="useBonus" type="button" class="ml-1 mt-2 py-2 px-4 text-white bg-[#ffbc0a] hover:bg-[#ec7d10] rounded-lg transition duration-500 ease-in">Использовать бонусы</button>
</p>

<p class="p-2">Стоимость доставки: {{sumDel}}</p>

<p class="p-2">Итог: {{sumCart+sumDel}}</p>
</div>

<button class="block my-6 mx-auto py-2 w-3xs bg-[#ec7d10] hover:bg-[#f45608] text-white text-center rounded-lg transition duration-500 ease-in">
<Loader :load="load"/>
{{!load ? "Оформить" : ""}}
</button>

<TextErr v-if="textErr" :text="textErr"/>

</form>
</template>

<style scoped></style>
