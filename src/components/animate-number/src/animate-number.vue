<template>
    <span v-if="type === 1" class="som-animate-number">{{num}}</span>
    <section class="som-animate-number som-animate-number-wrap" v-else :style="{'height': height + 'px','line-height': height + 'px'}">
        <div v-for="(item, index) in stepNumberPositionArr" class="som-animate-number-wrap__each-num" :key="index">
            <ul v-if="(number + '')[index] === '.' || (number + '')[index] === ','" class="each-num-point som-animate-number-wrap__ul">
                <li v-for="(item, i) in vForArray" class="som-animate-number-wrap__li" :style="{'height': height + 'px','line-height': height + 'px'}" :key="i">
                    {{(number + '')[index]}}
                </li>
            </ul>
            <ul v-else :style="{ transform:'translateY(' + item + 'px)'}" class="som-animate-number-wrap__ul">
                <li v-for="(item, i) in vForArray" class="som-animate-number-wrap__li" :style="{'height': height + 'px','line-height': height + 'px'}" :key="i">
                    {{item}}
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SomAnimateNumber',
        data() {
            return {
                num: 0,
                vForArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                startNumberPositionArr: [],
                stepNumberPositionArr: [],
                endNumberPositionArr: []
            };
        },
        props: {
            'number': {
                default: 0
            },
            'height': { //滚动数字高度
                type: Number,
                default: 30
            },
            'duration': { //变换时间
                type: Number,
                default: 1000
            },
            'handler': { //数字过渡类型的数字处理函数
                type: Function,
                default: undefined
            },
            'type': { //变换类型
                type: Number,
                default: 1 //1为数字过渡，2为数字上下滚动
            },
            'animation': {
                type: Boolean,
                default: true
            },
            'lastShow': {
                type: [Number, String]
            }
        },
        watch: {
            number(newValue, oldValue) /* istanbul ignore next */ {
                this.animate(newValue, oldValue);
            }
        },
        methods: {
            animate(newValue, oldValue) /* istanbul ignore next */ {
                let requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
                let that = this;
                if (this.type === 1) {
                    let handle = that.handler ? that.handler : o => o;
                    let lastValue = that.lastShow || handle(newValue);
                    let step = (+newValue - (+oldValue)) / that.duration;
                    let startTime = new Date().getTime();
                    let stepFn = () => {
                        let now = new Date().getTime();
                        if (now > startTime + that.duration) {
                            that.num = lastValue;
                        } else {
                            that.num = handle((+oldValue) + (step * (now - startTime)));
                            requestAnimFrame(stepFn);
                        }
                    };
                    if (!this.animation) {
                        that.num = lastValue;
                    } else {
                        requestAnimFrame(stepFn);
                    }
                }
                if (this.type === 2) {
                    let isNew = this.startNumberPositionArr.length === 0;
                    let numberHeight = this.height;
                    let newValueStr = String(newValue);
                    let oldValueStr = String(oldValue);
                    newValue = newValueStr;
                    let length = newValue.length;
                    let newNumberPositionArr = newValue.split('');
                    if (isNew) {
                        this.startNumberPositionArr = (new Array(length)).fill(0);
                    }
                    newNumberPositionArr.forEach((item, index) => {
                        if (item === '.' || item === ',') {
                            this.endNumberPositionArr[index] = 0;
                        } else if (item === '0') {
                            this.endNumberPositionArr[index] = oldValueStr[index] === '0' ? 0 : 10 * (-numberHeight);
                        } else {
                            this.endNumberPositionArr[index] = (+item) * (-numberHeight);
                        }
                        if (!this.startNumberPositionArr[index]) {
                            this.startNumberPositionArr[index] = 0;
                        }
                    });
                    this.startNumberPositionArr.length = length;
                    this.stepNumberPositionArr = this.startNumberPositionArr.concat();
                    this.endNumberPositionArr.length = length;
                    let startTime = new Date().getTime();
                    let stepFn = () => {
                        let now = new Date().getTime();
                        let stepNumberPositionArr = [];
                        if (now > startTime + that.duration) {
                            newNumberPositionArr.forEach((item) => {
                                if (item === '0' || item === '.' || item === ',') {
                                    stepNumberPositionArr.push(0);
                                } else {
                                    stepNumberPositionArr.push((+item) * (-numberHeight));
                                }
                            });
                            this.startNumberPositionArr = stepNumberPositionArr.concat();
                            this.stepNumberPositionArr = stepNumberPositionArr.concat();
                        } else {
                            newNumberPositionArr.forEach((item, index) => {
                                let step = (now - startTime) / this.duration;
                                let allStep = this.endNumberPositionArr[index] - this.startNumberPositionArr[
                                    index];
                                stepNumberPositionArr.push(this.startNumberPositionArr[index] + (allStep
                                * step));
                            });
                            this.stepNumberPositionArr = stepNumberPositionArr;
                            requestAnimFrame(stepFn);
                        }
                    };
                    if (!this.animation) {
                        let emptyArr = [];
                        newNumberPositionArr.forEach((item) => {
                            if (item === '0' || item === '.' || item === ',') {
                                emptyArr.push(0);
                            } else {
                                emptyArr.push((+item) * (-numberHeight));
                            }
                        });
                        this.startNumberPositionArr = emptyArr.concat();
                        this.stepNumberPositionArr = emptyArr.concat();
                    } else {
                        requestAnimFrame(stepFn);
                    }
                }
            }
        },
        mounted() {
            this.animate(this.number, 0);
        }
    };

</script>
