<template>
    <div class="demo">
        <button @click="visible=true">点击弹出提示</button>
        <som-action-tip
            :visible.sync="visible"
            @clickMask="clickMask"
            :title="title" 
            :customClass='customClass'
            >
            <p slot='closeIcon'>关闭</p>
            <p slot='content'>{{content}}</p>
        </som-action-tip>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                visible: false,
                customClass: '',
                content: '内容内容内容',
                title: '标题'
            };
        },
        methods: {
            clickMask() {
                console.log('我--蒙层，被点击了！');
            }
        }
    };

</script>
<style>
    .demo{
        margin-top: 100px;
        width: 100%;
        text-align: center;
    }
    button{
        margin: 10px auto;
        display: block;
        padding: 6px;
    }
</style>
