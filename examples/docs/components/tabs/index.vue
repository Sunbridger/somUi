<template>
    <div>
        <som-tabs>
            <som-tab-item selected @on-item-click="onItemClick">已发货</som-tab-item>
            <som-tab-item @on-item-click="onItemClick">未发货</som-tab-item>
            <som-tab-item @on-item-click="onItemClick">全部订单</som-tab-item>
        </som-tabs>

        <p>垂直模式</p>
        <som-tabs vertical>
            <som-tab-item selected>已发货</som-tab-item>
            <som-tab-item>未发货</som-tab-item>
            <som-tab-item>全部订单</som-tab-item>
            <som-tab-item>全部订单</som-tab-item>
            <som-tab-item>全部订单</som-tab-item>
        </som-tabs>

        <p>手动切换</p>
        <som-tabs v-model="index01" prevent-default @on-before-index-change="switchTabItem">
            <som-tab-item selected>已发货</som-tab-item>
            <som-tab-item>未发货</som-tab-item>
            <som-tab-item>全部订单</som-tab-item>
        </som-tabs>

        <p>设置相邻 tab 间距相同</p>
        <div class="scroll-tab">
            <som-tabs is-same-away>
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item selected>未发货</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
            </som-tabs>
        </div>

        <p>不同的选中样式</p>
        <som-tabs :animate="false">
            <som-tab-item active-class="active-class1">已发货</som-tab-item>
            <som-tab-item active-class="active-class2" selected>未发货</som-tab-item>
            <som-tab-item active-class="active-class3">全部订单</som-tab-item>
        </som-tabs>

        <p>禁用</p>
        <som-tabs>
            <som-tab-item selected>A</som-tab-item>
            <som-tab-item>B</som-tab-item>
            <som-tab-item disabled>禁用</som-tab-item>
        </som-tabs>

        <p>som-tab-item badge</p>
        <som-tabs>
            <som-tab-item selected badge-label="1">收到的消息</som-tab-item>
            <som-tab-item badge-background="#38C972" badge-color="#fff" badge-label="2">发出的消息</som-tab-item>
        </som-tabs>
        
        <p></p>
        <div>
            <div>
                <som-tabs active-color='#fc378c' v-model="index">
                    <som-tab-item class="som-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</som-tab-item>
                </som-tabs>
            </div>
            <som-carousel v-model="index" height="100px" :show-dots="false">
                <som-carousel-item v-for="(item, index) in list2" :key="index">
                    <div class="tab-swiper som-center">{{item}} Container</div>
                </som-carousel-item>
            </som-carousel>
        </div>

        <div class="box">
            <som-button @click.native="addTab" :disabled="list2.length === 5" type="primary">Add tab item</som-button>
            <som-button @click.native="removeTab" :disabled="list2.length <= 2" type="primary">Remove tab item</som-button>
        </div>

        <som-tabs>
            <som-tab-item :selected="demo3 === item" v-for="(item, index) in list3" :class="{'tabs-split': index===0}" @click="demo3 = item" :key="index">{{item}}</som-tab-item>
        </som-tabs>
        <br><br><br>
    </div>
</template>

<script>
import Vue from 'vue';
import { LoadingPlugin } from 'som-ui/src';

Vue.use(LoadingPlugin);
const list = () => ['精选', '美食', '电影', '酒店', '外卖'];
export default {
    data () {
        return {
            index01: 0,
            list2: list(),
            demo2: '美食',
            list3: ['收到的消息', '发出的消息'],
            demo3: '收到的消息',
            index: 0,
            getBarWidth: function (index) {
                return (index + 1) * 22 + 'px';
            },
        };
    },
    methods: {
        switchTabItem (index) {
            console.log('on-before-index-change', index);
            this.$som.loading.show({
                text: 'loading'
            });
            setTimeout(() => {
                this.$som.loading.hide();
                this.index01 = index;
            }, 1000);
        },
        onItemClick (index) {
            console.log('on item click:', index);
        },
        addTab () {
            if (this.list2.length < 5) {
                this.list2 = list().slice(0, this.list2.length + 1);
            }
        },
        removeTab () {
            if (this.list2.length > 1) {
                this.list2 = list().slice(0, this.list2.length - 1);
            }
        }
    }
};
</script>

<style scoped>
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}
.box {
  padding: 15px;
}
.scroll-tab {
    width: 100%;
    overflow:scroll;
    -webkit-overflow-scrolling:touch;
}
.scroll-tab::-webkit-scrollbar {
    display: none;
}
.som-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.tab-swiper {
  background-color: #000;
  color: #fff;
  height: 100px;
}
.tabs-split {
    position: relative;
}
.tabs-split:after {
    content: '';
    border-right: 1px solid #ccc;
    position: absolute;
    right: 0px;
    height: 100%;
    transform: scaleX(0.5);
    transform-origin: 100% 0;
}
.box + div {
    margin: 100px 0px;
}
</style>

<style>
.active-class1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
}
.active-class2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
}
.active-class3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
}
</style>

