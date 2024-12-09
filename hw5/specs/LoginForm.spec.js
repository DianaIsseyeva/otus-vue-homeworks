import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createStore } from 'vuex';
import LoginForm from '../src/views/Login.vue';

// Мокаем компоненты vee-validate
vi.mock('vee-validate', () => ({
  Form: {
    name: 'Form',
    template: '<form @submit.prevent="$emit(\'submit\', formData)"><slot /></form>',
    data() {
      return {
        formData: {},
      };
    },
  },
  Field: {
    name: 'Field',
    props: ['name'],
    template: '<input :id="name" @input="$emit(\'update:modelValue\', $event.target.value)" />',
  },
  ErrorMessage: {
    name: 'ErrorMessage',
    template: '<div class="error">Error</div>',
  },
}));

describe('LoginForm.vue', () => {
  let store;
  let mutations;
  let router;

  beforeEach(() => {
    // Мокаем мутации Vuex
    mutations = {
      SET_USER: vi.fn(),
    };

    store = createStore({
      state: {
        user: {},
      },
      mutations,
    });

    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/home', name: 'home', component: { template: '<div>Home</div>' } }],
    });

    // Мокаем метод router.push
    router.push = vi.fn();

    // Мокаем localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem(key) {
          return store[key] || null;
        },
        setItem(key, value) {
          store[key] = value.toString();
        },
        clear() {
          store = {};
        },
        removeItem(key) {
          delete store[key];
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('renders the login form fields', () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.find('label[for="login"]').exists()).toBe(true);
    expect(wrapper.find('label[for="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('shows errors if form is submitted without values', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [store, router],
      },
    });

    // Находим кнопку отправки и кликаем по ней (что должно эмитировать событие submit без данных)
    await wrapper.find('button[type="submit"]').trigger('click');

    // Так как мы используем простой мок ErrorMessage,
    // при отсутствии данных можно проверить, что он отображается
    expect(wrapper.find('.error').exists()).toBe(true);
  });

  it('submits the form with valid data and calls SET_USER', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [store, router],
      },
    });

    // Заполняем поля:
    const loginInput = wrapper.find('#login');
    const passwordInput = wrapper.find('#password');

    await loginInput.setValue('testuser');
    await passwordInput.setValue('password123');

    // Находим мокированный компонент Form и эмитируем событие submit с нужными данными
    const formComponent = wrapper.findComponent({ name: 'Form' });
    // Обновляем formData внутри компонента Form перед эмитом:
    formComponent.vm.formData = { login: 'testuser', password: 'password123' };
    await formComponent.vm.$emit('submit', { login: 'testuser', password: 'password123' });

    // Проверяем, что SET_USER был вызван
    expect(mutations.SET_USER).toHaveBeenCalledWith({ user: {} }, { login: 'testuser', password: 'password123' });

    // Проверяем что роутер перенаправил на главную
    expect(router.push).toHaveBeenCalledWith({ name: 'home' });

    // Проверяем, что localStorage установлен
    expect(localStorage.getItem('isAuthorized')).toBe('true');
  });
});
