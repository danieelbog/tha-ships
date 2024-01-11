<template>
    <div id="error-message-help" class="form-text fst-italic fw-light m-0">
        <span
            ref="infoElement"
            class="material-icons-outlined p-1"
            style="font-size: medium; cursor: pointer"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="infoText">
            help_outline
        </span>
    </div>
</template>

<script lang="ts">
import { setTooltip } from '@/src/utils/ui/bootstrap-init';
import { defineComponent, nextTick, onMounted, ref } from 'vue';

export default defineComponent({
    props: {
        infoText: {
            type: String,
            required: true
        }
    },
    setup() {
        const infoElement = ref();

        onMounted(() => {
            nextTick(() => {
                setTooltip(infoElement.value);
            });
        });

        return { infoElement };
    }
});
</script>
