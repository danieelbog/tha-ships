<template>
    <div class="form-floating">
        <input :id="id" class="form-control" :type="inputType" v-model="localInputValue" />
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
import Info from '@/components/layouts/info/info.vue';

export default defineComponent({
    components: {
        Info
    },
    props: {
        id: String,
        inputValue: {
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
        const localInputValue = ref(props.inputValue);
        watch(localInputValue, (newVal: string | number | undefined) => {
            emit('updateInput', props.inputType == 'text' ? newVal?.toString() : Number(newVal));
        });

        watch(
            () => props.inputValue,
            (newVal) => {
                localInputValue.value = newVal;
            }
        );

        return {
            localInputValue
        };
    }
});
</script>
