<script setup>
import Loader from "./Loader.vue"
import ButtonBack from "./ButtonBack.vue"
import TextErr from "./TextErr.vue"

import { ref, watch } from "vue"
import { useRouter } from "vue-router"

import { useFetchPost } from "../utils/fetchPost.js"
import { useClientStore } from "../stores/client.js"

const tel=ref("")
const password=ref("")
const passwShow=ref(false)
const load=ref(false)
const textErr=ref(null)
const router=useRouter()
const storeClient=useClientStore(
)

watch(load,
async (newValue, oldValue) => {
const {answer, error}=await useFetchPost("https://shopnode.vercel.app/api/login", {
tel: tel.value,
password: password.value
})
if (answer.value) {
storeClient.addClient(answer.value.ans)
router.push("/lk")
}
else {
textErr.value=error.value
load.value=false
setTimeout(() => {
textErr.value=null
}, 3000)
}
})

</script>

<template>
<div class="w-full h-full flex justify-center items-center">

<form class="flex flex-col justify-around items-stretch border border-[#ffbc0a] rounded-lg mx-2 my-8 p-2 lg:w-sm" @submit.prevent="load=true">

<h2 class="text-center text-2xl 2xl:text-3xl text-[#ffbc0a] relative p-2 mb-4">
<ButtonBack/>
Вход
</h2>

<label class="m-2 xl:text-lg">Логин</label>
<input type="tel" v-model="tel" class="border border-[#ffbc0a] m-2 p-2 rounded-lg xl:text-lg focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="89\d{9}" placeholder="89000000000">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Введите корректный номер телефона</p>

<label class="m-2 xl:text-lg">Пароль</label>

<span class="relative m-2">

<input :type="!passwShow ? 'password' : 'text'" v-model="password" class="border border-[#ffbc0a] p-2 rounded-lg xl:text-lg focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2" pattern=".{8,}">

<button class="absolute top-0 right-0 text-slate-500 p-2 text-lg xl:text-xl" @click="passwShow=!passwShow" type="button">
<font-awesome-icon v-if="!passwShow" icon="fa-solid fa-eye"/>
<font-awesome-icon v-if="passwShow" icon="fa-solid fa-eye-slash"/>
</button>

</span>

<button class="mx-2 my-3 p-2 rounded-lg bg-[#ffbc0a] text-white hover:bg-[#f45608] transition duration-500 ease-in xl:text-lg" :disabled="load">
<Loader :load="load"/>
{{!load ? "Войти" : ""}}
</button>

<RouterLink to="/reg" class="mx-2  mb-3 p-2 rounded-lg border border-[#ffbc0a] text-[#ffbc0a] hover:border-[#f45608] hover:text-[#f45608] text-center transition duration-500 ease-in xl:text-lg">Регистрация</RouterLink>

<TextErr v-if="textErr" :text="textErr"/>

</form>

</div>
</template>

<style scoped></style>
