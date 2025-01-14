<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="transparent" flat class="position-relative">
      <div style="width: 100%; padding-left: 30px; padding-right: 30px;">
        <v-row justify="space-between" align="center">
          <!-- Left Menu (Desktop Only) -->
          <v-col class="hidden-sm-and-down" cols="5">
            <v-toolbar-items>
              <nuxt-link to="/products" class="nav-link">Каталог</nuxt-link>
              <nuxt-link to="/about" class="nav-link">О бренде</nuxt-link>
              <nuxt-link to="/about" class="nav-link">Покупателям</nuxt-link>
              <nuxt-link to="/contact" class="nav-link">Контакты</nuxt-link>
            </v-toolbar-items>
          </v-col>

          <!-- Logo -->
          <v-col cols="2" class="text-center">
            <nuxt-link to="/">
              <img src="/logo.png" alt="Логотип" class="logo" >
            </nuxt-link>
          </v-col>

          <!-- Right Menu (Desktop Only) -->
          <v-col class="hidden-sm-and-down text-right" style="justify-items: flex-end;" cols="5">
            <v-toolbar-items>
              <nuxt-link to="/login" class="nav-link">Личный кабинет</nuxt-link>
              <nuxt-link to="/cart" class="nav-link">Корзина ({{ cartItemCount }})</nuxt-link>
              <nuxt-link to="/favorites" class="nav-link">Избранное</nuxt-link>
            </v-toolbar-items>
          </v-col>

          <!-- Burger Menu (Mobile Only) -->
          <v-col class="hidden-md-and-up text-right">
            <v-btn icon @click="toggleDrawer">
              <v-icon>{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-app-bar>

    <!-- Hero Section with Images -->
    <v-container fluid class="hero-container">
      <v-row justify="center" no-gutters style="height: 100vh; overflow: hidden;">
        <!-- Black Dress Image Always Visible -->
        <v-col cols="12" md="6" class="hero-image-left">
          <img src="/black.webp" alt="Black Dress" class="hero-image" >
        </v-col>
        <!-- Red Dress Image Hidden on Small Screens -->
        <v-col cols="6" class="hero-image-right hidden-sm-and-down">
          <img src="/red.webp" alt="Red Dress" class="hero-image" >
        </v-col>
      </v-row>
    </v-container>

    <!-- Mobile Drawer Menu -->
    <v-navigation-drawer v-model="drawer" location='right' style='top: 0; padding-top: 30px;' app temporary>
      <v-list>
        <v-list-item>
          <nuxt-link to="/products" >Каталог</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/about">О бренде</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/contact">Покупателям</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/contact">Контакты</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/login">Личный кабинет</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/cart">Корзина</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/favorites">Избранное</nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'

// Local state
const drawer = ref<boolean>(false)

const toggleDrawer = (): void => {
  drawer.value = !drawer.value
}

// Pinia store
const cartStore = useCartStore()

// Cart item count
const cartItemCount = computed<number>(() => cartStore.itemCount)
</script>

<style scoped>
.nav-link {
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  font-weight: 500;
  font-size: 14px;
}

.nav-link:hover {
  text-decoration: underline;
}

.logo {
  margin-top: 30px;
  height: 133px; /* Adjust as needed */
}

.v-app-bar {
  background-color: transparent !important;
  box-shadow: none;
}

.hero-container {
  position: absolute;
  top: -22px; /* Сохраняем ваш стиль */
  margin-top: 20px;
  padding: 0;
}

.hero-image-left,
.hero-image-right {
  text-align: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
