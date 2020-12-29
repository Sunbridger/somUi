<template>
    <div>
        <som-list style="margin-top: 20px">
            <som-switch title="基本使用" v-model="show1"></som-switch>
            <som-switch title="安卓风格" v-model="show7"></som-switch>
            <som-switch title="显示取消菜单" v-model="show2"></som-switch>
            <som-switch title="使用数组定义菜单" v-model="show5"></som-switch>
            <som-switch title="点击遮罩区域不自动关闭" v-model="show4"></som-switch>
            <som-switch title="显示提示文字" v-model="show3"></som-switch>
            <som-switch title="使用 header slot" v-model="show6"></som-switch>
            <som-switch title="不自动关闭" v-model="show8"></som-switch>
        </som-list>

        <som-action-sheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></som-action-sheet>

        <som-action-sheet v-model="show1" :menus="menus1" @on-click-menu="click"></som-action-sheet>

        <som-action-sheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></som-action-sheet>

        <som-action-sheet v-model="show3" 
            :menus="menus3"
            @on-click-menu="click" 
            @on-click-menu-delete="onDelete"
            header="文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述" 
            show-cancel></som-action-sheet>

        <som-action-sheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click5"></som-action-sheet>

        <som-action-sheet v-model="show6" :menus="menus1">
            <p slot="header" v-html="'Actionsheet header'"></p>
        </som-action-sheet>

        <som-action-sheet v-model="show7" :menus="menu7" theme="android" @on-click-menu="click">
        </som-action-sheet>


        <div v-transfer-dom>
            <som-action-sheet v-model="show8" :menus="menus8" @on-click-menu="demo8doClose" :close-on-clicking-mask="false" :close-on-clicking-menu="false">
            </som-action-sheet>
        </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { TransferDom } from 'som-ui/src';
import LoadingPlugin from 'som-ui/src/plugins/loading';
Vue.use(LoadingPlugin);

export default {
    directives: {
        TransferDom
    },
    data () {
        return {
            show1: false,
            menus1: {
                menu1: '分享给朋友',
                menu2: '分享到朋友圈'
            },
            show2: false,
            menus2: {
                menu1: '拍照',
                menu2: '从相册选择'
            },
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            show8: false,
            menus5: [{
                label: 'Info',
                type: 'info'
            }, {
                label: 'Primary',
                type: 'primary',
                value: 'primary',
                otherProp: 'hey'
            }, {
                label: 'error',
                type: 'error'
            }, {
                label: 'Disabled',
                type: 'disabled'
            }, {
                label: 'Default'
            }],
            menu7: {
                menu1: '北京烤鸭',
                menu2: '陕西油泼面',
                menu3: '西安肉夹馍'
            },
            showSuccess: false,
            menus3: {
                delete: '<span style="color:red">删除</span>'
            },
            menus8: {
                menu1: '点我关闭'
            }
        };
    },
    methods: {
        demo8doClose () {
            this.$som.loading.show({
                text: '关闭中'
            });
            setTimeout(() => {
                this.$som.loading.hide();
                this.show8 = false;
            }, 1000);
        },
        console (msg) {
            console.log(msg);
        },
        click (key) {
            console.log(key);
        },
        click5 (key, item) {
            console.log(key, item);
        },
        onDelete () {
            this.showSuccess = true;
        }
    }
};
</script>

<style>
.som-actionsheet__action,.som-actionsheet__menu {
    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef;
}
</style>
