<script setup>
import { onMounted, ref } from 'vue';
import OrderForm from './components/OrderForm.vue';
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
const status = ref(1)
const changeStatus = ()=> {
  if(status.value === 1) {
    status.value = 2
  } else {
    status.value = 1
  }
}
</script>

<template>
  <div>
    <div v-if="status===1">
      <button @click="changeStatus" class="order">Оформить заказ</button>
    <ul>
      <ProductItem v-for="item in items" :key='item.id' :item='item'/>
    </ul>
  </div>
    <div v-if="status===2">
      <button @click="changeStatus" class="catalog">В каталог</button>
      <OrderForm/>
    </div>
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
  .catalog{
    border-radius: 20px;
    background: rgb(238, 191, 130);
    max-width: 200px;
    min-width: 200px;
    align-self: center;
  }
  .order {
    background: rgb(226, 148, 2);
  }
</style>
