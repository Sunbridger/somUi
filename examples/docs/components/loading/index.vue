<template>
    <div>
        <som-list style="margin-top: 100px">
            <som-switch title="显示" v-model="show1" @on-change="show1change"></som-switch>
        </som-list>
        <div v-transfer-dom>
            <som-loading :show="show1" :text="text1"></som-loading>
        </div>
        <div style="padding: 15px;">
            <som-button @click.native="showLoading" type="primary">显示全屏加载</som-button>
        </div>
        <div style="padding: 15px;">
            <som-button @click.native="showDelayLoading" type="primary">延迟显示加载</som-button>
        </div>
        
    </div>
</template>


<script>
import Vue from 'vue';
// 使用 `v-transfer-dom` 将 loading 插入 `body` 节点下，避免组件非 body 子节点导致的各种问题。
import { TransferDom } from 'som-ui/src';
import LoadingPlugin from 'som-ui/src/plugins/loading';

Vue.use(LoadingPlugin);

function tick (i, cb) {
    setTimeout(function () {
        i++;
        cb(i);
        if (i < 100) {
            tick(i, cb);
        }
    }, 10);
}

export default {
    directives: {
        TransferDom
    },
    data () {
        return {
            show1: false,
            text1: 'Processing'
        };
    },
    methods: {
        showLoading () {
            // 插件方式调用时，直接使用方法 this.$som.loading.show 、this.$som.loading.hide
            this.$som.loading.show({
                text: '正在加载...',
                fullscreen: true
            });
            setTimeout(() => {
                this.$som.loading.hide();
            }, 2000);
        },
        showDelayLoading () {
            this.$som.loading.show({
                delay: 1000
            });
            setTimeout(() => {
                this.$som.loading.hide();
            }, 2000);
        },
        show1change (val) {
            if (val) {
                tick(0, (percent) => {
                    if (percent === 100) {
                        this.show1 = false;
                        return;
                    }
                    this.text1 = `${percent}%`;
                });
            }
        }
    }
};
</script>

