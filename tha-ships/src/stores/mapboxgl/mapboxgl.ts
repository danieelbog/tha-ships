import { IAuthToken } from '@/src/types/IAuthToken';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';

export const useMapboxStore = defineStore('mapbox', () => {
    const mapbox = ref(mapboxgl);
    const map = ref<Map>();

    const resetAuthToken = () => {
        mapbox.value.accessToken = '';
    };

    const getMap = (container: HTMLElement, authToken: IAuthToken): Map => {
        mapbox.value.accessToken = authToken.token;
        return (map.value = new mapbox.value.Map({
            container: container,
            zoom: 0
        }));
    };

    return { resetAuthToken, getMap };
});
