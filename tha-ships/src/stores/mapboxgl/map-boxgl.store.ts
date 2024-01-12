import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IAuthToken } from '@/src/types/IAuthToken';
import mapboxgl, { Map } from 'mapbox-gl';
import router from '@/src/router';

export const useMapboxStore = defineStore('mapbox', () => {
    const mapbox = ref(mapboxgl);
    const map = ref<Map | null>(null);

    const resetAuthToken = () => {
        mapbox.value.accessToken = '';
    };

    const getMap = (container: HTMLElement, authToken: IAuthToken): Map => {
        mapbox.value.accessToken = authToken.token;
        return (map.value = new mapbox.value.Map({
            container: container,
            center: [0, 0],
            zoom: 0
        }));
    };

    const focusToCountry = (lat: number, lng: number, countryName: string) => {
        if (!map.value) return;

        const options = {
            center: [lng, lat],
            essential: true,
            zoom: 6,
            duration: 5000
        };

        //Yea this is bad, hope you can teach me a cleaner way to do it :/
        history.pushState(
            {},
            '',
            router.resolve({ name: 'Dashboard', params: { country: countryName } }).href
        );

        //@ts-ignore, flyTo option in Ts is outdated.
        map.value.flyTo(options);
    };

    const unfocus = () => {
        if (!map.value) return;

        const options = {
            center: [0, 0],
            essential: true,
            zoom: 0,
            duration: 5000
        };

        history.pushState(
            {},
            '',
            router.resolve({ name: 'Dashboard', params: { country: null } }).href
        );

        //@ts-ignore, flyTo option in Ts is outdated.
        map.value.flyTo(options);
    };

    return {
        mapbox,
        map,
        resetAuthToken,
        getMap,
        focusToCountry,
        unfocus
    };
});
