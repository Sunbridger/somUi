<template>
    <i :class="'som-icon-' + name" :style="styles"></i>
</template>

<script>
export default {
    name: 'SomIcon',
    props: {
        name: String,
        size: [Number, String],
        color: String
    },
    computed: {
        styles () {
            let style = {};

            if (this.size) {
                style['font-size'] = `${this.size}px`;
            }

            if (this.color) {
                style.color = this.color;
            }

            return style;
        }
    }
};
</script>
