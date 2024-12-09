import axios from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';
vi.mock('axios');

describe('fetchProducts action (full store)', () => {
  it('fetches products and updates the state', async () => {
    const productsMock = [
      { id: 1, title: 'Test Product 1', price: 10.99 },
      { id: 2, title: 'Test Product 2', price: 19.99 },
    ];
    axios.get.mockResolvedValue({ data: productsMock });

    const store = createStore({
      // Важно: сюда нужно поместить ваши state, mutations, actions,
      // если они недоступны напрямую, их нужно импортировать из отдельного файла.
      state: {
        products: [],
        product: {},
        cart: [],
        user: {},
      },
      mutations: {
        SET_PRODUCTS(state, products) {
          state.products = products;
        },
      },
      actions: {
        async fetchProducts({ commit }) {
          const response = await axios.get('https://fakestoreapi.com/products');
          commit('SET_PRODUCTS', response.data);
        },
      },
    });

    await store.dispatch('fetchProducts');

    expect(store.state.products).toEqual(productsMock);
  });
});
