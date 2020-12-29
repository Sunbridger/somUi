<template>
    <div class="som-action-sheet">
        <transition name="som-actionsheet-mask">
            <div class="som-mask som-mask_transparent" @click="onClickingMask" v-show="show"></div>
        </transition>

        <div class="som-action-sheet__android" v-if="theme === 'android'">
            <transition name="som-android-actionsheet">
                <div class="som-actionsheet" v-show="show">
                <div class="som-actionsheet__menu">
                    <div class="som-actionsheet__cell"
                        :key="key" 
                        v-for="(text, key) in menus" 
                        @click="onMenuClick(text, key)" 
                        v-html="text.label || text">
                    </div>
                </div>
                </div>
            </transition>
        </div>

        <div class="som-actionsheet" :class="{'som-actionsheet_toggle': show}" v-else>
            <div class="som-actionsheet__menu" :style="bottomStyle">
                <div class="som-actionsheet__cell som-actionsheet__header" v-if="hasHeaderSlot || header">
                    <slot name="header">{{header}}</slot>
                </div>
                <div class="som-actionsheet__cell" 
                    v-for="(text, key) in menus"
                    :key="key"
                    @click="onMenuClick(text, key)" 
                    v-html="text.label || text" 
                    :class="`som-actionsheet-menu-${text.type || 'default'}`">
                </div>
            </div>

            <div class="som-actionsheet__action" @click="emitEvent('on-click-menu', '取消')" v-if="showCancel">
                <div class="som-actionsheet__cell">{{cancelText || '取消' }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SomActionSheet',
    mounted () {
        this.hasHeaderSlot = !!this.$slots.header;
        this.$nextTick(() => {
            this.$tabbar = document.querySelector('.som-tabbar');
        });
    },
    props: {
        value: Boolean,
        showCancel: Boolean,
        cancelText: String,
        theme: {
            type: String,
            default: 'ios'
        },
        header: String,
        menus: {
            type: [Object, Array],
            default: () => ({})
        },
        closeOnClickingMask: {
            type: Boolean,
            default: true
        },
        closeOnClickingMenu: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            hasHeaderSlot: false,
            show: false
        };
    },
    computed: {
        bottomStyle () {
            if (!this.showCancel) {
                return { borderBottom: '1px solid #efefef' };
            }
            return '';
        }
    },
    methods: {
        onMenuClick (text, key) {
            if (typeof text === 'string') {
                this.emitEvent('on-click-menu', key, text);
            } else {
                if (text.type !== 'disabled') {
                    if (text.value || text.value === 0) {
                        this.emitEvent('on-click-menu', text.value, text);
                    } else {
                        this.emitEvent('on-click-menu', '', text);
                        this.show = false;
                    }
                }
            }
        },
        onClickingMask () {
            this.$emit('on-click-mask');
            this.closeOnClickingMask && (this.show = false);
        },
        emitEvent (event, menu, item) {
            if (event === 'on-click-menu' && !/.noop/.test(menu)) {
                let _item = item;
                if (typeof _item === 'object') {
                    _item = JSON.parse(JSON.stringify(_item));
                }
                this.$emit(event, menu, _item);
                this.$emit(`${event}-${menu}`);
                this.closeOnClickingMenu && (this.show = false);
            }
        },
        fixIos (zIndex) {
            if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
                return;
            }
            if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
                this.$tabbar.style.zIndex = zIndex;
            }
        }
    },
    watch: {
        show (val) {
            this.$emit('input', val);
            if (val) {
                this.fixIos(-1);
            } else {
                setTimeout(() => {
                    this.fixIos(100);
                }, 200);
            }
        },
        value: {
            handler: function (val) {
                this.show = val;
            },
            immediate: true
        }
    },
    beforeDestroy () {
        this.fixIos(100);
    }
};
</script>
