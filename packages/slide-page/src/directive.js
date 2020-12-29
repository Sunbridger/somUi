// import utils from './utils';

export default {
    bind(el, binding, vnode) {
        let touchObj = {
            pageIndex: 0, //页面序号
            fromIndex: 0, //上一页面序号
            isChangePage: false,
            userSlide: '', //用户滑动意图
            startIndex: 0, //触摸屏幕开始的点的坐标--上下为y轴坐标点，左右为x轴坐标点--用于判断用户滑动意图
            startOtherIndex: 0, //触摸屏幕开始的点的坐标--与startIndex相对应--用于判断用户滑动意图
            distance: 0, //手指滑动距离
            endIndex: 0, //触摸屏幕结束的点的坐标
            moveValue: 0, //滑动总数值
            pageValue: vnode.context.pageValue, //上下滑动时此值为需要滑动页面的高度，左右滑动时为需要滑动页面的宽度
            init() {
                let _this = this;
                let pageWidth;
                let pageHeight;
                if (!vnode.context.pageValue) {
                    let getPageValue = setTimeout(function() {
                        if (document.getElementsByClassName(vnode.context.outClassName)[0]
                            && document.getElementsByClassName(vnode.context.outClassName)[0].children[0]) {
                            let childrenPage = document.getElementsByClassName(vnode.context.outClassName)[0].children[0];
                            pageWidth = childrenPage.clientWidth;
                            pageHeight = childrenPage.clientHeight;
                            _this.pageValue = vnode.context.slideType === 'top' ? pageHeight : pageWidth;
                        }
                        clearTimeout(getPageValue);
                    }, 100);
                }
            }
        };
        touchObj.init();
        // 判断是否滑动
        function isMove(direction) {
            if (direction === 'before') {
                return touchObj.pageIndex > 0;
            } else {
                let num = vnode.context.outClassName === 'som-slide-page-Box' ? 2 : 1;
                return touchObj.pageIndex < document.getElementsByClassName(vnode.context.outClassName)[0].children.length - num;
            }
        }
        // 开始滑动页面
        function startSlide(distance = 0, animateTime = vnode.context.animateTime) {
            if (touchObj.userSlide !== vnode.context.slideType) {
                return;
            }
            let _distance = distance;
            if (touchObj.pageIndex === 0 || !isMove('after')) {
                _distance = distance * 0.4;
            }
            const moveValue = touchObj.moveValue + _distance;
            if (vnode.context.slideWay === 'normal') {
                vnode.context.animateStyle = {
                    transition: `${vnode.context.slideType} ${animateTime}ms ease-out`
                };
                vnode.context.animateStyle[vnode.context.slideType] = `${moveValue}px`;
            } else {
                let transform = vnode.context.slideType === 'left' ? `translate3d(${moveValue}px,0,0)` : `translate3d(0,${moveValue}px,0)`;
                vnode.context.animateStyle = {
                    transition: `transform ${animateTime}ms ease-out`,
                    transform
                };
            }
            if (touchObj.isChangePage) {
                vnode.context.$emit('pageindex', {pageIndex: touchObj.pageIndex, fromIndex: touchObj.fromIndex});
                touchObj.isChangePage = false;
            }
        }
        function touchstartEvent(e) {
            touchObj.userSlide = ''; //重置用户滑动意图
            touchObj.isChangePage = false;
            touchObj.startIndex = vnode.context.slideType === 'top' ? e.targetTouches[0].pageY : e.targetTouches[0].pageX;
            touchObj.startOtherIndex = vnode.context.slideType === 'top' ? e.targetTouches[0].pageX : e.targetTouches[0].pageY;
        }
        function touchmoveEvent(e) {
            if (vnode.context.slideType === 'top') {
                //上下滑动时阻止默认事件
                if (Math.abs(e.targetTouches[0].pageY - touchObj.startIndex) > Math.abs(e.targetTouches[0].pageX - touchObj.startOtherIndex)) {
                    e.preventDefault();
                }
            }
            let moveIndex = vnode.context.slideType === 'top' ? e.targetTouches[0].pageY : e.targetTouches[0].pageX;
            let moveOtherIndex = vnode.context.slideType === 'top' ? e.targetTouches[0].pageX : e.targetTouches[0].pageY;
            let moveDistance = moveIndex - touchObj.startIndex;
            let moveOtherDistance = moveOtherIndex - touchObj.startOtherIndex;
            // 确定用户滑动的意图
            if (!touchObj.userSlide && moveDistance !== moveOtherDistance) {
                if (Math.abs(moveDistance) > Math.abs(moveOtherDistance)) {
                    touchObj.userSlide = vnode.context.slideType;
                } else {
                    touchObj.userSlide = 'other';
                }
            }
            if (touchObj.userSlide === vnode.context.slideType) {
                e.preventDefault();
            }
            if (vnode.context.isSpringback) {
                if (moveDistance !== 0) {
                    window.requestAnimationFrame(function() {
                        startSlide(moveDistance, 0);
                    });
                }
            }
        }
        function touchendEvent(e) {
            touchObj.endIndex = vnode.context.slideType === 'top' ? e.changedTouches[0].pageY : e.changedTouches[0].pageX;
            touchObj.distance = touchObj.endIndex - touchObj.startIndex;
            if (Math.abs(touchObj.distance) > vnode.context.springbackDistance) {
                if (touchObj.distance < 0 && isMove('after')) {
                    touchObj.fromIndex = touchObj.pageIndex;
                    touchObj.pageIndex++;
                    touchObj.moveValue -= touchObj.pageValue;
                    touchObj.isChangePage = true;
                }
                if (touchObj.distance > 0 && isMove('before')) {
                    touchObj.fromIndex = touchObj.pageIndex;
                    touchObj.pageIndex--;
                    touchObj.moveValue += touchObj.pageValue;
                    touchObj.isChangePage = true;
                }
            }
            window.requestAnimationFrame(function() {
                startSlide(0);
            });
        }
        function nextPage() {
            if (!isMove('after')) { return; }
            touchObj.pageIndex++;
            touchObj.moveValue -= touchObj.pageValue;
            touchObj.fromIndex = touchObj.pageIndex - 1;
            touchObj.userSlide = vnode.context.slideType;
            touchObj.isChangePage = true;
            startSlide();
        }
        vnode.context.$refs.nextPage.onclick = nextPage;
        vnode.context.$emit('pageindex', {pageIndex: touchObj.pageIndex});
        el.addEventListener('touchstart', touchstartEvent, {passive: false});
        el.addEventListener('touchmove', touchmoveEvent, {passive: false});
        el.addEventListener('touchend', touchendEvent, {passive: false});
    }
};
