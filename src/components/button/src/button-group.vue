<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
const prefixCls = 'som-button-group';

export default {
    name: 'SomButtonGroup',
    props: {
        flexRank: String,
        right: Boolean
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}--${this.flexRank}`]: !!this.flexRank,
                    [`${prefixCls}--right`]: this.right
                }
            ];
        }
    }
};
</script>
