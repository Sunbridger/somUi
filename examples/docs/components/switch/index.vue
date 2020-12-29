<template>
    <div>
        <som-list title="基本使用">
            <som-switch title="默认 false"></som-switch>
            <som-switch title="默认 true" :inline-desc="value1 + ''" v-model="value1"></som-switch>
        </som-list>

        <som-list :title="`值转换 map, 绑定的值是 ${typeof stringValue + ':   ' + stringValue}`">
            <som-switch title="默认 true" :value-map="['0', '1']" v-model="stringValue"></som-switch>
        </som-list>

        <som-list title="禁用">
            <som-switch title="默认 false" disabled></som-switch>
            <som-switch title="默认 true" :value="true" disabled></som-switch>
        </som-list>

        <som-list title="prevent default">
            <som-switch title="默认 false" prevent-default v-model="value2" @on-click="onClick"></som-switch>
        </som-list>

        <som-list title="使用 html 设置 title" class="last-list">
            <som-switch disabled :title="html"></som-switch>
        </som-list>

        <div class="single-switch">
            <p> switch 仅有按钮 </p>
            <som-switch single-button v-model="value1"></som-switch>
            <som-switch single-button switch-class="red"></som-switch>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            stringValue: '1',
            value1: true,
            value2: false,
            html: '<span style="color:red">我是红色</span>'
        };
    },
    methods: {
        onClick (newVal, oldVal) {
            console.log(newVal, oldVal);
            this.value2 = newVal;
        }
    }
};
</script>

<style>
.red:checked {
    border-color: red;
    background-color: red;
}
</style>

<style scoped>
.single-switch {
    padding: 16px;
    display: flex;
}
p {
    font-size: 12px;
    margin-right: 16px;
}
.map-value {
    text-align: left;
    padding: 0px 16px;
}
</style>
