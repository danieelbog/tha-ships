import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { routes } from "@/views/index";

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const isRouteAnonymous = to.matched.some((record) => record.meta.allowAnonymous);

	if (!authStore.isAuthenticated() && !isRouteAnonymous) {
		try {
			await authStore.getAuthTokenFromLocalStorage();
			if (authStore.isAuthenticated()) next();
			else next({ path: "/login", query: { redirect: to.fullPath } });
		} catch (error) {
			console.error("Navigation error:", error);
			next({ path: "/login", query: { redirect: to.fullPath } });
		}
	} else {
		next();
	}
});

export default router;
