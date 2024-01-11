<template>
    <nav class="navbar navbar-expand-lg border-bottom p-2 mb-sm-0 shadow-sm sticky-top bg-white">
        <div class="w-100 d-flex justify-content-between">
            <router-link class="navbar-brand text-center text-sm-start m-0" to="/">
                Tha-Ships
            </router-link>
            <div class="d-flex">
                <Navigation></Navigation>
                <NavbarSettings></NavbarSettings>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import './navbar.scss';
import { defineComponent } from 'vue';
import NavbarSettings from './settings/settings.vue';
import Navigation from './navigation/navigation.vue';

export default defineComponent({
    components: {
        NavbarSettings,
        Navigation
    },
    setup() {}
});
</script>
