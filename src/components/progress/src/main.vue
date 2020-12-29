<template>
    <div class="som-progress" :style="progressType" :class="ticks && 'som-progress--tick'">
        <div class="som-progress__bar" :style="fillColor">
            <div class="som-progress__inner-bar" :style="innerBarStyle"></div>
            <span class="som-progress__tick-wrap" v-for="(item, index) in ticks" :style="tickStyle(item)" v-if="typeof item.percent !== 'undefined'" :key="index">
                <i class="tick-icon circle" v-show="item.percent > percent"></i>
                <i class="tick-icon circle-o" v-show="item.percent <= percent"></i>
                <br>
                <span class="tick-content">{{item.text}}</span>
            </span>
        </div>
        <span v-show="showTip" class="som-progress__tip">
            <template v-if="tipContent">{{tipContent}}</template>
            <template v-else>{{percent}}%</template>
        </span>
        <a href="javascript:;" class="som-progress__opr" v-show="showCancel">
            <som-icon name="circle-close" class="som-progerss-close" @click.native="cancel" size="10"></som-icon>
        </a>
    </div>
</template>

<script>
export default {
    name: 'SomProgress',
    props: {
        percent: {
            type: Number,
            default: 0
        },
        showTip: {
            type: Boolean,
            default: true
        },
        showCancel: Boolean,
        unfilled: Boolean,
        filledColor: String,
        barColor: String,
        ticks: Array,
        width: Number,
        tipContent: String
    },
    computed: {
        progressType () {
            const style = {};
            if (this.ticks && this.ticks.length) {
                style['padding-bottom'] = '20px';
            }
            if (this.width) {
                style['width'] = this.width + 'px';
            }
            return style
        },
        fillColor () {
            if (this.unfilled) {
                return { 'background-color': 'transparent' };
            } else if(this.filledColor) {
                return { 'background-color': this.filledColor };
            }
        },
        innerBarStyle () {
            if (this.barColor) {
                return { 'background-color': this.barColor, width: +this.percent + '%' }
            } else {
                return { width: +this.percent + '%' }
            }
        }
    },
    methods: {
        tickStyle (item) {
            const min = 2.2;
            const max = 100;
            let percent = +item.percent;
            percent = percent < min ? min : percent;
            percent = percent > max ? max : percent;
            return { left: percent + '%' }
        },
        cancel () {
            this.$emit('on-cancel');
        }
    }
};
</script>
