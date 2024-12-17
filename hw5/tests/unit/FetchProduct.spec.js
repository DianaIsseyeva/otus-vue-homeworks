import axios from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';
vi.mock('axios');

describe('fetchProduct action', () => {
  it('fetches product and updates the state', async () => {
    const productMock = [{ id: 1, title: 'Test Product 1', price: 10.99 }];
    axios.get.mockResolvedValue({ data: productMock });

    const store = createStore({
      state: {
        products: [],
        product: {},
        cart: [],
        user: {},
      },
      mutations: {
        SET_PRODUCT(state, product) {
          state.product = product;
        },
      },
      actions: {
        async fetchProduct({ commit }, id) {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          commit('SET_PRODUCT', response.data);
        },
      },
    });

    await store.dispatch('fetchProduct');

    expect(store.state.product).toEqual(productMock);
  });
});
