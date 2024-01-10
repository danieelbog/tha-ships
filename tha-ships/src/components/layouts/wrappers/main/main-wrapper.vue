<template>
    <div class="container main-wrapper">
        <div class="row">
            <div class="col-12 p-2 my-4 border rounded">
                <slot name="controls"></slot>
            </div>
            <div ref="contentContainer" class="col-12">
                <div class="row content-container">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {}
});
</script>

<style scoped>
.main-wrapper {
    height: 100vh;
    max-height: 100vh;
}

.content-container {
    overflow: hidden;
    height: 76vh;
}
</style>
