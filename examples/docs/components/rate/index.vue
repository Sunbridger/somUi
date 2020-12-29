<style scoped>
.demo {
    background-color: #fff;
    /* min-height: 90vh; */
    padding: 0 16px;
    font-size: 12px;
}
.example1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    border-bottom: 1px solid #EBEDF0;
}
.title {
    font-size: 14px;
    margin-bottom: 20px;
}
.attitude {
    color: #F0A800;
    margin: 12px 0 10px 0;
}
</style>


<template>
    <div class="demo">
        <div class="example1">
            <p class="title">评价样式</p>
            <som-rate @on-click="handleClickEmoji"> </som-rate>
            <p class="attitude" v-if="show">{{evaluation}}</p>
        </div>

        <div class="example1">
            <p class="title">默认评价（只读、已选满意度3）样式</p>
            <som-rate :select-count="3" read> </som-rate>
        </div>

        <div class="example1">
            <p class="title">自定义(图片，长度6) image 评价样式</p>
            <som-rate :unselect-img="starDarkArr" :length="6" :select-img="starLightArr"> </som-rate>
        </div>

        <div class="example1">
            <p class="title">使用 icon 评价样式(只有在只读，类型为icon的情况下，才允许出现不完整点亮 3.7)</p>
            <som-rate :select-count="3.7" :tooltips="['灰常不满意', '不满意', '一般', '满意', '灰常满意']"
                :tooltipStyle="{color: '#FFC400'}"  icon-name="star" read>
            </som-rate>
        </div>

        <div class="example1">
            <p class="title">定制（图标、颜色、大小） icon 评价样式</p>
            <som-rate icon-name="heart"
                :icon-colors="['#D7D7DB', '#FF4040']" 
                :tooltips="['灰常不满意', '不满意', '一般', '满意', '灰常满意']"
                :size="30"> </som-rate>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            evaluation: '',
            starLightArr: ['http://img.souche.com/f2e/27187485d2b691c06263ee1eb747c690.png'],
            starDarkArr: ['http://img.souche.com/f2e/2232d212c124ab8b2358b111515b460d.png']
        }
    },
    methods: {
        handleClickEmoji(value, index) {
            console.log(value, index);
            this.evaluation = `满意度${index + 1}星`;
            this.show = true;
        },
    }
}
</script>
