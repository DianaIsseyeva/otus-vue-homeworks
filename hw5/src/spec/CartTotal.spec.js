import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createStore } from 'vuex';
import CartComponent from '../views/Cart.vue';

describe('CartComponent - Расчет суммы в корзине с изменениями количества товара', () => {
  let store;
  let state;
  let getters;
  let mutations;

  beforeEach(() => {
    // Инициализируем состояние корзины
    state = {
      cart: [],
    };

    // Определяем геттеры для корзины и общей суммы
    getters = {
      cart: state => state.cart,
      totalQuantity: state => state.cart.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    // Определяем мутации для добавления товара и обновления количества
    mutations = {
      ADD_TO_CART: (state, product) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += product.quantity;
        } else {
          state.cart.push({ ...product });
        }
      },
      UPDATE_QUANTITY: (state, { productId, quantity }) => {
        const item = state.cart.find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      },
    };

    // Создаем мокированный Vuex store
    store = createStore({
      state,
      getters,
      mutations,
    });
  });

  it('calculates the correct amount when the quantity of goods changes', async () => {
    // Монтируем компонент корзины с мокированным store
    const wrapper = mount(CartComponent, {
      global: {
        plugins: [store],
      },
    });

    // Добавляем два товара в корзину
    const product1 = {
      id: 1,
      title: 'Товар 1',
      price: 10,
      quantity: 2,
      image: 'image1.jpg',
    };

    const product2 = {
      id: 2,
      title: 'Товар 2',
      price: 20,
      quantity: 1,
      image: 'image2.jpg',
    };

    // Добавляем товары в состояние корзины через мутацию
    store.commit('ADD_TO_CART', product1);
    store.commit('ADD_TO_CART', product2);

    // Обновляем компонент после изменения состояния
    await wrapper.vm.$nextTick();

    // Вычисляем ожидаемую общую сумму
    const expectedTotalPrice = product1.price * product1.quantity + product2.price * product2.quantity;

    // Находим элемент, отображающий общую сумму
    const totalPriceElement = wrapper.find('.cart-summary p:nth-child(2) strong');

    // Проверяем, что отображаемая сумма соответствует ожидаемой
    expect(totalPriceElement.text()).toBe(`${expectedTotalPrice.toLocaleString()} $.`);

    // Изменяем количество товара 1
    store.commit('UPDATE_QUANTITY', { productId: 1, quantity: 3 });

    // Обновляем компонент после изменения количества
    await wrapper.vm.$nextTick();

    // Вычисляем новую ожидаемую общую сумму
    const newExpectedTotalPrice = product1.price * 3 + product2.price * product2.quantity;

    // Проверяем, что отображаемая сумма обновилась правильно
    expect(totalPriceElement.text()).toBe(`${newExpectedTotalPrice.toLocaleString()} $.`);
  });
});
