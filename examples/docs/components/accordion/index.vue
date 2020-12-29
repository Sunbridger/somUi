<template>
    <div>
        <som-accordion @on-change="handleChange" :default-active-key="[0]">
            <som-accordion-panel header="列表一">
                展开内容是一段文案展开内容是一段文案展开内容是一
                段文案展开内容是一段文案</som-accordion-panel>
            <som-accordion-panel header="列表二">
                <som-list-item title="展开列表一"></som-list-item>
                <som-list-item title="展开列表二"></som-list-item>
                <som-list-item title="展开列表三"></som-list-item>
            </som-accordion-panel>
            <som-accordion-panel header="列表三">
                展开内容是一段文案展开内容是一段文案展开内容是
            </som-accordion-panel>
        </som-accordion>

        <som-accordion class="second-panel" center>
            <som-accordion-panel>
                <som-list-item title="展开列表一"></som-list-item>
                <som-list-item title="展开列表二"></som-list-item>
                <som-list-item title="展开列表三"></som-list-item>
            </som-accordion-panel>
        </som-accordion>
    </div>
</template>
<script>
export default {
    methods: {
        handleChange (keys) {
            console.log(keys);
        }
    }
};
</script>

<style scoped>
.second-panel {
    margin-top: 100px;
}
</style>
