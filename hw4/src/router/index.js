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
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/Catalog.vue'),
    },
    {
      path: '/catalog/:productId',
      name: 'product',
      props: true,
      component: () => import('../views/ProductDetail.vue'),
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
