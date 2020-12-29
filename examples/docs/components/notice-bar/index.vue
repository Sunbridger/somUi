<template>
    <div>
        <som-white-space></som-white-space>
        <som-notice-bar
            type="info"
            icon="information"
            :marquee="{ loop: true }">
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
        </som-notice-bar>

        <som-white-space></som-white-space>
        <som-notice-bar mode="link" :onClick="onclick" type="warn"
            icon="information">
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
        </som-notice-bar>

        <som-white-space></som-white-space>
        <som-notice-bar mode="closable">Remove the default icon.</som-notice-bar>

        <som-white-space></som-white-space>
        <som-notice-bar mode="closable" icon="circle-check">
            Customized icon.
        </som-notice-bar>

        <som-white-space></som-white-space>
        <som-notice-bar mode="closable">
            <span style="color: #a1a1a1" slot="action">不再提示</span>
            Closable demo for `actionText`.
        </som-notice-bar>

        <som-white-space></som-white-space>
        <som-notice-bar mode="link" :onClick="onclick2">
            <span slot="action">去看看</span>
            Link demo for `button`.
        </som-notice-bar>

        <som-white-space></som-white-space>
        <som-notice-bar mode="link">
            自定义操作栏
            <som-button slot="action" mini plain type="gray">按钮</som-button>
        </som-notice-bar>
    </div>
</template>

<script>
export default {
    methods: {
        onclick () {
            console.log(1);
        },
        onclick2 () {
            this.$router.push('/demo/button');
        }
    }
};
</script>

<style scoped>
.som-notice-bar__icon {
    color: blue;
}
</style>

