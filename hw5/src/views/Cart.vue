<template>
  <div class="cart-container">
    <h2 class="cart-title">Корзина</h2>

    <div v-if="cart.length > 0" class="cart-content">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Товар</th>
            <th>Количество</th>
            <th>Цена за шт.</th>
            <th>Итого</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="product-info">
              <img :src="item.image" alt="Product Image" class="product-image" />
              <span>{{ item.title }}</span>
            </td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price.toLocaleString() }} $.</td>
            <td>{{ (item.price * item.quantity).toLocaleString() }} $.</td>
            <td>
              <button @click="removeFromCart(item.id)" class="remove-button">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <p>Всего товаров: <strong>{{ totalQuantity }}</strong></p>
        <p>Итого: <strong>{{ totalPrice.toLocaleString() }} $.</strong></p>
      </div>

      <div class="cart-actions">
        <button @click="clearCart" class="clear-button">Очистить корзину</button>
        <button @click="goToOrder" class="order-button">Оформить заказ</button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const cart = computed(()=> store.getters.cart)
const totalQuantity = computed(()=> store.getters.totalQuantity)
const totalPrice = computed(()=> store.getters.totalPrice)
const router = useRouter();
const removeFromCart = (productId) => {
  store.commit('REMOVE_PRODUCT_FROM_CART', productId);
};
const clearCart = () => {
  store.commit('CLEAR_CART');
};

const goToOrder = () => {
  router.push({ name: 'Checkout' });
};
</script>


<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-title {
  text-align: center;
  font-size: 2rem;
  color: #333333;
  margin-bottom: 1.5rem;
}

.cart-content {
  display: flex;
  flex-direction: column;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.cart-table th,
.cart-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.cart-table th {
  background-color: #f9f9f9;
  color: #555555;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #ff4d4f;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #e04344;
}

.cart-summary {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #333333;
}

.cart-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.clear-button,
.order-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.clear-button {
  background-color: #ff4d4f;
  color: #ffffff;
}

.clear-button:hover {
  background-color: #e04344;
  transform: translateY(-2px);
}

.order-button {
  background-color: #4caf50;
  color: #ffffff;
}

.order-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #777777;
}

.continue-shopping {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #646cff;
  color: #ffffff;
  border-radius: 25px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
}

.continue-shopping:hover {
  background-color: #535bf2;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cart-summary {
    flex-direction: column;
    align-items: flex-end;
  }

  .cart-actions {
    flex-direction: column;
    align-items: flex-end;
  }

  .cart-table th,
  .cart-table td {
    padding: 0.75rem;
  }

  .product-image {
    width: 50px;
    height: 50px;
  }

  .cart-title {
    font-size: 1.75rem;
  }
}
</style>
