<template>
    <div v-if="averagePopulation">
        <div class="d-flex">
            <Info :infoText="infoText"></Info>
            The average population of selected countries:
            <span class="fw-bolder"> {{ averagePopulation }}</span>
        </div>
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
        averagePopulation: {
            type: Number,
            default: undefined
        },
        infoText: {
            type: String,
            default: ''
        }
    }
});
</script>
