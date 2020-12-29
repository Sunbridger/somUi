<template>
    <button
        :style="buttonStyle"
        class="som-button"
        :class="classes"
        :disabled="disabled"
        :type="actionType"
        @click="onClick">
        <som-icon name="loading" v-if="loading" class="som-icon"></som-icon>
        <som-icon :name="icon" v-if="icon && !loading" class="som-icon"></som-icon>
        <slot><span>{{ text }}</span></slot>
    </button>
</template>

<script>
import { go } from 'som-ui/src/utils/router';
import { oneOf } from 'som-ui/src/utils/util';
import { throttle } from 'throttle-debounce';

export default {
    name: 'SomButton',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        disabled: Boolean,
        delayTime: Number,
        mini: Boolean,
        large: Boolean,
        plain: Boolean,
        text: String,
        actionType: {
            type: String,
            validator (value) {
                return oneOf(value, ['submit', 'button', 'reset']);
            }
        },
        borderWidth: {
            type: Number,
            default: 2,
            validator (value) {
                return oneOf(value, [2, 1, 0]);
            }
        },
        btnStyle: Object,
        radius: [String, Number],
        loading: Boolean,
        icon: String,
        link: [String, Object],
        gradients: {
            type: Array,
            validator: function (val) {
                return val.length === 2;
            }
        }
    },
    created () {
        if (this.delayTime) {
            this._throttle = throttle(this.delayTime, true, () => {
                this.$emit('click');
            });
        }
    },
    methods: {
        onClick () {
            if (this._throttle) {
                this._throttle();
            } else {
                this.$emit('click');
            }
            !this.disabled && go(this.link, this.$router);
        }
    },
    computed: {
        noBorder () {
            return Array.isArray(this.gradients);
        },
        buttonStyle () {
            let style = this.btnStyle || {};
            if (this.gradients) {
                style = Object.assign(style, {
                    background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
                    color: '#FFFFFF',
                    borderWidth: 0
                });
            } else {
                style.borderRadius = this.radius + 'px';
            }
            return style;
        },
        classes () {
            return [
                {
                    'som-button--disabled': !this.plain && this.disabled,
                    'som-button--plain-disabled': this.plain && this.disabled,
                    'som-button--mini': this.mini,
                    'som-button--large': this.large,
                    'som-button-no-border': this.noBorder,
                    'som-button--icon': this.icon
                },
                this.borderWidth === 1 && !this.radius && `som-button--small-border`,
                !this.plain ? `som-button--${this.type}` : '',
                this.plain ? `som-button--plain--${this.type}` : ''
            ];
        }
    }
};
</script>
