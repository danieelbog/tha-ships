<template>
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            v-model="localCheckValue"
            id="flexCheckDefault" />
        <label class="form-check-label" for="flexCheckDefault"> {{ label }} </label>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
    props: {
        checkValue: { type: Boolean, default: false },
        label: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const localCheckValue = ref(true);
        watch(localCheckValue, (value) => {
            emit('switchClicked', value);
        });

        watch(
            () => props.checkValue,
            (newVal) => {
                localCheckValue.value = newVal;
            }
        );

        return { localCheckValue };
    }
};
</script>
