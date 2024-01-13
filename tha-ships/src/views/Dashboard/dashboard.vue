<template>
    <MainWrapper>
        <template #controls>
            <FormControl :filter="filter" @filterUpdate="onFilterUpdate"></FormControl>
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
                    <MapCard :countries="countryInfos"></MapCard>
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
import { getRouterParameter } from '@/src/router';
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';

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
import ControlsWrapper from '@/components/layouts/wrappers/controls/controls-wrapper.vue';
import FormControl from '@/components/controls/form-controls.vue';

export default defineComponent({
    components: {
        MainWrapper,
        CountryWrapper,
        MapWrapper,
        CountryCard,
        FancyCountryCard,
        // CountryFilter,
        // CountrySorter,
        // SwitchInput,
        // Info,
        MapCard,
        FormControl
    },
    setup() {
        const filter = ref({} as IFilter);

        const countryInfos = ref<Array<ICountryInfo>>([]);
        const { getCountries } = useCountriesStore();

        const switchValue = ref(true);
        const onSwitchClicked = (value: boolean) => {
            switchValue.value = value;
        };

        const { focusToCountry, unfocus } = useMapboxStore();
        const onFilterUpdate = async (filter: IFilter) => {
            const countries = await getCountries();
            countryInfos.value =
                typeof filter.searchValue === 'number'
                    ? getFilteredNumericArray(filter, countries)
                    : getFilteredTextArray(filter, countries);

            if (countryInfos.value.length == 1) {
                focusToCountry(
                    countryInfos.value[0].latlng[0],
                    countryInfos.value[0].latlng[1],
                    countryInfos.value[0].name.common
                );
            } else {
                unfocus();
            }
        };

        const onApplySort = (filter: IFilter) => {
            countryInfos.value = sortArray(filter, countryInfos.value);
        };

        onMounted(async () => {
            const countries = await getCountries();
            const routeParameter = getRouterParameter();

            if (!routeParameter) {
                countryInfos.value = countries;
                return;
            }

            const filter: IFilter = {
                selectedProperty: 'common',
                searchValue: routeParameter,
                selectedFilter: 'eq'
            };

            countryInfos.value = getFilteredTextArray(filter, await getCountries());

            focusToCountry(
                countryInfos.value[0].latlng[0],
                countryInfos.value[0].latlng[1],
                countryInfos.value[0].name.common
            );
        });

        return { filter, countryInfos, switchValue, onSwitchClicked, onFilterUpdate, onApplySort };
    }
});
</script>
