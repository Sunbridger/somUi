<template>
    <div class="demo">
        <som-action-picker
            :leftList="leftList"
            :rightList="rightList"
            @fetchRightList="fetchRightList"
            @result="result"
            >
        </som-action-picker>
    </div>
</template>
<script>
    import mock from './mock';

    export default {
        data() {
            return {
                leftList: [],
                rightList: []
            };
        },
        created() {
            this.fetchLeftList();
        },
        methods: {
            fetchLeftList() {
                this.leftList = mock.rightList.data;
            },
            fetchRightList(id) {
                mock.rightList.data.forEach((it) => {
                    if (it.id === id) {
                        this.rightList = it.treeList;
                    }
                });
            },
            result(val) {
                console.log('最终返回的数据：', val);
            }
        }
    };
</script>
