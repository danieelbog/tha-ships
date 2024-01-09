<template>
    <div class="container-fluid g-0">
        <NavBar></NavBar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from "./navbar/navbar.vue";
import Footer from "./footer/footer.vue";

export default defineComponent({
    components: {
        NavBar,
        Footer
    },
    setup() {


        return {}
    }
})
</script>

<style scoped></style>