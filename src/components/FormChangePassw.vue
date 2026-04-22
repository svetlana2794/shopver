<script setup>
import Loader from "./Loader.vue"
import TextOk from "./TextOk.vue"
import TextErr from "./TextErr.vue"

import { ref, watch } from "vue"

import { useClientStore } from "../stores/client.js"
import { useFetchPost } from "../utils/fetchPost.js"

const oldPassw=ref("")
const newPassw=ref("")
const confirm=ref("")
const oldShow=ref(false)
const newShow=ref(false)
const confShow=ref(false)
const load=ref(false)
const ok=ref(null)
const textErr=ref(null)
const storeClient=useClientStore()

function saveChanges() {
if (oldPassw.value) {
if (newPassw.value==confirm.value){
load.value=true
} else {
textErr.value="Подтвердите правильно новый пароль"
setTimeout(() => {
textErr.value=null
}, 2000)
}
}
}

watch(load,
async (newValue, oldValue) => {
const {answer, error}=await useFetchPost("/api/settingsPassw", {
id: storeClient.client.id,
password: oldPassw.value,
passwordNew: newPassw.value
})
if (answer.value) {
load.value=false
ok.value=true
setTimeout(() => {ok.value=null}, 2000)
}
if (error.value) {
textErr.value=error.value
load.value=false
setTimeout(() => {textErr.value=null}, 2000)
}
}
)
</script>

<template>
<form @submit.prevent="saveChanges" class="p-2 lg:w-[50%] xl:text-lg mx-auto lg:my-4">

<label class="inline-block w-full md:w-[48%] py-2">Старый пароль</label>

<span class="relative inline-block w-full md:w-[48%]">

<input :type="!oldShow ? 'password' : 'text'" v-model="oldPassw" class="border border-[#ffbc0a] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern=".{8,}">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Пароль должен содержать не менее 8 символов</p>

<button type="button" @click="oldShow=!oldShow" class="absolute top-0 right-0 p-2 text-slate-500 text-lg xl:text-xl">
<font-awesome-icon v-if="!oldShow" icon="fa-solid fa-eye"/>
<font-awesome-icon v-if="oldShow" icon="fa-solid fa-eye-slash"/>
</button>

</span>

<label class="inline-block w-full
md:w-[48%] py-2">Новый пароль</label>

<span class="relative inline-block w-full md:w-[48%]">

<input :type="!newShow ? 'password' : 'text'" v-model="newPassw" class="border border-[#ffbc0a] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern=".{8,}">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Пароль должен содержать не менее 8 символов</p>

<button type="button" @click="newShow=!newShow" class="absolute top-0 right-0 p-2 text-slate-500 text-lg xl:text-xl">
<font-awesome-icon v-if="!newShow" icon="fa-solid fa-eye"/>
<font-awesome-icon v-if="newShow"
icon="fa-solid fa-eye-slash"/>
</button>

</span>

<label class="inline-block w-full
md:w-[48%] py-2">Подтвердите пароль</label>

<span class="relative inline-block w-full md:w-[48%]">

<input :type="!confShow ? 'password' : 'text'" v-model="confirm" class="border border-[#ffbc0a] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#ec7d10] focus:border-[#ec7d10] user-invalid:border-red-500 user-invalid:border-2 peer" pattern=".{8,}">

<p class="mt-2 px-2 hidden peer-user-invalid:block text-red-500 text-sm">Пароль должен содержать не менее 8 символов</p>

<button type="button" @click="confShow=!confShow" class="absolute top-0 right-0 p-2 text-slate-500 text-lg xl:text-xl">
<font-awesome-icon v-if="!confShow" icon="fa-solid fa-eye"/>
<font-awesome-icon v-if="confShow"
icon="fa-solid fa-eye-slash"/>
</button>

</span>

<button class="block w-full md:w-3xs my-4 mx-auto p-2 rounded-lg bg-[#f69d0d] hover:bg-[#ec7d10] text-white transition duration-500 ease-in" :disabled="load">
<Loader :load="load"/>
{{!load ? "Сохранить пароль" : ""}}
</button>

<TextOk v-if="ok">Изменения сохранены</TextOk>

<TextErr v-if="textErr" :text="textErr"/>

</form>
</template>

<style scoped></style>
