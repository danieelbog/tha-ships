<template>
    <FilterWrapper>
        <template #errorMessage>
            <FormError
                v-if="showErrorMessage"
                :errorMessage="errorMessage"
                :infoText="'If at least one options is selected, all the other form inputs should be selected too.'">
            </FormError>
        </template>
        <template #propertySelect>
            <PropertiesSelect
                :id="'countryPropertyDropdown'"
                :label="'Select Country property:'"
                :filterProperties="filterProperties"
                :selectedOption="selectedProperty"
                :showMandatory="showMandatory"
                @optionSelected="updateCountrySelectedProperty">
            </PropertiesSelect>
        </template>
        <template #filterOptionSelect>
            <PropertiesSelect
                :id="'filterOptionDropdown'"
                :label="'Select Filter option:'"
                :filterProperties="
                    selectedProperty === 'population' ? numberFilterOptions : textFilterOptions
                "
                :selectedOption="selectedFilter"
                :showMandatory="showMandatory"
                @optionSelected="updateSelectedFilterOption">
            </PropertiesSelect>
        </template>
        <template #filterSearch>
            <FilterSubmit
                :showMandatory="showMandatory"
                :searchValue="searchValue"
                :selectedProperty="selectedProperty"
                @searchValueEntered="onSearchValueEntered"
                @resetFilterClicked="onResetFilterClicked"
                @applyFilterClicked="onApplyFilterClicked">
            </FilterSubmit>
        </template>
    </FilterWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue';

import PropertiesSelect from '@/components/select/properties-select.vue';
import FilterWrapper from '@/components/layouts/wrappers/filter/filter-wrapper.vue';
import FormError from '@/components/layouts/form-errors/form-error.vue';
import FilterSubmit from './filter-submit.vue';
import {
    IFilter,
    filterProperties,
    textFilterOptions,
    numberFilterOptions
} from '@/src/types/IFilter';

export default defineComponent({
    components: {
        FilterWrapper,
        FormError,
        PropertiesSelect,
        FilterSubmit
    },
    setup(props, { emit }) {
        const searchValue: Ref<string | number> = ref('');
        const selectedProperty = ref('');
        const selectedFilter = ref('');
        const errorMessage = ref('');
        const showErrorMessage = ref(false);

        const showMandatory = computed(
            () =>
                selectedProperty.value.length > 0 ||
                selectedFilter.value.length > 0 ||
                searchValue.value.toString().length > 0
        );

        const updateCountrySelectedProperty = (value: string) => {
            searchValue.value = '';
            selectedProperty.value = value;
        };

        const updateSelectedFilterOption = (value: string) => {
            selectedFilter.value = value;
        };

        const onSearchValueEntered = (value: string | number) => {
            searchValue.value = value;
        };

        const onResetFilterClicked = () => {
            showErrorMessage.value = false;
            errorMessage.value = '';
            searchValue.value = '';
            selectedFilter.value = '';
            selectedProperty.value = '';

            emitFilterValuesToParent(
                selectedProperty.value,
                selectedFilter.value,
                searchValue.value
            );
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

            emitFilterValuesToParent(
                selectedProperty.value,
                selectedFilter.value,
                searchValue.value
            );
        };

        const emitFilterValuesToParent = (
            selectedProperty: string,
            selectedFilter: string,
            searchValue: string | number
        ) => {
            emit('applyFilter', { selectedProperty, selectedFilter, searchValue } as IFilter);
        };

        return {
            selectedProperty,
            searchValue,
            filterProperties,
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
