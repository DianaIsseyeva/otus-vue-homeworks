import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/:productId',
      name: 'product',
      props: true,
      component: () => import('../views/ProductDetail.vue'),
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: () => import('../views/Login.vue'),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to, from, next) => {
  return next();
  // const jwt = null
  //
  // if (!jwt && to.name !== 'home'){
  //   return next({ name: 'home' })
  // }
  //
  // return next()
});

export default router;
