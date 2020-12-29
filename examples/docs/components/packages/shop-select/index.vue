<template>
    <div>
        <som-list>
            <som-switch v-model="show1" title="平铺单选"></som-switch>
            <som-switch v-model="show2" title="平铺多选"></som-switch>
            <som-switch v-model="show5" title="二级单选"></som-switch>
            <som-switch v-model="show6" title="二级多选"></som-switch>
            <som-switch v-model="show4" title="单级城市多选"></som-switch>
        </som-list>

        <som-shop-select
            :shop-data="lessShop"
            :show.sync="show1"
            is-all
            :my-shop="myshop"
            @on-change="onChange"
            v-model="shop1"></som-shop-select>

        <som-shop-select
            :show.sync="show2"
            :my-shop="myshop"
            :shop-data="lessShop"
            is-all
            multiple
            v-model="shop2"></som-shop-select>
        
        <som-shop-select
            :show.sync="show5"
            @on-change="onChange"
            :my-shop="myshop"
            :all-shop="{ show: true, disabled: false, title: 'all'}"
            is-all
            :shop-data="shopData"
            v-model="shop3"></som-shop-select>


        <som-shop-select
            :shop-data="shopData"
            :show.sync="show6"
            @on-change="onChange"
            :all-shop="{ show: true, disabled: false}"
            multiple
            v-model="shop4"></som-shop-select>

        <som-shop-select
            :shop-data="shopData"
            :show.sync="show4"
            @on-change="onChange"
            :all-shop="{ show: true, disabled: false}"
            :my-shop="myshop"
            is-all
            single-city-multiple
            v-model="shop5"></som-shop-select>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show1: false,
            show2: false,
            show5: false,
            show6: false,
            show4: false,
            shop1: [],
            shop2: [],
            shop3: [],
            shop4: ['331', '222'],
            shop5: ['222', '223'],
            value: '',
            myshop: {
                store: '331',
                storeName: '千里发杭州五常店'
            },
            shopData: [
                {
                    cityCode: '1',
                    city: '北京',
                    shops: [
                        { 'store': '222', 'storeName': '千里发北京旗舰店' },
                        { 'store': '223', 'storeName': '千里发北京朝阳区店' },
                        { 'store': '224', 'storeName': '千里发北京新区店' }
                    ],
                    firstLetter: 'B'
                },
                {
                    cityCode: '2',
                    city: '杭州',
                    shops: [
                        { 'store': '331', 'storeName': '千里发杭州五常店' },
                        { 'store': '333', 'storeName': '千里发杭州拱墅店' }
                    ],
                    firstLetter: 'H'
                },
                {
                    cityCode: '3',
                    city: '惠州',
                    shops: [
                        { 'store': '440', 'storeName': '惠州千里发一店' },
                        { 'store': '441', 'storeName': '惠州千里发二店' },
                        { 'store': '442', 'storeName': '惠州千里发三店' }
                    ],
                    firstLetter: 'h'
                },
                {
                    cityCode: '4',
                    city: '衢州',
                    shops: [
                        { 'store': '551', 'storeName': '衢州千里发' },
                        { 'store': '552', 'storeName': '衢州千里发二店' },
                        { 'store': '553', 'storeName': '衢州千里发三店' }
                    ],
                    firstLetter: 'q'
                },
                {
                    cityCode: '5',
                    city: '青海',
                    shops: [
                        { 'store': '661', 'storeName': '青海一店' }
                    ],
                    firstLetter: 'q'
                },
                {
                    cityCode: '6',
                    city: '深圳',
                    shops: [
                        { 'store': '771', 'storeName': '深圳一店' },
                        { 'store': '772', 'storeName': '珠江一店' },
                        { 'store': '773', 'storeName': '珠江二店' },
                        { 'store': '774', 'storeName': '珠江三店' },
                        { 'store': '775', 'storeName': '珠江四店' },
                        { 'store': '776', 'storeName': '珠江四店' },
                        { 'store': '777', 'storeName': '珠江四店' },
                        { 'store': '778', 'storeName': '珠江四店' },
                        { 'store': '779', 'storeName': '珠江四店' },
                        { 'store': '780', 'storeName': '珠江四店' },
                        { 'store': '781', 'storeName': '珠江四店' },
                        { 'store': '782', 'storeName': '珠江四店' },
                        { 'store': '783', 'storeName': '珠江四店' },
                        { 'store': '784', 'storeName': '珠江四店' },
                        { 'store': '785', 'storeName': '珠江四店' },
                        { 'store': '786', 'storeName': '珠江四店' },
                        { 'store': '787', 'storeName': '珠江四店' },
                        { 'store': '788', 'storeName': '珠江四店' }
                    ],
                    firstLetter: 'S'
                },
                {
                    cityCode: '8',
                    city: '珠海',
                    shops: [
                        { 'store': '991', 'storeName': '珠海发发1' },
                        { 'store': '992', 'storeName': '珠海发发2' },
                        { 'store': '993', 'storeName': '珠海发发3' },
                        { 'store': '994', 'storeName': '珠海发发4' },
                        { 'store': '995', 'storeName': '珠海发发5' }
                    ],
                    firstLetter: 'z'
                }
            ]
        }
    },
    computed: {
        lessShop () {
            return this.shopData.slice(0, 5);
        }
    },
    watch: {
        shop2 (val) {
            console.log(val, 11);
        }
    },
    methods: {
        onChange (value, city) {
            console.log(value, city);
        },
    }
}
</script>
