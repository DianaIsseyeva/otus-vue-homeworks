import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/:productId',
      name: 'product',
      props: true,
      component: () => import('../views/ProductDetail.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/create-product',
      name: 'create-product',
      props: true,
      component: () => import('../views/CreateProduct.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to, from, next) => {
  const isAuthorized = localStorage.getItem('isAuthorized');

  if (to.meta.requiresAuth && !isAuthorized) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
