<template>
    <div class='content'>
        <h3>请在手机查看</h3>
        <div class="item">
            <p>正常文档流</p>
            <som-list>
                <som-keyboard :input-parmes='inputParmes1' :keyboard-parme='keyboardParme1' @on-confirm='change1'></som-keyboard>
            </som-list>
        </div>
        <div class="item abs">
            <p>绝对定位</p>
            <som-list>
                <som-keyboard :input-parmes='inputParmes2' @on-confirm='change2'></som-keyboard>
            </som-list>
        </div>
        <div class="item fix fixbox">
            <p>固定定位</p>
            <som-list>
                <som-keyboard @on-confirm='change3'></som-keyboard>
            </som-list>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            keyboardParme1: {
                confirmButtonText: '确定'
            },
            inputParmes1: {
                type: 'number',
                title: '手机号',
                max: 11
            },
            inputParmes2: {
                type: 'number',
                title: '标题'
            },
            inputParmes3: {
                type: 'number',
                title: '标题'
            },
        }
    },
    mounted(){
        console.log(this.$el.querySelector(".fixbox"));
    },
    methods: {
        change1(val){
            this.$som.toast.show(val);
        },
        change2(val){
            this.$som.toast.show(val);
        },
        change3(val){
            this.$som.toast.show(val);
        }
    }
};
</script>

<style scoped>
.content{
    position: relative;
    padding-bottom: 110px;
}
.item{
    width:100%;
    height:90px;
    background:#fff;
    margin-bottom:10px;
}
.item.abs{
    position: absolute;
    bottom:100px;
}
.item.fix{
    position: fixed;
    bottom:0;
}
p {
    font-size: 13px;
    color: #666;
    padding: 0px 0px 0px 12px;
    margin: 10px 0px;
}
</style>
