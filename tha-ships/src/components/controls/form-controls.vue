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
                :filterProperties="
                    localFilter.selectedProperty === 'population'
                        ? filterTypes.numberFilterOptions
                        : filterTypes.textFilterOptions
                "
                :selectedOption="localFilter.selectedFilter"
                :showMandatory="showMandatory"
                @optionSelected="onFilterOptionsSelected">
            </FormFloatingSelect>
        </template>
        <template #searchInput>
            <div class="form-floating">
                <input
                    id="input-filter-search"
                    class="form-control"
                    v-model="localFilter.searchValue"
                    :type="inputType" />
                <label for="input-filter-search">
                    <div class="d-flex stroke">
                        <Info
                            v-if="inputType === 'text'"
                            :infoText="
                                inputType === 'text'
                                    ? 'Search using commas to separate values. For example: Greece, Russia, Turkey.'
                                    : ''
                            "></Info>
                        <span v-if="showMandatory" class="text-danger">*</span>
                    </div>
                </label>
            </div>
        </template>
        <template #sortPropertiesSelect>
            <FormFloatingSelect
                id="sortOptionDropdown"
                label="Select Sort option:"
                :filterProperties="filterTypes.sortProperties"
                :selectedOption="localFilter.sortOrder"
                @optionSelected="onSortOptionsSelected">
            </FormFloatingSelect>
        </template>
        <template #formReset>
            <button
                name="Reset control values"
                type="button"
                class="btn btn-outline-danger w-100 d-flex justify-content-center align-items-center"
                @click="onResetClick">
                Reset Control
            </button>
        </template>
        <template #formSubmit>
            <button
                name="Submit control values"
                type="button"
                class="btn btn-outline-primary w-100 w-100 d-flex justify-content-center align-items-center"
                @click="onSubmitClick">
                Submit Control
            </button>
        </template>
        <template #averagePopulation>population</template>
        <template #fancySwitch>fancy</template>
        <template #submitControl> </template>
    </ControlsWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { ValidationStatus, validateFilterInputs } from '@/src/utils/arrays/filter-validator';
import * as filterTypes from '@/src/types/IFilter';

import ControlsWrapper from '@/components/layouts/wrappers/controls/controls-wrapper.vue';
import FormError from '@/components/layouts/form-errors/form-error.vue';
import FormFloatingSelect from './form-float-select.vue';
import Info from '../layouts/info/info.vue';
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';

export default defineComponent({
    components: {
        ControlsWrapper,
        FormError,
        Info,
        FormFloatingSelect
    },
    props: {
        filter: {
            type: Object as () => filterTypes.IFilter,
            required: true
        }
    },
    setup(props, { emit }) {
        const localFilter = ref<filterTypes.IFilter>({});
        const errorMessage = ref('');
        const showErrorMessage = ref(false);

        onMounted(() => {
            localFilter.value = props.filter;
        });

        watch(props.filter, (newFilter) => {
            localFilter.value = newFilter;
        });

        const showMandatory = computed(() => {
            if (localFilter.value.searchValue || localFilter.value.selectedFilter) return true;
            return false;
        });

        const inputType = computed(() =>
            localFilter.value.selectedProperty === 'population' ? 'number' : 'text'
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

        return {
            localFilter,
            errorMessage,
            showErrorMessage,
            showMandatory,
            filterTypes,
            inputType,
            onCountryOptionsSelected,
            onFilterOptionsSelected,
            onSortOptionsSelected,
            onResetClick,
            onSubmitClick
        };
    }
});
</script>
