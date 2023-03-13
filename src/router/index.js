import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
var router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
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