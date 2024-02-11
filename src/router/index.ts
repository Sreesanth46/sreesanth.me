import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '~/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/github',
    name: 'Github',
    redirect: '',
    beforeEnter() {
      location.href = 'http://github.com/Sreesanth46';
    }
  },
  {
    path: '/linkedin',
    name: 'Linkedin',
    redirect: '',
    beforeEnter() {
      location.href = 'https://www.linkedin.com/in/sreesanth46';
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
