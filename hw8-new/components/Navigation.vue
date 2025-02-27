<template>
  <div>
    <nav>
      <ul>
        <li>
          <!-- Переход на главную (index.vue) -->
          <NuxtLink to="/" data-testid="nav-home">Home</NuxtLink>
        </li>
        <li>
          <!-- Переход на login.vue -->
          <NuxtLink to="/login" data-testid="nav-login">Login</NuxtLink>
        </li>
        <li>
          <!-- Переход на create-product.vue -->
          <NuxtLink to="/create-product" data-testid="nav-create-product">
            Create Product
          </NuxtLink>
        </li>
        <li>
          <!-- Переход на cart.vue -->
          <NuxtLink to="/cart" data-testid="nav-cart">
            <i class="fas fa-shopping-cart"></i>
            <span
              v-if="totalQuantity > 0"
              data-testid="cart-count"
              class="cart-count"
            >
              {{ totalQuantity }}
            </span>
          </NuxtLink>
        </li>

        <!-- Пример приветствия -->
        <p v-if="user?.login" data-testid="nav-user-greeting">
          hi, {{ user.login }}
        </p>
        <button v-if="user?.login" data-testid="nav-logout-button">
          logout
        </button>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useShopStore } from '@/store';
import { computed } from 'vue';

// Инициализируем стор из Pinia
const store = useShopStore()

// Предположим, что у вас есть геттеры `user` и `totalQuantity` в Pinia
const user = computed(() => store.user)
const totalQuantity = computed(() => store.totalQuantity)
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 60px;
}

li {
  margin: 0 15px;
}

/* NuxtLink стилизуется как ссылка */
a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease;
}

a:hover {
  color: #f0a500;
  transform: scale(1.1);
}

a:active {
  color: #ff6f00;
}

/* Общие стили */
body {
  margin: 0;
  padding-top: 60px;
}

p {
  color: rgb(136, 255, 0);
  margin-right: 10px;
}
</style>
