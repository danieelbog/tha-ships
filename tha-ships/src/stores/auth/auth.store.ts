import { api } from '@/api/index';
import { defineStore } from 'pinia';
import { IAuthToken } from '../../types/IAuthToken';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref(null as IAuthToken | null);

    const setAuthToken = (authTokenDto: IAuthToken) => {
        localStorage.setItem('authToken', JSON.stringify(authTokenDto));
        authToken.value = authTokenDto;
        api.defaults.headers.common['Authorization'] = 'Token ' + authToken.value.token;
    };

    const isAuthenticated = () => {
        return authToken?.value?.token;
    };

    const getAuthTokenFromLocalStorage = () => {
        if (authToken.value && authToken?.value?.token) return;
        const storedAuthTokenStr = localStorage.getItem('authToken');
        const storedAuthToken = storedAuthTokenStr
            ? (JSON.parse(storedAuthTokenStr) as IAuthToken)
            : null;
        if (storedAuthToken && storedAuthToken.token) {
            setAuthToken(storedAuthToken);
        }
    };

    const getAuthToken = async (authTokenDto: IAuthToken) => {
        if (authToken.value && authToken?.value?.token) return;
        getAuthTokenFromLocalStorage();
        const response = await api.post('/api-token-auth/', authTokenDto);
        if (response.data) {
            authTokenDto.token = response.data.token;
            setAuthToken(authTokenDto);
        } else throw new Error('Token value is empty');
    };

    const resetAuthorizationHeader = () => {
        api.defaults.headers.common['Authorization'] = '';
    };

    const logout = async () => {
        authToken.value = null;
        resetAuthorizationHeader();
        localStorage.removeItem('authToken');
    };

    return {
        setAuthToken,
        isAuthenticated,
        getAuthToken,
        getAuthTokenFromLocalStorage,
        logout
    };
});
