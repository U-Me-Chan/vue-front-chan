import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/thread/72'
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
