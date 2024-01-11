import { api } from '@/api/index';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref('');
    const setAuthToken = (token: string) => {
        authToken.value = token;
        api.defaults.headers.common['Authorization'] = 'Token ' + authToken.value;
    };

    const isAuthenticated = () => {
        return authToken?.value;
    };

    const resetAuthorizationHeader = () => {
        api.defaults.headers.common['Authorization'] = '';
    };

    const logout = async () => {
        authToken.value = '';
        resetAuthorizationHeader();
    };

    return {
        setAuthToken,
        isAuthenticated,
        logout
    };
});
