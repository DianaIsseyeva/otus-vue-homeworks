<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'catalog' }">Catalog</router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link :to="{ name: 'product', params: { productId: 222 } }">Sample Post</router-link>
      </li> -->
    </ul>

  </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>