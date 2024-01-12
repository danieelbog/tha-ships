import { defineStore } from 'pinia';
import { createApp, defineAsyncComponent, ref } from 'vue';
import { ICountryInfo } from '@/src/types/ICountryInfo';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

export const useMapMarkerStore = defineStore('mapmarker', () => {
    const markers = ref<Marker[]>([]);

    const addMarkers = (countries: ICountryInfo[], map: Map) => {
        countries.forEach((countryInfo) => {
            const markerElement = document.createElement('div');

            const marker = new mapboxgl.Marker({ element: markerElement })
                .setLngLat([countryInfo.latlng[1], countryInfo.latlng[0]])
                .addTo(map);

            const MapMarker = defineAsyncComponent(
                () => import('@/components/cards/map/map-marker.vue')
            );

            const app = createApp(MapMarker, { countryInfo, marker });
            app.mount(markerElement);

            markers.value.push(marker);
        });
    };

    const removeMarkers = () => {
        if (!markers.value || markers.value.length === 0) return;
        markers.value.forEach((marker) => {
            marker.remove();
        });
        markers.value = [];
    };

    return {
        addMarkers,
        removeMarkers
    };
});
