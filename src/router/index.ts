import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { useTitle } from '@vueuse/core';
import { activeBlogSlug } from '~/utils/blog-layout';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 };
  },
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

router.beforeEach((to, from) => {
  const { title } = to.meta;
  if (title && typeof title === 'string') {
    useTitle(title);
  }

  // The blog being navigated to — or, when leaving a post, the one left
  // behind — is the only one whose title/meta should morph.
  const slug = to.params.slug ?? from.params.slug;
  activeBlogSlug.value = typeof slug === 'string' ? slug : undefined;
});

export default router;
