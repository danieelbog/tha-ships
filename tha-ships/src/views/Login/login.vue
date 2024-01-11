<template>
    <LoginForm></LoginForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/login/login-form.vue';

export default defineComponent({
    components: {
        LoginForm
    },
    setup() {
        return {};
    }
});
</script>
