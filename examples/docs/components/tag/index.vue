<template>
    <div>
        <p>基础用法</p>
        <som-tag-group>
            <som-tag>标签标签</som-tag>
            <som-tag type="primary">标签标签</som-tag>
            <som-tag type="primaryed">标签标签</som-tag>
            <som-tag type="info">标签标签</som-tag>
            <som-tag type="error">标签标签</som-tag>
            <som-tag type="warn">标签标签</som-tag>
            <som-tag type="success">标签标签</som-tag>
        </som-tag-group>

        <p>空心样式 plain</p>
        <som-tag-group>
            <som-tag plain>标签标签</som-tag>
            <som-tag plain type="primary">标签标签</som-tag>
            <som-tag plain type="info">标签标签</som-tag>
        </som-tag-group>
        

        <p>标记样式 mark</p>
        <som-tag-group>
            <som-tag mark type="warn">A</som-tag>
            <som-tag mark type="primary">B</som-tag>
            <som-tag mark type="info">C</som-tag>
        </som-tag-group>

        <p>可删除标签 closable</p>
        <som-tag-group>
            <som-tag closable>标签标签</som-tag>
            <som-tag closable type="primary">标签标签</som-tag>
            <som-tag closable type="info">标签标签</som-tag>
        </som-tag-group>

        <p>图标标签 icon</p>
        <som-tag-group>
            <som-tag icon="date">2018-8</som-tag>
            <som-tag icon="star" type="primary">333个</som-tag>
        </som-tag-group>

        <p>小标签 size = small</p>
        <som-tag-group>
            <som-tag size="small">2018-8</som-tag>
            <som-tag size="small" type="primary">333个</som-tag>
        </som-tag-group>


        <p> 三等分 </p>
        <som-tag-group column="three">
            <som-tag type="primary">标签标签</som-tag>
            <som-tag type="primaryed">标签标签</som-tag>
            <som-tag type="info">标签标签</som-tag>
            <som-tag type="info">标签标签</som-tag>
        </som-tag-group>

        <p> 四等分 </p>
        <som-tag-group column="four">
            <som-tag type="primary">标签</som-tag>
            <som-tag type="primaryed">标签</som-tag>
            <som-tag type="info">标签</som-tag>
            <som-tag type="info">标签</som-tag>
            <som-tag type="info">标签</som-tag>
        </som-tag-group>

        <p> 七等分</p>
        <som-tag-group column="seven">
            <som-tag type="primary">A</som-tag>
            <som-tag type="primary">A</som-tag>
            <som-tag type="primaryed">B</som-tag>
            <som-tag type="info">C</som-tag>
            <som-tag type="info">D</som-tag>
            <som-tag type="info">E</som-tag>
            <som-tag type="info">F</som-tag>
            <som-tag type="info">G</som-tag>
        </som-tag-group>
        <br><br>
    </div>
</template>

<style scoped>
p {
    margin: 10px 10px 0px 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}
</style>
