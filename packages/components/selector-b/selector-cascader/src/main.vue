<template>
    <div>
        <div class="som-selector-cascader" :class="{'som-selector-cascader__hasfooter': hasGlobalFooter}">
            <div ref="content" class="som-selector-cascader-content">
                <slot></slot>
            </div>
            <div class="loading" v-if="isShowLoading">
                <slot name="loading"></slot>
            </div>
        </div>
        <div class="som-selector-global-footer-bottom" v-if="hasGlobalFooter">
            <som-button-group flex-rank="three">
                <som-button
                    large
                    type="gray"
                    @click="resetSelected">
                    重置
                </som-button>
                <som-button
                    large
                    type="primary"
                    :style="{backgroundColor: confirmButtonColor}"
                    @click="confirmSelected">
                    确定
                </som-button>
            </som-button-group>
        </div>
    </div>
</template>

<script>
import './main.css';

const TRANSITION_DURATION = 240;
export default {
    name: 'SomSelectorCascader',
    data() {
        return {
            isShowLoading: true
        }
    },
    props: {
        hasGlobalFooter: {
            type: Boolean,
            default: false
        },
        confirmButtonColor: {
            type: String
        }
    },
    mounted () {
        this.positionPools = this.getPositionPools();
        this.layout();
        this.touch();
    },
    updated () {
        this.positionPools = this.getPositionPools();
        setTimeout(this.layout, 0);
    },
    methods: {
        layout () {
            const content = this.$refs.content;
            if (!content) {
                return;
            }
            const children = Array.prototype.slice.call(content.children, 0);
            if (children.length === 1 && this.isShowLoading) {
                this.isShowLoading = false;
            }
            children.forEach((v, i) => {
                v.setAttribute('data-group-position-end', this.positionPools[i].end);
                v.style.webkitTransform = `translate3d(${this.positionPools[i].start}px, 0, 0)`;
            });
        },
        touch () /* istanbul ignore next */ {
            this.$refs.content.addEventListener('touchstart', this.handleTouchStart);
            this.$refs.content.addEventListener('touchmove', this.handleTouchMove);
            this.$refs.content.addEventListener('touchend', this.handleTouchEnd);
        },
        handleTouchStart (e) /* istanbul ignore next */ {
            this.touchTarget = this.getTouchTarget(e);
            this.touchIndex = this.getTouchIndex(this.touchTarget);

            if (this.touchIndex === 0 || this.touchTarget.__scrolling) {
                return;
            }
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.touchPosition = this.positionPools[this.touchIndex];
            this.setTransitionDuration(this.touchTarget, 0);
        },
        handleTouchMove (e) /* istanbul ignore next */ {
            if (this.touchIndex === 0 || this.touchTarget.__scrolling) {
                return;
            }

            this.transLengthX = e.touches[0].clientX - this.touchStartX;
            this.transLengthY = e.touches[0].clientY - this.touchStartY;
            if (Math.abs(this.transLengthY) < Math.abs(this.transLengthX)
                && this.transLengthX > 0
                && this.transLengthX < this.touchPosition.end) {
                e.preventDefault();
                this.touchTarget.style.webkitTransform = `translate3d(${this.transLengthX + this.touchPosition.start}px, 0, 0)`;
            }
        },
        handleTouchEnd () /* istanbul ignore next */  {
            if (this.touchIndex === 0 || this.touchTarget.__scrolling) {
                this.touchTarget.__scrolling = false;
                return;
            }

            this.setTransitionDuration(this.touchTarget, TRANSITION_DURATION);

            if (this.transLengthX > (this.touchPosition.end - this.touchPosition.start) / 3 && Math.abs(this.transLengthY) < Math.abs(this.transLengthX)) {
                this.touchTarget.style.webkitTransform = `translate3d(${this.touchPosition.end}px, 0, 0)`;
                this.$emit('close-cascader-group', this.touchIndex);
            } else {
                this.touchTarget.style.webkitTransform = `translate3d(${this.touchPosition.start}px, 0, 0)`;
            }

            this.transLengthX = 0;
        },
        getTouchTarget (e) {
            let ele = e.target;
            let _ele = ele;
            while (ele !== this.$refs.content) {
                _ele = ele;
                ele = ele.parentNode;
            }
            return _ele;
        },
        getTouchIndex (target) {
            const children = Array.prototype.slice.call(this.$refs.content.children, 0);
            return children.indexOf(target);
        },
        getPositionPools () {
            const children = Array.prototype.slice.call(this.$refs.content.children, 0);
            const screenWidth = document.documentElement.clientWidth;
            const spacing = screenWidth * 0.17;
            return children.map((v, i) => {
                if (i === 0) {
                    v.style.left = '0';
                    return {
                        start: 0,
                        end: screenWidth
                    };
                } else {
                    this.setTransitionDuration(v, TRANSITION_DURATION);
                    v.style.left = `${spacing}px`;
                    return {
                        start: 0,
                        end: (screenWidth - spacing) + 8
                    };
                }
            });
        },
        setTransitionDuration (ele, duration) {
            if (!ele) {
                return;
            }
            ele.style.transitionDuration = `${duration}ms`;
            ele.style.webkittransitionDuration = `${duration}ms`;
        },
        closeGroupWithAnimation(index) {
            let contents = this.$refs.content.children;
            for (let contentIndex = index + 1, len = contents.length; contentIndex < len; contentIndex += 1) {
                let nextGroupPositionInfo = this.positionPools[contentIndex];
                let nextGroupTarget = contents[contentIndex];
                nextGroupTarget.style.webkitTransform = `translate3d(${nextGroupPositionInfo.end}px, 0, 0)`;
            }
            setTimeout(() => {
                this.$emit('close-cascader-group', index + 1);
            }, 15); //保留动画，但是不需要等待动画完成再关闭下一级；等待完成动画再关闭下一级和会导致用户迅速点击打开下一级会冲突；
        },
        resetSelected() {
            this.$emit('on-global-reset-selected');
        },
        confirmSelected() {
            this.$emit('on-global-confirm-selected');
        }
    }
};
</script>
