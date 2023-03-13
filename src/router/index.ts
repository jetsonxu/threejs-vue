import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

export let demoChildren = [
    {
        path: '',
        name: 'ThreeBasic',
        meta: {title: "First Demo"},
        component: () => import('../views/demo/ThreeBasic.vue'),
    },
    {
        path: 'Line',
        name: 'Line',
        meta: {title: "Line Basic"},
        component: () => import('../views/demo/LineBasic.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('../views/DemoView.vue'),
            children: demoChildren
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        }
    ]
})


export default router
