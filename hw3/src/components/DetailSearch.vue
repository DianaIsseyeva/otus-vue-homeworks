<template>
  <div>
    <form @submit.prevent="$emit('detail-search', searchQuery)">
      <input v-model='searchQuery.title'
       type="text" placeholder="Название товара" class="search-input" />
      <input v-model='searchQuery.minPrice' min="0"
       type="number" placeholder="Цена от" class="search-input" />
      <input v-model='searchQuery.maxPrice' min="0"
       type="number" placeholder="Цена до" class="search-input" />
       <button type="submit">Искать</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const searchQuery = reactive({
      title: "",
      minPrice: null,
      maxPrice: null,
    });
</script>

<style scoped>
.search-input {
  width: 300px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 5px;
  font-size: 16px;
  margin: 0 10px 20px;
}
</style>