<template>
<div class="som-keyboard" ref="somkeyboardinput">
    <div class="som-keyboard--input" ref='somInputDom' @touchend="keyboardShow">
        <som-input :inputParmes='inputParmesData'></som-input>
    </div>
    <div v-show="isShow" class="som-keyboard--content" :class="{'pb38':isIPhoneX}" ref="somkeyboard">
        <p class="som-keyboard--title">
            <span @touchend="keyboardHide('confirm')" v-text='(keyboardParme && keyboardParme.confirmButtonText) || "完成"'></span>
        </p>
        <ul class="som-keyboard--keys som-keyboard--keys__number">
            <li v-for="(index, item) in keys" :key="index" 
                v-text="keys[item] == 'del' ? '' : keys[item]" 
                :class="{'active': index == currentIndex, 'del som-icon-delete':keys[item]=='del'}" 
                class="som-keyboard--keys--item som-keyboard--keys--item__number" 
                @touchstart="setCurrent_keyDown(index)" 
                @touchend="keyDown(keys[item], index)"
                >
            </li>
        </ul>
        <div class="h38" v-show="isIPhoneX"></div>
    </div>
</div>
</template>

<script>
import SomInput from './input.js';
export default {
    name: 'SomKeyboard',
    data() {
        return {
            keys: [], // 键组
            key_numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'], // 数字键组
            isShow: false, // 是否显示键盘
            value: '', // 输出内容
            activeEl: '', // 焦点元素
            activeElIsFixed: false, // 焦点元素是否固定定位，需要在键盘显示时处理焦点元素位置，以防遮挡
            activeElBottom: 0, // 焦点元素底部定位值
            bottomSetVal: 0, // 焦点元素set值
            keyboardHeight: 0, // 键盘组件高度
            scrollTop: 0, // 页面滚动高度
            scrollLeft: 0, // 页面滚动宽度
            scrollTopSetVal: 0, // 设置滚动高度
            inputTopHeight: 0, // 输入框距离浏览器顶部的距离
            windowHasHeight: 0, // 窗口去除键盘后的可视高度，与输入框距离浏览器顶部的距离做比较，如果windowHasHeight<=inputTopHeight,则需要把输入框顶上去
            parentParme: {}, // 父元素position为fixed/absolute的元素
            currentIndex: -1, // 当前点击按键元素索引，用来设置选中样式
            isIPhoneX: false, // 是否为iphoneX
            inputParmesData: {} // 传给input的参数
        };
    },
    components: {
        SomInput
    },
    props: {
        keyboardParme: Object,
        inputParmes: Object
    },
    computed: {},
    watch: {
        keyboardParme: {
            handler: function () {
                if (this.keyboardParme && this.keyboardParme.isShow) {
                    this.keyboardShow();
                } else {
                    this.keyboardHide();
                }
            },
            deep: true,
            immediate: true
        },
        inputParmes: {
            handler: function () {
                if (this.inputParmes) {
                    this.inputParmesData = JSON.parse(JSON.stringify(this.inputParmes));
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.initKeyboard();
        this.isIphoneX();
    },
    methods: {
        initKeyboard() {
            this.value = (this.inputParmes && this.inputParmes.value) || '';
            switch (this.keyboardParme && this.keyboardParme.type) {
                case 'Number':
                    this.keys = this.key_numbers;
                    break;
                default:
                    this.keys = this.key_numbers;
                    break;
            }
        },
        keyDown(key, index) {
            this.setCurrent_keyUp();
            switch (key) {
                case 'del':
                    this.value = this.value.slice(0, -1);
                    break;
                default:
                    this.value += key;
                    break;
            }
            this.$set(this.inputParmesData, 'value', this.value);
        },
        setCurrent_keyUp() {
            this.currentIndex = -1;
        },
        setCurrent_keyDown(index) {
            this.currentIndex = index;
        },
        keyboardShow() {
            if (this.isShow) {
                return;
            }
            this.initKeyboard();
            this.isShow = true;
            // 是否有占位元素，有的话先清空再添加
            let keyBox = document.getElementById('som-keyboard');
            if (keyBox) {
                document.body.removeChild(keyBox);
            }
            this.$nextTick(function () {
                this.keyboardHeight = this.$refs.somkeyboard.offsetHeight;
                this.windowHasHeight = window.innerHeight - this.keyboardHeight;
                this.scrollTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    window.pageYOffset;
                this.scrollLeft =
                    document.documentElement.scrollLeft ||
                    document.body.scrollLeft ||
                    window.pageXOffset;
                this.getParentPosition(this.activeEl);
                let rect = this.activeEl && this.activeEl.getBoundingClientRect();
                this.inputTopHeight = rect && (rect.top + this.activeEl.offsetHeight);
                if (this.parentParme.type === 'fixed') {
                    // 固定定位
                    this.activeElBottom = parseInt(
                        this.getCss(this.parentParme.el, 'bottom')
                    );
                    if (this.activeElBottom <= this.keyboardHeight) {
                        this.parentParme.el.style.bottom = this.keyboardHeight + 'px';
                    }
                } else {
                    // 正常文档流
                    if (this.windowHasHeight <= this.inputTopHeight) {
                        // 插入占位元素
                        this.creatSeat();
                    }
                }
            });
            this.activeEl = this.$refs.somkeyboardinput;
        },
        keyboardHide(type) {
            this.isShow = false;
            if (type === 'confirm') {
                this.$emit('on-confirm', this.value);
            }
            if (this.parentParme.type === 'fixed') {
                this.parentParme.el.style.bottom = this.activeElBottom + 'px';
            } else {
                let keyBox = document.getElementById('som-keyboard');
                if (keyBox) {
                    document.body.removeChild(keyBox);
                }
                window.scrollTo(this.scrollLeft, this.scrollTop);
            }
        },
        // 创建占位div
        creatSeat() {
            let keyBox = document.createElement('div');
            keyBox.style.height = this.keyboardHeight + 'px';
            keyBox.setAttribute('id', 'som-keyboard');
            document.body.appendChild(keyBox);
            this.scrollTopSetVal = this.inputTopHeight - this.windowHasHeight + this.scrollTop;
            window.scrollTo(this.scrollLeft, this.scrollTopSetVal);
        },
        getCss(el, attribute) {
            if (el && el.currentStyle) {
                return el.currentStyle[attribute];
            } else if (el) {
                return window.getComputedStyle(el, null)[attribute];
            }
        },
        // 获取父元素的position属性
        getParentPosition(el) {
            if (el &&
                this.getCss(el, 'position') !== 'fixed' &&
                this.getCss(el, 'position') !== 'absolute' &&
                el.parentElement
            ) {
                this.getParentPosition(el.parentElement);
            } else if (this.getCss(el, 'position') === 'fixed') {
                this.parentParme = {
                    el: el,
                    type: 'fixed'
                };
            } else if (this.getCss(el, 'position') === 'absolute') {
                this.parentParme = {
                    el: el,
                    type: 'absolute'
                };
            } else {
                this.parentParme = {
                    el: el,
                    type: 'static'
                };
            }
        },
        isIphoneX() {
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
            if (isIOS) {
                if (screen.height === 812 && screen.width === 375) {
                    // 是iphoneX
                    this.isIPhoneX = true;
                } else {
                    // 不是iphoneX
                    this.isIPhoneX = false;
                }
            }
        }
    }
};
</script>
