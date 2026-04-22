<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import { useCatalogStore } from "../stores/catalog.js"

const showFilter=ref(false)
const at=ref(0)
const to=ref(0)
const cat=ref("")
const season=ref([])
const gender=ref([])
const route=useRoute()
const storeCatalog=useCatalogStore()

function createFilter() {
let url=new URL(storeCatalog.address)
url.searchParams.set("at", at.value)
url.searchParams.set("to", to.value)
url.searchParams.set("cat", cat.value)
url.searchParams.set("season", season.value)
url.searchParams.set("gender", gender.value)
storeCatalog.address=url
}

function resetFilter() {
let url=new URL(storeCatalog.address)
url.searchParams.delete("at")
url.searchParams.delete("to")
url.searchParams.delete("cat")
url.searchParams.delete("season")
url.searchParams.delete("gender")
storeCatalog.start=0
storeCatalog.end=5
at.value=0
to.value=0
cat.value=""
season.value.length=0
gender.value.length=0
storeCatalog.address=url
}
</script>

<template>
<div class="p-2 my-2 w-full lg:w-xs">

<h3 class="text-[#ffbc0a] text-center text-lg xl:text-xl my-2 p-2 relative">Фильтры
<button @click="showFilter=!showFilter" class="absolute top-0 right-0 p-2 hover:text-[#ec7d10] lg:hidden">
<font-awesome-icon v-if="!showFilter" icon="fa-solid fa-angle-down"/>
<font-awesome-icon v-if="showFilter" icon="fa-solid fa-angle-up"/>
</button>
</h3>

<div :class="['lg:h-auto', showFilter ? 'h-auto' : 'h-0', showFilter ? 'scale-y-100' : 'scale-y-0']">

<label class="p-2 pr-6 m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a] text-[#ffbc0a] has-checked:text-white inline-block xl:text-lg">
<input type="checkbox" v-model="gender" value="male" class="invisible">Мужская одежда
</label>

<label class="p-2 pr-6 m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a] text-[#ffbc0a] has-checked:text-white inline-block xl:text-lg">
<input type="checkbox" v-model="gender" value="female" class="invisible">Женская одежда
</label>

<h4 class="font-bold p-2 xl:text-lg">Цена</h4>

<input type="text" v-model.number="at" placeholder="От" class="border border-[#ffbc0a] rounded-lg m-2 p-2 w-[100px] xl:text-lg" maxlength="5">

<input type="text" v-model.number="to" placeholder="До" class="border border-[#ffbc0a] rounded-lg m-2
p-2 w-[100px] xl:text-lg" maxlength="5">

<br>

<label class="m-2 p-2 inline-block w-full xl:text-lg">Категория</label>

<select v-model="cat" class="p-2 my-2 rounded-lg border border-[#ffbc0a] w-full xl:text-lg">
<option class="p-2" disabled value="">Выберите категорию</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Верхняя одежда</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Обувь</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Футболки</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Носки</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Нижнее белье</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Юбки</option>
<option class="p-2 hover:bg-[#ffbc0a] hover:text-white">Брюки, джинсы</option>
</select>

<h4 class="font-bold p-2 xl:text-lg">Сезон</h4>

<label class="p-2 pr-6 m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a] text-[#ffbc0a] has-ckecked:text-white inline-block xl:text-lg">
<input type="checkbox" v-model="season" value="лето" class="invisible">Лето
</label>

<label class="p-2 pr-6 m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a] text-[#ffbc0a] has-checked:text-white inline-block xl:text-lg">
<input type="checkbox" v-model="season" value="демисезон" class="invisible">Демисезон
</label>

<label class="p-2 pr-6 m-2 rounded-full border border-[#ffbc0a] has-checked:bg-[#ffbc0a] text-[#ffbc0a] has-checked:text-white inline-block xl:text-lg">
<input type="checkbox" v-model="season" value="зима" class="invisible">Зима
</label>

<div class="flex justify-around">
<button class="m-2 py-2 px-4 bg-[#ffbc0a] rounded-lg text-white hover:bg-[#ec7d10] transition duration-500 ease-in xl:text-lg" @click="createFilter">Применить</button>

<button class="m-2 py-2 px-4 bg-[#b4b4b4] rounded-lg text-white hover:bg-[#818181] transition duration-500 ease-in xl:text-lg" @click="resetFilter">Сбросить</button>
</div>

</div>

</div>
</template>

<style scoped></style>
