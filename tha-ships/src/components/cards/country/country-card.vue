<template>
    <div class="card my-2">
        <h3 class="card-header text-center">{{ countryInfo.name.official }}</h3>
        <div class="card-body text-center">
            <CountryCapital :capital="countryInfo.capital"></CountryCapital>
            <CountryPopulation :population="countryInfo.population"></CountryPopulation>
            <CountryBorders :borders="countryInfo.borders"></CountryBorders>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ICountryInfo } from '@/types/ICountryInfo';

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
        const hasBorders = computed(
            () => props.countryInfo.borders && props.countryInfo.borders.length > 0
        );

        return { hasBorders };
    }
});
</script>
