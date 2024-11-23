<template>
  <div>
    <input v-model='query' @input="$emit('simple-search', query)"
     type="text" placeholder="Поиск..." class="search-input" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const query = ref('')
</script>

<style scoped>
.search-input {
  width: 300px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 5px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>