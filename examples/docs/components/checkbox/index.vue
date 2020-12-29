<template>
    <div style="padding-bottom: 10px;">
        <p>横排模式</p>
        <som-checkbox :options="levelList" v-model="checklist000" align="horizontal" title="方向"></som-checkbox>

        <p>默认垂直</p>
        <som-checkbox required :options="commonList" v-model="checklist001" @on-change="change"></som-checkbox>

        <p>垂直模式下， lable-position 为 left</p>
        <som-checkbox required :options="disabledList" v-model="checklist002" label-position="left"></som-checkbox>

        <p>disabled</p>
        <som-checkbox disabled :options="disabledList" v-model="checklist002"></som-checkbox>

        <p>多选值设为 2</p>
        <som-checkbox :options="commonList" v-model="checklist003" :max=2></som-checkbox>

        <p>max = 1, 单选模式</p>
        <som-checkbox :options="commonList" v-model="radioValue" :max="1"></som-checkbox>
        
         <p>打乱顺序, 并统一设置描述</p>
        <som-checkbox random-order 
            :options="checklist005"
            :inline-desc-click="clickHandle" 
            v-model="checklist005Value">
            <template slot-scope="inlineDesc">
                <span class="right">这是选择数字</span>
            </template>
        </som-checkbox>

        <p>使用 obeject 选项列表</p>
        <som-checkbox ref="demoObject" :options="objectList" v-model="objectListValue" @on-change="change"></som-checkbox>

        <div style="padding:8px 0px;">
            <som-button>{{fullValues}}</som-button>
            <som-button type="primary" @click.native="fullValues = $refs.demoObject.getFullValue()">getFullValue()</som-button>
        </div>

        <p>添加描述和图标</p>
        <som-checkbox :options="inlineDescList" v-model="inlineDescListValue"></som-checkbox>

        <p>checkbox-group</p>
        <som-checkbox-group label="不限排放" v-model="groupVal" @on-change-group="changeGroup">
            <som-checkbox :options="group1" title="排放"></som-checkbox>
        </som-checkbox-group>
    </div>
</template>

<script>
import Vue from 'vue';
import { TransferDom } from 'som-ui/src';

export default {
    directives: {
        TransferDom
    },
    methods: {
        clickHandle (one, index, event) {
            event.preventDefault(); // 阻止默认选择
            this.$som.toast.text('你点击了描述');
        },
        changeGroup (val) {
            console.log(val);
        },
        change (val, label) {
            console.log('change', val, label);
        },
        selectFirst () {
            this.checklist001 = ['China'];
        },
        selectFirstTwo () {
            this.checklist001 = ['China', 'Japan'];
        },
        selectLeft () {
            let arr = this.checklist001;
            this.commonList.forEach((val) => {
                if (arr.indexOf(val) === -1) {
                    arr.push(val);
                }
            });
        }
    },
    data () {
        return {
            fullValues: [],
            labelPosition: '',
            error: '',
            levelList: ['前', '后', '左'],
            commonList: [ 'China', 'Japan', 'America' ],
            disabledList: [ 'China'],
            checklist000: [],
            checklist001: [],
            checklist0011: [],
            checklist002: [ 'China' ],
            checklist003: [ 'China', 'Japan' ],
            checklist005: [ '01', '02', '03' ],
            checklist005Value: [],
            objectList: [{key: '001 value', value: '1'}, {key: '002 value', value: '2'}],
            objectListValue: ['1'],
            inlineDescList: [
                { key: 'Tiger is good', value: '1', inlineDesc: 'Tiger '},
                { key: 'Camel is best', value: '2', icon: 'http://img.souche.com/f2e/785cdd183327575632056f49c967d740.png'}
            ],
            inlineDescListValue: ['1'],
            radioValue: ['China'],
            group1: [{key: '国五', value: '1'}, {key: '国四', value: '2'}, {key: '国三', value: '3'}],
            groupVal: ['1', '2', '3']
        };
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
.right {
    color: red;
    font-size: 12px;
    margin-left: 8px;
}
.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}
</style>
