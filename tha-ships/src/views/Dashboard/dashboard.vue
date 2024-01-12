<template>
    <MainWrapper>
        <template #controls>
            <CountryFilter @applyFilter="onApplyFilter"></CountryFilter>
            <CountrySorter @applySort="onApplySort"></CountrySorter>
            <div class="d-flex justify-content-end">
                <SwitchInput :label="'Fancy Mode'" @switchClicked="onSwitchClicked"></SwitchInput>
                <Info :infoText="'If on small screens, switch off the Fancy Mode'"></Info>
            </div>
        </template>
        <template #content>
            <CountryWrapper>
                <template #default>
                    <div v-if="switchValue">
                        <FancyCountryCard
                            v-for="(countryInfo, index) in countryInfos"
                            :key="index"
                            :countryInfo="countryInfo">
                        </FancyCountryCard>
                    </div>
                    <div v-else>
                        <CountryCard
                            v-for="(countryInfo, index) in countryInfos"
                            :key="index"
                            :countryInfo="countryInfo">
                        </CountryCard>
                    </div>
                </template>
            </CountryWrapper>
            <MapWrapper>
                <template #map>
                    <MapCard></MapCard>
                </template>
            </MapWrapper>
        </template>
    </MainWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ICountryInfo } from '@/src/types/ICountryInfo';
import { IFilter } from '@/src/types/IFilter';
import { useCountriesStore } from '@/src/stores/countries/countries.store';
import { getFilteredNumericArray, getFilteredTextArray } from '@/src/utils/arrays/filter-array';
import { sortArray } from '@/utils/arrays/sort-array';

import MainWrapper from '@/components/layouts/wrappers/main/main-wrapper.vue';
import CountryWrapper from '@/components/layouts/wrappers/country/country-wrapper.vue';
import MapWrapper from '@/components/layouts/wrappers/map/map-wrapper.vue';
import CountryCard from '@/components/cards/country/country-card.vue';
import FancyCountryCard from '@/components/cards/fancy-country/fancy-country-card.vue';
import CountryFilter from '@/components/filter/country-filter.vue';
import CountrySorter from '@/components/sort/country-sort.vue';
import SwitchInput from '@/src/components/layouts/switch/switch-input.vue';
import Info from '@/components/layouts/info/info.vue';
import MapCard from '@/components/cards/map/map-card.vue';

export default defineComponent({
    components: {
        MainWrapper,
        CountryWrapper,
        MapWrapper,
        CountryCard,
        FancyCountryCard,
        CountryFilter,
        CountrySorter,
        SwitchInput,
        Info,
        MapCard
    },
    setup() {
        const countryInfos = ref<Array<ICountryInfo>>([]);
        const countriesStore = useCountriesStore();

        const switchValue = ref(true);
        const onSwitchClicked = (value: boolean) => {
            switchValue.value = value;
        };

        const onApplyFilter = async (filter: IFilter) => {
            if (typeof filter.searchValue == 'number') {
                countryInfos.value = getFilteredNumericArray(
                    filter,
                    await countriesStore.getCountries()
                );
            } else {
                countryInfos.value = getFilteredTextArray(
                    filter,
                    await countriesStore.getCountries()
                );
            }
        };

        const onApplySort = (filter: IFilter) => {
            countryInfos.value = sortArray(filter, countryInfos.value);
        };

        onMounted(async () => {
            countryInfos.value = await countriesStore.getCountries();
        });

        return { countryInfos, switchValue, onSwitchClicked, onApplyFilter, onApplySort };
    }
});
</script>
