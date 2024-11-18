<script setup>
import { ref } from 'vue';

defineProps({
  title: String,
})

const count = ref(0)
</script>

<template>
  <h3>{{ title }}</h3>


</template>

<style scoped>

</style>
