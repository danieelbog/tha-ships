<template>
    <a class="marker" @click="onMarkerClick">
        <img src="@/assets/images/blue-marker.png" alt="Marker" />
    </a>
</template>

<script lang="ts">
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';
import { ICountryInfo } from '@/src/types/ICountryInfo';
import { Marker } from 'mapbox-gl';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        countryInfo: {
            type: Object as () => ICountryInfo,
            required: true
        },
        marker: {
            type: Object as () => Marker,
            required: true
        }
    },
    setup(props) {
        const { focusToCountry } = useMapboxStore();
        const onMarkerClick = () => {
            focusToCountry(
                props.countryInfo.latlng[0],
                props.countryInfo.latlng[1],
                props.countryInfo.name.common
            );
        };
        return { onMarkerClick };
    }
});
</script>

<style scoped>
.marker {
    width: 30px;
    height: 30px;
}
</style>
