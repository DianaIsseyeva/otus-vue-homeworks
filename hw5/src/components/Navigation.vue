<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'home' }" data-testid="nav-home">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'login' }" data-testid="nav-login">Login</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'create-product' }" data-testid="nav-create-product">Create Product</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'cart' }" data-testid="nav-cart">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="totalQuantity > 0" data-testid="cart-count" class="cart-count">{{ totalQuantity }}</span>
          </router-link>
        </li>
        <p v-if="user.login" data-testid="nav-user-greeting">hi, {{ user.login }}</p>
        <button v-if="user.login" data-testid="nav-logout-button">logout</button>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const user = computed(()=> store.getters.user)
const totalQuantity = computed(() => store.getters.totalQuantity);
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

body {
  margin: 0;
  padding-top: 60px;
}

p {
  color: rgb(136, 255, 0);
  margin-right: 10px;
}
</style>
