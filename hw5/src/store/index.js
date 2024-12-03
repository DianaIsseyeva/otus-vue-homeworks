import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    product: {},
    cart: [],
    user: {},
  },
  getters: {
    allProducts: state => state.products,
    product: state => state.product,
    cart: state => state.cart,
    user: state => state.user,
    totalQuantity: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_PRODUCT_FROM_CART(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProduct({ commit }, id) {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
