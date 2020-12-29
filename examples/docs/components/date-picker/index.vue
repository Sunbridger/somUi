<template>
    <div>
        <p>type year</p>
        <som-date-picker
            v-model="currentYear"
            type="year"
            title="标题描述"
            @on-confirm="onConfirm"
            @on-cancel="$emit('on-cancel')">
        </som-date-picker>

        <p>type year-month</p>
        <som-date-picker
            v-model="currentDate"
            type="year-month"
            :min-date="minDate"
            @on-confirm="onConfirm"
            @on-cancel="$emit('on-cancel')">
        </som-date-picker>

        <p>type date</p>
        <som-date-picker
            v-model="currentDate1"
            type="date"
            @on-confirm="onConfirm"
            @on-cancel="$emit('on-cancel')">
        </som-date-picker>


        <p> value-format  确认值格式化</p>
        <som-date-picker
            type="date"
            @on-confirm="onConfirm"
            value-format="yyyy/MM/dd"
            @on-cancel="$emit('on-cancel')">
        </som-date-picker>

        <p>弹窗组合</p>
        <som-list>
            <som-switch title="弹出 picker" v-model="show"></som-switch>
        </som-list>

        <som-popup v-model="show">
            <som-date-picker
                type="year"
                @on-confirm="show = false"
                @on-cancel="show = false">
            </som-date-picker>
        </som-popup>

    </div>
</template>

<script>
import Vue from 'vue';

export default {
    data() {
        return {
            show: false,
            minDate: new Date(2018, 11, 20, 7),
            currentDate: new Date(2018, 0, 1),
            currentDate1: new Date(2019, 4, 14),
            currentYear: new Date(2018, 0, 1)
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
