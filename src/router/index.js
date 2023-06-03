import { createRouter, createWebHistory } from 'vue-router'
import About from '../components/About.vue';

const routes = [
	{
		path: '/',
		name: 'About',
		component: About,
	},

	{
		path: '/project',
		name: 'Projects',
		component: () => import('../components/Projects.vue')	},

	{
		path: '/demo',
		name: 'Demos',
		component: () => import('../components/Demo.vue')	},

	{
		path: '/service',
		name: 'Services',
		component: () => import('../components/Services.vue')	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
