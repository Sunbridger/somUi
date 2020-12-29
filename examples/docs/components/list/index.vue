<template>
    <div>
        <som-list title="基础用法" title-color="#4Da6FF">
            <som-list-item
                title-font-size="14px"
                title-line-height="20px" 
                title="多行文字多行文字多行文字多行文字多行文字多行文字多行文字多行文字多行文字多行文字" 
                is-link></som-list-item>
            <som-list-item title="我的账户" value="保护中" @click.native="onClick"></som-list-item>
            <som-list-item title="余额" @click.native="onClick" :is-loading="!money" :value="money"></som-list-item>
            <som-list-item title="提现" disabled is-link></som-list-item>

            <som-list-item 
                title="每日提醒"
                inline-desc="辅助文字,分享一次，0人浏览">
                <div class="info-list">
                    <div>12小时前</div>
                    <som-badge text="1"></som-badge>
                </div>

            </som-list-item>
        </som-list>

        <som-list title="右侧箭头" title-color="#4Da6FF">
            <som-list-item arrow-direction="up">
                <span slot="title" style="color:green;"><span style="vertical-align:middle;">消息</span></span>
            </som-list-item>
            <som-list-item title="通知" arrow-direction="down" disabled></som-list-item>
            <som-list-item title="隐私" arrow-direction="left"></som-list-item>
            <som-list-item title="通用" arrow-direction="right" value="已开启">
                <img slot="icon"
                    width="24"
                    style="display: block; margin-right: 12px;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
            </som-list-item>
        </som-list>

        

        <som-list label-width="5em" title="Align-items" title-color="#4Da6FF">
            <som-list-item primary="content" title="default" value="扬天大笑出门去，我辈岂是蓬蒿人，山不厌高，海不厌深，周公吐哺，天下归心"></som-list-item>
            <som-list-item title="flex-start" align-items="flex-start" value="从前有一只小鸭子，它觉得自己很丑，小伙伴们都不喜欢它，它下定决心努力变成白天鹅，后来人们发现它还是很好吃的"></som-list-item>
        </som-list>

        <som-list title="折叠" title-color="#4Da6FF">
            <som-list-item
                title="Animated"
                is-link
                :border-intent="false"
                :arrow-direction="showContent ? 'up' : 'down'"
                @click.native="showContent = !showContent"></som-list-item>

                <p class="slide" :class="showContent ? 'animate' : ''">
                    城阙辅三城，风烟望五津。<br/> 与君离别意，同是宦游人。
                    <br/> 城春草木深，烽火连三月。<br/> 家书抵万金，感时花溅泪。
                </p>
        </som-list>

        <som-list title="用 slot 写非文字内容" title-color="#4Da6FF">
            <som-list-item title="Slot 内容">
                <div>
                    <span style="color: green">Hi, I'm Som List.</span>
                </div>
            </som-list-item>
        </som-list>

        <som-list title="link 跳转" title-color="#4Da6FF" class="last-list">
            <som-list-item title="前往 button" :link="{ path: '/demo/button'}" value='查看'></som-list-item>
            <som-list-item title="前往 button" :link="{ path: '/demo/button'}" inline-desc=':link={path:"/demo/button"}'></som-list-item>
        </som-list>
    </div>
</template>


<script>

export default {
    mounted () {
        setTimeout(() => {
            this.money = -1024;
        }, 2000);
    },
    methods: {
        onClick () {
            console.log('on click');
        }
    },
    data () {
        return {
            money: null,
            showContent: false
        };
    }
};
</script>

<style scoped>
.slide {
    padding-top: 0px;
    padding-left: 16px;
    margin: 0px;
    line-height: 20px;
    font-size: 14px;
    height: 0px;
    transition: height .4s linear;
}

.info-list {
    text-align: right;
    font-size: 12px;
}
.info-list span {
    margin-top: 8px;
}

.animate {
    height: 96px;
    transition-delay: 0s;
}
.last-list {
    margin-bottom: 30px;
}
</style>
