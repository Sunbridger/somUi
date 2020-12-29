<template>
    <div class="som-slide-page">
        <div class="som-slide-page-Box" v-slide-page :class="{leftDisplayFlex: slideType==='left'}" :style="animateStyle">
            <slot></slot>
            <div class="next-page" v-show="nextShow">
                <i class="next-icon" ref="nextPage"></i>
            </div>
        </div>
    </div>
</template>

<script>
import './main.css';
import slidePage from './directive.js';

export default {
    name: 'SomSlidePage',
    data() {
        return {
            animateStyle: {}
        };
    },
    props: {
        slideWay: {  //滑动方式，normal为修改top或left实现页面滑动，transform通过改变translate3d实现页面滑动，会对子元素内使用的fixed布局有影响，因此当子元素内无fixed布局时，请尽量使用transform实现页面滑动
            type: String,
            default: 'normal'
        },
        slideType: { //上下滑还是左右滑
            type: String,
            default: 'top'
        },
        outClassName: {
            type: String,
            default: 'som-slide-page-Box'
        },
        pageValue: { //单个页面的大小，即单次滑动的距离
            type: Number,
            default: 0
        },
        nextShow: { //是否显示到下一页面的箭头
            type: Boolean,
            default: true
        },
        animateTime: { //转场动画时间
            type: Number,
            default: 500
        },
        isSpringback: { //是否有回弹效果
            type: Boolean,
            default: false
        },
        springbackDistance: { //回弹效果距离
            type: Number,
            default: 50
        }
    },
    directives: {
        slidePage
    }
};
</script>
