import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/src/stores/auth/auth.store';
import { routes } from '@/views/index';

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const { isAuthenticated } = useAuthStore();
    const isRouteAnonymous = to.matched.some((record) => record.meta.allowAnonymous);

    if (!isAuthenticated() && !isRouteAnonymous) {
        try {
            if (isAuthenticated()) next();
            else next({ path: '/login', query: { redirect: to.fullPath } });
        } catch (error) {
            console.error('Navigation error:', error);
            next({ path: '/login', query: { redirect: to.fullPath } });
        }
    } else {
        next();
    }
});

export default router;

export const getRouterParameter = (): string => {
    const route = router.currentRoute.value;
    return route.params.country as string;
};
