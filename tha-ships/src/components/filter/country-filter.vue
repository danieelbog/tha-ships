<template>
    <FilterWrapper>
        <template #errorMessage>
            <FilterError v-if="showErrorMessage" :errorMessage="errorMessage" />
        </template>
        <template #propertySelect>
            <FilterDropdown
                :id="'countryPropertyDropdown'"
                :label="'Select Country property:'"
                :options="filteredProperties"
                :selectedOption="selectedProperty"
                :showMandatory="showMandatory"
                @optionSelected="updateCountrySelectedProperty" />
        </template>
        <template #filterOptionSelect>
            <FilterDropdown
                :id="'filterOptionDropdown'"
                :label="'Select Filter option:'"
                :options="
                    selectedProperty === 'population' ? numberFilterOptions : textFilterOptions
                "
                :selectedOption="selectedFilter"
                :showMandatory="showMandatory"
                @optionSelected="updateSelectedFilterOption" />
        </template>
        <template #filterSearch>
            <FilterSearch
                :showMandatory="showMandatory"
                :searchValue="searchValue"
                :selectedProperty="selectedProperty"
                @searchValueEntered="onSearchValueEntered"
                @resetFilterClicked="onResetFilterClicked"
                @applyFilterClicked="onApplyFilterClicked" />
        </template>
    </FilterWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { ICountryInfo } from '@/types/ICountryInfo';

import FilterWrapper from '@/components/layouts/wrappers/filter/filter-wrapper.vue';
import FilterError from './filter-error.vue';
import FilterDropdown from './filter-dropdown.vue';
import FilterSearch from './filter-search.vue';
import { numberFilterOptions, textFilterOptions } from '@/src/utils/filter-options';

export default defineComponent({
    components: {
        FilterWrapper,
        FilterError,
        FilterDropdown,
        FilterSearch
    },
    setup() {
        const selectedProperty = ref('');
        const selectedFilter = ref('');
        const searchValue = ref('');
        const errorMessage = ref('');
        const showErrorMessage = ref(false);

        const countryInfoFilterProperties = {
            name: {
                official: ''
            },
            capital: [''],
            population: 0,
            borders: [''],
            independent: false,
            unMember: false,
            region: '',
            subregion: '',
            flag: ''
        } as ICountryInfo;

        const filteredProperties = computed(() => Object.keys(countryInfoFilterProperties));

        const showMandatory = computed(
            () =>
                selectedProperty.value.length > 0 ||
                selectedFilter.value.length > 0 ||
                searchValue.value.length > 0
        );

        const updateCountrySelectedProperty = (value: string) => {
            searchValue.value = '';
            selectedProperty.value = value;
        };

        const updateSelectedFilterOption = (value: string) => {
            searchValue.value = '';
            selectedFilter.value = value;
        };

        const onSearchValueEntered = (value: string | number) => {
            console.log('value', value);
            searchValue.value = value.toString();
        };

        const onResetFilterClicked = () => {
            showErrorMessage.value = false;
            errorMessage.value = '';
            searchValue.value = '';
            selectedFilter.value = '';
            selectedProperty.value = '';
        };

        const onApplyFilterClicked = () => {
            const errorMessageMap: Record<string, string> = {
                selectedProperty: 'Please select one country property',
                selectedFilter: 'Please select one filter option',
                searchValue: 'Please enter a value in the input search'
            };

            const showError = (field: string) => {
                showErrorMessage.value = true;
                errorMessage.value = errorMessageMap[field];
            };

            if (!selectedProperty.value && (selectedFilter.value || searchValue.value))
                showError('selectedProperty');
            else if (!selectedFilter.value && (selectedProperty.value || searchValue.value))
                showError('selectedFilter');
            else if (!searchValue.value && (selectedProperty.value || selectedProperty.value))
                showError('searchValue');
            else {
                showErrorMessage.value = false;
                errorMessage.value = '';
            }

            if (showErrorMessage.value) return;
            // Rest of your filter logic
        };

        return {
            selectedProperty,
            searchValue,
            filteredProperties,
            selectedFilter,
            numberFilterOptions,
            textFilterOptions,
            showErrorMessage,
            errorMessage,
            showMandatory,
            updateCountrySelectedProperty,
            updateSelectedFilterOption,
            onSearchValueEntered,
            onResetFilterClicked,
            onApplyFilterClicked
        };
    }
});
</script>
