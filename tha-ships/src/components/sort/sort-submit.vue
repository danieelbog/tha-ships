<template>
    <div class="">
        <div class="row justify-content-end g-0 input-group">
            <button
                id="searchButton"
                class="col-6 btn btn-outline-danger"
                type="button"
                @click="resetSortClick">
                Reset Sort
            </button>
            <button
                id="searchButton"
                class="col-6 btn btn-outline-primary"
                type="button"
                @click="applySortClick">
                Apply Sort
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { useMapboxStore } from '@/src/stores/mapboxgl/map-boxgl.store';
import { defineComponent } from 'vue';

export default defineComponent({
    setup(props, { emit }) {
        const { unfocus } = useMapboxStore();

        const resetSortClick = () => {
            unfocus();
            emit('resetSortClicked');
        };

        const applySortClick = () => {
            emit('applySortClicked');
        };

        return { resetSortClick, applySortClick };
    }
});
</script>
