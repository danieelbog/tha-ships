<template>
    <div class="container main-grid">
        <div class="row">
            <div class="col-12 p-2 my-2 border rounded">
                <slot name="controls"></slot>
            </div>
            <div ref="contentContainer" class="col-12 border rounded">
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
.main-grid {
    height: calc(100vh - 20vh);
}

.content-container {
    overflow: hidden;
    height: calc(100vh - 30vh);
}
</style>
