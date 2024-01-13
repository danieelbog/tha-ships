<template>
    <div class="form-floating">
        <input :id="id" class="form-control" :type="inputType" v-model="localModelValue" />
        <label :for="id">
            <div class="d-flex stroke">
                <Info v-if="inputType === 'text'" :infoText="infoText"></Info>
                <span v-if="showMandatory" class="text-danger">*</span>
            </div>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    props: {
        id: String,
        modelValue: {
            type: [String, Number]
        },
        inputType: {
            type: String as () => 'text' | 'number' | 'email',
            default: 'text'
        },
        infoText: {
            type: String,
            default: ''
        },
        showMandatory: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const localModelValue = ref(props.modelValue);
        watch(localModelValue, (newVal: string | number | undefined) => {
            emit('updateInput', props.inputType == 'text' ? newVal?.toString() : Number(newVal));
        });

        watch(
            () => props.modelValue,
            (newVal) => {
                localModelValue.value = newVal;
            }
        );

        return {
            localModelValue
        };
    }
});
</script>
