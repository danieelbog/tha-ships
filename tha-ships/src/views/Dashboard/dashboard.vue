<template>
    <MainWrapper>
        <template #controls>
            <CountryFilter></CountryFilter>
        </template>
        <template #content>
            <CountryWrapper>
                <template #default>
                    <FancyCountryCard
                        v-for="countryInfo in countryInfos"
                        :key="countryInfo.name.official"
                        :countryInfo="countryInfo"></FancyCountryCard>

                    <!-- <CountryCard
                        v-for="countryInfo in countryInfos"
                        :key="countryInfo.name.official"
                        :countryInfo="countryInfo">
                    </CountryCard> -->
                </template>
            </CountryWrapper>
            <MapWrapper>
                <template #default>Map</template>
            </MapWrapper>
        </template>
    </MainWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ICountryInfo } from '@/src/types/ICountryInfo';
import { useCountriesStore } from '@/src/stores/countries/countries.store';

import MainWrapper from '@/components/layouts/wrappers/main/main-wrapper.vue';
import CountryWrapper from '@/components/layouts/wrappers/country/country-wrapper.vue';
import MapWrapper from '@/components/layouts/wrappers/map/map-wrapper.vue';
import CountryCard from '@/components/cards/country/country-card.vue';
import FancyCountryCard from '@/components/cards/fancy-country/fancy-country-card.vue';
import CountryFilter from '@/components/filter/country-filter.vue';

export default defineComponent({
    components: {
        MainWrapper,
        CountryWrapper,
        MapWrapper,
        // CountryCard,
        FancyCountryCard,
        CountryFilter
    },
    setup() {
        const countryInfos = ref<Array<ICountryInfo>>([]);
        const countriesStore = useCountriesStore();

        onMounted(async () => {
            countryInfos.value = await countriesStore.getInitCountries();
        });

        return { countryInfos };
    }
});
</script>

<style></style>
