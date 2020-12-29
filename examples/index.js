/* Automatic generated by './build/bin/build-example-entry.js' */
import 'so-ui/lib/styles/index.css';
import 'main/styles/index.css';
import Vue from 'vue';
import SomUI from 'main';
import SoUI from 'so-ui';
import Tower from '@souche-f2e/tower'; // eslint-disable-line
import Statistics from '@souche-f2e/statistics';

import ActionPicker from 'packages/action-picker/index.js';
import ScrollPrevented from 'packages/scroll-prevented/index.js';
import ImageViewer from 'packages/image-viewer/index.js';
import SlidePage from 'packages/slide-page/index.js';
import ActionTip from 'packages/action-tip/index.js';
import SelectorItem from 'packages/selector-item/index.js';
import CarPicker from 'packages/car-picker/index.js';
import CityPicker from 'packages/city-picker/index.js';
import ScrollRefresh from 'packages/scroll-refresh/index.js';
import ShopSelect from 'packages/shop-select/index.js';
import Calendar from 'packages/calendar/index.js';
import Carousel from 'packages/carousel/index.js';
import CarouselItem from 'packages/carousel/carousel-item.js';
import ImageUpload from 'packages/image-upload/index.js';
import Table from 'packages/table/index.js';
import TableColumn from 'packages/table/table-column.js';
import VideoPlay from 'packages/video-play/index.js';
import VideoUpload from 'packages/video-upload/index.js';
import App from './components/app';
import Demo from './components/demo';
import router from './router-config';

Statistics.init({
    router: router,
    piwik: {
        userPhone: '15433333333',
        userId: 'dasouche',
        env: 'production',
        siteId: 'dev_site'
    },
    load: true
});

Vue.use(SomUI);
Vue.use(SoUI);
Vue.component('demo-block', Demo);


// 扩展组件
const components = [
    ActionPicker,
    ScrollPrevented,
    ImageViewer,
    SlidePage,
    ActionTip,
    SelectorItem,
    CarPicker,
    CityPicker,
    ScrollRefresh,
    ShopSelect,
    Calendar,
    Carousel,
    CarouselItem,
    ImageUpload,
    Table,
    TableColumn,
    VideoPlay,
    VideoUpload
];

components.map((component) => {
    Vue.use(component);
});

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    render: h => h(App)
});
