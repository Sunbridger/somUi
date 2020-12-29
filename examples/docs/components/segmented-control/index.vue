<template>
    <div>
        <div style="padding: 15px;">
            <p>基本用法</p>
            <som-segmented-control>
                <som-segmented-control-item>第一个</som-segmented-control-item>
                <som-segmented-control-item selected>第二个</som-segmented-control-item>
                <som-segmented-control-item>第三个</som-segmented-control-item>
            </som-segmented-control>

            <p>v-model 绑定选中值</p>
            <som-segmented-control v-model="demo01">
                <som-segmented-control-item @on-item-click="consoleIndex()">消息</som-segmented-control-item>
                <som-segmented-control-item @on-item-click="consoleIndex()">通讯录</som-segmented-control-item>
            </som-segmented-control>

            <p>disable 禁用</p>
            <som-segmented-control>
                <som-segmented-control-item selected disabled>短信</som-segmented-control-item>
                <som-segmented-control-item disabled>号码簿</som-segmented-control-item>
            </som-segmented-control>

            <p>type</p>
            <som-segmented-control type="info">
                <som-segmented-control-item selected>短信</som-segmented-control-item>
                <som-segmented-control-item>号码簿</som-segmented-control-item>
            </som-segmented-control>

            <p>自定义</p>
            <som-segmented-control @on-index-change="indexChange" type="info">
                <som-segmented-control-item>消息</som-segmented-control-item>
                <som-segmented-control-item>
                    <span class="som-reddot">新消息<sup><som-badge></som-badge></sup></span>
                </som-segmented-control-item>
            </som-segmented-control>

            <p>small</p>
            <som-segmented-control small>
                <som-segmented-control-item>打卡两次</som-segmented-control-item>
                <som-segmented-control-item selected>点击打卡</som-segmented-control-item>
            </som-segmented-control>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        consoleIndex () {
            console.log('click demo01', this.demo01)
        },
        indexChange (index) {
            console.log(index);
        }
    },
    data () {
        return {
            demo01: 0
        }
    }
}
</script>

<style scoped lang="postcss">
p {
    font-size: 13px;
    color: #666;
    padding: 0px 0px 0px 12px;
    margin: 10px 0px;
}
.som-reddot {

    sup {
        position: absolute;
        top: -9px;
        right: 3px;
    }
}
.small-wrap {
    width: 100px;
}
</style>
