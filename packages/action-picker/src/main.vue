<template>
    <div class="som-action-picker" ref="somPicker">
        <!-- 一级菜单 -->
        <ul class="level1" ref="level1">
            <ul>
                <li class="inner-list" v-for="(city,index) in level1" :key="index" :class="{selected:judge(city)}" @click="clickHandler(city, $event)">
                    <span>{{city.name}}</span>
                </li>
            </ul>
        </ul>
        <!-- 二级菜单 -->
        <div class="level2 " ref="level2" @touchmove.stop>
            <div class="level2-title">
                {{selectedProvience}}
            </div>
            <div class="scroll-list">
                <ul>
                    <div class="inner-list" v-for="(city,index) in level2" :key="index" :class="{selected:judge(city)}" @click.stop.prevent="clickHandler(city, $event)">
                        <span>{{city.name}}</span>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { extend } from 'som-ui/src/utils/util';
    import {
        findIndex
    } from './util.js';
    import './main.css';

    export default {
        name: 'SomActionPicker',
        data() {
            return {
                startX: 0,
                lastY: 0,
                level2List: [],
                selectedProvience: '',
                selectedData: {
                    province: [],
                    city: []
                },
                tempMultipleSelect: [],
                level2Show: false,
                result: {}
            };
        },
        props: {
            leftList: {
                type: Array,
                default: () => []
            },
            rightList: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            level1() {
                let result = this.addLevel(this.leftList, 'province');
                return result;
            },
            level2() {
                let result = this.addLevel(this.rightList, 'city');
                return result;
            }
        },
        watch: {
            level2Show(val) {
                const start = `translate3d(${100 / 0.8}%, 0px, 0px)`;
                const end = `translate3d(${20 / 0.8}%, 0px, 0px)`;
                this.$refs.level2.style.webkitTransform = val ? end : start;
            }
        },
        methods: {
            addLevel(data, keyName) {
                data.forEach((it) => {
                    if (!it.level) {
                        it.level = keyName;
                    }
                });
                return data;
            },
            deleteKey(province) {
                delete province.level;
                delete province.level2List.level;
            },
            fetchCityList(id) {
                this.$emit('fetchRightList', id);
            },
            judge(city) {
                return !!this.selectedData[city.level].filter(it => it.id === city.id).length;
            },
            level2Menu(city) {
                //  这个函数处理二级菜单的动效
                this.level2show = true;
                const level = city.level;
                // 如果是省份 就请求数据 然后把省份名字传过去
                if (level === 'province') {
                    this.fetchCityList(city.id);
                    this.selectedProvience = city.name;
                }
                // 同一个点击=》返回  不同的点击=》 不变
                let length = this.selectedData[level].length;
                let name = (this.selectedData[level][length - 1] && this.selectedData[level][length - 1].name)
                        || 'first';
                let nameIndex;
                name !== 'first' && this.selectedData[level].map((it, index) => {
                    if (it.name === city.name) {
                        nameIndex = index;
                    }
                });
                // 不同或上一个是直辖市 就不变
                if (city.name === name || name === 'first') {
                    this.level2Show = !this.level2Show;
                } else {
                    nameIndex > 0 ? this.level2Show = false : this.level2Show = true;
                }
            },
            clickHandler(city) {
                // 这个函数处理数据
                let level = city.level;
                let existIndex = findIndex(this.tempMultipleSelect, 'id', city);
                let obj = {
                    name: city.name,
                    id: city.id,
                    level: city.level
                };
                let idList = this.selectedData[level].map(it => it.id);
                let idIndex = idList.indexOf(obj.id);
                if (level === 'province') {
                    this.level2Menu(city);
                }
                // 不是多选就清空原数组 做唯一选中
                this.selectedData[level] = [];
                // 去重 点击后 增加或删除 数组
                if (idIndex < 0) {
                    this.selectedData[level].push(obj);
                } else if (existIndex < 0) {
                    this.selectedData[level].splice(idIndex, 1);
                } // 存在 就不删除
                // emit 事件
                if (level === 'province') {
                    //  展开为true emit this.result
                    this.$emit('level2State', this.level2Show);
                } else if (level === 'city') {
                    this.dataToEmit();
                }
                // stash
                if (existIndex >= 0 && +this.type === 3) {
                    this.selectedData['city'] = this.tempMultipleSelect[existIndex].level2List;
                }
            },
            dataToEmit() {
                // 这个函数emit事件 向上传递选中的数据
                let nowProvince = this.selectedData['province'].slice(-1)[0];
                let nowCity = this.selectedData['city'].slice(-1)[0];
                let province = {
                    id: '',
                    name: '',
                    level2List: nowCity
                };
                province = extend(province, nowProvince);
                this.deleteKey(province);
                this.result = province;
                this.$emit('result', this.result);
                // 每次完成 清空结果数组
                this.resetResult();
            },
            resetResult() {
                this.result = {
                    selectedFinish: false,
                    level2Show: this.level2Show,
                    multipleSelect: []
                };
            }
        }
    };
</script>
