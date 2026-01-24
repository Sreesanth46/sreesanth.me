import { useTitle } from '@vueuse/core';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '~/pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('~/pages/Projects.vue'),
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('~/pages/Resume'),
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('~/pages/Blogs.vue'),
    children: [
      {
        path: ':slug',
        name: 'blogs.show',
        component: () => import('~/pages/BlogsShow.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { name } = to;
  if (typeof name === 'string' && !['blogs.show', 'Home'].includes(name)) {
    useTitle(`${name} - sh`);
  }
});

export default router;
