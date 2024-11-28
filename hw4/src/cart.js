import { computed, reactive } from 'vue';

const cartState = reactive({
  items: [],
});

function addToCart(product) {
  const existingItem = cartState.items.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartState.items.push({ ...product, quantity: 1 });
  }
}

function removeFromCart(productId) {
  const index = cartState.items.findIndex(item => item.id === productId);
  if (index !== -1) {
    cartState.items.splice(index, 1);
  }
}

function removeAllFromCart() {
  cartState.items = [];
}

const totalQuantity = computed(() => {
  return cartState.items.reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = computed(() => {
  return cartState.items.reduce((total, item) => total + item.price * item.quantity, 0);
});

export default {
  cartState,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  totalQuantity,
  totalPrice,
};
