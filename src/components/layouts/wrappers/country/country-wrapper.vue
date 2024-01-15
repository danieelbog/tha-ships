<template>
    <div class="col-6 country-wrapper"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/assets/styles/scrollbar/solid-scrollbar.scss';

export default defineComponent({
    setup() {
        return {};
    }
});
</script>

<style scoped>
.country-wrapper {
    height: 100%;
    overflow-y: scroll;
}
</style>
