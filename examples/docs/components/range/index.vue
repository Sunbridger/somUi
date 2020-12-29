<template>
    <div class="demo">
        <som-button @click="resetFun">重置 第一个range</som-button>
        <som-button @click="runin">指定范围15-30  （第一个range）</som-button>
        <br>
        <br>
        <p>默认用法, 绑定 value: {{value}}</p>
        <som-range
            v-model="value"
            range="10-50"
            :step="1"
            :tip-list="tipList"
        ></som-range>
        <br>
        <br>
        <br>
        <br>
        <p>设置滑动按钮图片（cursor-img）,底部数字颜色(primaryColor)</p>
        <som-range
            v-model="value2"
            range="0-6"
            :step="2"
            :tipList="tipList2"
            range-color="#23d18b"
            primary-color="#000"
            cursor-img="https://images.pexels.com/photos/143657/pexels-photo-143657.jpeg?h=350&auto=compress&cs=tinysrgb"
            ></som-range>
        <br>
        <br>
    </div>
</template>
<script>

export default {
    data() {
        return {
            reset: false,
            value: '20-40', // 游标范围
            value2: '0-6', // 游标范围
            value3: '2000-4000', // 游标范围
            tipList: ['10', '20', '30', '40', '不限'], // 下标提示
            tipList2: ['0', '1', '2', '3', '4', '5', '6'], // 下标提示
            tipList3: ['0', '1000', '2000', '3000', '4000', '不限'] // 下标提示
        };
    },
    watch: {
        value(data) {
            console.log('result', data);
        }
    },
    methods: {
        resetFun() {
            this.value = '10-50';
        },
        runin() {
            this.value = '15-30';
        }
    }
};
</script>
<style scoped>
.demo {
    background-color: #fff;
    text-align: center;
    padding: 20px 30px;
    box-sizing: border-box;
}

p {
    font-size: 12px;
    text-align: left;
}
</style>

