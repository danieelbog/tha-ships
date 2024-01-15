<template>
    <div class="my-1">
        <p class="card-text" v-if="population !== null">Population: {{ population }}</p>
        <p class="card-text" v-else>No population data available.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        population: {
            type: Number,
            required: false,
            default: null
        }
    },
    setup() {
        return {};
    }
});
</script>
