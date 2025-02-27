// stores/useShopStore.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
  // -----------------------------------------------------------------
  // 1) Состояние (state) - аналог state в Vuex
  // -----------------------------------------------------------------
  state: () => ({
    products: [],
    product: {},
    cart: [],
    user: {},
  }),

  // -----------------------------------------------------------------
  // 2) Getters - аналог getters в Vuex
  // -----------------------------------------------------------------
  getters: {
    allProducts: state => state.products,
    totalQuantity: state => {
      if (!Array.isArray(state.cart)) {
        return 0;
      }
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice: state => {
      if (!Array.isArray(state.cart)) {
        return 0;
      }
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },

  // -----------------------------------------------------------------
  // 3) Actions - аналог actions/mutations в Vuex
  // -----------------------------------------------------------------
  actions: {
    // Получение списка товаров
    async fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Получение одного товара
    async fetchProduct(id) {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        this.product = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Добавить товар в корзину
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    // Удалить товар из корзины
    removeProductFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    // Очистить корзину
    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
    },

    // Загрузка корзины из localStorage
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },

    // Инициализация корзины (можно вызывать при старте приложения)
    initializeCart() {
      this.loadCartFromLocalStorage();
    },
  },
});
