<template>
    <div class="container h-100">
        <div class="row">
            <div class="col-12 my-3">
                <div class="accordion" id="controls-accordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#controls-collapse"
                                aria-expanded="true"
                                aria-controls="controls-collapse">
                                View Controls
                            </button>
                        </h2>
                        <div
                            id="controls-collapse"
                            class="accordion-collapse collapse show"
                            data-bs-parent="#controls-accordion">
                            <div class="accordion-body">
                                <slot name="controls"></slot>
                            </div>
                        </div>
                    </div>
                </div>
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
