<script setup>
import Banner from "./Banner.vue"

</script>

<template>
<h2 class="text-center text-4xl 2xl:text-6xl text-[#ffbc0a] my-6">Всегда низкие цены</h2>

<Banner/>

<div class="flex flex-col lg:flex-row justify-around 2xl:justify-center items-center my-8">

<div class="bg-[url(styles/social.jpg)] bg-no-repeat bg-[90%_auto] bg-bottom-right w-xs lg:w-md h-[256px] lg:h-[320px] m-2 2xl:mx-8 md:my-6">

<p class="text-[#ffbc0a] mt-4 text-2xl">Подписывайтесь на наши соцсети</p>

<RouterLink to="/social" class="inline-block py-2 px-4 bg-[#f69d0d] hover:bg-[#ec7d10] hover:scale(1.5) transition duration-300 ease-in text-white mt-8 rounded-lg">Подробнее</RouterLink>

</div>

<div class="bg-[url(styles/bonus.jpg)] bg-no-repeat bg-contain bg-bottom-right w-xs lg:w-md h-[256px] lg:h-[320px] m-2 md:my-6 2xl:mx-8">

<p class="text-[#ffbc0a] mt-4 text-2xl">Экономия с бонусами</p>

<RouterLink to="/bonus" class="inline-block py-2 px-4 bg-[#ec7d10] hover:bg-[#f456p8] hover:scale(1.5) transition duration-300 ease-in text-white mt-8 rounded-lg">Узнать больше</RouterLink>

</div>

</div>

</template>

<style scoped></style>
