<template>
    <div class="my-1">
        <p v-if="capital.length > 0" class="card-title">Capital: {{ capital[0] }}</p>
        <p v-else>Has no official capital.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        capital: {
            type: Array<String>,
            required: false,
            default: []
        }
    },
    setup() {
        return {};
    }
});
</script>
