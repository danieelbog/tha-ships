<template>
    <main class="bg-light">
        <component :is="layoutComponent"></component>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, onMounted } from 'vue';
import { setBootstrapComponents } from '@/utils/bootstrap-init';
import router from '@/router/index';

export default defineComponent({
    setup() {
        const layoutComponent = computed(() => {
            return router.currentRoute.value.meta?.noLayout
                ? defineAsyncComponent(() => import('@/components/layouts/empty-layout.vue'))
                : defineAsyncComponent(() => import('@/components/layouts/default-layout.vue'));
        });

        onMounted(() => {
            setBootstrapComponents();

            document.getElementById('external-loader')?.remove();
        });

        return {
            layoutComponent
        };
    }
});
</script>
