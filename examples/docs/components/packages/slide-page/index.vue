<template>
    <div>
        <som-button class="changeSlide" @click="changeSlide">切换滑动方向</som-button>
        <som-slide-page v-show="slideTop" class="slide-page">
            <div class="page-item page1"></div>
            <div class="page-item page2"></div>
        </som-slide-page>
        <div class="left-page" v-show="!slideTop">
            <div class="page-content"></div>
            <som-slide-page class="left-slide-page" :slideType="'left'" :outClassName="'page-box'" :isSpringback=true :springbackDistance=100 :pageValue="pageValue" :slideWay="'transform'" :nextShow=false>
                <ul class="page-box">
                    <li class="page-item page3"></li>
                    <li class="page-item page4"></li>
                    <li class="page-item page5"></li>
                </ul>
            </som-slide-page>
            <div class="page-content"></div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            slideTop: true
        };
    },
    computed: {
        pageValue() {
            return window.innerWidth;
        }
    },
    methods: {
        changeSlide() {
            this.slideTop = !this.slideTop;
        }
    }
};
</script>

<style scoped>
.changeSlide{
    position: fixed;
    top: 10px;
    left: 0;
    z-index: 9;
    width: 140px;
}
.slide-page{
    height: 100vh;
}
.page-box{
    width: 1125px;
    height: 100%;
}
.page-item{
    width: 375px;
    height: 100%;
    float: left;
}
.page1{
    background-color: #111;
}
.page2{
    background-color: red;
}
.page3{
    background-color: #111;
}
.page4{
    background-color: red;
}
.page5{
    background-color: blue;
}
.left-page{
    width: 100%;
    height: 1000px;
}
.page-content{
    height: 300px;
}
.left-slide-page{
    height: 400px;
}
</style>

