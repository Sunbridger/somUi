<template>
    <div>
        <div class="car-picker-demo-select-group">
            <p>点击切换选择器场景:</p>
            <som-button
                large
                type="primary"
                @click="switchScene(sceneOption)"
                v-for="sceneOption in sceneList"
                :key="sceneOption.scene">{{sceneOption.description + ':' + sceneOption.scene}}</som-button>
        </div>
        <div class="car-picker-demo-wrapper"  v-if="showPicker" v-som-scroll-prevented="showPicker">
            <div class="picker-title">
                <button @click="gobackSelectScene">返回(当前选择器场景:{{currentScene.description}})</button>
            </div>
            <!--<button @click="$refs.carPicker.hideSideGroup()">隐藏side</button>-->
            <div class="picker-content">
                <som-car-picker
                    :actived-value="value"
                    ref="carPicker"
                    :filterModelMethod="filterModelMethod"
                    :modelDataUrl="getModelData"
                    :scene="currentScene.scene"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand"
                    @on-series-click="onSeriesClick"
                >
                    <div slot="loading">    
                        <som-icon name="loading" size="24"></som-icon>
                        <p class="loading-decs">加载中...</p>
                    </div>
                    <som-selector-item title="我的历史" index="历">
                        <div class="selector-item-body-custom">
                            <div 
                            v-for="brandItem in historyData"
                            @click="openSeriesSection(brandItem)"
                            :key="brandItem.code"
                            :class="['card-item', {'card-item-selected': selectedBrands.filter(selectedBrandItem => selectedBrandItem.code === brandItem.code).length > 0}]">
                                <img class="card-item-image" :src="brandItem.image">
                                <span class="card-item-span">{{brandItem.name}}</span>
                            </div>
                        </div>
                    </som-selector-item>
                    <div slot="modelFilter">
                        <som-selector-item title="年份">
                            <som-tag-group class="citys" column="three">
                                <som-tag 
                                    :plain="filter.modelYear === item"
                                    @click.native="filter.modelYear = item"
                                    :type="filter.modelYear === item ? 'primary': 'default'"
                                    v-for="item in filterOptions"
                                    :key="item">
                                    {{item || 'all'}}
                                </som-tag>
                            </som-tag-group>
                        </som-selector-item>
                    </div>
                </som-car-picker>
            </div>
        </div>
    </div>
</template>
<script>
import HttpRequest from '@souche-f2e/http-request';

export default {
    data() {
        return {
            filterOptions: ['2015', '2016', ''],
            value: {},
            scene: 1,
            showPicker: false,
            currentScene: {},
            selectedBrands: [],
            filter: {
                modelYear: '',
            },
            historyData: [{
                code: 'brand-12',
                name: '阿尔法罗密欧',
                image: '//img.souche.com/files/carproduct/brand/brand-12.png'
            }],
            sceneList: [
                {scene: 1, description: '单品牌'},
                {scene: 2, description: '单品牌单车系'},
                {scene: 3, description: '单品牌单车系单车型'},
                {scene: 4, description: '单品牌单车系多车型'},
                {scene: 5, description: '单品牌多车系'},
                {scene: 6, description: '多品牌'},
                {scene: 7, description: '多品牌多车系'},
                {scene: 8, description: '多品牌多车系多车型'}
            ],
            currentSeries: {}
        };
    },
    watch: {
        filter: {
            handler () {
                let carPicker = this.$refs.carPicker;
                // 调用内部过滤方法，每个车型的过滤根据你的 filterModelMethod 方法。
                carPicker.filterModelData();

                // 当你自定义后端方法的时候更为简单
                // 你也可以调用后端接口重新获取过滤数据，再通过内部 setModel 方法更新车型数据。
                // carPicker.getModel(this.currentSeries, carPicker.setModel.bind(carPicker));

                // modelDataUrl 方法示例。 eg:
                // HttpRequest.jsonp('https://car-model.souche.com/model/getModelBySeries.jsonp', {
                //     series_code: this.currentSeries.code
                //     modelYear: this.filter.modelYear
                // });
            },
            deep: true
        }
    },
    methods: {
        filterModelMethod (item) {
            return item.modelYear === this.filter.modelYear || !this.filter.modelYear;
        },
        onSeriesClick (series) {
            this.currentSeries = series;
        },
        onSelected(data) {
            console.log('选中结束');
            console.log(data);
        },
        onSelectedBrand(data) {
            this.selectedBrands = data;
            console.log('品牌变化');
            console.log(data);
        },
        openSeriesSection(brandItem) {
            this.$refs.carPicker.openSeriesSection(brandItem);
        },
        switchScene(sceneOption) {
            if (sceneOption.scene === 8) {
                this.value = {
                    brand: [{
                        code: "brand-859",
                        name: "AC Schnitzer",
                        image: "http://img.souche.com/files/brand/ybaqYNWJq9.png",
                        series: [{
                            code: "series-50633",
                            name: "AC M3",
                            model: [{
                                code: "209725",
                                name: "2015款 AC M3 ACS3 sport"
                            }]
                        }]
                    }]
                };
            }
            this.currentScene = sceneOption;
            this.$nextTick(() => {
                this.showPicker = true;
            });
        },
        gobackSelectScene() {
            this.showPicker = false;
        },
        getModelData (seriesCode) {
            return HttpRequest.jsonp('https://car-model.souche.com/model/getModelBySeries.jsonp', {
                series_code: seriesCode
            });
        }
    }
};
</script>
<style scoped>
.car-picker-demo-wrapper{
    position: fixed;
    height: 100vh;
    z-index: 1;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background: #fff;
}
.picker-title {
    width: 100%;
    background: #fff;
}
.picker-content{
    flex: 1;
    width: 100%;
    position: relative;
}
.selector-item-body-custom {
    padding: 16px;
}
.card-item{
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 48px;
}
.card-item-span{
    font-size: 12px;
    margin-top: 10px;
    color: #1A1A1A;
}
.car-picker-demo-select-group {
    padding: 12px;
}
.card-item-image{
    width: 32px;
}
.card-item-selected .card-item-span {
    color: #FF571A;
}
.som-icon-loading {
    color: #bfbfbf;
}
.loading-decs {
    margin-top: 13px;
}
</style>
