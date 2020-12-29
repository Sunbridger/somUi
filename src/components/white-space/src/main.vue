<template>
    <div class="som-white-space" :style="styles"></div>
</template>

<script>

export default {
    name: 'SomWhiteSpace',
    props: {
        size: {
            type: String,
            default: '16px'
        }
    },
    computed: {
        styles () {
            return { height: `${this.size}` };
        }
    }
};
</script>
