<template>
    <RowHeaderWrapper>
        <h2 v-if="headerTitle.length > 0" class="text-center mt-5">
            {{ headerTitle }}
        </h2>
        <div v-if="messages.length > 0">
            <p
                v-for="(errorMessage, index) in messages"
                v-bind:key="index"
                class="text-center my-3"
                :class="[applyErrorStyle ? 'text-danger' : 'text-success']">
                {{ errorMessage }}
            </p>
        </div>
        <slot></slot>
    </RowHeaderWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import RowHeaderWrapper from '@/components/layouts/wrappers/forms/row-header-wrapper.vue';

export default defineComponent({
    components: {
        RowHeaderWrapper
    },
    props: {
        messages: {
            type: Array<String>,
            required: true
        },
        applyErrorStyle: {
            type: Boolean,
            required: false,
            default: false
        },
        headerTitle: {
            type: String,
            required: false,
            default: ''
        }
    }
});
</script>
