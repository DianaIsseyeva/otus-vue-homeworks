<template>
  <li class="item">
    <img :src="item.image" :alt="item.title" class="image"/>
    <h5>{{ item.title }}</h5>
    <p>Цена: {{ item.price }}</p>
    <p>Рейтинг: {{ item.rating.rate }}</p>
    <p>Количество: {{ item.rating.count }}</p>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.item {
  width: 300px;
  height: auto;
  border: 1px solid grey;
  padding: 10px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image {
  width: 250px;
  height: 300px;
  display: block;
}
p {
  margin: 0;
}
</style>