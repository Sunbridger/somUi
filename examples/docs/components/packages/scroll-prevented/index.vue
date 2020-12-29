<template>
    <div class="demo">
        <p>是否阻止滚动: {{isPreventBack}}</p>
        <som-tips
            v-som-scroll-prevented="isPreventBack"
            v-if="isPreventBack"
            style="margin: 20px; height: 50px; position: relative;"
            v-model="isPreventBack"
            placement="left"
            content=" 我存在了, 页面不能滚动咯">
        </som-tips>
        <som-button @click="isPreventBack = !isPreventBack" >
            点我切换是否阻止body滚动
        </som-button>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                isPreventBack: true
            };
        }
    };
</script>

<style scoped>
.demo {
    padding: 10px 16px;
}
button {
    margin-top: 50vh;
    margin-bottom: 100vh;
}
</style>
