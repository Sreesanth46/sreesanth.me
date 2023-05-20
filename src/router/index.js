import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../components/Navbar.vue';

const routes = [
	{
		path: '/',
		name: 'navbar',
		component: Navbar,
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
