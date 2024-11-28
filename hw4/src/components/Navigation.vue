<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'create-product' }">Ceate Product</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
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
</style>
