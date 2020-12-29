<template>
    <div class="som-range" >
        <div class="som-randge-container">
        <div class="som-randge__run-container" ref="somRange">
            <div class="som-randge__runway">
            </div>
            <img
                :src="cursorImg || btnImg"
                width="22"
                class="start-btn randge__btn"
                :style="{left:`calc(${startBtnLeft}% - 11px)`}"
                ref="randgeStart"
            >
            <div
                class="range-container"
                ref="rangeContainer"
                :style="{width:rangeWidth+'%',left: startBtnLeft+'%',background:rangeColor}"
                >
            </div>
            <img
                :src="cursorImg || btnImg"
                width="22"
                class="end-btn randge__btn "
                :style="[{left: `calc(${endBtnLeft}% - 11px)`},{zIndex:200}]"
                ref="randgeEnd"
            >
        </div>
        <div class="som-randge__number">
            <span class="range"
                v-for="(tip, key) in tips"
                v-if="key"
                :key="key"
                :style="[{width:`${markWidth}%`},
                    {marginLeft:`${-markWidth/2}%`},
                    {color:primaryColor},
                    {left:`${(tip - min) / (max - min) * 100}%`}]"
                :ref="'range'+range">
                {{key}}
            </span>

        </div>
        </div>
    </div>
</template>

<script>
import btnImg from '../../../../examples/assets/images/range-cursor.png';

