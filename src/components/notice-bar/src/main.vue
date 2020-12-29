<template>
    <div>
        <div class="som-notice-bar" v-show="show" :class="type ? 'som-notice-bar--' + type : ''">
            <div class="som-notice-bar__icon" aria-hidden="true" v-if="icon">
                <som-icon :name="icon" size="16"></som-icon>
            </div>

            <div 
                class="som-notice-bar-marquee-wrap som-notice-bar__content"
                :style="{ overflow: 'hidden' }" 
                role="marquee">
                <div class="som-notice-bar-marquee" ref="marquee" :style="style">
                    <slot></slot>
                </div>
            </div>

            <div class="som-notice-bar__operation" role="button" aria-label="close" @click="onActionClick">
                <slot name="action">
                    <som-icon name="close" v-if="mode === 'closable'"></som-icon>
                    <som-icon name="arrow-right" v-if="mode === 'link'"></som-icon>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import objectAssign from 'object-assign';

export default {
    name: 'SomNoticeBar',
    props: {
        mode: String,
        icon: String,
        marquee: {
            type: [Object, Boolean],
            default: false
        },
        onClick: Function,
        type: String
    },
    computed: {
        style () {
            let style = {
                position: 'relative',
                right: this.state.animatedWidth + 'px',
                display: 'inline-block'
            };

            if (this.marquee) {
                style.whiteSpace = 'nowrap';
            } else {
                style.wordWrap = 'break-word';
                style.wordBreak = 'break-all';
            }
            return style;
        },
        marqueeProps () {
            return objectAssign(this.marqueeDefault, this.marquee);
        }
    },
    data () {
        return {
            marqueeDefault: {
                text: '',
                loop: false,
                leading: 1000,
                trailing: 800,
                fps: 50,
                className: ''
            },
            state: {
                animatedWidth: 0,
                overflowWidth: 0
            },
            textRef: '',
            marqueeTimer: '',
            show: true
        };
    },
    mounted () {
        this.measureText();
        this.startAnimation();
    },
    update () {
        this.startAnimation();
    },
    methods: {
        onActionClick() {
            if (this.onClick) {
                this.onClick();
            }

            if (this.mode === 'closable') {
                this.show = false;
            }

        },
        startAnimation () {
            if (this.marqueeTimer) {
                clearTimeout(this.marqueeTimer);
            }
            let fps = this.marqueeProps.fps;
            const TIMEOUT = 1 / fps * 1000; //eslint-disable-line
            const isLeading = this.state.animatedWidth === 0;
            const timeout = isLeading ? this.marqueeProps.leading : TIMEOUT;

            const animate = () => {
                const { overflowWidth } = this.state;
                let animatedWidth = this.state.animatedWidth + 1;
                const isRoundOver = animatedWidth > overflowWidth;

                if (isRoundOver) {
                    if (this.marqueeProps.loop) {
                        animatedWidth = 0;
                    } else {
                        return;
                    }
                }

                if (isRoundOver && this.marqueeProps.trailing) {
                    this.marqueeTimer = setTimeout(() => {
                        this.state.animatedWidth = animatedWidth;

                        this.marqueeTimer = setTimeout(animate, TIMEOUT);
                    }, this.marqueeProps.trailing);
                } else {
                    this.state.animatedWidth = animatedWidth;

                    this.marqueeTimer = setTimeout(animate, TIMEOUT);
                }
            };

            if (this.state.overflowWidth !== 0) {
                this.marqueeTimer = setTimeout(animate, timeout);
            }
        },
        measureText() {
            let marquee = this.$refs.marquee;
            let marqueeContainer = this.$el.querySelector('.som-notice-bar__content');
            if (marquee) {
                const containerWidth = marqueeContainer.offsetWidth;
                const textWidth = marquee.offsetWidth;
                const overflowWidth = textWidth - containerWidth;
                if (overflowWidth !== this.state.overflowWidth) {
                    this.state.overflowWidth = overflowWidth;
                }
            }
        }
    },
    beforeDestroy () {
        clearTimeout(this.marqueeTimer);
    }
};
</script>
