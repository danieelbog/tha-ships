<template>
    <ControlsWrapper>
        <template #errorMessage>
            <FormError
                v-if="showErrorMessage"
                :errorMessage="errorMessage"
                :infoText="'After selecting one option, pay attention to the form changes for mandatory values'">
            </FormError>
        </template>
        <template #countryPropertiesSelect>
            <FormFloatingSelect
                id="countryPropertyDropdown"
                label="Select Country property:"
                :filterProperties="filterTypes.filterProperties"
                :selectedOption="localFilter.selectedProperty"
                :showMandatory="showMandatory"
                @optionSelected="onCountryOptionsSelected">
            </FormFloatingSelect>
        </template>
        <template #filterPropertiesSelect>
            <FormFloatingSelect
                id="filterOptionDropdown"
                label="Select Filter option:"
                :filterProperties="filterOptions"
                :selectedOption="localFilter.selectedFilter"
                :showMandatory="showMandatory"
                @optionSelected="onFilterOptionsSelected">
            </FormFloatingSelect>
        </template>
        <template #searchInput>
            <FormInput
                id="input-filter-search"
                label="Search Input:"
                v-model="localFilter.searchValue"
                :type="inputType"
                :infoText="'Search using commas to separate values. For example: Greece, Russia, Turkey.'"
                :showMandatory="showMandatory">
            </FormInput>
        </template>
        <template #sortPropertiesSelect>
            <FormFloatingSelect
                id="sortOptionDropdown"
                label="Select Sort option:"
                :filterProperties="filterTypes.sortProperties"
                :selectedOption="localFilter.sortOrder"
                @optionSelected="onSortOptionsSelected"></FormFloatingSelect>
        </template>
        <template #formReset>
            <FormButton
                name="Reset control values"
                label="Reset Control"
                color="outline-danger"
                width="w-100"
                @click="onResetClick">
            </FormButton>
        </template>
        <template #formSubmit>
            <FormButton
                name="Submit control values"
                label="Submit Control"
                color="outline-primary"
                width="w-100"
                @click="onSubmitClick">
            </FormButton>
        </template>
        <template #averagePopulation>
            <AveragePopulationDisplay
                v-if="averagePopulation"
                :averagePopulation="averagePopulation"
                infoText="The average population of selected countries is updated on filtering">
            </AveragePopulationDisplay>
        </template>
        <template #fancySwitch>
            <SwitchInput
                label="Fancy Mode"
                @switchClicked="onSwitchClicked"
                :switchValue="showFancy">
            </SwitchInput>
            <Info infoText="If on small screens, switch off the Fancy Mode"></Info>
        </template>
        <template #submitControl> </template>
    </ControlsWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { ValidationStatus, validateFilterInputs } from '@/src/utils/arrays/filter-validator';
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';
import * as filterTypes from '@/src/types/IFilter';

import ControlsWrapper from '@/components/layouts/wrappers/controls/controls-wrapper.vue';
import FormError from '@/components/layouts/forms/error/form-error.vue';
import FormFloatingSelect from '@/components/layouts/forms/select/form-float-select.vue';
import FormInput from '@/components/layouts/forms/input/form-input.vue';
import FormButton from '@/components/layouts/forms/button/form-button.vue';
import Info from '@/components/layouts/info/info.vue';
import SwitchInput from '@/components/layouts/switch/switch-input.vue';
import AveragePopulationDisplay from './average-population.vue';

export default defineComponent({
    components: {
        ControlsWrapper,
        FormError,
        FormFloatingSelect,
        FormInput,
        FormButton,
        Info,
        SwitchInput,
        AveragePopulationDisplay
    },
    props: {
        filter: {
            type: Object as () => filterTypes.IFilter,
            required: true
        },
        averagePopulation: {
            type: Number,
            required: false
        },
        showFancy: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit }) {
        const localFilter = ref<filterTypes.IFilter>({});
        const errorMessage = ref('');
        const showErrorMessage = ref(false);

        onMounted(() => {
            localFilter.value = props.filter;
        });

        watch(
            () => props.filter,
            (newFilter) => {
                localFilter.value = newFilter;
            }
        );

        const showMandatory = computed<boolean>(() => {
            return !!localFilter.value.searchValue || !!localFilter.value.selectedFilter;
        });

        const inputType = computed(() =>
            localFilter.value.selectedProperty === 'population' ? 'number' : 'text'
        );

        const filterOptions = computed(() =>
            localFilter.value.selectedProperty === 'population'
                ? filterTypes.numberFilterOptions
                : filterTypes.textFilterOptions
        );

        const onCountryOptionsSelected = (value: filterTypes.FilterPropertiesOptions) => {
            localFilter.value.selectedProperty = value;
        };

        const onFilterOptionsSelected = (
            value: filterTypes.TextFilterOptions | filterTypes.NumberFilterOptions
        ) => {
            localFilter.value.selectedFilter = value;
        };

        const onSortOptionsSelected = (value: filterTypes.SortPropertiesOptions) => {
            localFilter.value.sortOrder = value;
        };

        const { unfocus } = useMapboxStore();
        const onResetClick = () => {
            showErrorMessage.value = false;
            errorMessage.value = '';

            localFilter.value = {
                searchValue: undefined,
                selectedFilter: undefined,
                selectedProperty: undefined,
                sortOrder: undefined
            };
            unfocus();
            emitFilterUpdate();
        };

        const onSubmitClick = () => {
            const errorMessageMap: Record<ValidationStatus, string> = {
                [ValidationStatus.SelectedProperty]: 'Please select one country property',
                [ValidationStatus.SelectedFilter]: 'Please select one filter option',
                [ValidationStatus.SearchValue]: 'Please enter a value in the input search',
                [ValidationStatus.Ok]: ''
            };

            const showError = (status: ValidationStatus) => {
                showErrorMessage.value = true;
                errorMessage.value = errorMessageMap[status];
            };

            const result = validateFilterInputs(localFilter.value);

            if (result !== ValidationStatus.Ok) {
                showError(result);
                return;
            }

            showErrorMessage.value = false;
            errorMessage.value = '';
            emitFilterUpdate();
        };

        const emitFilterUpdate = () => {
            emit('filterUpdate', localFilter.value);
        };

        const onSwitchClicked = (value: boolean) => {
            emit('showFancyClicked', value);
        };

        return {
            localFilter,
            errorMessage,
            showErrorMessage,
            showMandatory,
            filterTypes,
            inputType,
            filterOptions,
            onCountryOptionsSelected,
            onFilterOptionsSelected,
            onSortOptionsSelected,
            onResetClick,
            onSubmitClick,
            onSwitchClicked
        };
    }
});
</script>
