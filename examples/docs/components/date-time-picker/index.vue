<template>
    <div>
        <p>基础用法</p>
        <som-date-time-picker
            v-model="currentDate">
        </som-date-time-picker>

        <p>设置日期范围, 默认显示日期为最小日期</p>
        <som-date-time-picker
            :min-date="minDate"
            :max-date="maxDate"
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
        </som-date-time-picker>

        <p>设置显示列属性 通过 format 设置是否显示上下午, 默认格式为 'yyyy-mm-dd am H mm',
            当 am 为大写时， 上午和下午表示为 AM 和 PM, 当不设置 am 时, 只显示日期、时间、分钟。
        </p>
        <som-date-time-picker
            format="yyyy-mm-dd H mm"
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
        </som-date-time-picker>

        <p>设置确认日期的输出格式 (这里 yyyy 代表年份 MM 代表月 dd 代表日期 hh代表小时 mm代表分)</p>
        <som-date-time-picker
            v-model="currentDate1"
            value-format="yyyy/MM/dd hh:mm"
            @on-confirm="onConfirm"
            @on-cancel="onCancel">
        </som-date-time-picker>

        <p>弹窗组合</p>
        <som-list>
            <som-switch title="弹出 picker" v-model="show"></som-switch>
        </som-list>

        <som-popup v-model="show">
            <som-date-time-picker
                v-model="currentDate"
                @on-confirm="show = false"
                @on-cancel="show = false">
            </som-date-time-picker>
        </som-popup>

        <p>日期时间段选择</p>
        <som-date-time-picker range></som-date-time-picker>

        <p>绑定日期时间段</p>
        <som-date-time-picker range v-model="datetimeRange"></som-date-time-picker>

        <p>设置确定时传出的日期格式</p>
        <som-date-time-picker
            range
            v-model="datetimeRange1" 
            value-format="yyyy/MM/dd"
            @on-confirm="onConfirm"></som-date-time-picker>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    data() {
        return {
            show: false,
            minDate: new Date(2018, 11, 20, 7),
            maxDate: new Date(2019, 0, 9, 18),
            currentDate: new Date(),
            currentDate1: new Date(2018, 0, 1, 12),
            datetimeRange: [new Date(2018, 6, 22), '08:00', '09:00'],
            datetimeRange1: [new Date(), '08:00', '09:00'],
        };
    },
    methods: {
        formateTime (val) {
            let M = val.getMonth();//月份记得加1
            let Y = val.getFullYear();
            let D = val.getDate();
            return `${Y}-${M+1}-${D}`;
        },
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
};
</script>

<style scoped>
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}
</style>
