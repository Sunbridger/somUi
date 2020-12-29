<template>
    <div class="progress-wrap">
        <div class="progress">
            <p>带刻度的进度条</p>
            <som-progress :tip-content="tipContent" :ticks="tickList" :percent="percent1" :show-cancel="false"></som-progress>
        </div>
        <div class="progress">
            <p>设置宽度的进度条</p>
            <som-progress :width="200" :percent="percent2" :show-cancel="true"></som-progress>
        </div>

        <div class="progress">
            <p>自定义颜色的进度条</p>
            <som-progress :width="200" :percent="percent3" bar-color="#2BBE71" filled-color="#d9d9d9"></som-progress>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            percent1: 20,
            percent2: 0,
            percent3: 40,
            tickList: [{
                percent: 20,
                text: '20%'
            }, {
                percent: 90,
                text: '90%'
            }],
            tipContent: '1/5'
        };
    },
    mounted () {
        setInterval(this.animation, 20);
    },
    methods: {
        animation () {
            if (this.percent2 < 100) {
                this.percent2++;
            }
        }
    }
};
</script>

<style scoped>
.progress-wrap {
    background-color: #fafafa;
    padding: 12px;
}
p {
    font-size: 12px;
}
.progress {
    margin-top: 30px;
    padding: 0 16px;
}
</style>
