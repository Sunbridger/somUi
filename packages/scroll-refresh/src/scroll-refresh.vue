<template>
    <div class="som-scroll-infinite"
        @touchstart="onTouchStart($event)"
        @touchmove="onTouchMove($event)"
        @touchcancel="onTouchEnd($event)"
        @touchend="onTouchEnd($event)">
        <div class="inner-content" :style="{'transform': 'translateY(' + top + 'px)'}">
            <section class="down">
                <div v-show="refreshStep === 0" class="pull">
                    <div>
                        <slot name="pull-icon">
                            <som-icon name="loading" :size="16" />
                        </slot>
                    </div>
                    <div class="text">
                        <slot name="pull-text">
                            下拉刷新
                        </slot>
                    </div>
                </div>
                <div v-show="refreshStep === 1" class="drop">
                    <div>
                        <slot name="drop-icon">
                            <som-icon name="loading" :size="16" />
                        </slot>
                    </div>
                    <div class="text">
                        <slot name="drop-text">
                            松开刷新
                        </slot>
                    </div>
                </div>
                <div v-show="refreshStep === 2" class="loading">
                    <div>
                        <slot name="loading-icon">
                            <som-icon name="loading" :size="16" />
                        </slot>
                    </div>
                    <div class="text">
                        <slot name="loading-text">
                            正在刷新
                        </slot>
                    </div>
                </div>
            </section>
            <slot></slot>
            <section class="up">
                <div v-show="isLoading">
                    <slot name="spinner">
                        <span class="loading-default"><som-icon name="loading" :size="16" /> 加载中...</span>
                    </slot>
                </div>
                <div v-show="isComplete && isFirstLoaded">
                    <slot name="no-result">
                        <span class="no-more-default">没有更多内容啦~</span>
                    </slot>
                </div>
                <div v-show="isComplete && !isFirstLoaded">
                    <slot name="no-more">
                        <span class="no-more-default">没有更多内容啦~</span>
                    </slot>
                </div>
            </section>
        </div>
        <div class="back-top-wrapper" v-if="isBackTopVisible" @click="goBackTop">
        </div>
    </div>
</template>
<script>
import './main.css';

function stateChanger() {
    return {
        loaded: () => {
            this.isFirstLoaded = false;
            this.isLoading = false;
        },
        completed: () => {
            this.isComplete = true;
            this.isLoading = false;
        },
        refreshed: () => {
            this.isComplete = false;
            this.isFirstLoaded = true;
            this.isLoading = false;
            this.top = 0;
            this.refreshStep = -1;
        }
    };
}
var winHeight = window.innerHeight;

export default {
    name: 'SomScrollRefresh',
    props: {
        offsetH: {
            type: [Number, String],
            default: 60
        },
        maxPullDown: {
            type: [Number, String],
            default: 120
        },
        bottomDistance: {
            type: [Number, String],
            default: 100
        },
        pullDown: Function,
        pullUp: Function,
        showBackTop: {
            type: Boolean,
            default: true
        },
        preventDefault: Boolean,
    },
    data() {
        return {
            top: 0,
            direction: '',
            startY: 0,
            startX: 0,
            scrollElement: null,
            isLoading: false,
            refreshStep: -1,
            isComplete: false,
            isFirstLoaded: true,
            isBackTopVisible: false
        };
    },
    methods: {
        getScrollElement(elm) {
            let elmOverflowY = document.defaultView.getComputedStyle(elm).overflowY;
            if (elm.tagName.toLowerCase() === 'body') {
                return window;
            } else if (elmOverflowY === 'scroll' || elmOverflowY === 'auto') {
                return elm;
            }
            return this.getScrollElement(elm.parentNode);
        },
        getScrollTop(elm) {
            if (elm === window) {
                return window.pageYOffset || document.documentElement.scrollTop;
            }
            return elm.scrollTop;
        },
        getBottomDistance() /* istanbul ignore next */ {
            const scrollBottom = this.scrollElement === window ? window.innerHeight : this.scrollElement.getBoundingClientRect().bottom;
            const contentBottom = this.$el.getBoundingClientRect().bottom;
            return contentBottom - scrollBottom;
        },
        loadMore() {
            if (!this.isLoading && !this.isComplete) {
                this.isLoading = true;
                this.pullUp(stateChanger.call(this));
            }
        },
        onTouchStart(e) {
            this.startY = e.targetTouches[0].pageY;
            this.startX = e.targetTouches[0].pageX;
        },
        onTouchMove(e) {
            let moveDistance = e.targetTouches[0].pageY - this.startY;
            let scrollTop = this.getScrollTop(this.scrollElement);
            if (this.refreshStep === 2 || this.isLoading) return;
            this.direction = moveDistance > 0 ? 'down' : 'up';

            let diff = e.touches[0].pageY - this.startY;
            let diffX = e.touches[0].pageX - this.startX;

            let absDiff = diff > 0 ? diff : 0 - diff;
            let absDiffX = diffX > 0 ? diffX : 0 - diffX;
            if ( absDiffX > absDiff) return;

            //pull-up
            if (this.direction === 'up' && typeof this.pullUp === 'function' && this.getBottomDistance() < this.bottomDistance) {
                this.refreshStep = -1;
                this.loadMore();
            } else {
                this.isLoading = false;
            }
            //pull-down status change

            if (scrollTop <= 0 && typeof this.pullDown === 'function') {
                this.top = diff > this.maxPullDown ? this.maxPullDown : diff;
                if (diff < 0) this.top = 0;
                if (moveDistance >= this.offsetH) {
                    this.refreshStep = 1;
                    this.top = this.top - this.offsetH;
                } else if (this.direction === 'down') {
                    this.refreshStep = 0;
                }
            } else if (scrollTop > 0) {
                this.refreshStep = -1;
            }
        },
        onTouchEnd() {
            //pull-down
            this.top = 0;
            if (this.refreshStep === 1) {
                this.refreshStep = 2;
                this.pullDown(stateChanger.call(this));
                return;
            }
            this.refreshStep = -1;
        },
        onScroll() /* istanbul ignore next */ {
            var ele = (this.scrollElement !== window) ? this.scrollElement : document.documentElement;
            if (ele.scrollTop > winHeight) {
                this.isBackTopVisible = true;
            } else {
                this.isBackTopVisible = false;
            }
        },
        goBackTop() /* istanbul ignore next */ {
            if (this.scrollElement && this.scrollElement !== window) {
                this.scrollElement.scrollTop = 0;
            } else {
                document.documentElement.scrollTop = 0;
            }
        }
    },
    mounted() {
        this.$on('loadmore:reset', () => {
            this.isLoading = false;
            this.isFirstLoaded = true;
            this.isComplete = false;
            this.loadMore();
        });
        this.scrollElement = this.getScrollElement(this.$el);
        if (this.showBackTop) {
            if (this.scrollElement) {
                this.scrollElement.addEventListener('scroll', this.onScroll);
            } else {
                window.addEventListener('scroll', this.onScroll);
            }
        }
        if (typeof this.pullUp === 'function' && !this.preventDefault) {
            return this.loadMore();
        }
    }
};
</script>
