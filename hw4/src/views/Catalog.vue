<template>
  <div>
    <ul>
        <ProductItem @click="goToProduct(item.id)" v-for="item in filteredItems" :key='item.id' :item='item'/>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ProductItem from '../components/ProductItem.vue';
import { useRouter } from "vue-router";
const router = useRouter()

const filteredItems = ref([]);
const fetchData =async()=> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
      filteredItems.value = await response.json();
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
const goToProduct = (productId) => {
  router.push({ name: 'product', params: { productId } });
};
</script>

<style lang="scss" scoped>

</style>