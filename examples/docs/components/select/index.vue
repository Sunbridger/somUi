<template>
    <div>
        <p> 默认 select </p>
        <som-list>
            <som-select 
                required
                @on-change="handleChange"
                v-model="value"
                :options="options">
            </som-select>
            <som-select 
                @on-change="handleChange"
                v-model="value"
                :options="options">
            </som-select>
            <som-select 
                @on-change="handleChange"
                v-model="value"
                :options="options">
            </som-select>
        </som-list>


        <p @click="value1 = ''"> 不显示确认栏 </p>
        <som-list label-width="80px">
            <som-select 
                title="套餐"
                @on-change="handleChange"
                v-model="value1"
                :show-toolbar="false"
                :options="options">
            </som-select>
        </som-list>

        <p> disabled </p>
        <som-list>
            <som-select 
                title="套餐"
                disabled
                @on-change="handleChange"
                v-model="value1"
                :show-toolbar="false"
                :options="options">
            </som-select>
        </som-list>

        <p> 自定义 select </p>
        <som-list>
            <som-select 
                v-model="value2"
                :options="options">
                <span slot="label" style="color: red; margin-right: 12px">自定义</span>
                <som-icon name="caret-bottom" slot="right" :size="12"></som-icon>
            </som-select>
        </som-list>
    </div>
</template>
<script>
export default {
    data () {
        return {
            value: 2,
            value1: 3,
            value2: '',
            options: [
                {text: '选项一', value: 1},
                {text: '选项二', value: 2},
                {text: '选项三', value: 3},
                {text: '选项四', value: 4}
            ]
        }
    },
    watch: {
        value (val) {
            console.log('选择值为:' + val);
        }
    },
    methods: {

        handleChange (value, item) {
            console.log(item);
        }
    }
};
</script>

<style scoped>
p {
    font-size: 12px;
    padding: 12px;
    margin: 0;
}
</style>

