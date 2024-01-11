<template>
    <MainWrapper>
        <template #controls>
            <CountryFilter @applyFilter="onApplyFilter"></CountryFilter>
        </template>
        <template #content>
            <div class="d-flex">
                <SwitchInput :label="'Fancy Mode'" @switchClicked="onSwitchClicked"></SwitchInput>
                <Info :infoText="'If on small screens, switch off the Fancy Mode'"></Info>
            </div>
            <CountryWrapper>
                <template #default>
                    <div v-if="switchValue">
                        <FancyCountryCard
                            v-for="(countryInfo, index) in countryInfos"
                            :key="index"
                            :countryInfo="countryInfo"></FancyCountryCard>
                    </div>
                    <div v-else>
                        <CountryCard
                            v-for="(countryInfo, index) in countryInfos"
                            :key="index"
                            :countryInfo="countryInfo"></CountryCard>
                    </div>
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
import SwitchInput from '@/src/components/layouts/switch/switch-input.vue';
import Info from '@/components/layouts/info/info.vue';
import { IFilterApply } from '@/src/types/IFilter';

export default defineComponent({
    components: {
        MainWrapper,
        CountryWrapper,
        MapWrapper,
        CountryCard,
        FancyCountryCard,
        CountryFilter,
        SwitchInput,
        Info
    },
    setup() {
        const countryInfos = ref<Array<ICountryInfo>>([]);
        const countriesStore = useCountriesStore();

        const switchValue = ref(true);
        const onSwitchClicked = (value: boolean) => {
            switchValue.value = value;
        };

        const onApplyFilter = async (filterApplyDto: IFilterApply) => {
            console.log(await countriesStore.getCountries(filterApplyDto));
            countryInfos.value = await countriesStore.getCountries(filterApplyDto);
        };

        onMounted(async () => {
            countryInfos.value = await countriesStore.getCountries();
        });

        return { countryInfos, switchValue, onSwitchClicked, onApplyFilter };
    }
});
</script>

<style></style>
@/src/types/IFilter
