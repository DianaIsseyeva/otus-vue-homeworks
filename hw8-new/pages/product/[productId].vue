<template>
  <div v-if="product" class="product-container" data-testid='product-content'>
    <img :src="product.image" :alt="product.title" class="product-image" />
    <div class="product-content">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">Цена: <span>{{ product.price }} $</span></p>
      <p v-if="product.rating" class="product-rating">Рейтинг: <span>{{ product.rating.rate }}</span></p>
      <p v-if="product.rating" class="product-stock">Количество: <span>{{ product.rating.count }}</span></p>
      <button @click="addToCart(product)" class="btn" data-testid="add-to-cart-button">В корзину</button>
    </div>
  </div>
  <div v-else class="loading-container">
    <p class="loading-text">Загрузка...</p>
  </div>
</template>

<script setup>
import { useShopStore } from '@/store'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Инициализируем стор
const store = useShopStore()

// Получаем ID товара из роут-параметров
const route = useRoute()
const productId = route.params.productId
// При монтировании вызываем экшн для загрузки товара
onMounted(() => {
  store.fetchProduct(productId)
})

// Computed-свойство, связанное с товаром
const product = computed(() => store.product)

// Метод добавления в корзину, вызываем метод Pinia
const addToCart = (product) => {
  store.addToCart(product)
}
</script>


<style scoped>
.product-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 40px auto;
}

.product-image {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  background-color: #fff;
}

.product-content {
  max-width: 500px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.product-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #222;
  font-weight: bold;
}

.product-description {
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
}

.product-price, .product-rating, .product-stock {
  font-size: 18px;
  margin-bottom: 10px;
  color: #444;
}

.product-price span,
.product-rating span,
.product-stock span {
  font-weight: bold;
  color: #d9534f;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-text {
  font-size: 18px;
  color: #777;
  font-family: 'Arial', sans-serif;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.btn{
  margin-top: 30px;
  display: flex;
  justify-self: end;
  background: rgb(60, 229, 60);
}
</style>
