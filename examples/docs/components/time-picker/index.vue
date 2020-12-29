<template>
    <div>
        <p>默认用法</p>

        <som-time-picker
            v-model="currentTime"
            :min-hour="minHour"
            :max-hour="maxHour"
            :minute-step="5"
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
        </som-time-picker>

        <p>上午下午模式</p>
        <som-time-picker
            v-model="currentTime"
            halftime
            :min-hour="minHour"
            :max-hour="maxHour"
            :minute-step="5"
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
        </som-time-picker>

        <p>range 时间段</p>
        <som-time-picker
            range
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
        </som-time-picker>

        <p>自定义时间段</p>
        <som-time-picker 
            range
            :time-range-step="1.25"
            :default-minute="45"></som-time-picker>

        <p>绑定时间段, 绑定值时注意值与选项一致, 否则无法渲染成功</p>
        <som-time-picker v-model="timeRange" range></som-time-picker>

    </div>
</template>

<script>
import Vue from 'vue';

export default {
    data () {
        return {
            minHour: 8,
            maxHour: 20,
            currentTime: '12:00',
            timeRange: ['08:00', '09:00'],
        }
    },
    methods: {
        onConfirm (val) {
            this.$som.toast.show({
                text: val
            });
        },
        onCancel () {
            this.$som.toast.show({
                text: '取消'
            });
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
