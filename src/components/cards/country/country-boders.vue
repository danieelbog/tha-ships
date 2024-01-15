<template>
    <div class="my-1">
        <div v-if="hasBorders">
            <h5 class="card-text">Has borders with:</h5>
            <span
                class="badge rounded-pill bg-success mx-1 mb-3"
                v-for="(border, index) in borders"
                :key="index">
                {{ border }}<span v-if="index < borders.length - 1">, </span>
            </span>
        </div>
        <div v-else>
            <h5 class="card-text">Has no borders with other countries.</h5>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: {
        borders: {
            type: Array<String>,
            required: false,
            default: () => []
        }
    },
    setup(props) {
        const hasBorders = computed(() => props.borders.length > 0);
        return { hasBorders };
    }
});
</script>
