<template>
    <FormError v-if="showErrorMessage" :errorMessage="errorMessage"></FormError>
    <div v-else class="h-100 border-0 bg-transparent pb-1" ref="mapContainer"></div>
</template>

<script lang="ts">
import { useMapboxStore } from '@/src/stores/mapboxgl/mapboxgl';
import { defineComponent, onMounted, ref } from 'vue';
import { Map } from 'mapbox-gl';
import FormError from '@/components/layouts/form-errors/form-error.vue';
import { useAuthStore } from '@/src/stores/auth/auth.store';

export default defineComponent({
    components: {
        FormError
    },
    setup() {
        const mapContainer = ref<HTMLElement | null>(null);
        const map = ref<Map | null>(null);
        const { getAuthToken } = useAuthStore();
        const { getMap } = useMapboxStore();
        const showErrorMessage = ref(false);
        const errorMessage = ref('');

        const handleInitializationError = (error: any) => {
            [showErrorMessage.value, errorMessage.value] = [true, error.message];
        };

        const initializeMap = () => {
            [showErrorMessage.value, errorMessage.value] = [false, ''];

            map.value = getMap(mapContainer.value as HTMLElement, getAuthToken());

            map.value.on('load', () => {
                map.value?.resize();
            });

            map.value.on('error', (response) => handleInitializationError(response.error));
        };

        onMounted(initializeMap);

        return { mapContainer, errorMessage, showErrorMessage };
    }
});
</script>

<style>
.mapboxgl-control-container {
    display: none !important;
}
</style>
