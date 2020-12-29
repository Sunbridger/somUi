<template>
    <a href="javascript:;"
        class="som-tab-bar__item"
        :class="{'som-tab-bar__item-on': isActive, 'som-tab-bar-simple': simple}"
        @click="onItemClick(true)"
    >
        <div class="som-tab-bar__icon"
            :class="[iconClass || $parent.iconClass, {'som-tab-bar-reddot': showDot}]"
            v-if="!simple"
        >
            <slot name="icon" v-if="!simple && !(hasActiveIcon && isActive)"></slot>
            <slot name="icon-active" v-if="!simple && hasActiveIcon && isActive"></slot>
            <sup v-if="badge"><som-badge :text="badge"></som-badge></sup>
        </div>
        <p class="som-tab-bar__label">
            <slot name="label"></slot>
        </p>
    </a>
</template>

<script>
import { childMixin } from 'som-ui/src/mixins/multi-items';

export default {
    name: 'SomTabBarItem',
    mounted() {
        if (!this.$slots.icon) {
            this.simple = true;
        }
        if (this.$slots['icon-active']) {
            this.hasActiveIcon = true;
        }
    },
    mixins: [childMixin],
    props: {
        showDot: {
            type: Boolean,
            default: false
        },
        badge: String,
        link: [String, Object],
        iconClass: String
    },
    computed: {
        isActive() {
            return this.$parent.index === this.currentIndex;
        }
    },
    data() {
        return {
            simple: false,
            hasActiveIcon: false
        };
    }
};
</script>
