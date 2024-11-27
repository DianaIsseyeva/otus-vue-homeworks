<template>
  <div v-if="product">
    <h2>{{ product.title }}</h2>
    <img :src="product.image" :alt="product.title" class="image"/>
    <p>Цена: {{ product.price }}</p>
    <p>Рейтинг: {{ product.rating.rate }}</p>
    <p>Количество: {{ product.rating.count }}</p>
    <button @click="goBack">Назад в каталог</button>
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const product = ref(null);

const fetchProduct = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (response.ok) {
      product.value = await response.json();
    } else {
      console.error('Ошибка сети:', response.status);
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

onMounted(() => {
  const productId = route.params.productId;
  fetchProduct(productId);
});

const goBack = () => {
  router.push({ name: 'catalog' });
};
</script>

<style scoped>
.image {
  width: 300px;
  height: auto;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
