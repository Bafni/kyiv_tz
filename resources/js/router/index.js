import {createRouter, createWebHistory} from 'vue-router'

import Main from "../views/Main.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main,
        meta: {
            title: 'Home Page',
            layout: 'main',
            auth: false
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'dark:text-white ',
    linkExactActiveClass: 'dark:text-white'
})
router.beforeEach((to, from, next) => {
        next()


});
export default router
