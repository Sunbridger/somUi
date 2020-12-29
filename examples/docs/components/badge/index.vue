<template>
    <div>
        <som-badge text="9"></som-badge>
        <br><br>
        <som-badge text="123"></som-badge>

        <som-list style="marginTop: 10px">
            <som-list-item title="红点" is-link>
                <div class="badge-value">
                    <span class="vertical-middle">新消息</span>
                    <som-badge></som-badge>
                </div>
            </som-list-item>

            <som-list-item title="个位数" is-link>
                <div class="badge-value">
                    <span class="vertical-middle">新消息</span>
                    <som-badge text="8"></som-badge>
                </div>
            </som-list-item>
            <som-list-item title="多位数" is-link>
                <div class="badge-value">
                    <span class="vertical-middle">新消息</span>
                    <som-badge text="888"></som-badge>
                </div>
            </som-list-item>

            <som-list-item title="自定义" is-link>
                <div class="badge-value">
                    <span class="vertical-middle">新消息</span>
                    <som-badge text="new" :badge-style="{background: '#FFC61A'}"></som-badge>
                </div>
            </som-list-item>
        </som-list>
    </div>
</template>

<style scoped>
.som-badge {
    margin-left: 8px;
}
.badge-value {
    display: inline-block!important;
}
.vertical-middle {
    vertical-align: middle;
}
</style>
