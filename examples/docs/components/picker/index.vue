<template>
    <div>
        <span>基础用法, 请在移动端上查看</span>
        <som-picker :columns="column1" @on-change="onChange1" />

        <span>禁用选项</span>
        <som-picker :columns="column2" />

        <span>默认选项</span>
        <som-picker :columns="columnsObject"/>
        <br>
        <som-button type="primary" @click.native="changeDefault">改变默认值</som-button>

        <span>展示顶部</span>
        <som-picker
            show-toolbar
            :title="area"
            :columns="column1"
            @on-cancel="onCancel"
            @on-confirm="onConfirm"/>

        <span>多列联动</span>
        <som-picker :columns="columns" @on-change="onChange2" />

        <span>使用键值对数据，设定显示 key</span>
        <som-picker :columns="column4" value-key="key" ref="picker"/>
        <som-button class="get-value">{{JSON.stringify(selectVals)}}</som-button>
        <som-button type="primary" @click.native="getValue" class="get-value">获取选中值</som-button>

        <span>popup picker</span>     
        <som-list>
            <som-switch title="弹出 picker" v-model="show"></som-switch>
        </som-list>
    
        <div v-transfer-dom>
            <som-popup v-model="show">
                <div class="popup0">
                     <som-picker :columns="columns" show-toolbar
                        @on-change="onChange2" 
                        @on-cancel="show = false"
                        @on-confirm="show = false"/>
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
            area: '标题',
            title2: '禁用选项',
            title3: '展示顶部栏',
            title4: '多列联动',
            selectVals: '',
            column1: ['<i class="som-icon-address" style="color: red; margin-right: 8px"></i>杭州', '宁波', '温州', '嘉兴', '湖州'],
            column2: [
                { text: '杭州', disabled: true },
                { text: '宁波' },
                { text: '温州' },
                { text: '嘉兴', disabled: true },
                { text: '湖州' }
            ],
            column3: {
                '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                '福建': ['福州', '厦门', '莆田', '三明', '泉州']
            },
            column4: [
                {key: '选项一', value: 1},
                {key: '选项二', value: 2},
                {key: '选项三', value: 3},
                {key: '选项四', value: 4}
            ],
            columnsObject: [
                { values: ['东', '南', '西', '北'], defaultIndex: 2},
                { values: ['上', '下', '左', '右'], defaultIndex: 3},
                { values: ['前', '侧', '后', '俯'], defaultIndex: 1},
            ],
            toastContent: (value, index) => `当前值：${value}, 当前索引：${index}`
        };
    },
    computed: {
        columns() {
            const column = this.column3;
            return [
                {
                    values: Object.keys(column),
                    className: 'column1'
                },
                {
                    values: column[Object.keys(column)[0]],
                    className: 'column2',
                    defaultIndex: 2
                }
            ];
        }
    },

    methods: {
        changeDefault () {
            this.columnsObject[0].defaultIndex = 0;
            this.columnsObject[1].defaultIndex = 0;
            this.columnsObject[2].defaultIndex = 0;
        },
        onChange1(picker, value, index) {
            this.$som.toast.text(value + index);
        },
        onChange2(picker, values, index, columnIndex) {
            picker.setColumnValues(1, this.column3[values[0]]);
        },
        getValue() {
            this.selectVals = this.$refs.picker.getValues();
        },
        onConfirm(value, index) {
            this.$som.toast.text(value + index);
        },
        onCancel() {
            this.$som.toast.text('cancel');
        }
    }
};
</script>

<style scoped>
span {
    padding: 8px 16px;
    font-size: 14px;
    display: inline-block;
}
.get-value {
    margin-top: 10px;
}
</style>
