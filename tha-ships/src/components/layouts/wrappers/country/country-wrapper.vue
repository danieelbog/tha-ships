<template>
    <div class="col-6 country-wrapper"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
    }
});
</script>

<style>
.country-wrapper {
    height: 100%;
    overflow-y: scroll;
}
</style>
