<template>
    <div class="som-flow"
        :class="{'som-flow--flexable': flexable,
            'som-flow--vertical': orientation === 'vertical'}">
        <div class="som-flow__bd">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SomFlow',
    props: {
        orientation: {
            type: String,
            default: 'horizontal'
        },
        titleLength: {
            type: Number,
            default: 4
        },
        itemWidth: String,
        flexable: Boolean
    }
};
</script>
