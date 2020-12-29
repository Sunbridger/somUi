<template>
    <div class="som-flexbox-item" :style="style">
        <slot></slot>
    </div>
</template>

<script>
const prefixList = ['-moz-box-', '-webkit-box-', ''];

export default {
    name: 'SomFlexboxItem',
    props: {
        span: [Number, String],
        order: [Number, String]
    },
    beforeMount () {
        this.bodyWidth = document.documentElement.offsetWidth;
    },
    methods: {
        buildWidth (width) {
            if (typeof width === 'number') {
                if (width < 1) {
                    return width;
                } else {
                    return width / 12;
                }
            } else if (typeof width === 'string') {
                return width.replace('px', '') / this.bodyWidth;
            }
        }
    },
    computed: {
        style () {
            let styles = {};
            let marginName = this.$parent.orient === 'horizontal' ? 'marginRight' : 'marginTop';

            let gutter = this.$parent.gutter;
            if (gutter * 1 !== 0) {
                styles[marginName] = `${gutter}px`;
            }

            if (this.span) {
                for (let i = 0; i < prefixList.length; i++) {
                    styles[`${prefixList[i]}flex`] = `0 0 calc(${this.buildWidth(this.span) * 100}% - ${gutter}px)`;
                }
            }
            if (typeof this.order !== 'undefined') {
                styles.order = this.order;
            }
            return styles;
        }
    },
    data () {
        return {
            bodyWidth: 0
        };
    }
};
</script>
