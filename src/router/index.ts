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
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('~/pages/blogs/Blogs.vue'),
    children: [
      {
        path: ':slug',
        name: 'blogs.show',
        component: () => import('~/components/BlogsShow.vue'),
        props: true
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
