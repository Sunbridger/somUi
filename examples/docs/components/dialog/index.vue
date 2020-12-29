<template>
    <div style="height: 800px">
        <som-list>
            <som-switch v-model="show" title="显示/隐藏"></som-switch>
            <som-switch v-model="show2" title="使用 .sync"></som-switch>
            <som-switch v-model="showButton" title="显示 button"></som-switch>
            <som-switch v-model="showHideOnBlur" title="点击遮罩自动关闭"></som-switch>
            <som-switch v-model="showDialogStyle" title="显示/隐藏" inline-desc="自定义样式"></som-switch>
        </som-list>

        <div v-transfer-dom>
            <som-dialog v-model="showButton" class="dialog-demo">
                <div style="padding:15px;">
                    <som-button type="primary">show button</som-button>
                </div>
            </som-dialog>
        </div>

        <div v-transfer-dom>
            <som-dialog v-model="show" class="dialog-demo">
                <div class="img-box">
                    <img src="http://img.souche.com/f2e/e6f43ffe11fffe91d472b044ccde70d5.jpg" style="max-width:100%">
                </div>
            </som-dialog>
        </div>

        <div v-transfer-dom>
            <som-dialog :show.sync="show2" class="dialog-demo" :is-cancle="false">
                <div class="img-box">
                    <img src="http://img.souche.com/f2e/e6f43ffe11fffe91d472b044ccde70d5.jpg" style="max-width:100%">
                </div>
                <som-button @click.native="show2 = false">关闭</som-button>
            </som-dialog>
        </div>

        <div v-transfer-dom>
            <som-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
                <div class="img-box">
                    <img src="http://img.souche.com/f2e/e6f43ffe11fffe91d472b044ccde70d5.jpg" style="max-width:100%">
                </div>
            </som-dialog>
        </div>

        <div v-transfer-dom>
            <som-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
                    <span style="font-size:30px;">HELLO WORLD</span>
                    <br>
                    <br>
                    <som-icon type="ios-close-outline" style="fill:#fff;"></som-icon>
                </p>
            </som-dialog>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import { TransferDom } from 'som-ui/src';
import ConfigPlugin from 'som-ui/src/plugins/config';

Vue.use(ConfigPlugin, {
    $layout: 'VIEW_BOX'
});

export default {
    directives: {
        TransferDom
    },
    data () {
        return {
            show: false,
            show2: false,
            showButton: false,
            showHideOnBlur: false,
            showDialogStyle: false
        };
    }
};
</script>
