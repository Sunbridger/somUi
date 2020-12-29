<template>
    <div class="som-nav-bar" :class="[{'som-nav-bar--fill' : fill}, navbarClass]">
        <div class="som-nav-bar__left" @click="onLeftClick">
            <slot name="left">
                <som-icon name="arrow-left" :size="24" class="left-icon" v-if="!leftIcon && !leftText"></som-icon>
                <img :src="leftIcon" class="left-icon" v-if="leftIcon" width="24" height="24">
                <span v-if="leftText" class="left-text">{{leftText}}</span>
            </slot>
        </div>
        <h1 class="som-nav-bar__title" @click="$emit('on-title-click')" v-if="showTitle">
            <slot>
                <span v-show="title">{{title}}</span>
            </slot>
        </h1>
        <div class="som-nav-bar__right" @click="onRightClick">
            <slot name="right">
                <span v-if="rightText" class="right-text">{{rightText}}</span>
                <img :src="rightIcon" class="right-icon" v-if="rightIcon">
            </slot>
        </div>
    </div>
</template>

<script>
import objectAssign from 'object-assign';

export default {
    name: 'SomNavBar',
    props: {
        leftIcon: String,
        leftText: String,
        title: String,
        transition: String,
        rightIcon: String,
        rightText: String,
        fill: Boolean,
        navbarClass: String
    },
    computed: {
        showTitle () {
            return this.title || this.$slots.default;
        }
    },
    methods: {
        onLeftClick () {
            this.$emit('on-left-click');
        },
        onRightClick () {
            this.$emit('on-right-click');
        }
    }
};
</script>
