<template>
    <div>
        <div class="button-wrap">
            <p> 类型按钮 (设置 delay-time 禁止连续点击事件）</p>
            <som-button @click="click" :delay-time="2000">submit</som-button>
            <som-button type="gray" :btnStyle="btnStyle">gray</som-button>
            <som-button type="primary">primary</som-button>
            <som-button type="info">Delete</som-button>

            <p> mini 按钮 </p>
            <som-button mini>submit</som-button>
            <som-button mini type="primary">primary</som-button>
            <som-button mini type="info">info</som-button>

            <p> large 按钮 </p>
            <som-button large type="error">error</som-button>

            <p> icon 按钮 </p>
            <som-button icon="star" large>error</som-button>

            <p>link 按钮 </p>
            <som-button type="default" link="/components/color">go color</som-button>

            <p>自定义圆角 </p>
            <som-button radius="22">go color</som-button>

            <p> plain 按钮 </p>
            <som-button plain>submit</som-button>
            <som-button plain type="primary">primary</som-button>
            <som-button plain type="info">info</som-button>

            <p> disabled 按钮 </p>
            <som-button disabled>disable submit</som-button>
            <som-button disabled type="gray">disable gray</som-button>
            <som-button type="primary" disabled>disable primary</som-button>
            <som-button plain type="primary" disabled>disable plain primary</som-button>

            <p> 渐变按钮 </p>
            <som-button :gradients="['#1D62F0', '#19D5FD']">iOS Gradients</som-button>
        </div>
        <div class="button-group-wrap">
            <p> 底部按钮组合 </p>
            <som-button-group>
                <som-button type="gray" large>操作一</som-button>
                <som-button type="primary" large>操作二</som-button>
            </som-button-group>
            <br>
            <som-button-group flex-rank="three">
                <som-button type="gray" large>操作一</som-button>
                <som-button type="primary" large>操作二</som-button>
            </som-button-group>

            <br>
            <som-button-group right>
                <som-button type="gray">操作一</som-button>
                <som-button type="primary">操作二</som-button>
            </som-button-group>

            <br>
            <div class="bottom-tool">
                <div class="small-btn">
                    <som-icon name="star"></som-icon>
                    <span>收藏</span>
                </div>
                <div class="small-btn">
                    <som-icon name="star"></som-icon>
                    <span>发消息</span>
                </div>
                <som-button-group>
                    <som-button type="gray">操作一</som-button>
                    <som-button type="primary">操作二</som-button>
                </som-button-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        click () {
            console.log('click');
        }
    },
    data () {
        return {
            btnStyle: {
                color: 'green'
            }
        }
    }
};
</script>

<style lang="less">
p {
    padding: 10px 0px;
    font-size: 12px;
}
.button-wrap {
    width: 100%;
    padding: 10px 24px;
    background-color: #fff;
    box-sizing: border-box;
}
.button-wrap .som-button--mini + .som-button--mini {
    margin-left: 12px;
}
.button-group-wrap {
    background-color: #F2F3F5;
}
.button-group-wrap p {
    padding: 10px;
}
.bottom-tool {
    position: relative;
    display: flex;
    height: 54px;
    
    .small-btn {
        width: 60px;
        background-color: #fff;
        font-size: 10px;
        padding: 8px 0px;
        position: relative;
        text-align: center;

        i {
            font-size: 20px;
            display: block;
        }
    }
}
</style>
