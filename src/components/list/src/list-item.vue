<template>
    <div
        class="som-list-item"
        :class="{
            'som-list-item-active': isLink || !!link,
            'som-list-item-access': isLink || !!link || arrowDirection,
            'som-list-item-no-border': !borderIntent,
            'som-list-item-disabled': disabled
        }"
        :style="style"
        @click="onClick">
        <div class="som-list-item__hd">
            <slot name="icon"></slot>
        </div>
        <div class="som-list-item__bd" :class="{'som-list-item--primary': primary === 'title' && valueAlign !== 'left'}">
            <p>
                <label class="som-list-item-label" :style="labelStyles" :class="labelClass" v-if="title || hasTitleSlot">
                    <slot name="title">{{ title }}</slot>
                </label>
                <slot name="after-title"></slot>
            </p>
            <slot name="inline-desc">
                <span class="som-list-item__label-desc" v-if="inlineDesc">{{ inlineDesc }}</span>
            </slot>
        </div>
        <div class="som-list-item__ft" :class="valueClass">
            <slot>{{ value }}</slot>
            <i class="som-icon-loading" v-if="isLoading"></i>
            <som-icon name="arrow-up"
                v-if="arrowDirection || isLink || !!link"
                :class="{
                    'som-arrow-up': arrowDirection === 'up',
                    'som-arrow-down': arrowDirection === 'down',
                    'som-arrow-left': arrowDirection === 'left',
                    'som-arrow-right': arrowDirection === 'right' || (!arrowDirection && isLink) || (!arrowDirection && !!link),
                }"></som-icon>
        </div>
        <slot name="child"></slot>
    </div>
</template>

<script>
import { go } from 'som-ui/src/utils/router';
import { cleanStyle, getParentProp } from 'som-ui/src/utils/util';

export default {
    name: 'SomListItem',
    props: {
        title: [String, Number],
        value: [String, Number],
        valueDesc: String,
        isLoading: Boolean,
        inlineDesc: [String, Number],
        primary: {
            type: String,
            default: 'title'
        },
        titleFontSize: String,
        titleLineHeight: String,
        link: [String, Object],
        valueAlign: [String, Boolean, Number],
        borderIntent: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        arrowDirection: String, // down or up
        alignItems: String,
        isLink: Boolean
    },
    computed: {
        labelStyles () {
            let styles = cleanStyle({
                width: getParentProp(this, 'labelWidth'),
                textAlign: getParentProp(this, 'labelAlign'),
                marginRight: getParentProp(this, 'labelMarginRight')
            });
            if (this.titleLineHeight) styles.lineHeight = this.titleLineHeight;
            if (this.titleFontSize) styles.fontSize = this.titleFontSize;
            return styles;
        },
        valueClass () {
            return {
                'som-list-item-primary': this.primary === 'content' || this.valueAlign === 'left',
                'som-list-item-align-left': this.valueAlign === 'left'
            };
        },
        labelClass () {
            return {
                'som-list-item-justify': getParentProp(this, 'justify') === 'justify'
            };
        },
        style () {
            if (this.alignItems) {
                return {
                    alignItems: this.alignItems
                };
            }
        }
    },
    methods: {
        onClick () {
            /* istanbul ignore next */
            !this.disabled && go(this.link, this.$router);
        }
    },
    data () {
        return {
            hasTitleSlot: true,
            hasMounted: false
        };
    }
};
</script>
