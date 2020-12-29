<template>
    <div>
        <som-filter @on-change="onChange" v-model="value">
            <som-filter-item v-for="(item, index) in list" :key="index"
                :label="item.key"
                :value="item.value"
                :options="item.options"
                :group="item.group">
            </som-filter-item>

            <som-filter-item
                :label="filter3.key"
                :value="filter3.value"
                :options="filter3.options"
                multiple
                :multipleLimit="3">
            </som-filter-item>

            <som-filter-item
                :label="filter4.key"
                :value="filter4.value"
                full
                :options="filter4.options"
                group>
            </som-filter-item>
        </som-filter>
    </div>
</template>


<script>
export default {
    methods: {
        onClick () {
            alert('暂无品牌');
        },
        onChange (val) {
            console.log(val);
        }
    },
    data () {
        return {
            value: {
                cheyuan: 0,
                price: 'high',
                color: 'black'
            },
            list: [
                {
                    key: '单选1',
                    value: 'cheyuan',
                    options: [
                        { key: '选项一', value: 0},
                        { key: '选项二', value: 1},
                        { key: '选项三', value: 2}
                    ]
                },
                {
                    key: '单选2',
                    value: 'cheyuan2',
                    options: [
                         '长哈哈哈哈',
                         '长哈哈事实上长',
                         '长哈'
                    ]
                }
            ],
            filter3: {
                key: '多选',
                value: 'cheyuan3',
                options: [
                    { key: '莫泊桑', value: 'mps'},
                    { key: '莎士比亚', value: 'ssby'},
                    { key: '贝多芬', value: 'bdf'},
                    { key: '钢铁侠', value: 'gtx'},
                    { key: '变形金刚', value: 'bxjg'},
                    { key: '绿巨人', value: 'ljr'}
                ]
            },
            filter4: {
                key: '筛选',
                value: 'filter',
                options: [
                    {
                        key: '价格区间',
                        value: 'price',
                        options: [
                            { key: '0-20', value: 'low' },
                            { key: '20-40', value: 'middle'},
                            { key: '40-100', value: 'high'}
                        ]
                    },
                    {
                        key: '颜色',
                        value: 'color',
                        multiple: true,
                        options: [
                            { key: '黑', value: 'black'},
                            { key: '白', value: 'white'}
                        ]
                    },
                    {
                        key: '口味',
                        value: 'taste',
                        options: ['微辣', '中辣', '重辣', '超级辣']
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}
</style>
