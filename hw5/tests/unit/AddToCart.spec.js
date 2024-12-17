import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';
import ProductComponent from '../../src/views/ProductDetail.vue';

// Мокируем useRoute из 'vue-router'
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      productId: 1,
    },
  }),
}));

describe('ProductComponent - Добавление в корзину', () => {
  const mockProduct = {
    id: 1,
    title: 'Тестовый продукт',
    description: 'Описание тестового продукта',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.5,
      count: 10,
    },
  };

  let store;
  let commitSpy;

  beforeEach(() => {
    // Создаем мокированный Vuex store
    store = createStore({
      state: { product: null, cart: [] },
      getters: {
        product: state => state.product,
      },
      actions: {
        fetchProduct: vi.fn(({ commit }, productId) => {
          // Имитация успешного получения продукта
          commit('SET_PRODUCT', mockProduct);
        }),
      },
      mutations: {
        SET_PRODUCT: (state, product) => {
          state.product = product;
        },
        ADD_TO_CART: vi.fn(),
      },
    });

    // Спайим на мутацию 'ADD_TO_CART'
    commitSpy = vi.spyOn(store, 'commit');

    // Мокируем глобальную функцию fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call ADD_TO_CART with correct product when click on button "В корзину"', async () => {
    const wrapper = mount(ProductComponent, {
      global: {
        plugins: [store],
      },
    });

    // Ждем выполнения onMounted и fetchProduct
    await wrapper.vm.$nextTick();

    // Находим кнопку "В корзину"
    const addButton = wrapper.find('button.btn');
    expect(addButton.exists()).toBe(true);

    // Симулируем клик по кнопке
    await addButton.trigger('click');

    // Проверяем, что мутация 'ADD_TO_CART' была вызвана с правильным продуктом
    expect(commitSpy).toHaveBeenCalledWith('ADD_TO_CART', mockProduct);
  });

  it('displays product when it was loaded', async () => {
    const wrapper = mount(ProductComponent, {
      global: {
        plugins: [store],
      },
    });

    // Ждем выполнения onMounted и fetchProduct
    await wrapper.vm.$nextTick();

    // Проверяем, что название продукта отображается
    expect(wrapper.find('.product-title').text()).toBe(mockProduct.title);
    // Проверяем, что описание продукта отображается
    expect(wrapper.find('.product-description').text()).toBe(mockProduct.description);
    // Проверяем, что цена продукта отображается
    expect(wrapper.find('.product-price span').text()).toBe(`${mockProduct.price} $`);
    // Проверяем, что рейтинг отображается
    expect(wrapper.find('.product-rating span').text()).toBe(`${mockProduct.rating.rate}`);
    // Проверяем, что количество отображается
    expect(wrapper.find('.product-stock span').text()).toBe(`${mockProduct.rating.count}`);
  });

  it('displays "Загрузка..." while product is still loading', async () => {
    // Мокируем fetch так, чтобы продукт не загрузился
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    // Мокируем действие fetchProduct, чтобы оно не устанавливал продукт
    store.dispatch = vi.fn(({ commit }, productId) => {
      // Не вызываем commit('SET_PRODUCT')
      return Promise.resolve();
    });

    const wrapper = mount(ProductComponent, {
      global: {
        plugins: [store],
      },
    });

    // Ждем выполнения onMounted и fetchProduct
    await wrapper.vm.$nextTick();

    // Проверяем, что отображается текст "Загрузка..."
    expect(wrapper.find('.loading-text').text()).toBe('Загрузка...');
  });
});
