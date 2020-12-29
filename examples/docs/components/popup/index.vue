<template>
    <div class="som-fix-safari-overflow-scrolling panel">
        <som-list>
            <som-switch title="默认 popup" v-model="show"></som-switch>
            <som-switch title="全屏 popup" v-model="show1"></som-switch>
            <som-switch title="多个 popup (first)" v-model="show3"></som-switch>
            <som-switch title="遮罩不可点击" v-model="show5"></som-switch>
            <som-switch title="默认 百分百高度" v-model="show12"></som-switch>
            <som-switch title="设置 50% 高度" v-model="show13"></som-switch>
        </som-list>
    
        <div>
            <som-popup v-model="show" @on-hide="log('hide')" @on-show="log('show')" :show-mask="false">
                <div class="popup0">
                    <som-list>
                        <som-switch title="开关" v-model="show"></som-switch>
                        <som-switch title="Show Toast" v-model="showToast"></som-switch>
                    </som-list>
                </div>
            </som-popup>
        </div>

        <som-toast v-model="showToast">You did it!</som-toast>
    
        <div v-transfer-dom>
            <som-popup v-model="show1" height="100%" position="top">
                <div class="popup1">
                    <som-list>
                        <som-switch title="开关" v-model="show1"></som-switch>
                    </som-list>
                </div>
            </som-popup>
        </div>
    
        <div v-transfer-dom>
            <som-popup v-model="show3">
                <div class="popup2">
                    <som-list>
                        <som-switch title="第一个弹窗" v-model="show3"></som-switch>
                        <som-switch title="第二个弹窗" v-model="show4"></som-switch>
                    </som-list>
                    <p> 这里是第一个 </p>
                </div>
            </som-popup>
        </div>
    
        <div v-transfer-dom>
            <som-popup v-model="show4">
                <div class="popup2">
                    <som-list>
                        <som-switch title="第二个弹窗" v-model="show4"></som-switch>
                    </som-list>
                    <p> 这里是第二个 </p>
                </div>
            </som-popup>
        </div>
    
        <div v-transfer-dom>
            <som-popup v-model="show5" :hide-on-blur=false>
                <div class="popup2">
                    <som-list>
                        <som-switch title="Mask disable" v-model="show5"></som-switch>
                    </som-list>
                    <p> 这个遮罩不能点击 </p>
                </div>
            </som-popup>
        </div>
    
        <som-list>
            <som-switch title="遮罩颜色透明" v-model="show7"></som-switch>
        </som-list>
    
        <div v-transfer-dom>
            <som-popup v-model="show7" height="270px" is-transparent>
                <div style="width: 95%;background-color:#f2f2f2;height:250px;margin:0 auto;padding:10px;">
                    <som-list>
                        <som-list-item title="Product" value="Donate"></som-list-item>
                        <som-list-item title="Total" value="$10.24"></som-list-item>
                    </som-list>
                    <div style="padding:20px 15px;">
                        <som-button type="primary">支付</som-button>
                        <som-button @click.native="show7 = false">取消</som-button>
                    </div>
                </div>
            </som-popup>
        </div>

        <som-list title="设置方位">
            <som-switch title="left(100% width)" v-model="show8"></som-switch>
            <som-switch title="right" v-model="show9"></som-switch>
            <som-switch title="top(no mask)" v-model="show10"></som-switch>
            <som-switch title="bottom" v-model="show11"></som-switch>
        </som-list>

        <div v-transfer-dom>
            <som-popup v-model="show8" position="left" width="100%">
                <div class="position-horizontal-demo">
                    <som-icon name="close" size="32" @click.native="show8 = false"></som-icon>
                </div>
            </som-popup>
        </div>
    
        <div v-transfer-dom>
            <som-popup v-model="show9" position="right">
                <div style="width:200px;">
                </div>
            </som-popup>
        </div>

        <div v-transfer-dom>
            <som-popup v-model="show10" position="top" :show-mask="false">
                <div class="position-vertical-demo">
                    我在顶部, 一秒后隐藏
                </div>
            </som-popup>
        </div>

        <div v-transfer-dom>
            <som-popup v-model="show11" position="bottom">
                <div class="position-vertical-demo">
                    我在底部
                </div>
            </som-popup>
        </div>

        <div v-transfer-dom>
            <som-popup v-model="show12" position="bottom">
                <som-list class="no-list-titile">
                    <som-list-item v-for="i in 20" :key="i" :title="i"></som-list-item>
                </som-list>
                <div style="padding: 15px;">
                    <som-button @click.native="show12 = false" plain type="primary"> 点我关闭 </som-button>
                </div>
            </som-popup>
        </div>

        <div v-transfer-dom>
            <som-popup v-model="show13" position="bottom" max-height="50%">
                <som-list class="no-list-titile">
                    <som-list-item v-for="i in 20" :key="i" :title="i"></som-list-item>
                </som-list>
                <div style="padding: 15px;">
                    <som-button @click.native="show13 = false" plain type="primary"> 点我关闭 </som-button>
                </div>
            </som-popup>
        </div>

  </div>
</template>

<script>
import { TransferDom } from 'som-ui/src';

export default {
    directives: {
        TransferDom
    },
    data () {
        return {
            show: false,
            show1: false,
            show3: false,
            show4: false,
            show5: false,
            show7: false,
            showToast: false,
            show8: false,
            show9: false,
            show10: false,
            show11: false,
            show12: false,
            show13: false
        };
    },
    methods: {
        log (str) {
            console.log(str);
        }
    },
    watch: {
        show10 (val) {
            if (val) {
                setTimeout(() => {
                    this.show10 = false;
                }, 1000);
            }
        }
    }
};
</script>

<style scoped>
.no-list-titile {
    margin-top: 10px;
}
.panel {
    transform: translate3d(0px, 0px, 0px);
}
.popup0 {
    padding-bottom:15px;
    height:200px;
}
.popup1 {
    width:100%;
    height:100%;
}
.popup2 {
    padding-bottom:15px;
    height:400px;
}
.position-vertical-demo {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 15px;
}
.position-horizontal-demo {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
p {
    padding: 16px 0px 0px 16px;
}
</style>
