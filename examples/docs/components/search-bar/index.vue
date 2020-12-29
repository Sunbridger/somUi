<template>
    <div>
        <p>基本搜索框</p>
        <som-search-bar required></som-search-bar>

         <p>居中样式搜索框。 需要设置 label-id </p>
         <som-search-bar label-id="som-search"></som-search-bar>
        <br>
        <som-search-bar type="light" placeholder="搜索"></som-search-bar>
        <br>
        <som-search-bar
            select 
            :select-list="lists"
            :gutter="15" 
            placement="bottom-start"></som-search-bar>

        <p>自定义</p>
        <som-search-bar is-cancel>
            <div slot="left" class="search-left"> 车辆 </div>
        </som-search-bar>

        <p>动态搜索框</p>
        <som-search-bar
            @on-result-click="resultClick"
            @on-change="getResult"
            auto-fixed
            :results="results"
            :history="history"
            :hot="hot"
            v-model="value"
            auto-scroll-to-top
            @on-focus="onFocus"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search">
        </som-search-bar>
    </div>
</template>

<script>
import Vue from 'vue';

function getResult (val) {
  let rs = [];
    for (let i = 0; i < 6; i++) {
        rs.push(`${val} result: ${i + 1} `)
    }
  return rs;
}

export default {
    methods: {
        resultClick (item) {
            this.value = item;
        },
        getResult (val) {
            this.results = val ? getResult(this.value) : [];
        },
        onSubmit () {
            this.$refs.search.setBlur();
            this.$som.toast.text('submit');
        },
        onFocus () {
            console.log('on focus');
        },
        onCancel () {
            console.log('on cancel');
        },
        onselectText (v) {
            this.selectText = v;
        }
    },
    data () {
        return {
            selectText: '',
            results: [],
            history: ['suv', '宝马', '凯迪拉克'],
            hot: ['兰博基尼', '法拉利', '布加迪', '劳斯莱斯', {text: '帕加尼', icon: 'star'}],
            autoFixed: false,
            value: 'test',
            value1: '1',
            show2: false,
            lists: ['新车', '二手车', '店铺']
        }
    }
}
</script>

<style scoped>
p {
    font-size: 13px;
    color: #666;
    padding: 0px 0px 0px 12px;
    margin: 10px 0px;
}
.search-left {
    color: red;
    margin-right: 16px;
    white-space: nowrap;
}

.title {
    color: #999;
}
</style>
