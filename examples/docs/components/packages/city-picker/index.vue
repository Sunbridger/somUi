<template>
    <div>
        <div class="city-picker-demo-select-group">
            <p>点击切换选择器场景:</p>
            <som-button
                large
                type="primary"
                @click="switchScene(sceneOption)"
                v-for="sceneOption in sceneList"
                :key="sceneOption.scene">{{sceneOption.description + ':' + sceneOption.scene}}</som-button>
        </div>
        <div class="city-picker-demo-wrapper"  v-if="showPicker" v-som-scroll-prevented="showPicker">
            <div class="picker-title">
                <button @click="gobackSelectScene">返回(当前选择器场景:{{currentScene.description}})</button>
            </div>
            <div class="picker-content">
                <som-city-picker
                    ref="citySelector"
                    :showAll="true"
                    :activedValue="value"
                    :scene="currentScene.scene"
                    :provinceDataUrl="getProvinceData"
                    :districtDataUrl="getDistrictData"
                    @onSelected="selected"
                    @onSelectProvince="selectProvince"
                >
                    <div slot="loading">    
                        <som-icon name="loading" size="24"></som-icon>
                        <p class="loading-decs">加载中...</p>
                    </div>
                    <som-selector-item title="我的定位" index="定">
                        <div class="selector-item-body-custom">
                            <img class="location-icon" src="//img.souche.com/f2e/92a9f17f619f60c2ec088d4684cd4116.png">
                            <span class="location-span">杭州</span>
                        </div>
                    </som-selector-item>
                    <som-selector-item title="我的历史" index="历">
                        <div class="selector-item-body-custom">
                            <button 
                                :class="['custom-button', {'custom-button-selected': provinces.filter(item => item.name === provinceDataGuangdong.name).length > 0}]"
                                @click="openCitySection(provinceDataGuangdong)">
                                广东
                            </button>
                        </div>
                    </som-selector-item>
                    <som-selector-item title="热门省份" index="热">
                        <div class="selector-item-body-custom">
                            <button 
                                :class="['custom-button', {'custom-button-selected': provinces.filter(item => item.name === provinceDataBeijing.name).length > 0}]"
                                @click="openCitySection(provinceDataBeijing)">
                                北京
                            </button>
                        </div>
                    </som-selector-item>
                </som-city-picker>
            </div>
        </div>
    </div>
</template>
<script>
import HttpRequest from '@souche-f2e/http-request';

export default {
    data() {
        return {
            scene: 1,
            showPicker: false,
            provinceDataBeijing: {
                code: '00001',
                name: '北京'
            },
            provinceDataGuangdong: {
                code: '01977',
                name: '广东'
            },
            value: {
                province: {
                    code: '01977',
                    name: '广东'
                },
                city: {
                    code: '02052',
                    name: '江门'
                },
                district: {
                    code: '440781',
                    name: '台山市'
                }
            },
            provinces: [],
            sceneList: [
                {scene: 1, description: '单省份'},
                {scene: 2, description: '单省份单城市'},
                {scene: 3, description: '单省份单城市单城区'},
                {scene: 4, description: '单省份多城市'},
                {scene: 5, description: '多省份'},
                {scene: 6, description: '多省份多城市'}
            ]
        };
    },
    methods: {
        openCitySection(province) {
            this.province = [].push(province);
            this.$refs.citySelector.openCitySection(province);
        },
        selected(data) {
            console.log('选中结束');
            console.log(data);
        },
        selectProvince(currentProvinces) {
            this.provinces = currentProvinces;
        },
        switchScene(sceneOption) {
            this.currentScene = sceneOption;
            this.scene = sceneOption.scene;
            this.showPicker = true;
        },
        gobackSelectScene() {
            this.showPicker = false;
        },
        getProvinceData(){
            return HttpRequest.jsonp('https://dic.souche.com/api/v1/queryDictionaries/load.jsonp', {type:'area'});
        },
        getDistrictData(city){
            return HttpRequest.jsonp('https://dic.souche.com/api/v1/queryDictionaries/load.jsonp', {type:'area',parent:city.code});
        }
    }
};
</script>
<style scoped>
.city-picker-demo-wrapper{
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
.city-picker-demo-select-group {
    padding: 12px;
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
.location-icon{
    width: 16px;
    vertical-align: bottom;
}
.location-span{
    display: inline-block;
    margin-left: 12px;
    font-size: 16px;
    color: #1a1a1a;
}
.custom-button{
    display: inline-block;
    text-align: center;
    background: #f5f5f5;
    outline-style: none;
    border: none;
    width: 101px;
    height: 36px;
    border-radius: 4px;
}
.custom-button-selected{
    color: #FF571A;
}
.som-icon-loading {
    color: #bfbfbf;
}
.loading-decs {
    margin-top: 13px;
}
</style>
