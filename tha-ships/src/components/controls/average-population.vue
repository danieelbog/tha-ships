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

export default defineComponent({
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
