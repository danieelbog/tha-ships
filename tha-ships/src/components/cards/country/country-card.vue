<template>
    <div class="card my-2">
        <h3 class="card-header text-center">{{ countryInfo.name.common }}</h3>
        <div class="card-body text-center">
            <CountryCapital :capital="countryInfo.capital"></CountryCapital>
            <CountryPopulation :population="countryInfo.population"></CountryPopulation>
            <CountryBorders :borders="countryInfo.borders"></CountryBorders>
            <button type="button" class="btn btn-primary" @click="focusOnCountry">
                Focus on Map
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ICountryInfo } from '@/types/ICountryInfo';
import { useMapboxStore } from '@/src/stores/mapboxgl/mapboxgl';

import CountryCapital from './country-capital.vue';
import CountryPopulation from './country-population.vue';
import CountryBorders from './country-boders.vue';

export default defineComponent({
    components: {
        CountryCapital,
        CountryPopulation,
        CountryBorders
    },
    props: {
        countryInfo: {
            type: Object as () => ICountryInfo,
            required: true
        }
    },
    setup(props) {
        const mapboxStore = useMapboxStore();
        const focusOnCountry = () => {
            mapboxStore.focusToCountry(props.countryInfo.latlng[0], props.countryInfo.latlng[1]);
        };

        return { focusOnCountry };
    }
});
</script>

<style scoped>
.card-img {
    max-height: 275px;
}
</style>
