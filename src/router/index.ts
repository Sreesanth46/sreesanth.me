import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '~/pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('~/pages/Projects.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('~/pages/Resume')
  },
  { path: '*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
