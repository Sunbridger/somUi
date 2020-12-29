
<template>
    <div class="som-rate">
        <div class="som-rate__content" v-if="this.iconName">
            <i class="som-rate__inside som-rate__img"
                :class="[iconFullName]"
                :style="insideStyle"
                v-for="(name, index) in emojiDispaly"
                @click="handleClickEmoji(name, index)"
                :key="index">
                <i class="som-rate__surface" :class="[iconFullName]" :style="[surfaceStyle, getWidth(index)]">
                </i>
            </i>
        </div>
        <div class="som-rate__content" v-else>
            <img class="som-rate__img"
                v-for="(pic, index) in emojiDispaly"
                :key="index" :src="pic" alt="rateEmoji"
                :style="{ height: size + 'px', width: size + 'px'}"
                @click="handleClickEmoji(pic, index)">
        </div>
        <p class="som-rate__tooltips" :style="tooltipStyle" v-if="showText"> {{showText}} </p>
    </div>
</template>

<script>
import selected1 from '../../../../examples/assets/images/rate-emoji/selected/1.svg';
import selected2 from '../../../../examples/assets/images/rate-emoji/selected/2.svg';
import selected3 from '../../../../examples/assets/images/rate-emoji/selected/3.svg';
import selected4 from '../../../../examples/assets/images/rate-emoji/selected/4.svg';
import selected5 from '../../../../examples/assets/images/rate-emoji/selected/5.svg';

import unselect1 from '../../../../examples/assets/images/rate-emoji/unselect/1unselected.svg';
import unselect2 from '../../../../examples/assets/images/rate-emoji/unselect/2unselected.svg';
import unselect3 from '../../../../examples/assets/images/rate-emoji/unselect/3unselected.svg';
import unselect4 from '../../../../examples/assets/images/rate-emoji/unselect/4unselected.svg';
import unselect5 from '../../../../examples/assets/images/rate-emoji/unselect/5unselected.svg';
import { clearTimeout } from 'timers';

// 未点击下的表情，从sad到😊 图片模式可以抽出
const emojiDark = [
    unselect1, unselect2, unselect3, unselect4, unselect5
];
const emojiLight = [
    selected1, selected2, selected3, selected4, selected5
];

export default {
    name: 'SomRate',
    props: {
        unselectImg: {
            type: Array,
            default: () => emojiDark
        },
        selectImg: {
            type: Array,
            default: () => emojiLight
        },
        iconName: {
            type: String
        },
        iconColors: {
            type: Array,
            default: () => ['#D7D7DB', '#FFC400']
        },
        selectCount: {
            type: Number,
            default: 0,
            validator: (value) => {
                return !Number.isNaN(parseFloat(value));
            }
        },
        size: {
            type: Number,
            default: 24
        },
        length: {
            type: Number,
            default: 5,
            validator: (value) => {
                return Number.isInteger(value)
            }
        },
        read: {
            type: Boolean,
            default: false
        },
        tooltips: {
            type: Array,
            default: () => []
        },
        tooltipStyle: {
            type: Object
        }
    },
    data() {
        return {
            emojiDispaly: [],
            emojiDark: [],
            emojiLight: [],
            position: 0,
            surfaceStyle: {
                color: '#FFC400',
                fontSize: '24px',
                top: '-24px'
            },
            insideStyle: {
                color: '#D7D7DB',
                fontSize: '24px',
                width: '24px',
                height: '24px'
            },
            iconFullName: '',
            showText: ''
        };
    },
    computed: {
        /**
         * 获取每个 suface icon 的背景颜色宽度
         */
        getWidth() {
            const count = this.position - 1;
            // 评分为非整数
            if (!Number.isInteger(count) && this.read) {
                return (index) => {
                    if (index <= count) {
                        return { width: '100%' };
                    } else if (index > Math.ceil(count)) {
                        // 勿改，需保持icon有宽度
                        return { width: '1%' };
                    } else {
                        const width = (count - Math.floor(count)) * 68 + 16;
                        return { width: `${width}%` };
                    }
                };
            } else {
                return (index) => {
                    if (index <= count) {
                        return { width: '100%' };
                    } else {
                        return { width: '1%' };
                    }
                };
            }
        }
    },
    methods: {
        handleClickEmoji(elem, index) {
            this.$emit('on-click', elem, index);
            // 只读情况下，不可触发点击变色事件
            !this.read && this.selectRate(index + 1);
        },
        selectRate(index) {
            const order = Math.round(index);
            this.showText = index > this.tooltips.length ? this.tooltips[this.tooltips.length - 1] : this.tooltips[order - 1];
            if (this.iconName) {
                this.position = index;
            } else {
                this.picReplace(order);
            }
        },
        /**
         * 数组 emojiDispaly 内容替换
         * @param picture: 需要替换的pic
         * @param location: number 替换个数 0表示默认表情
         * @returns array: [pic, pic, .....]
         */
        picReplace(location = 0) {
            if (!location) {
                this.emojiDispaly = this.emojiDark;
                return;
            }
            location = location >= this.emojiDispaly.length ? this.emojiDispaly.length : location;
            const fillPic = this.emojiLight[location - 1];

            const tempArr = this.emojiDark.map((elem, index) => {
                if (index < location) {
                    elem = fillPic;
                }
                return elem;
            });
            this.emojiDispaly = Object.assign([], tempArr);
        },
        /**
         * 比较this.length和实际传入图片数组的长度。
         * 都以 this.length 为准。
         */
        compareLen() {
            if (this.unselectImg.length >= this.length) {
                this.emojiDark = this.unselectImg.slice(0, this.length);
                this.emojiLight = this.selectImg.slice(0, this.length);
            } else {
                //  当数组长度不足时，使用最后一张图片拓展
                const len = this.unselectImg.length;
                this.emojiDark = new Array(this.length - len).fill(this.unselectImg[len - 1], 0);
                this.emojiDark = this.unselectImg.concat(this.emojiDark);
                this.emojiLight = new Array(this.length - len).fill(this.selectImg[len - 1], 0);
                this.emojiLight = this.selectImg.concat(this.emojiLight);
            }
        }
    },
    mounted() {
        // 传入图片长度校验
        this.unselectImg.length !== this.selectImg.length &&                     console.error('数组 unselect-img 和 select-img 长度需保持一致！');
        // 判断传入的为 img 还是 icon
        if (this.iconName) {
            this.emojiDispaly = new Array(this.length).fill(this.iconName);
            this.iconFullName = `som-icon-${this.iconName}`;
            this.insideStyle = {
                color: this.iconColors[0],
                fontSize: `${this.size}px`,
                width: `${this.size}px`,
                height: `${this.size}px`
            }
            this.surfaceStyle = {
                color: this.iconColors[1],
                fontSize: `${this.size}px`,
                top: `-${this.size}px`
            }
        } else {
            this.compareLen();
            this.emojiDispaly = this.emojiDark;
        }

        this.position = this.selectCount;
        // 是否为只读类型
        if (this.read || this.selectCount) {
            this.selectRate(this.position);
        }
    }
};
</script>

