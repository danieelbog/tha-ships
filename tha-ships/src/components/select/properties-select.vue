<template>
    <div class="">
        <label :for="id">{{ label }} <span v-if="showMandatory" class="text-danger">*</span></label>
        <select :id="id" class="form-select form-select" v-model="internalSelectedOption">
            <option
                v-for="property in Object.keys(filterProperties)"
                :key="property"
                :value="property">
                {{ filterProperties[property] }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        filterProperties: {
            type: Object as PropType<Record<string, string>>,
            required: true
        },
        selectedOption: {
            type: String,
            required: true
        },
        showMandatory: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props, { emit }) {
        const internalSelectedOption = ref('');

        watch(internalSelectedOption, (newVal) => {
            emit('optionSelected', newVal);
        });

        watch(
            () => props.selectedOption,
            (newVal) => {
                internalSelectedOption.value = newVal;
            }
        );

        return {
            internalSelectedOption
        };
    }
});
</script>
