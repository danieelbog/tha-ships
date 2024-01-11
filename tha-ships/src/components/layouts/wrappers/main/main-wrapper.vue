<template>
    <div class="container h-100">
        <div class="row">
            <div class="col-12 p-2 my-3 border rounded">
                <slot name="controls"></slot>
            </div>
            <div class="col-12">
                <div class="row pb-4 content-container">
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
.content-container {
    overflow: hidden;
    height: 80vh;
}
</style>
