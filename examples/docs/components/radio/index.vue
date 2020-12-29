<template>
    <div>
        <p>基本使用</p>
        <som-list>
            <som-radio
                :options="value"
                @on-change="change"
                title="是否换置新车"
                v-model="v">
            </som-radio>
        </som-list>

        <p>自定义标题, 只限按钮模式</p>
        <som-list>
            <som-radio
                :options="value"
                @on-change="change"
                v-model="v">
                <span class="red"> ***好评</span>
            </som-radio>
        </som-list>

        <p>disabled</p>
        <som-list>
            <som-radio
                :options="value1"
                value="china"
                disabled
                title="国家">
            </som-radio>
        </som-list>

        <p>勾选模式</p>
        <som-list>
            <som-radio
                :options="value3"
                @on-change="change"
                mode="icon"
                v-model="value2">
            </som-radio>
        </som-list>

        <p>手动输入选项</p>
        <som-list>
            <som-radio
                fill-mode
                fill-label="其他"
                :options="value4"
                mode="icon"></som-radio>
        </som-list>

        <p>自定义选项，只限勾选模式</p>
        <som-list>
            <som-radio :options="value1" mode="icon">
                <template slot-scope="props" slot="each-item">
                    <div :class="props.selected ? 'select-label-style' : ''"> $ 我是第{{ props.index + 1 }}项 {{ props.label}}</div>
                </template>
            </som-radio>
        </som-list>
    </div>
</template>

<script>

export default {
    data () {
        return {
            v: true,
            value: [ {
                key: '是',
                value: true
            }, {
                key: '否',
                value: false
            }],
            value1: [ 'china', 'japan', 'english' ],
            value2: 'japan',
            value3: [ '标题文字很长很长很长很长超过两行的情况需要换行处理', 'japan', 'english' ],
            value4: [{
                icon: 'http://img.souche.com/f2e/e40d3e5851603df9aa16c191725b2cfb.png',
                key: '001',
                value: 'radio001'

            }, {
                icon: 'http://img.souche.com/f2e/e40d3e5851603df9aa16c191725b2cfb.png',
                key: '002',
                value: 'radio002'
            }]
        };
    },
    methods: {
        change (value, label) {
            console.log('change:', value, label);
        }
    }
};
</script>

<style scoped>
p {
    font-size: 13px;
    color: #666;
    padding: 0px 0px 0px 12px;
    margin: 10px 0px;
}
.red {
    color: #FF571a;
    margin-right: 12px;
}
.select-label-style {
    color: red;
}
</style>
