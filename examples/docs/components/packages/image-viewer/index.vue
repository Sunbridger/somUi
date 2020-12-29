<template>
    <div class="image-viewer-md">
        <som-image-viewer ref="viewer1" :deletable="true" @on-delete="handleDelete"></som-image-viewer>
        <p>默认指令版, 这里的指令绑定了特定的组件元素.  </p>
        <ul class="image-container" v-image-viewer:viewer1>
            <li v-for="(item, index) in porps" :key="index">
                <img :src="item.src"/>
            </li>
        </ul>

        <p>检测报告版</p>
        <som-image-viewer ref="viewer2" :checkReport="true"></som-image-viewer>
        <ul class="image-container">
            <li v-for="(item, index) in checkPorps" :key="index">
                <img :src="item.src"
                    v-image-viewer:viewer2 
                    :data-title="item.title"
                    :data-explain="item.description"
                    :data-icon="item.littleTag"/>
            </li>
        </ul>

        <p>tabs版, 并可通过 slot 自定义图片标题内容</p>
        <som-image-viewer ref="viewer3"
            :showPreview="true" 
            :options="options"
            tabType="tgc"
            :showTabLenth="true">
            <template slot-scope="scope">
                <span>第 {{ scope.data + 1 }} 张图</span>
                <span style="float: right; color: #f2f2f2">下载</span>
            </template>
        </som-image-viewer>
        <ul v-for="(tab, tabIndex) in tabsPorps" :key="tabIndex" class="image-container">
            <p>{{tab.tab}}</p>
            <li v-for="(item, index) in tab.img" :key="index">
                <img :src="item.src"
                    v-image-viewer:viewer3 
                    :data-title="item.title"
                    :data-tab="tab.tab"
                    :data-explain="item.description"
                    :data-icon="item.littleTag"/>
            </li>
        </ul>

        <p>传参数版, 因为没有传入查看的 dom, 所以在查看的时候要适用组件自身的 show 方法</p>
        <som-image-viewer ref="viewer4"
            :list="porpsData"
            :showPreview="true"
            ></som-image-viewer>
        <so-button @click="show('viewer4', 0, 0)" type="primary">查看图片</so-button>

        <p>超简洁版 这里 dom 会自动插入全局组件, 有且只有一个, 适用于简单的查看页面上的图片</p>
        <ul class="image-container">
            <li v-for="(item, index) in porps" :key="index">
                <img :src="item.src" v-image-viewer="item.src"/>
            </li>
        </ul>

    </div>
</template>
<script>
export default {
    methods: {
        show (viewer, index, tabIndex) {
            this.$refs[viewer].show(index, tabIndex);
        },
        handleDelete (index) {
            console.log(index);
        }
    },
    data () {
        return {
            action: [
                {
                    action: 'auto-orient',
                    value: 0
                }
            ],
            options: {
                loop: true
            },
            porps: [
                { src: 'http://img.souche.com/f2e/f8f7b2cd811a6968094721398b7dd4fd.jpg'},
                { src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg'}
            ],

            checkPorps: [
                {
                    src: 'http://img.souche.com/3820ee7dfaaf150b8f45dc962d9bb46e.jpg',
                    title: '这是一辆黑色的车子',
                    description: '这里有一个描述哈哈哈哈哈哈哈哈哈哈,这里有一个描述哈哈哈哈哈哈哈哈哈哈这里有一个描述哈哈哈哈哈哈哈哈哈哈',
                    littleTag: 'http://img.souche.com/f2e/26a4c0c7ece38bbef6fea8e966eb4862.png'
                },
                {
                    src: 'http://img.souche.com/9318287dbd3fed7bb1b56b3eb448757a.jpg',
                    title: '2.jpg'
                }
            ],

            tabsPorps: [
                {
                    tab: '海洋',
                    img: [{ src: 'http://img.souche.com/f2e/ddcc2ca4fdf5a0e14f6c76aa7bc56bae.jpg'},
                        { src: 'http://img.souche.com/f2e/743a985bbf89cf8f61c7790699d3ddbb.jpg'}]
                },
                {
                    tab: '风景',
                    img: [ { src: 'http://img.souche.com/f2e/f40ac95e09e4e69608f0724b6a99a5a3.jpg'}]
                }
            ],

            porpsData: [
                {
                    src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg',
                    tab: '动漫'
                },
                {
                    src: 'http://img.souche.com/f2e/743a985bbf89cf8f61c7790699d3ddbb.jpg',
                    tab: '海洋'
                },
                {
                    src: 'http://img.souche.com/f2e/ddcc2ca4fdf5a0e14f6c76aa7bc56bae.jpg',
                    tab: '海洋'
                },
                {
                    src: 'http://img.souche.com/f2e/f40ac95e09e4e69608f0724b6a99a5a3.jpg',
                    tab: '风景'
                },
                {
                    src: 'http://img.souche.com/f2e/7645ab1ab1e78984cc14ebe99004d48c.jpg',
                    tab: '风景'
                },
                {
                    src: 'http://img.souche.com/f2e/d4ad9ae2a84883393ae02a7ae494fc35.jpg',
                    tab: '风景'
                },
                {
                    src: 'http://img.souche.com/f2e/24ebe196e3993714439a8eb3f0f7bb4f.jpg',
                    tab: '食物'
                },
                {
                    src: 'http://img.souche.com/f2e/8b0dadbde9c6ec33e5cfd43fc68299d1.jpg',
                    tab: '食物'
                },
                {
                    src: 'http://img.souche.com/f2e/2013c4e976a3d713c1487f1a4dd341a1.jpg',
                    tab: '食物'
                }
            ]
        };
    }
};
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
}
.image-viewer-md {
    padding: 10px;
}
.image-container img {
    width: 75px;
    height: 50px;
}

p {
    font-size: 14px;
    color: black;
     margin-top: 20px;
}

li {
    list-style: none;
    display: inline-block;
    margin-right: 8px;
}
.so-button {
    margin-top: 10px;
}
</style>

