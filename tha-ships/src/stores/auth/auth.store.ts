import { api } from '@/api/index';
import { IAuthToken } from '@/src/types/IAuthToken';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref<IAuthToken>();

    const setAuthToken = (authTokenDto: IAuthToken) => {
        authToken.value = authTokenDto;
        updateAuthorizationHeader();
        saveAuthTokenToLocalStorage();
    };

    const isAuthenticated = () => {
        return authToken.value && !authToken.value.remember
            ? authToken.value
            : getStoredAuthToken();
    };

    const logout = async () => {
        clearAuthToken();
        resetAuthorizationHeader();
    };

    const updateAuthorizationHeader = () => {
        api.defaults.headers.common['Authorization'] = 'Token ' + authToken.value;
    };

    const saveAuthTokenToLocalStorage = () => {
        if (authToken.value?.remember) {
            localStorage.setItem('authToken', JSON.stringify(authToken.value));
        }
    };

    const getStoredAuthToken = () => {
        const storedAuthTokenStr = localStorage.getItem('authToken');
        return storedAuthTokenStr ? JSON.parse(storedAuthTokenStr) : null;
    };

    const clearAuthToken = () => {
        if (authToken.value) authToken.value.token = '';
        localStorage.removeItem('authToken');
    };

    const resetAuthorizationHeader = () => {
        api.defaults.headers.common['Authorization'] = '';
    };

    return {
        setAuthToken,
        isAuthenticated,
        logout
    };
});
