<template>
    <div class="ms-2 form-check form-switch">
        <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            v-model="localSwitchValue" />
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
        const localSwitchValue = ref(true);

        watch(localSwitchValue, (value) => {
            emit('switchClicked', value);
        });

        watch(
            () => props.switchValue,
            (newVal) => {
                localSwitchValue.value = newVal;
            }
        );

        return {
            localSwitchValue
        };
    }
});
</script>
