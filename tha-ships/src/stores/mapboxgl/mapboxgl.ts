import { IAuthToken } from '@/src/types/IAuthToken';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import mapboxgl from 'mapbox-gl';

export const useMapboxStore = defineStore('mapbox', () => {
    const mapbox = ref(mapboxgl);

    const getMapBox = () => {
        return mapbox;
    };

    const setAuthToken = (authTokenDto: IAuthToken) => {
        mapbox.value.accessToken = authTokenDto.token;
    };

    const resetAuthToken = () => {
        mapbox.value.accessToken = '';
    };

    return { getMapBox, setAuthToken, resetAuthToken };
});
