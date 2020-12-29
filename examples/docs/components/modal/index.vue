<template>
    <div>
        <som-list>
            <som-switch title="基本使用" v-model="show"></som-switch>
            <som-switch title="对话框显示" v-model="show1"></som-switch>
            <som-switch title="安卓风格" v-model="show2"></som-switch>
            <som-switch title="显示 input" v-model="show3"></som-switch>
            <som-switch title="阻止自动关闭" v-model="show4"></som-switch>
            <som-switch title="自定义文案" v-model="show5"></som-switch>
        </som-list>
            
        <div v-transfer-dom>
            <som-modal v-model="show"
                title="操作提示"
                :content="content"
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
            </som-modal>
        </div>
        <div v-transfer-dom>
            <som-modal v-model="show1"
                title="操作提示"
                is-confirm
                :content="content"
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
            </som-modal>
        </div>
         <div v-transfer-dom>
            <som-modal v-model="show2"
                is-confirm
                title="操作提示"
                theme="android"
                :content="content2"
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
            </som-modal>
        </div>
       
        <div v-transfer-dom>
            <som-modal v-model="show3"
                is-confirm
                show-input
                ref="confirm5"
                title="操作提示"
                :content="content"
                @on-cancel="onCancel"
                @on-confirm="onConfirm5"
                @on-show="onShow5"
                @on-hide="onHide">
            </som-modal>
        </div>
        <div v-transfer-dom>
            <som-modal
                is-confirm
                v-model="show4"
                :close-on-confirm="false"
                title="操作提示"
                @on-confirm="onConfirm4">
            </som-modal>
        </div>

         <div v-transfer-dom>
            <som-modal
                is-confirm
                v-model="show5"
                title="声明">
                <div class="content">
                    本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班
                    <p>本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班</p>
                    <p>本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班</p>
                    <p>本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班</p>
                    <p>本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班</p>
                    <p>本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班</p>
                    <p>本公司于2019年3月17日正式宣布全体公司与早上9点半准时上班</p>
                </div>
                <div slot="footer" class="action-btn">
                    <som-button  :border-width="1" :btn-style="btnStyle">详情</som-button>
                    <som-button  :border-width="0">反馈</som-button>
                </div>
            </som-modal>
        </div>
        
        <div style="padding:15px;">
            <som-button @click.native="showPlugin" type="primary">插件使用</som-button>
        </div>
        <div style="padding:15px;">
            <som-button @click.native="showPlugin3" type="primary">插件显示 input </som-button>
        </div>
    </div>
</template> 

<script>
import Vue from 'vue';
import { TransferDom } from 'som-ui/src';
import LoadingPlugin from 'som-ui/src/plugins/loading';
import ToastPlugin from 'som-ui/src/plugins/toast';
import ModalPlugin from 'som-ui/src/plugins/modal';

Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Vue.use(ConfigPlugin, {
//     $layout: 'VIEW_BOX'
// });

export default {
    directives: {
        TransferDom
    },
    data () {
        return {
            show: false,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            content: '你确定吗?',
            content2: 'I miss u chaoZ',
            btnStyle: {
                color: 'green'
            }
        };
    },
    methods: {
        onCancel () {
            console.log('on cancel');
        },
        onConfirm (msg) {
            console.log('on confirm');
            if (msg) {
                this.$som.toast.text(msg);
            }
        },
        onConfirm4 () {
            console.log('on confirm');
            this.$som.loading.show({
                transition: '',
                text: '关闭中...'
            });
            setTimeout(() => {
                this.$som.loading.hide();
                this.show4 = false;
            }, 1000);
        },
        onHide () {
            console.log('on hide');
        },
        onShow () {
            console.log('on show');
        },
        onShow5 () {
            this.$refs.confirm5.setInputValue('default');
        },
        onConfirm5 (value) {
            this.$refs.confirm5.setInputValue('');
            this.$som.toast.text('input value: ' + value);
        },
        showPlugin () {
            this.$som.modal.show({
                title: '标题',
                content: '内容',
                isConfirm: true,
                onShow () {
                    console.log('plugin show');
                },
                onHide () {
                    console.log('plugin hide');
                },
                onCancel () {
                    console.log('plugin cancel');
                },
                onConfirm () {
                    console.log('plugin confirm');
                }
            });
        },
        showPlugin3 () {
            const _this = this;
            this.$som.modal.prompt('123', {
                title: '标题',
                onShow () {
                    console.log('promt show');
                    _this.$som.modal.setInputValue('set input value');
                },
                onHide () {
                    console.log('prompt hide');
                },
                onCancel () {
                    console.log('prompt cancel');
                },
                onConfirm (msg) {
                    _this.$som.toast.text(msg);
                }
            });
        }
    }
};
</script>

<style scoped>
.action-btn {
    width: 100%;
}

.som-button {
    margin-top: 0px;
    border: 0px;
}

.content {
    padding: 0px 16px;
    text-align: justify;
}
.content > p:first-child {
    color: #FF571a;
}
</style>
