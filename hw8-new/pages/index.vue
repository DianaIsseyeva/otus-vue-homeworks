<template>
  <div class="catalog-container">
    <ul class="product-list">
      <ProductItem
        @click="goToProduct(item.id)"
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        class="product-item"
      />
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/store'

// Компонент для отображения отдельного товара
import ProductItem from '../components/ProductItem.vue'

// Инициализируем стор
const store = useShopStore()

// В Pinia нет store.getters.allProducts
// Вместо этого, если у вас объявлен геттер allProducts в defineStore,
// он доступен как store.allProducts
const filteredItems = computed(() => store.allProducts)

// При монтировании вызываем экшн для загрузки товаров
onMounted(() => {
  store.fetchProducts()
})

const router = useRouter()

// Переход к странице товара
const goToProduct = (productId) => {
  router.push({ name: 'product-productId', params: { productId: productId } })
}
</script>

<style scoped>
.catalog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #f9f9f9;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.product-item:active {
  transform: scale(0.98);
}

.catalog {
  border-radius: 20px;
  background: rgb(238, 191, 130);
  max-width: 200px;
  min-width: 200px;
  align-self: center;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}
</style>
