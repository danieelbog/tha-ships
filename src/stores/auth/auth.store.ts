import { ref } from 'vue';

import { IAuthToken } from '@/src/types/IAuthToken';
import { defineStore } from 'pinia';
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref<IAuthToken>();
    const { resetAuthToken } = useMapboxStore();

    const setAuthToken = (authTokenDto: IAuthToken) => {
        authToken.value = authTokenDto;
        saveAuthTokenToLocalStorage();
    };

    const getAuthToken = (): IAuthToken => {
        return authToken.value && !authToken.value.remember
            ? authToken.value
            : getStoredAuthToken();
    };

    const isAuthenticated = (): IAuthToken => {
        return authToken.value && !authToken.value.remember
            ? authToken.value
            : getStoredAuthToken();
    };

    const logout = async () => {
        clearAuthToken();
        resetAuthToken();
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

    return {
        getAuthToken,
        setAuthToken,
        isAuthenticated,
        logout
    };
});
