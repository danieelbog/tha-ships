<template>
    <div class="p-2">
        <div class="row">
            <slot name="errorMessage"></slot>
            <div class="col-md-3 align-items-end align-self-end my-1">
                <slot name="countryPropertiesSelect"></slot>
            </div>
            <div class="col-md-3 align-items-end align-self-end my-1">
                <slot name="filterPropertiesSelect"></slot>
            </div>
            <div class="col-md-3 align-items-end align-self-end my-1">
                <slot name="searchInput"></slot>
            </div>
            <div class="col-md-3 align-items-end align-self-end my-1">
                <slot name="sortPropertiesSelect"></slot>
            </div>
        </div>
        <div class="row mb-1">
            <div class="col-md-5 align-items-end align-self-end my-1">
                <slot name="averagePopulation"></slot>
            </div>
            <div class="col-md-4 align-items-end align-self-end my-1">
                <slot name="fancySwitch"></slot>
            </div>
            <div class="col-md-3 d-flex justify-content-end">
                <slot name="formReset"></slot>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9 align-items-end align-self-end my-1"></div>
            <div class="col-md-3 d-flex justify-content-end">
                <slot name="formSubmit"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
