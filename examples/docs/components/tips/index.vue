<template>
    <div style="text-align:center; margin-top: 20px;">
        <som-tips
            style="margin: 20px; height: 50px; position: relative;"
            v-model="show4"
            placement="left"
            content="字数的限制在十二个字之内">
        </som-tips>
        
        <som-tips 
            placement="top" 
            v-model="show" 
            hide-on-blur 
            style="margin: 20px;" 
            effect="dark" 
            title="字数的限制在十二个字之内第二行"
            mode="guide">
            <som-button type="primary" mini>基本用法</som-button>
        </som-tips>

        <som-tips
            style="margin: 20px;"
            v-model="show3"
            mode="guide"
            illustration="http://img.souche.com/f2e/8d88281af394b56d39b5871e7ef5eec1.jpg"
            placement="top">
            <div slot="content" class="define-guide">
                <p> talk is cheap, please pr </p>
                <span class="define-sign"> 写代码的女生酷不酷</span>
            </div>
            <som-button type="primary" mini>引导模式自定义</som-button>
        </som-tips>

        <som-tips
            style="margin: 20px;"
            effect="active"
            mode="guide"
            v-model="show1"
            placement="top"
            title="主文案十字六七八九十"
            illustration="http://img.souche.com/f2e/8d88281af394b56d39b5871e7ef5eec1.jpg">
            <som-button mini type="primary">带插图</som-button>
        </som-tips>
        
        <som-tips v-model="show2" effect="dark" mode="list" style="margin: 20px;" hide-on-blur placement="bottom-start">
            <som-button type="primary">列表模式</som-button>
            <div slot="content">
                <som-tips-item v-for="(v, i) in lists" :key="i" :text="v.text" :icon="v.icon" :link="v.link" ></som-tips-item>
                <som-tips-item>
                    <span class="define-item">呵呵哒</span>
                </som-tips-item>
            </div>
        </som-tips>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show: false,
            show1: false,
            show2: false,
            show3: false,
            show4: true,
            lists: [
                {icon: 'eye', text: '查看 button'},
                {icon: 'reload', text: '刷新', link: 'demo/tips'}
            ]
        };
    }
};
</script>

<style scoped>
.define-item {
    font-size: 14px;
    color:skyblue;
}
.define-guide {
    text-align: right;
    padding: 8px 0px;
}
.define-guide p {
    margin: 0;
    padding: 0; 
    line-height: 24px;
}
.define-sign {
    font-size: 12px;
}
</style>
