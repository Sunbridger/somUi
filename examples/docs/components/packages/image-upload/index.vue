<template>
    <div class="wrap">
        <h3>基础用法</h3>
        <som-image-upload :imgList.sync="imgList1" :max="6" @success="success" :agreement="false"
        @error="error" :deletable="true" :action="action"></som-image-upload>
        <h3>封面图片</h3>
        <som-image-upload :imgList.sync="imgList2" :max="2" @success="success" :lazy="false" name="身份证正面"
        @error="error" :deletable="true" :action="action"
        cover="//img.souche.com/f2e/4b70f058641c5f673c27fe35d01f78c5.png"></som-image-upload>
        <h3>图片带名称</h3>
        <som-image-upload :imgList.sync="imgList3" :max="1" @success="success" :lazy="false" name="身份证反面"
        @error="error" :deletable="true" :action="action"></som-image-upload>
    </div>
</template>


<script>
export default {
    data () {
        return {
            imgList1: ['https://img.souche.com/f2e/27wzr1y42pw8bkn29yswbn1gghmjnhpi.jpg'],
            imgList2: [],
            imgList3: [],
            action: [{
                action: 'quality',
                q:  75
            },{
                action: 'auto-orient', // 是否自动翻转，如果不压缩图片need-compress=false时，请把auto-orient的value置为0
                value: 1
            }]
        }
    },
    methods: {
        success (data) {
            console.log(data);
        },
        error (err) {
            console.log(err);
        }
    }
}
</script>


<style scoped>
.wrap {
    width: 100%;
    position: absolute;
    padding: 10px;
    background: #fff;
}
</style>
