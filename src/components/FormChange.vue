<script setup>
import Loader from "./Loader.vue"
import TextOk from "./TextOk.vue"
import TextErr from "./TextErr.vue"

import { ref, watch, onMounted } from "vue"
import { useRouter } from "vue-router"

import { useClientStore} from "../stores/client.js"
import { useFetchPost } from "../utils/fetchPost.js"

const name=ref("")
const tel=ref("")
const email=ref("")
const load=ref(false)
const ok=ref(null)
const textErr=ref(null)
const router=useRouter()
const storeClient=useClientStore()

watch(load,
async (newValue, oldValue) => {
const {answer, error}=await useFetchPost("/api/settings", {
id: storeClient.client.id,
name: name.value,
tel: tel.value,
email: email.value
})
if (answer.value) {
storeClient.addClient(answer.value)
load.value=false
ok.value=true
setTimeout(() => {
ok.value=null
}, 2000)
}
if (error.value) {
textErr.value=error.value
load.value=false
setTimeout(() => {
ok.value=null
textErr.value=null
}, 3000)
}
})

onMounted(() => {
name.value=storeClient.client.name,
tel.value=storeClient.client.tel,
email.value=storeClient.client.email
})
</script>

<template>
<form @submit.prevent="load=true" class="p-2 lg:w-[50%] xl:text-lg mx-auto lg:my-4">

<label class="inline-block w-full
md:w-[48%] py-2">Имя</label>
<input type="text" v-model="name"
required class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="[A-Za-zА-Яа-я]+">

<p class="mt-2 px-2 hidden peer-user-invalid:blick text-red-500 text-sm">Поле обязательно для заполнения</p>

<label class="inline-block w-full
md:w-[48%] py-2">Телефон</label>
<input type="tel" v-model="tel" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="89\d{9}">

<p class="mt-2 px-2 hidden peer-user-invalid:blick text-red-500 text-sm">Введите корректный номер телефона</p>

<label class="inline-block w-full
md:w-[48%] py-2">Email</label>
<input type="email" v-model="email" class="border border-[#ffbc0a] p-2 rounded-lg w-full md:w-[48%] focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern="([-\.\w]+@([\w-]+\.)+[\w-]+)?">

<p class="mt-2 px-2 hidden peer-user-invalid:blick text-red-500 text-sm">Введите корректный email</p>

<button class="block w-full md:w-3xs my-4 mx-auto p-2 rounded-lg bg-[#f69d0d] hover:bg-[#ec7d10] text-white transition duration-500 ease-in" :disabled="load">
<Loader :load="load"/>
{{!load ? "Сохранить изменения" : ""}}</button>

<TextOk v-if="ok">Изменения сохранены</TextOk>

<TextErr v-if="textErr" :text="textErr"/>

</form>
</template>

<style scoped></style>
