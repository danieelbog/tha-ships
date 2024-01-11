<template>
    <div class="container-fluid g-0 d-flex flex-column min-vh-100">
        <NavBar></NavBar>
        <router-view class="flex-grow-1"></router-view>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './navbar/navbar.vue';
import Footer from './footer/footer.vue';

export default defineComponent({
    components: {
        NavBar,
        Footer
    },
    setup() {
        return {};
    }
});
</script>

<style scoped></style>
