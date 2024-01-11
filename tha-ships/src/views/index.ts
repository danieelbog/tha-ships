import { IRouteMeta } from '@/types/IRouteMeta';
import { RouteRecordRaw } from 'vue-router';

export const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            allowAnonymous: true,
            noLayout: true,
            pageTitle: 'Tha-Ships | Login',
            showInNavigation: false
        } as IRouteMeta,
        component: () => import('./Login/login.vue')
    } as RouteRecordRaw,
    {
        path: '/',
        name: 'Dashboard',
        meta: {
            allowAnonymous: false,
            noLayout: false,
            pageTitle: 'Tha-Ships | Dashboard',
            showInNavigation: false
        } as IRouteMeta,
        component: () => import('./Dashboard/dashboard.vue')
    } as RouteRecordRaw
];
