<template>
    <MainWrapper>
        <template #controls>
            <FormControl
                :filter="filter"
                :averagePopulation="averagePopulation"
                :showFancy="showFancy"
                @filterUpdate="onFilterUpdate"
                @showFancyClicked="onShowFancyClicked">
            </FormControl>
        </template>
        <template #content>
            <CountryWrapper>
                <template #default>
                    <Loader v-if="showLoader"></Loader>
                    <div v-if="countryInfos.length > 0 || showLoader">
                        <template v-if="showFancy">
                            <FancyCountryCard
                                v-for="countryInfo in countryInfos"
                                :key="countryInfo.name.common"
                                :countryInfo="countryInfo"></FancyCountryCard>
                        </template>
                        <template v-else>
                            <CountryCard
                                v-for="countryInfo in countryInfos"
                                :key="countryInfo.name.common"
                                :countryInfo="countryInfo"></CountryCard>
                        </template>
                    </div>
                    <h4 v-else class="p-2">No Countries Found</h4>
                </template>
            </CountryWrapper>
            <MapWrapper>
                <template #map>
                    <MapCard :countryInfos="countryInfos"></MapCard>
                </template>
            </MapWrapper>
        </template>
    </MainWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ICountryInfo } from '@/src/types/ICountryInfo';
import { IFilter } from '@/src/types/IFilter';
import { useCountriesStore } from '@/src/stores/countries/countries.store';
import { getFilteredNumericArray, getFilteredTextArray } from '@/src/utils/arrays/filter-array';
import { sortArray } from '@/utils/arrays/sort-array';
import { getRouterParameter } from '@/src/router';
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';

import MainWrapper from '@/components/layouts/wrappers/main/main-wrapper.vue';
import CountryWrapper from '@/components/layouts/wrappers/country/country-wrapper.vue';
import MapWrapper from '@/components/layouts/wrappers/map/map-wrapper.vue';
import CountryCard from '@/components/cards/country/country-card.vue';
import FancyCountryCard from '@/components/cards/fancy-country/fancy-country-card.vue';
import MapCard from '@/components/cards/map/map-card.vue';
import FormControl from '@/components/controls/form-controls.vue';
import Loader from '@/components/layouts/loader/loader.vue';

export default defineComponent({
    components: {
        MainWrapper,
        CountryWrapper,
        MapWrapper,
        CountryCard,
        FancyCountryCard,
        MapCard,
        FormControl,
        Loader
    },
    setup() {
        const filter = ref<IFilter>({});
        const countryInfos = ref<ICountryInfo[]>([]);
        const showFancy = ref(true);
        const showLoader = ref(true);

        const { getCountries } = useCountriesStore();
        const { focusToCountry, unfocus } = useMapboxStore();

        const onShowFancyClicked = (value: boolean) => {
            showFancy.value = value;
        };

        const onFilterUpdate = async (newFilter: IFilter) => {
            filter.value = newFilter;
            updateCountryInfos();
        };

        const updateCountryInfos = async () => {
            showLoader.value = true;
            const countries = await getCountries();

            const filteredCountries =
                typeof filter.value.searchValue === 'number'
                    ? getFilteredNumericArray(filter.value, [...countries])
                    : getFilteredTextArray(filter.value, [...countries]);

            let sortedCountries = [...filteredCountries];

            if (sortedCountries.length > 1 && filter.value.sortOrder)
                sortedCountries = sortArray(filter.value, sortedCountries);

            countryInfos.value = sortedCountries;

            if (countryInfos.value.length === 1) {
                const { latlng, name } = countryInfos.value[0];
                focusToCountry(latlng[0], latlng[1], name.common);
            } else unfocus();
            showLoader.value = false;
        };

        const averagePopulation = computed(() => {
            return (
                countryInfos.value.reduce(
                    (accumulator, country) => accumulator + country.population,
                    0
                ) / countryInfos.value.length
            );
        });

        const initialize = async () => {
            const routeParameter = getRouterParameter();
            const countries = await getCountries();

            if (!routeParameter) countryInfos.value = countries;
            else {
                filter.value = {
                    selectedProperty: 'common',
                    searchValue: routeParameter,
                    selectedFilter: 'eq',
                    sortOrder: undefined
                };
                updateCountryInfos();
            }

            showLoader.value = false;
        };

        onMounted(async () => {
            initialize();
        });

        return {
            filter,
            countryInfos,
            showFancy,
            averagePopulation,
            showLoader,
            onShowFancyClicked,
            onFilterUpdate
        };
    }
});
</script>
