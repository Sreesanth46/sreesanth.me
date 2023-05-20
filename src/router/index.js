import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue';

const routes = [
	{
		path: '/',
		name: 'board',
		component: Board,
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
