<template>
    <div class="textare-warp">
        <p>基本用法</p>
        <som-list>
            <som-textarea placeholder="请输入" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></som-textarea>
        </som-list>

        <p>显示字符数</p>
        <som-list>
            <som-textarea :max-number="20" name="description" placeholder="请输入" ></som-textarea>
        </som-list>

        <p>隐藏字符数</p>
        <som-list>
            <som-textarea :max="200" name="detail" placeholder="请输入" :show-counter="false"></som-textarea>
        </som-list>

        <p>自动增加高度</p>
        <som-list>
            <som-textarea placeholder="请输入" :show-counter="false" :rows="1" :autosize="autosize"></som-textarea>
            <som-textarea title="标题" placeholder="请输入" :show-counter="false" :rows="1" autosize></som-textarea>
        </som-list>

        <p>设置height 100</p>
        <som-list>
            <som-textarea title="标题" :max="200" placeholder="请输入" :height="100" :rows="8" :cols="30" 
                inline-desc="描画一下这首诗词所表达的景象"></som-textarea>
        </som-list>
        <br>

    </div>
</template>

<script>

export default {
    data () {
        return {
            autosize: {
                maxHeight: 60,
                minHeight: 20
            }
        }
    },
    methods: {
        onEvent (event) {
            console.log('on', event)
        }
    }
}
</script>

<style scoped>
.textare-warp {
    height: calc(100vh);
}
p {
    font-size: 13px;
    color: #666;
    padding: 0px 0px 0px 12px;
    margin: 10px 0px;
}
</style>

