<template>
    <div>
        <div style="padding:15px;">
            <som-button @click.native="showPosition('top')" type="primary">Top</som-button>
            <som-button @click.native="showPosition('middle')" type="primary">Middle</som-button>
            <som-button @click.native="showPosition('bottom')" type="primary">Bottom</som-button>
            <som-button @click.native="showPosition('')" type="primary">Default</som-button>  
        </div>

        <som-toast v-model="showPositionValue" :time="1000" is-show-mask :position="position">基本用法</som-toast>

        <som-list>
            <som-switch title="基本用法" v-model="show1"></som-switch>
            <som-switch title="type: icon-class" v-model="show2"></som-switch>
            <som-switch title="type: success" v-model="show3"></som-switch>
            <som-switch title="type: error" v-model="show4"></som-switch>
            <som-switch title="time: 1s" v-model="show5"></som-switch>
            <som-switch title="long" v-model="show6"></som-switch>
            <som-switch title="自定义位置" v-model="show7"></som-switch>
        </som-list>

        <som-toast v-model="show1" @on-hide="onHide">基本用法</som-toast>
        <som-toast v-model="show2" text="收藏成功" icon-class="som-icon-star">info</som-toast>
        <som-toast v-model="show3" type="success">success</som-toast>
        <som-toast v-model="show4" type="error">warn</som-toast>
        <som-toast v-model="show5" :time="1000">time:1s</som-toast>
        <som-toast v-model="show6" width="20em">show me code</som-toast>
        <som-toast v-model="show7" :time="1000" top="100px">top: 100px</som-toast>

        <som-list title="使用插件">
            <som-switch title="default" v-model="show9" @on-change="onChange"></som-switch>
        </som-list>
        <div style="padding:15px;">
            <som-button type="primary" @click.native="$som.toast.text('欲问青天这人生有几何，怕是去日苦多')">use text function</som-button> 
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import ToastPlugin from 'som-ui/src/plugins/toast';

Vue.use(ToastPlugin);

export default {
    methods: {
        showPosition (position) {
            this.position = position;
            this.showPositionValue = true;
        },
        onHide () {
            console.log('on hide');
        },
        onChange (val) {
            const _this = this;
            if (val) {
                this.$som.toast.show({
                    text: 'Hello World',
                    type: 'success',
                    onShow () {
                        console.log('Plugin: I\'m showing');
                    },
                    onHide () {
                        console.log('Plugin: I\'m hiding');
                        _this.show9 = false;
                    }
                });
            } else {
                this.$som.toast.hide();
            }
        }
    },
    data () {
        return {
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            show8: false,
            show9: false,
            position: 'default',
            showPositionValue: false
        };
    }
};
</script>
