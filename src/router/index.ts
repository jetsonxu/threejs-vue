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
    {
        path: 'Text',
        name: 'Text',
        meta: {title: "Text Basic"},
        component: () => import('../views/demo/TextBasic.vue'),
    },
    {
        path: 'ThreeFree',
        name: 'ThreeFree',
        meta: {title: "ThreeFree"},
        component: () => import('../views/demo/ThreeFree.vue'),
    },
    {
        path: 'Level1',
        name: 'Level1',
        meta: {title: "Level1"},
        component: () => import('../views/demo/Level1.vue'),
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
