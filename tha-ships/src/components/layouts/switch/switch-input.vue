<template>
    <div class="ms-2 form-check form-switch">
        <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            v-model="internalSwitchValue" />
        <label class="form-check-label" for="flexSwitchCheckDefault">{{ label }}</label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    props: {
        switchValue: {
            type: Boolean,
            required: false,
            default: true
        },
        label: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const internalSwitchValue = ref(true);

        watch(internalSwitchValue, (value) => {
            emit('switchClicked', value);
        });

        watch(
            () => props.switchValue,
            (newVal) => {
                internalSwitchValue.value = newVal;
            }
        );

        return {
            internalSwitchValue
        };
    }
});
</script>
