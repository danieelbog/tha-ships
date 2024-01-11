<template>
    <div class="container main-wrapper">
        <div class="row">
            <div class="col-12 p-2 my-3 border rounded">
                <slot name="controls"></slot>
            </div>
            <div class="col-12">
                <div ref="contentContainer" class="row pb-4 content-container">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { setContainerHeight } from '@/src/utils/ui/wrapper-height-fix';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    setup() {
        const contentContainer = ref<HTMLElement>();

        onMounted(() => {
            if (contentContainer.value) setContainerHeight(contentContainer.value);
        });

        return {
            contentContainer
        };
    }
});
</script>

<style scoped>
.main-wrapper {
    height: 100vh;
    max-height: 100vh;
}

.content-container {
    overflow: hidden;
    height: 61vh;
}
</style>
