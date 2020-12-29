<template>
    <span class="som-flow-item"
        :style="{ 'width': itemWidth}" 
        :class="{'som-flow-item--done': isDone, 'som-flow-item--active': isActive}">
        
        
        <div class="som-flow-item__circle " :class="isSlot && 'circle-icon'" :style="circleStyle">
            <slot name="icon">{{ state }}</slot>
        </div>

        <div class="som-flow-item__line" :style="lineStyle"></div>
        <div class="som-flow-item__title">
            <slot name="title">
                <span :style="titleStyle">{{title}}</span>
            </slot>
        </div>
        
    </span>
</template>

<script>
export default {
    name: 'SomFlowItem',
    props: {
        state: [String, Number],
        title: String,
        isDone: Boolean,
        isActive: Boolean,
        acitveColor: String
    },
    data () {
        return {
            isSlot: false
        }
    },
    mounted () {
        this.isSlot = !!this.$slots.icon;
    },
    updated () {
        this.isSlot = !!this.$slots.icon;
    },
    computed: {
        titleLength () {
            return this.$parent.titleLength;
        },
        itemWidth () {
            return this.$parent.itemWidth;
        },
        circleStyle () {
            if (this.isDone || this.isActive) {
                return {color: this.acitveColor, borderColor: this.acitveColor};
            }
        },
        titleStyle() {
            return {width: this.titleLength * 12 + 'px'};
        },
        lineStyle () {
            if (this.isDone) {
                return {backgroundColor: this.acitveColor};
            }
        }
    }
}
</script>
