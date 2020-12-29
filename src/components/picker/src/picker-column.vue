<template>
    <div
        class="som-picker-column"
        :class="className"
        :style="columnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd">

        <div class="som-picker-column__shade" :style="shadeHeight"></div>
        <ul :style="wrapperStyle">
            <li v-for="(option, index) in options"
                :key="index"
                v-html="getOptionText(option)"
                class="som-ellipsis"
                :class="{
                    'som-picker-column--disabled': isDisabled(option),
                    'som-picker-column--selected': index === currentIndex
                }"
                :style="index === currentIndex ? selectedLineStyle : lineStyle"
                @click="setIndex(index, true)"/>
        </ul>
    </div>
</template>

<script>
import { isObj } from 'som-ui/src/utils/util';

const DEFAULT_DURATION = 200;
const range = (num, arr) => Math.min(Math.max(num, arr[0]), arr[1]);

export default {
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        options: {
            type: Array,
            default: () => []
        },
        defaultIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            baseLineHeight: 25,
            mouseTouch: false,
            startY: 0,
            offset: 0,
            duration: 0,
            startOffset: 0,
            currentIndex: this.defaultIndex
        };
    },
    created() {
        this.$parent && this.$parent.children.push(this);
    },
    mounted() {
        this.setIndex(this.currentIndex);
    },
    destroyed() {
        this.$parent && this.$parent.children.splice(this.$parent.children.indexOf(this), 1);
    },
    watch: {
        defaultIndex() {
            this.setIndex(this.defaultIndex);
        },
        options(next, prev) {
            if (JSON.stringify(next) !== JSON.stringify(prev)) {
                this.setIndex(this.defaultIndex);
            }
        }
    },
    computed: {
        shadeHeight () {
            return { backgroundSize: `100% ${(this.visibleItemCount - 1) * this.baseLineHeight/2}px`};
        },
        count() {
            return this.options.length;
        },
        baseOffset() {
            return (this.baseLineHeight * (this.visibleItemCount - 1)) / 2; //eslint-disable-line
        },
        columnStyle() {
            return {
                height: (this.baseLineHeight * (this.visibleItemCount - 1) + this.itemHeight) + 'px'
            };
        },
        lineStyle () {
            return { lineHeight: this.baseLineHeight + 'px' }
        },
        selectedLineStyle () {
            return { lineHeight: this.itemHeight + 'px' }
        },
        wrapperStyle() {
            return {
                transition: `${this.duration}ms`,
                transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`
            };
        },
        currentValue() {
            return this.options[this.currentIndex];
        }
    },
    methods: {
        onTouchStart(event) {
            this.startY = event.touches[0].clientY;
            this.startOffset = this.offset;
            this.duration = 0;
        },
        onTouchMove(event) {
            const deltaY = event.touches[0].clientY - this.startY;
            this.offset = range(this.startOffset + deltaY, [
                -(this.count * this.baseLineHeight),
                this.baseLineHeight
            ]);
        },
        onTouchEnd() {
            if (this.offset !== this.startOffset) {
                this.duration = DEFAULT_DURATION;
                const index = range(Math.round(-this.offset / this.baseLineHeight), [0, this.count - 1]);
                this.setIndex(index, true);
            }
        },
        adjustIndex(index) {
            index = range(index, [0, this.count]);
            for (let i = index; i < this.count; i++) {
                if (!this.isDisabled(this.options[i])) return i;
            }
            for (let i = index - 1; i >= 0; i--) {
                if (!this.isDisabled(this.options[i])) return i;
            }
        },
        isDisabled(option) {
            return isObj(option) && option.disabled;
        },
        getOptionText(option) {
            return isObj(option) && this.valueKey in option ? option[this.valueKey] : option;
        },
        setIndex(index, userAction) {
            index = this.adjustIndex(index);
            this.offset = -index * this.baseLineHeight;
            if (index !== this.currentIndex) {
                this.currentIndex = index;
                userAction && this.$emit('on-change', index);
            }
        },
        setValue(value) {
            const { options } = this;
            for (let i = 0; i < options.length; i++) {
                if (this.getOptionText(options[i]) === value) {
                    this.setIndex(i);
                    return;
                }
            }
        }
    }
};
</script>
