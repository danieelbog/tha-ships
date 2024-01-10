<template>
    <div>
        <span v-if="showMandatory" class="text-danger">*</span>
        <div class="input-group">
            <input
                v-model="internalsearchValue"
                :type="inputType"
                class="form-control"
                placeholder="Filter value"
                aria-describedby="searchButton" />
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
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
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

        watch(internalsearchValue, (newVal) => {
            emit('searchValueEntered', newVal);
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
