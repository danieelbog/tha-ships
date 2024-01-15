<template>
    <div class="nav-menu-dropdown-button btn-group">
        <button type="button" class="btn btn-outline-light" name="logout" @click="logout">
            <span class="material-icons-outlined text-dark">logout</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/src/stores/auth/auth.store';
import router from '@/src/router';

export default defineComponent({
    setup() {
        const logout = () => {
            const { logout } = useAuthStore();

            logout();
            logoutRedirect();
        };

        function logoutRedirect() {
            router.push({ path: '/login' });
        }

        return {
            logout
        };
    }
});
</script>
