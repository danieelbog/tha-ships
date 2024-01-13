<template>
    <FormError v-if="showErrorMessage" :errorMessage="errorMessage" />
    <div v-else class="h-100 border-0 bg-transparent stroke" ref="mapContainer"></div>
</template>

<script lang="ts">
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';
import { useMapMarkerStore } from '@/src/stores/mapboxgl/map-marker.store';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Map } from 'mapbox-gl';
import { useAuthStore } from '@/src/stores/auth/auth.store';
import { ICountryInfo } from '@/src/types/ICountryInfo';
import FormError from '@/components/layouts/forms/error/form-error.vue';

export default defineComponent({
    components: {
        FormError
    },
    props: {
        countries: {
            type: Array as () => ICountryInfo[],
            required: true
        }
    },
    setup(props) {
        const mapContainer = ref<HTMLElement | null>(null);
        const map = ref<Map | null>(null);
        const showErrorMessage = ref(false);
        const errorMessage = ref('');

        const { getAuthToken } = useAuthStore();
        const { getMap } = useMapboxStore();
        const { addMarkers, removeMarkers } = useMapMarkerStore();

        const handleInitializationError = (error: any) => {
            showErrorMessage.value = true;
            errorMessage.value = error.message;
        };

        const initializeMap = () => {
            showErrorMessage.value = false;
            errorMessage.value = '';

            map.value = getMap(mapContainer.value as HTMLElement, getAuthToken());

            map.value.on('load', () => {
                map.value?.resize();
                if (map.value) addMarkers(props.countries, map.value);
            });

            map.value.on('error', (response) => handleInitializationError(response.error));
        };

        onMounted(() => {
            initializeMap();
        });

        watch(
            () => props.countries,
            (newCountries) => {
                if (map.value) {
                    removeMarkers();
                    if (map.value) addMarkers(newCountries, map.value);
                }
            }
        );

        return { mapContainer, errorMessage, showErrorMessage };
    }
});
</script>

<style>
.mapboxgl-control-container {
    display: none !important;
}
</style>
