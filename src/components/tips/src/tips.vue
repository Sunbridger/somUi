<template>
    <div v-click-outside="onClickedOutside">
        <span ref="trigger" @click="toggle">
            <slot></slot>
        </span>
        <div :class="['som-tips', 'is-'.concat(this.effect), tipsClass]" ref="tips" :style="tipsStyle" v-show="show">
            <div :class="arrowClass"></div>

            <div @click="$emit('on-click-content')" v-if="mode === 'default'" class="som-tips__content">
                <slot name="content">
                    <div v-html="content"></div>
                </slot>
            </div>

            <div v-if="mode === 'guide'" class="som-tips--guide">
                <div class="guide-word">
                    <slot name="content">
                        <div class="title" v-if="title" :class="illustration ? 'ill-title' : ''">{{ title }}</div>
                        <div class="writer" v-if="writer">{{writer}}</div>
                    </slot>
                </div>
                <div class="illustration" v-if="illustration && !contentSlot" ref="illustration" >
                    <img :src="illustration" :width="50" :height="50"/>
                </div>
                <div class="som-icon-close tips-close" @click="handleClose"></div>
            </div>

            <div v-if="mode === 'list'" class="som-tips--list">
                <slot name="content"></slot>
            </div>
        </div>

        <div class="guide-word" ref="guideWord" v-show="false" v-if="mode === 'guide' && !contentSlot">
            <div class="title" v-if="title" :class="illustration ? 'ill-title' : ''">{{ title }}</div>
            <div class="writer" v-if="writer">{{writer}}</div>
        </div>
        
    </div>
</template>

<script>
import ClickOutside from './directive.js';

let hiddenTipsContent;
export default {
    name: 'SomTips',
    model: {
        prop: 'show'
    },
    props: {
        show: Boolean,
        content: String,
        placement: {
            type: String,
            default: 'bottom'
        },
        hideOnBlur: Boolean,
        isTrigger: {
            type: Boolean,
            default: true
        },
        effect: {
            type: String,
            default: 'light'
        },
        mode: {
            type: String,
            default: 'default'
        },
        gutter: {
            type: Number,
            default: 8
        },
        title: String,
        tipsClass: String,
        writer: String,
        illustration: String
    },
    mounted() {
        this.$nextTick(() => {
            let trigger = this.$refs.trigger.children[0];
            if (!trigger) {
                this.tipsStyle = {
                    position: 'absolute'
                };
                return;
            };

            this.$refs.tips.style.display = '';
            const tips = this.$refs.tips;
            switch (this.placement) {
                case 'top-start':
                    this.position.left = trigger.offsetLeft;
                    this.position.top = trigger.offsetTop - tips.offsetHeight - this.gutter;
                    break;
                case 'top-end':
                    this.position.left = trigger.offsetLeft - trigger.offsetWidth;
                    this.position.top = trigger.offsetTop - tips.offsetHeight - this.gutter;
                    break;
                case 'top' :
                    this.position.left = trigger.offsetLeft - tips.offsetWidth / 2 + trigger.offsetWidth / 2; //eslint-disable-line
                    this.position.top = trigger.offsetTop - tips.offsetHeight - this.gutter;
                    break;
                case 'left':
                    this.position.left = trigger.offsetLeft - tips.offsetWidth - this.gutter;
                    this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - tips.offsetHeight / 2; //eslint-disable-line
                    break;
                case 'right':
                    this.position.left = trigger.offsetLeft + trigger.offsetWidth + this.gutter;
                    this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - tips.offsetHeight / 2; //eslint-disable-line
                    break;
                case 'bottom-start':
                    this.position.left = trigger.offsetLeft;
                    this.position.top = trigger.offsetTop + trigger.offsetHeight + this.gutter;
                    break;
                case 'bottom-end':
                    this.position.left = trigger.offsetLeft + trigger.offsetWidth;
                    this.position.top = trigger.offsetTop + trigger.offsetHeight + this.gutter;
                    break;
                case 'bottom':
                    this.position.left = trigger.offsetLeft + (trigger.offsetWidth - tips.offsetWidth) / 2; //eslint-disable-line
                    this.position.top = trigger.offsetTop + trigger.offsetHeight + this.gutter;
                    break;
                default:
                    console.warn('Wrong placement prop');
            }
            if (this.mode === 'guide' && !this.contentSlot) this.getIllustrationStyle();

            let left = this.position.left;

            if ((this.placement.match(/bottom$/) || this.placement.match(/top$/)) && this.illustration) {
                left -= 4;
            }
            this.tipsStyle = {
                top: this.position.top + 'px',
                left: left + 'px',
                display: this.show ? 'block' : 'none'
            };
        });
    },
    directives: {
        ClickOutside
    },
    methods: {
        onClickedOutside () {
            if (this.show && this.hideOnBlur) {
                this.$emit('input', false);
                this.$emit('on-hide');
            }
        },
        handleClose () {
            this.$emit('input', false);
            this.$emit('on-hide');
        },
        toggle () {
            if (this.isTrigger) {
                this.$emit('input', !this.show);
                this.$emit(`on-${!this.show === true ? 'show' : 'hide'}`);
            }
        },
        getIllustrationStyle () {
            if (!hiddenTipsContent && this.illustration) {
                hiddenTipsContent = document.createElement('div');
                hiddenTipsContent.className = 'som-tips--guide hidden-content';
                this.$el.appendChild(hiddenTipsContent);
                hiddenTipsContent.appendChild(this.$refs.guideWord);
                this.$el.querySelector('.hidden-content .guide-word').style.display = '';
                this.$el.querySelector('.hidden-content .title').style.width = '140px';

                let height = this.$el.querySelector('.hidden-content .guide-word').getBoundingClientRect().height + 6;

                let img = this.$el.querySelector('.illustration img');
                if (img) {
                    img.height = height;
                    img.width = height;
                }

                hiddenTipsContent.parentNode && hiddenTipsContent.parentNode.removeChild(hiddenTipsContent);
                hiddenTipsContent = null;
            }
        }
    },
    data () {
        return {
            position: {
                top: 0,
                left: 0
            },
            tipsStyle: {}
        };
    },
    computed: {
        arrowClass () {
            return {
                'som-tips-arrow': true,
                'som-tips-arrow-up-start': this.placement === 'bottom-start',
                'som-tips-arrow-up-center': this.placement === 'bottom',
                'som-tips-arrow-up-end': this.placement === 'bottom-end',
                'som-tips-arrow-right': this.placement === 'left',
                'som-tips-arrow-left': this.placement === 'right',
                'som-tips-arrow-down-start': this.placement === 'top-start',
                'som-tips-arrow-down-center': this.placement === 'top',
                'som-tips-arrow-down-end': this.placement === 'top-end'
            };
        },
        contentSlot () {
            return this.$slots.content;
        }
    }
};
</script>
