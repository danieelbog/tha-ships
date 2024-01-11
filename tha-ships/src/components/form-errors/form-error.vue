<template>
    <div class="text-danger fw-bold my-2 d-flex">
        {{ errorMessage }}
        <Info v-if="infoText" :infoText="infoText"> </Info>
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
        },
        infoText: {
            type: String,
            required: false
        }
    },
    setup() {
        return {};
    }
});
</script>
