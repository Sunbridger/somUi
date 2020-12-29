<template>
    <div class="som-wing-bank" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SomWingBank',
    props: {
        size: {
            type: String,
            default: '16px'
        }
    },
    computed: {
        styles () {
            return { marginLeft: `${this.size}`, marginRight: `${this.size}` };
        }
    }
};
</script>
