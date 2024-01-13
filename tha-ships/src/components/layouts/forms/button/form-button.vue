<template>
    <button :name="name" :type="type" :class="classes" @click="onClick">
        {{ label }}
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: {
        name: {
            type: String,
            default: ''
        },
        type: {
            type: String as () => 'button' | 'submit' | 'reset'
        },
        label: {
            type: String,
            default: ''
        },
        color: {
            type: String as () =>
                | 'primary'
                | 'secondary'
                | 'light'
                | 'success'
                | 'danger'
                | 'dark'
                | 'warning'
                | 'outline-primary'
                | 'outline-secondary'
                | 'outline-light'
                | 'outline-success'
                | 'outline-danger'
                | 'outline-dark'
                | 'outline-warning'
        },
        width: {
            type: String as () => 'w-100' | 'w-75' | 'w-50' | 'w-25',
            default: ''
        }
    },
    setup(props, { emit }) {
        const onClick = () => {
            emit('click');
        };

        const classes = computed(() => {
            return `btn btn-${props.color} ${props.width} d-flex justify-content-center align-items-center`;
        });

        return {
            onClick,
            classes
        };
    }
});
</script>
