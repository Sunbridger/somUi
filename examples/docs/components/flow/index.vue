<template>
    <div>
        <p>基本用法 节点状态 `is-done` 表示完成， `is-active` 表示正在进行</p>
        <som-flow>
            <som-flow-item title="节点名称" is-done></som-flow-item>
            <som-flow-item is-done>
                <span slot="title">节点名称</span>
            </som-flow-item>
            <som-flow-item title="节点名称" is-active></som-flow-item>
            <som-flow-item title="节点名称"></som-flow-item>
        </som-flow>

        <p>设置 `flexable` 平分各节点宽度 </p>
        <som-flow flexable style="width: 100%;">
            <som-flow-item state="1" title="节点名称" is-done></som-flow-item>
            <som-flow-item state="2" is-done>
                <span slot="title">节点名称</span>
            </som-flow-item>
            <som-flow-item state="3" title="节点名称" is-active></som-flow-item>
            <som-flow-item state="4" title="节点名称"></som-flow-item>
        </som-flow>

        <p>自定义图标 通过 icon slot、title slot, 自定义节点</p>
        <som-flow>
            <som-flow-item title="流程一" is-done>
                <som-icon name="check" slot="icon"></som-icon>
            </som-flow-item>
            <som-flow-item title="流程二" is-done>
                <som-icon name="check" slot="icon"></som-icon>
            </som-flow-item>
            <som-flow-item title="失败" is-active>
                <som-icon name="close" slot="icon"></som-icon>
            </som-flow-item>
            <som-flow-item title="流程四"></som-flow-item>
        </som-flow>

        <p>自定样式节点样式</p>
        <som-flow>
            <som-flow-item title="节点名称" is-done acitve-color="#00CD0D"></som-flow-item>
            <som-flow-item title="节点名称" is-done acitve-color="#7088FF"></som-flow-item>
            <som-flow-item title="节点名称" is-active acitve-color="#B5EBD7"></som-flow-item>
            <som-flow-item title="节点名称"></som-flow-item>
        </som-flow>

        <p>垂直节点</p>

        <som-flow orientation="vertical">
            <som-flow-item state="1" title="节点名称" is-done></som-flow-item>
            <som-flow-item state="2" title="节点名称" is-done></som-flow-item>
            <som-flow-item state="3" title="节点名称"></som-flow-item>
            <som-flow-item state="4" title="节点名称"></som-flow-item>
        </som-flow>

    </div>
</template>

<style scoped>
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}

.done1-class {
    color: #00CD0D;
    background-color: #00CD0D;
}

.done2-class {
    color: #7088FF;
    background-color: #7088FF;
}

.wait1-class {
    color: #B5EBD7;
    background-color: #B5EBD7;
}

</style>
