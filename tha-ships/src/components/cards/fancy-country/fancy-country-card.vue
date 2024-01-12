<template>
    <div class="card bg-dark text-white mb-3 border-0">
        <img
            :src="countryInfo.flags.png"
            class="card-img img-fluid rounded"
            :alt="countryInfo.flag" />
        <div class="transparent-mask"></div>
        <div class="card-img-overlay text-center">
            <h3 class="text-center border-bottom">{{ countryInfo.name.common }}</h3>
            <FancyCountryCapital :capital="countryInfo.capital"></FancyCountryCapital>
            <FancyCountryPopulation :population="countryInfo.population"></FancyCountryPopulation>
            <FancyCountryBorders :borders="countryInfo.borders"></FancyCountryBorders>
            <button type="button" class="btn btn-primary" @click="onFocusOnMapClick">
                Focus on Map
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ICountryInfo } from '@/types/ICountryInfo';
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';

import FancyCountryCapital from './fancy-country-capital.vue';
import FancyCountryPopulation from './fancy-country-population.vue';
import FancyCountryBorders from './fancy-country-boders.vue';

export default defineComponent({
    components: {
        FancyCountryCapital,
        FancyCountryPopulation,
        FancyCountryBorders
    },
    props: {
        countryInfo: {
            type: Object as () => ICountryInfo,
            required: true
        }
    },
    setup(props) {
        const { focusToCountry } = useMapboxStore();
        const onFocusOnMapClick = () => {
            focusToCountry(
                props.countryInfo.latlng[0],
                props.countryInfo.latlng[1],
                props.countryInfo.name.common
            );
        };

        return { onFocusOnMapClick };
    }
});
</script>

<style scoped>
.transparent-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.7) 30%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none;
}

.card-img {
    max-height: 285px;
}
</style>