// const BTN_WIDTH = 11; // 按钮的半个宽度
export default{
    name: 'SomRange',
    data () {
        return {
            tipListStep: 0,
            unlimited: null,
            btnImg: btnImg,
            btnStart: 0,
            btnEnd: 0,
            move: 0,
            startBtnLeft: 0,
            endBtnLeft: 0,
            rangeWidth: 0,
            stepOffset: 0,
            maxWidth: 0,
            marks: {},
            defaultValue: []
        };
    },
    props: {
        primaryColor: {
            type: String,
            default: ''
        },
        range: {
            type: String,
            default: '1-5'
        },
        rangeColor: {
            type: String,
            default: ''
        },
        tipList: {
            type: Array,
            default: () => []
        },
        cursorImg: {
            type: String,
            default: ''
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: [Number, String],
            default: 0
        }
    },
    watch: {
        'value' (val) {
            this.computedStyle(val);
        }
    },
    computed: {
        tips() {
            this.tipListStep = parseInt(this.tipList[1]) - parseInt(this.tipList[0]);
            this.tipList.map((it, index, array) => {
                if (/\d/g.test(it)) {
                    this.marks[it] = it;
                } else {
                    this.unlimited = +array[index - 1] + this.tipListStep;
                    this.marks[it] = this.unlimited;
                }
            });
            const marksCount = Object.keys(this.marks).length;
            const unit = marksCount > 1 ? 100 / (marksCount - 1) : 100;
            this.markWidth = unit * 0.9;
            return this.marks;
        },
        min() {
            return this.range.split('-')[0];
        },
        max() {
            return this.range.split('-')[1];
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        calcOffset(value) {
            const ratio = (value - this.min) / (this.max - this.min);
            return ratio * 100;
        },
        /**
        * 初始化按钮区域
        */
        init () {
            this.computedStyle(this.value);
            this.listenStartBtn();
            this.listenEndBtn();
        },
        getPos(e, position) {
            const pos = this.calcValue(position - this.$refs.somRange.getBoundingClientRect().left);
            let posPrecent = (pos / (this.max - this.min)) * 100;
            return this.limitRange(posPrecent, 0, 100);
        },
        calcValue(offset) {
            const ratio = Math.abs(Math.max(offset, 0) / this.$refs.somRange.getBoundingClientRect().width);
            const value = (ratio * (this.max - this.min)) + this.min;
            return value;
        },
        limitRange(val, min, max) {
            if (val <= min) {
                return min;
            }
            if (val >= max) {
                return max;
            }
            return val;
        },
        computedStyle(value) {
            // tracks
            const offsets = this.value.split('-').map(v => this.calcOffset(v));
            this.startBtnLeft = offsets[0];
            this.rangeWidth = offsets[1] - offsets[0];
            this.endBtnLeft = offsets[1];
             // 将传过来的字符串转成数组形式
            let array = value.split('-');
            this.defaultValue = [parseInt(array[0]), parseInt(array[1])];
            this.calcStepOffset();
        },
        calcStepOffset() {
            // 初始化 range 按钮的起始和结束为止
            let runWay = this.$el.querySelector('.som-randge__runway');
            // range区域最长宽度
            // this.maxWidth = runWay.offsetWidth - BTN_WIDTH;
            this.maxWidth = runWay.offsetWidth;
            // 每一步的间隔
            this.stepOffset = (this.maxWidth / ((this.max - this.min) / this.step));
        },
        touchendEvent() {
            // 业务逻辑 ☹
            if (this.defaultValue[1] <= this.defaultValue[0]) {
                this.defaultValue = [this.defaultValue[1], this.defaultValue[0]];
            }
            if (this.defaultValue[1] > +this.max) {
                this.defaultValue[1] = +this.max;
            }
            if (this.defaultValue[0] < +this.min) {
                this.defaultValue[0] = +this.min;
            }
            if (this.defaultValue[1] - this.defaultValue[0] < this.step) {
                if (this.unlimited === this.defaultValue[1]) {
                    //当右侧游标是不限  二者间距小于一个间隔
                } else if (this.defaultValue[0] === +this.min) {
                    this.defaultValue = [this.defaultValue[0], this.defaultValue[1] + this.step];
                } else {
                    this.defaultValue = [this.defaultValue[0] - this.step, this.defaultValue[1]];
                }
            }
            this.$emit('input', this.defaultValue.join('-'));
            this.$nextTick(() => {
                this.computedStyle(this.value);
            });
            this.move = 0;
        },
        /**
         * 监听最左侧按钮
         */
        listenStartBtn () {
            let touchStart = 0; // 触发touch事件记录相对于窗口的
            let startPosition = 0; // 记录start按钮的初始位置
            let startRangeWidth = 0;// 记录range范围
            // 监听touchstart事件，初始化参数
            this.$refs.randgeStart.addEventListener('touchstart', (e) => {
                e.preventDefault();
                +this.stepOffset === 0 && this.calcStepOffset();
                touchStart = e.touches[0].clientX;
                startPosition = this.maxWidth * (this.startBtnLeft / 100);
                startRangeWidth = this.maxWidth * (this.rangeWidth / 100);
            });
            // 监听touchmove事件，改变参数
            this.$refs.randgeStart.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.move = e.changedTouches[0].clientX - touchStart;
                let limitBtnLeft = this.limitRange(this.startBtnLeft, 0, 100);
                if (startRangeWidth - this.move < this.stepOffset) {
                    this.move = startRangeWidth - this.stepOffset;
                }
                if (startPosition + this.move < 0) {
                    this.move = -startPosition;
                }
                this.$refs.randgeStart.style.left
                = `calc(${limitBtnLeft}% - ${11 - this.move}px`;
                this.$refs.rangeContainer.style.left = `calc(${limitBtnLeft}% + ${this.move}px`;
                this.$refs.rangeContainer.style.width = `calc(${this.rangeWidth}% - ${this.move - 11}px`;
            });
                // 监听touchend事件，重置参数
            this.$refs.randgeStart.addEventListener('touchend', (e) => {
                this.startBtnLeft = this.getPos(e, e.changedTouches[0].pageX - this.move);
                this.$refs.randgeStart.style.left = `calc(${this.limitRange(this.startBtnLeft, 0, 100)}% - 11px`;
                this.$refs.rangeContainer.style.left = `calc(${this.startBtnLeft}%`;
                this.$refs.rangeContainer.style.width = `${this.rangeWidth}%`;
                this.move = Math.round(this.move / this.stepOffset) * this.stepOffset;
                this.defaultValue[0] = this.defaultValue[0] + (Math.round(this.move / this.stepOffset) * this.step);
                this.touchendEvent();
            });
        },
        listenEndBtn () {
            let touchStart = 0;
            let startPosition = 0;
            let startRangeWidth = 0;
            this.$refs.randgeEnd.addEventListener('touchstart', (e) => {
                e.preventDefault();
                +this.stepOffset === 0 && this.calcStepOffset();
                touchStart = e.touches[0].clientX;
                startPosition = this.maxWidth * (this.endBtnLeft / 100);
                startRangeWidth = this.maxWidth * (this.rangeWidth / 100);
            });
            this.$refs.randgeEnd.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.move = e.changedTouches[0].clientX - touchStart;
                if (startRangeWidth + this.move < this.stepOffset + 0) {
                    this.move = (this.stepOffset - startRangeWidth) + 0;
                }
                if (startPosition + this.move > this.maxWidth) {
                    this.move = this.maxWidth - startPosition;
                }
                this.$refs.randgeEnd.style.left = `calc(${this.limitRange(this.endBtnLeft, 0, 100)}% - ${11 - this.move}px`;
                this.$refs.rangeContainer.style.width = `calc(${this.rangeWidth}% - ${11 - this.move}px`;
            });
            this.$refs.randgeEnd.addEventListener('touchend', (e) => {
                this.endBtnLeft = this.getPos(e, e.changedTouches[0].pageX - this.move);
                this.$refs.randgeEnd.style.left = `calc(${this.limitRange(this.endBtnLeft, 0, 100)}% - 11px`;
                this.$refs.rangeContainer.style.width = `${this.rangeWidth}%`;
                this.move = Math.round(this.move / this.stepOffset) * this.stepOffset;
                this.defaultValue[1] = this.defaultValue[1] + (Math.round(this.move / this.stepOffset) * this.step);
                this.touchendEvent();
            });
        }
    }
};
</script>

