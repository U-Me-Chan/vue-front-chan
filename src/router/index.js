import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/thread/:id',
        component: () => import('../components/Thread.vue')
    },
    {
        path: '/board/:tag',
        component: () => import('../components/Board.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
