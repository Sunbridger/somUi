<template>
    <div>
        <som-list>
            <som-switch title="日期选择" v-model="show"></som-switch>
            <som-switch title="日期时间" v-model="show1"></som-switch>
            <som-switch title="日期段选择" v-model="show2"></som-switch>
            <som-switch title="日期段时间选择" v-model="show3"></som-switch>
            <som-switch title="选择今天以前的日期" v-model="show4"></som-switch>
        </som-list>
        <som-calendar
            :show.sync="show"
            @on-change="onChange"
            :renderDate="renderDate"
            :shortcuts="shortcuts"
            :disable-weekend="disableWeekend"
            v-model="value">
        </som-calendar>

         <som-calendar
            :show.sync="show1"
            @on-change="onChange"
            v-model="value1"
            is-time>
        </som-calendar>
        <som-calendar
            :show.sync="show2"
            @on-change="onChange"
            v-model="value2"
            :shortcuts="multipShortCuts"
            is-multiple>
        </som-calendar>
        <som-calendar
            :show.sync="show3"
            @on-change="onChange"
            v-model="value3"
            is-time
            :disable-weekend="disableWeekend"
            is-multiple>
        </som-calendar>

        <som-calendar
            :show.sync="show4"
            past
            >
        </som-calendar>
    </div>
</template>

<script>
export default {
    methods: {
        onChange (val) {
            console.log('on-change', val)
        },
        renderDate (h, month, date) {
            if (month === '2018/10' && date === 5) {
                return h('div', null, ['5', h('sup', null, [ h('som-badge', { props: { text: '3'} }, '')]) ]);
            }

            if (month === '2018/10' && date === 12) {
                return h('div', null, ['12', h('sup', {class: 'date-sup'}, [ h('som-badge', '', '')]) ]);
            }
            return date;
        }
    },
    watch: {
        value (val) {
            console.log('日期选择', '222');
        }
    },
    data () {
        const h = this.$createElement;
        return {
            show: false,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            stime: '2018/02',
            etime: '2018/11',
            value: '2018/10/03',
            value1: '2018/10/03 03:20',
            value2: '',
            value3: {
                beginDate: '',
                overDate: ''
            },
            disablePast: true,
            disableFuture: false,
            disableWeekend: true,
            disableDates:[
                {'2018/04/26': '满'},
                {'2018/05/01': '劳动'},
                {'2018/05/02': '劳动'},
                {'2018/05/03': '劳动'},
                {'2018/05/04': '劳动'}
            ],
            today: new Date(),
            shortcuts: [
                {
                    text: '今天',
                    value: () => {
                        return new Date();
                    }
                },
                {
                    text: '明天',
                    value: () => {
                        return new Date(this.today.getTime() + 3600 * 1000 * 24 * 1);
                    }
                },
                {
                    text: '后天',
                    value: () => {
                        return new Date(this.today.getTime() + 3600 * 1000 * 24 * 2);
                    }
                },
                {
                    text: '昨天',
                    value: () => {
                        return new Date(this.today.getTime() - 3600 * 1000 * 24);
                    }
                }
            ],
            multipShortCuts: [
                {
                    text: '近三天',
                    value:  () => {
                        return [new Date(), new Date(this.today.getTime() + 3600 * 1000 * 24 * 2)]
                    }
                },
                {
                    text: '明年六月',
                    value: () => {
                        return [new Date(2019, 5, 1), new Date(2019, 5, 30)]
                    }
                },
            ]
        }
    }
}
</script>

<style scoped>
.button-confirm {
    position: fixed;
    bottom: 0px;
    border-radius: 0px;
    background-color: #FFDC04;
    border-color: #FFDC04;
}
.custom-calender {
    padding-bottom: 45px;
}
</style>
