<script setup>
import Loader from "./Loader.vue"
import ButtonBack from "./ButtonBack.vue"
import TextErr from "./TextErr.vue"

import { ref, watch } from "vue"
import { useRouter } from "vue-router"

import { useClientStore } from "../stores/client.js"
import { useFetchPost } from "../utils/fetchPost.js"

const name=ref("")
const tel=ref("")
const email=ref("")
const password=ref("")
const confirm=ref("")
const passwShow=ref(false)
const confShow=ref(false)
const load=ref(false)
const textErr=ref(null)
const router=useRouter()
const storeClient=useClientStore()
function goReg() {
if (password.value==confirm.value){ load.value=true }
else {
textErr.value="Подтвердите правильно пароль"
setTimeout(() => {
textErr.value=null
}, 2000)
}
}

watch(load,
async (newValue, oldValue) => {
const {answer, error}=await useFetchPost("https://shopnode.vercel.app/api/reg", {
name: name.value,
tel: tel.value,
email: email.value,
password: password.value
})
if (answer.value) {
storeClient.addClient(answer.value.userAns)
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
<h2 class="text-center text-2xl 2xl:text-3xl text-[#ffbc0a] relative p-2">
<ButtonBack/>
Регистрация
</h2>

<form @submit.prevent="goReg" class="p-2 lg:w-[50%] xl:text-lg mx-auto lg:my-4">

<label class="inline-block w-full md:w-[48%] py-2">Имя
<span class="inline-block px-1 text-red-500">*</span>
</label>
<input type="text" v-model="name" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="[A-Za-zА-Яа-я]+">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Введите корректное имя</p>

<label class="inline-block w-full
md:w-[48%] py-2">Телефон
<span class="inline-block px-1 text-red-500">*</span>
</label>
<input type="tel" v-model="tel" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="89\d{9}">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Введите корректный номер телефона</p>

<label class="inline-block w-full
md:w-[48%] py-2">Email</label>
<input type="email" v-model="email" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="([-\.\w]+@([\w-]+\.)+[\w-]+)?">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Введите корректный email</p>

<label class="inline-block w-full
md:w-[48%] py-2">Пароль
<span class="inline-block px-1 text-red-500">*</span>
</label>

<span class="relative inline-block w-full md:w-[48%]">

<input :type="!passwShow ? 'password' : 'text'" v-model="password" class="border border-[#ffbc0a] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern=".{8,}">

<button @click="passwShow=!passwShow" class="absolute p-2 top-0 right-0 text-slate-500 text-lg xl:text-xl" type="button">
<font-awesome-icon v-if="!passwShow" icon="fa-solid fa-eye"/>
<font-awesome-icon v-if="passwShow" icon="fa-solid fa-eye-slash"/>
</button>

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Пароль должен быть не менее 8 символов</p>

</span>

<label class="inline-block w-full
md:w-[48%] py-2">Повторите пароль
<span class="inline-block px-1 text-red-500">*</span>
</label>

<span class="relative inline-block w-full md:w-[48%]">

<input :type="!confShow ? 'password' : 'text'" v-model="confirm" class="border border-[#ffbc0a] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern=".{8,}">

<button @click="confShow=!confShow" class="absolute top-0 right-0 text-slate-500 p-2 text-lg xl:text-xl" type="button">
<font-awesome-icon v-if="!confShow" icon="fa-solid fa-eye"/>
<font-awesome-icon v-if="confShow" icon="fa-solid fa-eye-slash"/>
</button>

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Пароль должен быть не менее 8 символов</p>

</span>

<button class="block w-full md:w-3xs my-4 mx-auto p-2 rounded-lg bg-[#f69d0d] hover:bg-[#f45608] text-white transition duration-500 ease-in" :disabled="load">
<Loader :load="load"/>
{{!load ? "Создать профиль" : ""}}</button>

<TextErr v-if="textErr" :text="textErr"/>

</form>
</template>

<style scoped></style>
