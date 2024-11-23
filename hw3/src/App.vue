<template>
  <div>
    <div v-if="status===1">
      <Search @simple-search='handleSearch'/>
      <DetailSearch @detail-search='handleDetailSearch' />
      <div class="group">
        <button @click="changeStatus(2)" class="order">Оформить заказ</button>
        <button @click="changeStatus(3)" class="order">Создать товар</button>
      </div>
    <ul>
      <ProductItem v-for="item in filteredItems" :key='item.id' :item='item'/>
    </ul>
  </div>
    <div v-if="status===2">
      <button @click="changeStatus(1)" class="catalog">В каталог</button>
      <OrderForm/>
    </div>
    <div v-if="status===3">
      <button @click="changeStatus(1)" class="catalog">В каталог</button>
      <NewProductForm/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DetailSearch from './components/DetailSearch.vue';
import NewProductForm from './components/NewProductForm.vue';
import OrderForm from './components/OrderForm.vue';
import ProductItem from './components/ProductItem.vue';
import Search from './components/Search.vue';

const status = ref(1);
const filter = ref('');
const filterQuery = ref({})
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

const changeStatus = (value)=> {
  status.value = value
}
const handleSearch = (value) => {
  filter.value = value;
  applyFilters();
};

const handleDetailSearch = (searchQuery) => {
  filterQuery.value = searchQuery;
  applyFilters();
};

const applyFilters = () => {
  const { title = '', minPrice = null, maxPrice = null } = filterQuery.value;
  if (!filter.value && !title && minPrice === null && maxPrice === null) {
    fetchData();
    return;
  }
  const filteredByName = title
    ? filteredItems.value.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      )
    : filteredItems.value;

    filteredItems.value = filteredByName.filter((item) => {
    const price = parseFloat(item.price);

    const isInRange =
      (minPrice === null || price >= minPrice) &&
      (maxPrice === null || price <= maxPrice);

    return isInRange;
});


  if (filter.value) {
    filteredItems.value = filteredItems.value.filter((item) =>
      item.title.toLowerCase().includes(filter.value.toLowerCase())
    );
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0;
  }
  .catalog{
    border-radius: 20px;
    background: rgb(238, 191, 130);
    max-width: 200px;
    min-width: 200px;
    align-self: center;
  }
  .order {
    background: rgb(226, 148, 2);
  }
</style>
