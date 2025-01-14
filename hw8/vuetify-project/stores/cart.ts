// stores/cart.ts
import { defineStore } from 'pinia';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),
  getters: {
    itemCount: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
  actions: {
    addToCart(item: CartItem) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.items.push(item);
      }
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
  },
});
