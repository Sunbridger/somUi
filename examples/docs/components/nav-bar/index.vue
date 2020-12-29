<template>
    <div>
        <p>基本用法</p>
        <som-nav-bar right-text="查看" left-text="取消">我的公积金</som-nav-bar>

        <p>填充背景色</p>
        <som-nav-bar fill>标题</som-nav-bar>

        <p>navbar-class</p>
        <som-nav-bar navbar-class="juice" :left-icon="icon1" right-text="关闭">
            消息
        </som-nav-bar>

        <p>slot</p>
        <som-nav-bar>
            <som-segmented-control :style="{ width: '150px' }">
                <som-segmented-control-item selected>消息</som-segmented-control-item>
                <som-segmented-control-item>通讯录</som-segmented-control-item>
            </som-segmented-control>
        </som-nav-bar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menus: {
                menu1: 'Take Photo',
                menu2: 'Choose from photos'
            },
            showMenus: false,
            icon1: 'http://img.souche.com/f2e/bc95c1e179742c953f6d9680e94f80fc.jpg',
            icons: [
                'http://img.souche.com/f2e/bc95c1e179742c953f6d9680e94f80fc.jpg',
                'http://img.souche.com/f2e/bc95c1e179742c953f6d9680e94f80fc.jpg',
                'http://img.souche.com/f2e/bc95c1e179742c953f6d9680e94f80fc.jpg'
            ]
        }
    }
}
</script>


<style scoped>
p {
    margin: 10px;
    padding: 0;
    font-size: 12px;
    color: #666;
}

.right-icon {
    width: 24px;
    height: 24px;
}
.juice {
    background-color: rgba(255, 155, 64, 0.06);
    color: rgba(255, 155, 64, 0.99);
}
</style>
