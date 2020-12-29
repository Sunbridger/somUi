<template>
    <a class="som-segmented-control-item" 
        :class="classes" href="javascript:" 
        :style="style" 
        @click="onItemClick">
        <slot></slot>
    </a>
</template>

<script>
import { childMixin } from 'som-ui/src/mixins/multi-items';

export default {
    name: 'SomSegmentedControlItem',
    mixins: [childMixin],
    props: {
        disabled: Boolean
    },
    computed: {
        classes () {
            return {
                'small': this.$parent.small,
                'som-item-disable': this.disabled,
                'som-item-current': this.currentIndex === this.$parent.currentIndex,
                'som-item-first': this.currentIndex === 0,
                'som-item-last': this.currentIndex === this.$parent.$children.length - 1,
                'som-item-middle': this.currentIndex > 0 && this.currentIndex !== this.$parent.$children.length - 1
            }
        },
        style () {
            if (this.$parent.height) {
                return {
                    height: `${this.$parent.height}px`,
                    lineHeight: `${this.$parent.height}px`
                }
            }
        }
    }
}
</script>
