// src/composables/useCatalog.js
import { onMounted, ref } from 'vue';

export function useCatalog() {
  const filteredItems = ref([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (response.ok) {
        filteredItems.value = await response.json();
      } else {
        console.error('Ошибка сети:', response.status);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    filteredItems,
  };
}
