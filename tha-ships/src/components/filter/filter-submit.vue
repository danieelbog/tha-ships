<template>
    <div class="input-group d-flex">
        <div class="form-floating">
            <input
                id="input-filter-search"
                class="form-control"
                v-model="internalsearchValue"
                :type="inputType" />
            <label for="input-filter-search">
                <div class="d-flex" style="pointer-events: stroke">
                    <Info
                        v-if="inputType == 'text'"
                        :infoText="'Search using commas to separate values. For example: Greece, Russia, Turkey.'">
                    </Info>
                    <span v-if="showMandatory" class="text-danger">*</span>
                </div>
            </label>
        </div>
        <button
            id="searchButton"
            class="btn btn-outline-danger"
            type="button"
            @click="resetFilterClick">
            Reset Filter
        </button>
        <button
            id="searchButton"
            class="btn btn-outline-primary"
            type="button"
            @click="applyFilterClick">
            Apply Filter
        </button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import Info from '../layouts/info/info.vue';

export default defineComponent({
    components: {
        Info
    },
    props: {
        showMandatory: {
            type: Boolean,
            required: false,
            default: false
        },
        searchValue: {
            type: [String, Number],
            required: false,
            default: ''
        },
        selectedProperty: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const internalsearchValue = ref(props.searchValue);

        watch(internalsearchValue, (newVal: string | number) => {
            emit(
                'searchValueEntered',
                inputType.value == 'text' ? newVal.toString() : Number(newVal)
            );
        });

        watch(
            () => props.searchValue,
            (newVal) => {
                internalsearchValue.value = newVal;
            }
        );

        const inputType = computed(() =>
            props.selectedProperty === 'population' ? 'number' : 'text'
        );

        const resetFilterClick = () => {
            emit('resetFilterClicked');
        };

        const applyFilterClick = () => {
            emit('applyFilterClicked');
        };

        return { internalsearchValue, inputType, resetFilterClick, applyFilterClick };
    }
});
</script>
