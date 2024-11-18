<script setup>
import { onMounted, ref } from 'vue';
import ProductItem from './components/ProductItem.vue';

const items = ref([]);

const fetchData =async()=> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
      items.value = await response.json();
    } else {
      console.error('Ошибка сети:', response.status);
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}
onMounted(()=> {
  fetchData()
})
</script>

<template>
  <div>
    <ul>
      <ProductItem v-for="item in items" :key='item.id' :item='item'/>
    </ul>
  </div>
</template>

<style scoped>
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0;
  }
</style>
