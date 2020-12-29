<template>
    <div>
        <p>基本用法, 当前 index: {{demo01_index}}</p>
        <som-carousel 
            :list="demo01_list"
            v-model="demo01_index" 
            @on-index-change="demo01_onIndexChange">
        </som-carousel>

        <p></p>
        <som-button mini @click.native="demo01_index = 0">第一张</som-button>
        <som-button mini @click.native="demo01_index = 1">第二张</som-button>
        <som-button mini @click.native="demo01_index = 2">第三张</som-button>

        <hr>
        <p>设置aspect-ratio, 将自动根据宽度计算高度</p>
        <som-carousel :list="demo02_list" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></som-carousel>
        <hr>

        <p>自动轮播</p>
        <som-carousel :list="demo03_list" auto style="width:80%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></som-carousel>
        <hr>

        <p>使用 som-carousel-item 作为图片列表, 当前 index: {{carouselItemIndex}}</p>
        <som-carousel :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="carouselItemIndex">
            <som-carousel-item class="som-carousel-demo-img" v-for="(item, index) in demo04_list" :key="index">
                <img :src="item">
            </som-carousel-item>
        </som-carousel>
        <som-button mini @click.native="carouselItemIndex = 0">第一张</som-button>
        <som-button mini @click.native="carouselItemIndex = 1">第二张</som-button>
        <som-button mini @click.native="carouselItemIndex = 2">第三张</som-button>
        <hr>

        <p>异步获取列表数据, 当前 index: {{demo05_index}}</p>
        <som-carousel :list="demo05_list" auto height="180px" @on-index-change="demo05_onIndexChange"></som-carousel>
        <som-button @click.native="demo05_onLoad(2)" style="margin: 10px 0;">加载 List2 数据</som-button>
        <som-button @click.native="demo05_onLoad(1)" style="margin: 10px 0;">加载原数据</som-button>
        <hr>

        <p>引入 som-carousel-item 自定义 item 内容，用 height 定义高度</p>
        <som-carousel auto height="100px">
            <som-carousel-item class="black"><h2 class="title fadeInUp animated">它无孔不入</h2></som-carousel-item>
            <som-carousel-item class="black"><h2 class="title fadeInUp animated">你无处可藏</h2></som-carousel-item>
            <som-carousel-item class="black"><h2 class="title fadeInUp animated">不是它可恶</h2></som-carousel-item>
            <som-carousel-item class="black"><h2 class="title fadeInUp animated">而是它不懂你</h2></som-carousel-item>
            <som-carousel-item class="black"><h2 class="title fadeInUp animated">我们试图</h2></som-carousel-item>
            <som-carousel-item class="black"><h2 class="title fadeInUp animated">做些改变</h2></som-carousel-item>
        </som-carousel>
        <hr>

        <p>垂直方向文字滚动</p>
        <som-carousel auto height="40px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
            <som-carousel-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></som-carousel-item>
            <som-carousel-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></som-carousel-item>
            <som-carousel-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></som-carousel-item>
            <som-carousel-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></som-carousel-item>
            <som-carousel-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></som-carousel-item>
            <som-carousel-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></som-carousel-item>
        </som-carousel>
        <hr>

        <p>循环模式(且可点击)</p>
        <som-carousel loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></som-carousel>
        <hr>
    </div>
</template>

<script>

const baseList = [{
    url: 'javascript:',
    img: 'http://img.souche.com/f2e/d4d35a0675ca78d1bd655cfad97edc06.jpg',
    title: '新垣结衣'
}, {
    url: 'javascript:',
    img: 'http://img.souche.com/f2e/74bd0c856516d0b339b487090dff6d57.png',
    title: '穿成这样来上班'
}, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg',
    title: '小晶',
    fallbackImg: 'http://img.souche.com/f2e/5f8633eb1b958492a22aa05899f0f958.png'
}];

const imgList = [
    'http://img.souche.com/f2e/d4d35a0675ca78d1bd655cfad97edc06.jpg',
    'http://img.souche.com/f2e/74bd0c856516d0b339b487090dff6d57.png',
    'http://img.souche.com/f2e/5f8633eb1b958492a22aa05899f0f958.png'
];

const urlList = baseList.map(item => ({
    url: 'http://m.baidu.com',
    img: item.img,
    fallbackImg: item.fallbackImg,
    title: `(可点击)${item.title}`
}));

const demoList = imgList.map(one => ({
    url: 'javascript:',
    img: one
}));

export default {
    methods: {
        onSwiperItemIndexChange (index) {
            console.log('demo item change', index);
        },
        demo01_onIndexChange (index) {
            this.demo01_index = index;
        },
        demo05_onIndexChange (index) {
            this.demo05_index = index;
        },
        demo05_onLoad (id) {
            this.demo05_list = id === 1 ? baseList : demoList;
        },
        demo06_onIndexChange (index) {
            this.demo06_index = index;
        },
        demo07_onIndexChange (index) {
            this.demo07_index = index;
        }
    },
    data () {
        return {
            demo01_list: baseList,
            demo02_list: demoList,
            demo03_list: demoList,
            demo04_list: imgList,
            demo05_list: baseList,
            demo06_list: urlList,
            demo01_index: 0,
            demo02_index: 1,
            demo05_index: 0,
            demo06_index: 0,
            carouselItemIndex: 1
        };
    }
};
</script>

<style scoped>
p {
    font-size: 13px;
    color: #666;
    padding: 0px 0px 0px 12px;
    margin: 10px 0px;
}
.som-button {
    margin-left: 12px;
}
.som-carousel {
    margin-bottom: 12px !important;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  padding: 0px;
  margin: 0px;
  color: #000;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.som-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.som-carousel-demo-img img {
  width: 100%;
}
</style>
