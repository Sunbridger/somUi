<template>
    <div>
        <div style="height: 200px"></div>
        <som-sticky  @scrollSticky="scrollSticky" ref="sticky">
            <som-notice-bar type="info">
                滚动页面，我会固定在头部哦！
            </som-notice-bar>
        </som-sticky>

        <div style="height: 770px;z-index: -1">
            <button @click="fn">手动吸顶</button>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {};
    },
    methods: {
        scrollSticky (target, flag, e) {
            console.log(`target:${target}`);
            console.log(`flag:${flag}`);
            console.log(`e:${e}`);
        },
        fn () {
            this.$refs.sticky.toSticky();
        }
    }
};
</script>
