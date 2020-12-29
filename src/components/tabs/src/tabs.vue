<template>
    <div class="som-tabs" 
        :class="{'som-tabs-no-animate': !animate,
            'som-tabs--vertical': vertical,
            'som-tas-same-away': isSameAway}">
        <slot></slot>

        <div v-if="animate && !isSameAway" class="som-tabs__ink-bar" :class="barClass" :style="barStyle">
            <span class="som-tabs-bar-inner" :style="innerBarStyle"></span>
        </div>
    </div>
</template>

<script>
import { parentMixin } from 'som-ui/src/mixins/multi-items';

export default {
    name: 'SomTabs',
    mixins: [parentMixin],
    mounted () {
        // stop bar anmination on first loading
        this.$nextTick(() => {
            setTimeout(() => {
                this.hasReady = true;
            }, 0);
            if (!this.customBarWidth) this.setLineWidth();
        });
    },
    props: {
        lineWidth: {
            type: Number,
            default: 3
        },
        activeColor: String,
        barActiveColor: String,
        defaultColor: String,
        disabledColor: String,
        animate: {
            type: Boolean,
            default: true
        },
        vertical: Boolean,
        isSameAway: Boolean,
        customBarWidth: [Function, String],
        preventDefault: Boolean
    },
    computed: {
        barLeft () {
            return `${this.currentIndex * (100 / this.number)}%`;
        },
        barRight () {
            return `${(this.number - this.currentIndex - 1) * (100 / this.number)}%`;
        },
        innerBarStyle () {
            let style;
            if (this.vertical || !this.customBarWidth) {
                style = { backgroundColor: this.barActiveColor || this.activeColor }
            } else {
                style =  {
                    width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
                    backgroundColor: this.barActiveColor || this.activeColor
                };
            }
            return style;
        },
        barStyle () {
            let commonStyle;
            if (this.vertical) {
                commonStyle = {
                    height: (100 / this.number) + '%',
                    width: this.lineWidth + 'px',
                    top: this.barLeft,
                    bottom: this.barRight
                };
            } else {
                 commonStyle = {
                    left: this.barLeft,
                    right: this.barRight,
                    display: 'block',
                    height: this.lineWidth + 'px',
                    transition: !this.hasReady ? 'none' : null
                };
            }
            commonStyle.backgroundColor = 'transparent';
            return commonStyle;
        },
        barClass () {
            return {
                'som-tabs-ink-bar-transition-forward': this.direction === 'forward',
                'som-tabs-ink-bar-transition-backward': this.direction === 'backward'
            };
        }
    },
    watch: {
        currentIndex (newIndex, oldIndex) {
            this.direction = newIndex > oldIndex ? 'forward' : 'backward';
            this.$emit('on-index-change', newIndex, oldIndex);
            if (!this.customBarWidth) this.setLineWidth();
        }
    },
    data () {
        return {
            direction: 'forward',
            right: '100%',
            hasReady: false
        };
    },
    methods: {
        setLineWidth () {
            let selected = this.$el.querySelectorAll('.som-tab-item')[this.currentIndex];
            if (selected) {
                if (this.animate && !this.isSameAway) {
                    if (this.vertical) {
                        let height = selected.querySelector('.som-tab-label').getBoundingClientRect().height;
                        this.$el.querySelector('.som-tabs-bar-inner').style.height = height + 'px';
                    } else {
                        let width = selected.querySelector('.som-tab-label').getBoundingClientRect().width;
                        this.$el.querySelector('.som-tabs-bar-inner').style.width = width + 'px';
                    }
                }
            }
        }
    }
};
</script>
