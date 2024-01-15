<template>
    <div class="p-2">
        <div class="row">
            <slot name="errorMessage"></slot>
            <div class="col-md-3 align-items-end align-self-end my-1">
                <slot name="propertySelect"></slot>
            </div>
            <div class="col-md-3 align-items-end align-self-end my-1">
                <slot name="sortOption"></slot>
            </div>
            <div class="col-md-6 align-items-end align-self-end my-1">
                <slot name="sort"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
    }
});
</script>
