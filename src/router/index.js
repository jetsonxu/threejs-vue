import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
export var demoChildren = [
    {
        path: '',
        name: 'ThreeBasic',
        meta: { title: "First Demo" },
        component: function () { return import('../views/demo/ThreeBasic.vue'); },
    },
    {
        path: 'Line',
        name: 'Line',
        meta: { title: "Line Basic" },
        component: function () { return import('../views/demo/LineBasic.vue'); },
    },
    {
        path: 'Text',
        name: 'Text',
        meta: { title: "Text Basic" },
        component: function () { return import('../views/demo/TextBasic.vue'); },
    },
    {
        path: 'ThreeFree',
        name: 'ThreeFree',
        meta: { title: "ThreeFree" },
        component: function () { return import('../views/demo/ThreeFree.vue'); },
    },
    {
        path: 'Level1',
        name: 'Level1',
        meta: { title: "Level1" },
        component: function () { return import('../views/demo/Level1.vue'); },
    },
];
var router = createRouter({
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
            component: function () { return import('../views/DemoView.vue'); },
            children: demoChildren
        },
        {
            path: '/login',
            name: 'login',
            component: function () { return import('../views/LoginView.vue'); }
        }
    ]
});
export default router;
//# sourceMappingURL=index.js.map