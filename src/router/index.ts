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
    path: '/github',
    name: 'Github',
    redirect: '',
    beforeEnter() {
      window.open('http://github.com/Sreesanth46', '_blank');
      return false;
    }
  },
  {
    path: '/linkedin',
    name: 'Linkedin',
    redirect: '',
    beforeEnter() {
      window.open('http://linkedin.com/in/Sreesanth46', '_blank');
      return false;
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
