import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { useTitle } from '@vueuse/core';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

router.beforeEach((to) => {
  const { title } = to.meta;
  if (title && typeof title === 'string') {
    useTitle(title);
  }
});

export default router;
