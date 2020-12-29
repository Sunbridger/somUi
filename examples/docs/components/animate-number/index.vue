<template>
    <div style="text-align:center;font-size:26px;">
        <span style="font-size:16px;">单纯数字过渡</span>
        <br>
        <som-animate-number :number="example1.number" :duration="example1.duration" :handler="example1.h"></som-animate-number>
        <br>
        <span style="font-size:16px;">带格式数字过渡</span>
        <br>
        <som-animate-number :number="example2.number" :duration="example2.duration" :handler="example2.h"></som-animate-number>
        <br>
        <span style="font-size:16px;">数字滚动</span>
        <br>
        <som-animate-number :number="example3.number" :duration="example3.duration" :type="example3.type" :height="example3.height"></som-animate-number>
        <br>
        <span style="font-size:16px;">数字反序过渡</span>
        <br>
        <som-animate-number :number="example4.number" :duration="example4.duration" :handler="example4.h"></som-animate-number>
        <br>
        <span style="font-size:16px;">没有动画的数字滚动</span>
        <br>
        <som-animate-number :number="example3.number" :duration="example3.duration" :type="example3.type" :height="example3.height" :animation="false"></som-animate-number>
        <br>
        <span style="font-size:16px;">没有动画的数字变化</span>
        <br>
        <som-animate-number :number="example1.number" :duration="example1.duration" :handler="example1.h" :animation="false"></som-animate-number>
        <br>
        <span style="font-size:16px;">定时数字变化</span>
        <br>
        <som-animate-number :number="example5.number" :duration="example5.duration" :handler="example5.h" :animation="true"></som-animate-number>
        <br>
        <span style="font-size:16px;">定时没有动画的数字变化</span>
        <br>
        <som-animate-number :number="example5.number" :duration="example5.duration" :handler="example5.h" :animation="false"></som-animate-number>
    </div>
</template>
<script>
export default {
    data() {
        return {
            example1: {
                number: 987654,
                duration: 3000,
                h(a) {
                    return a.toFixed(5);
                }
            },
            example2: {
                number: 123456789,
                duration: 2000,
                h(a) {
                    return a.toFixed(0).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
                }
            },
            example3: {
                number: '42,925.62',
                duration: 1000,
                type: 2,
                height: 36
            },
            example4: {
                number: 123456789,
                duration: 2500,
                h(a) {
                    return a.toFixed(0).split('').reverse().join('');
                }
            },
            example5: {
                number: 987654,
                duration: 1000,
                h(a) {
                    return a.toFixed(2);
                }
            }
        };
    },
    mounted() {
        setInterval(() => {
            this.example5.number = Math.ceil(Math.random() * 10000);
        }, 2000);
    }
};
</script>
