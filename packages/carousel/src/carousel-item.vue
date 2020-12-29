<template>
    <div class="som-carousel-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SomCarouselItem',
    mounted () {
        this.$nextTick(() => {
            this.$parent.rerender();
        });
    },
    beforeDestroy () /* istanbul ignore next */{
        const $parent = this.$parent;
        this.$nextTick(() => {
            $parent.rerender();
        });
    }
};
</script>
