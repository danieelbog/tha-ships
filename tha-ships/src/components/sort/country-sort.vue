<template>
    <SortWrapper>
        <template #errorMessage>
            <FormError v-if="showErrorMessage" :errorMessage="errorMessage"></FormError>
        </template>
        <template #propertySelect>
            <PropertiesSelect
                :id="'countrySortPropertyDropdown'"
                :label="'Select Country property:'"
                :filterProperties="filterProperties"
                :selectedOption="selectedProperty"
                :showMandatory="showMandatory"
                @optionSelected="updateCountrySelectedProperty">
            </PropertiesSelect
        ></template>
        <template #sortOption>
            <PropertiesSelect
                :id="'sortOptionDropdown'"
                :label="'Select Sort option:'"
                :filterProperties="sortProperties"
                :selectedOption="selectedSort"
                :showMandatory="showMandatory"
                @optionSelected="updateSelectedSortOption">
            </PropertiesSelect
        ></template>
        <template #sort>
            <SortSubmit
                @resetSortClicked="onResetSortClicked"
                @applySortClicked="onApplySortClicked">
            </SortSubmit>
        </template>
    </SortWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import SortWrapper from '@/components/layouts/wrappers/sorter/sorter-wrapper.vue';
import FormError from '@/components/layouts/form-errors/form-error.vue';
import PropertiesSelect from '@/components/select/properties-select.vue';
import SortSubmit from './sort-submit.vue';

import { IFilter, filterProperties, sortProperties } from '@/src/types/IFilter';

export default defineComponent({
    components: {
        SortWrapper,
        FormError,
        PropertiesSelect,
        SortSubmit
    },
    setup(props, { emit }) {
        const selectedProperty = ref('');
        const selectedSort = ref('');
        const errorMessage = ref('');
        const showErrorMessage = ref(false);

        const showMandatory = computed(
            () => selectedProperty.value.length > 0 || selectedSort.value.length > 0
        );

        const updateCountrySelectedProperty = (value: string) => {
            selectedProperty.value = value;
        };

        const updateSelectedSortOption = (value: string) => {
            selectedSort.value = value;
        };

        const onApplySortClicked = () => {
            const errorMessageMap: Record<string, string> = {
                selectedProperty: 'Please select one country property',
                selectedSort: 'Please select one sort option'
            };

            const showError = (field: string) => {
                showErrorMessage.value = true;
                errorMessage.value = errorMessageMap[field];
            };

            if (!selectedProperty.value && selectedSort.value) showError('selectedProperty');
            else if (!selectedSort.value && selectedProperty.value) showError('selectedSort');
            else {
                showErrorMessage.value = false;
                errorMessage.value = '';
            }

            if (showErrorMessage.value) return;

            emitSortValuesToParent(selectedProperty.value, selectedSort.value);
        };

        const onResetSortClicked = () => {
            showErrorMessage.value = false;
            errorMessage.value = '';
            selectedSort.value = '';
            selectedProperty.value = '';

            emitSortValuesToParent(selectedProperty.value, selectedSort.value);
        };

        const emitSortValuesToParent = (selectedProperty: string, selectedSort: string) => {
            emit('applySort', { selectedProperty, sortOrder: selectedSort } as IFilter);
        };

        return {
            selectedProperty,
            selectedSort,
            errorMessage,
            showErrorMessage,
            showMandatory,
            filterProperties,
            sortProperties,
            updateCountrySelectedProperty,
            updateSelectedSortOption,
            onResetSortClicked,
            onApplySortClicked
        };
    }
});
</script>
