<template>
    <div class="text-danger fw-bold my-2 d-flex">
        {{ errorMessage }}
        <Info
            :infoText="'If at least one options is selected, all the other form inputs should be selected too.'">
        </Info>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Info from '@/components/layouts/info/info.vue';

export default defineComponent({
    components: {
        Info
    },
    props: {
        errorMessage: {
            type: String,
            required: true
        }
    },
    setup() {
        return {};
    }
});
</script>
