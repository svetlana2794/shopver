<script setup>
import { ref, onMounted, onUnmounted} from "vue"

const index=ref(0)
const timer=ref(null)

onMounted(() => {
timer.value=setInterval(() => {
index.value=index.value==2 ? 0 : ++index.value
}, 3000)
})

function slade(num) {
clearInterval(timer.value)
index.value=num
timer.value=setInterval(() => {
index.value=index.value==2 ? 0 : ++index.value
}, 3000)
}

onUnmounted(() => {
clearInterval(timer.value)
})
</script>

<template>

<div class="h-[256px] my-4 mx-auto w-xs lg:h-[320px] lg:w-md 2xl:h-[448px] 2xl:w-xl relative">

<Transition>

<RouterLink v-if="index==0" class="bg-[url(styles/promo.jpg)] bg-no-repeat bg-bottom bg-size-[100%_auto] block w-xs lg:w-md 2xl:w-xl h-full absolute rounded-lg border border-[#ffbc0a]" to="/catalog/promo"></RouterLink>

<RouterLink v-else-if="index==1" class="bg-[url(styles/hit.png)] bg-no-repeat bg-center bg-size-[100%_auto] block w-xs lg:w-md 2xl:w-xl h-full absolute rounded-lg border border-[#ffbc0a]" to="/catalog/hit"></RouterLink>

<RouterLink v-else-if="index==2" class="bg-[url(styles/new.jpg)] bg-no-repeat bg-center bg-size-[100%_auto] block w-xs lg:w-md 2xl:w-xl h-full absolute rounded-lg border border-[#ffbc0a]" to="/catalog/new">

</RouterLink>

</Transition>

</div>

<p class="flex justify-center my-2">
<button @click="slade(0)" class="mx-2 size-5 md:size-7 bg-[#ffbc0a] hover:bg[#ec7d10] rounded-full" :style="{backgroundColor: index==0 ? '#f45608' : '#ffbc0a'}"></button>

<button @click="slade(1)" class="mx-2 size-5 md:size-7 bg-[#ffbc0a] hover:bg[#ec7d10] rounded-full" :style="{backgroundColor: index==1 ? '#f45608' : '#ffbc0a'}"></button>

<button @click="slade(2)" class="mx-2 size-5 md:size-7 bg-[#ffbc0a] hover:bg[#ec7d10] rounded-full" :style="{backgroundColor: index==2 ? '#f45608' : '#ffbc0a'}"></button>
</p>

</template>

<style scoped>

.v-enter-active, .v-leave-active {
transition: transform .5s ease;
}

.v-enter-from {
transform: scale(0) translate(100%);
transform-origin: center;
}

.v-leave-to {
transform: scale(0) translate(-100%
);
transform-origin: center;
}

</style>
