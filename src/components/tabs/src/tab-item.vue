<template>
    <div class="som-tab-item"
        :class="[{'som-tab-selected': currentSelected, 'som-tab-disabled': disabled, 'is-margin': isSameAway} ]"
        @click="onItemClick">
        <div :style="baseStyle" class="som-tab-label" :class="currentSelected ? activeClass : ''">
            <slot></slot>
             <span
                :style="{background: badgeBackground, color: badgeColor}"
                class="som-tab-item-badge"
                v-if="typeof badgeLabel !== 'undefined' && badgeLabel !== ''">
                {{ badgeLabel }}
            </span>
        </div>
    </div>
</template>

<script>
import { childMixin } from 'som-ui/src/mixins/multi-items';

export default {
    name: 'SomTabItem',
    mixins: [childMixin],
    props: {
        activeClass: String,
        disabled: Boolean,
        badgeBackground: {
            type: String,
            default: '#f74c31'
        },
        badgeColor: {
            type: String,
            default: '#fff'
        },
        badgeLabel: String
    },
    computed: {
        isSameAway () {
            return this.$parent.isSameAway;
        },
        baseStyle () {
            return {
                borderWidth: this.$parent.lineWidth + 'px',
                borderColor: this.$parent.activeColor,
                color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
                border: (this.$parent.animate && !this.isSameAway) ? 'none' : 'auto'
            };
        }
    }
};
</script>
