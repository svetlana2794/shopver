<script setup>
const {load}=defineProps(["load"])
</script>

<template>
<span v-show="load">
<font-awesome-icon icon="fa-solid fa-spinner" class="spin"/>
</span>
</template>

<style scoped>

@keyframes spinner {
from {
transform: rotate(0deg)
}

to {
transform: rotate(360deg)
}
}

.spin {
animation: spinner 1s linear infinite;
}

</style>
