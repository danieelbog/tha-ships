import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const api = createInstance('');
export { api };

function createInstance(baseURL: string) {
    const instance = axios.create({
        baseURL,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });

    instance.interceptors.response.use(undefined, function (error: any) {
        return new Promise(function (resolve, reject) {
            const originalRequest = error.config;
            console.error('api error', originalRequest);
            if (error.response.status === 401 && !originalRequest._retry) {
                const authStore = useAuthStore();
                resolve(authStore.logout());
            }
            reject(error);
        });
    });

    return instance;
}
