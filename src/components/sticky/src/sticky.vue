<template>
    <div class="som-sticky" ref="sticky">
        <slot></slot>
    </div>
</template>
<script>
const u = navigator.userAgent;
const inAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
export default {
    name: 'SomSticky',
    props: {
        autoRepalce: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            timerOffsetTop: null,
            offsetTop: '',
            needReplace: false,
            height: '',
            hasInsert: false
        };
    },
    methods: {
        setPosition (flag) /* istanbul ignore next */ {
            if (inAndroid) {
                if (!this.repalceDom) {
                    let div = document.createElement('div');
                    div.style.height = `${this.height}px`;
                    div.setAttribute('id', 'somStickRepace');
                    div.setAttribute('data-key', 'for replace sticky dom');
                    this.repalceDom = div;
                }

                if (this.autoRepalce) { // body页 不滚动了
                    this.$emit('on-height-collapsed', falg);
                    if (flag) {
                        document.body.appendChild(this.repalceDom);
                        this.hasInsert = true;
                    } else {
                        if (this.hasInsert) document.body.removeChild(this.repalceDom);
                        this.hasInsert = false;
                    }
                }

                this.$refs.sticky.style.position = flag ? 'fixed' : 'relative';
            }
        },
        toSticky () {
            this.setPosition(true);
            window.scroll(0, s);
        },
        scrollFn (e) {
            if (!this.offsetTop) {
                let { top, height } = this.$refs.sticky.getBoundingClientRect();
                this.offsetTop = top;
                this.height = height;
            }

            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || (this.vueApp && this.vueApp.scrollTop);
            let flag = scrollTop && scrollTop > this.offsetTop;

            this.setPosition(flag);
            this.$emit('scrollSticky', this.$refs.sticky, flag, e);
        },
        setScrollEvent() {
            window.addEventListener('scroll', this.scrollFn, true);
        }
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        window.removeEventListener('scroll', this.scrollFn, true); // 注销滚动事件
        clearTimeout(this.timerOffsetTop);
        next();
    },
    mounted () {
        this.$nextTick(() => {
            this.vueApp = document.querySelector('#app');
            this.setScrollEvent();
        });
    }
};
</script>
