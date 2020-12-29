import Vue from 'vue';
import SomButton from 'components/button';
import SomButtonGroup from 'components/button-group';
import CityPicker from 'packages/city-picker';
import { mount } from '@vue/test-utils';

import { triggerTouch } from '../../../util';
import {
    getProvinceData,
    getCityDataUrl,
    getDistrictDataUrl
} from './request';

Vue.use(CityPicker);
Vue.use(SomButton);
Vue.use(SomButtonGroup);

describe('CityPicker', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('scene:1', (done) => { // 单省份
        vm = mount({
            template: `
            <som-city-picker
                :showAll="true"
                :activedValue="value"
                :scene="1"
                :provinceDataUrl="getProvinceData"
                @onSelected="selected"
                @onSelectProvince="selectProvince">
            </som-city-picker>`,
            data () {
                return {
                    value: {
                        province: {
                            code: '00002',
                            name: '四川'
                        }
                    },
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            expect(vm.find('.som-selector-list-item-label-selected').text()).to.equal('四川');
            vm.findAll('.som-selector-item--indexed').at(0)
            .find('.som-selector-list-item').trigger('click'); //点击全国

            setTimeout(() => {
                expect(vm.vm.area.isWholeCountrySelected).to.true;

                vm.findAll('.som-selector-item--indexed').at(2)
                .find('.som-selector-list-item').trigger('click'); //点击北京
                setTimeout(() => {
                    expect(vm.vm.area.province.code).to.equal('00001');
                    expect(vm.vm.provinceInfo[0].name).to.equal('北京');
                    done();
                }, 10);
            }, 10);
        }, 10);
    });

    it('scene:2', (done) => { // 单省份单城市
        vm = mount({
            template: `
            <som-city-picker
                :scene="2"
                :showAll="true"
                :provinceDataUrl="getProvinceData"
                :cityDataUrl="getCityDataUrl"
                @onSelected="selected"
                @onSelectProvince="selectProvince">
            </som-city-picker>`,
            data () {
                return {
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                getCityDataUrl () {
                    return getCityDataUrl();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            let province = vm.find('.som-selector-group__content--inner');
            expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(1);

            province.findAll('.som-selector-item--indexed').at(2)
            .findAll('.som-selector-list-item').at(1).
            trigger('click'); //点击四川

            setTimeout(() => {
                expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(2);
                let city = vm.findAll('.som-selector-group__content--inner').at(1);

                expect(city.find('.som-selector-list-item').text()).to.equal('不限城市');
                city.find('.som-selector-list-item').trigger('click');
                setTimeout(() => {
                    expect((vm.vm.area.province.name)).to.equal('四川');
                    expect((vm.vm.area.city.code)).to.equal('all');
                    vm.find('.som-selector-group__content--goback--button').trigger('click');
                    setTimeout(() => {
                        province.findAll('.som-selector-item--indexed').at(2)
                        .findAll('.som-selector-list-item').at(2)
                        .trigger('click'); //点击浙江
                        setTimeout(() => {
                            vm.findAll('.som-selector-group__content--inner').at(1)
                            .findAll('.som-selector-list-item').at(2)
                            .trigger('click'); // 点击杭州
                            setTimeout(() => {
                                expect((vm.vm.area.province.name)).to.equal('浙江');
                                expect((vm.vm.area.city.name)).to.equal('杭州');
                                done();
                            }, 100);
                        }, 100);
                    }, 10);
                }, 10);
            }, 100);
        }, 10);
    });

    it('scene:3', (done) => { // 单省份单城市单城区
        vm = mount({
            template: `
            <som-city-picker
                :scene="3"
                :showAll="true"
                :provinceDataUrl="getProvinceData"
                :districtDataUrl="getDistrictDataUrl"
                :cityDataUrl="getCityDataUrl"
                @onSelected="selected"
                @onSelectProvince="selectProvince">
            </som-city-picker>`,
            data () {
                return {
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                getCityDataUrl () {
                    return getCityDataUrl();
                },
                getDistrictDataUrl () {
                    return getDistrictDataUrl();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            let province = vm.find('.som-selector-group__content--inner');
            expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(1);

            province.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0).
            trigger('click'); //点击安徽

            setTimeout(() => {
                expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(2);
                let city = vm.findAll('.som-selector-group__content--inner').at(1);

                expect(city.findAll('.som-selector-list-item').at(1).text()).to.equal('黄山');
                city.findAll('.som-selector-list-item').at(1).trigger('click');

                setTimeout(() => {
                    expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(3);
                    let region = vm.findAll('.som-selector-group__content--inner').at(2);

                    region.findAll('.som-selector-list-item').at(1).trigger('click'); // 禹会区

                    setTimeout(() => {
                        expect((vm.vm.area.province.name)).to.equal('安徽');
                        expect((vm.vm.area.city.name)).to.equal('黄山');
                        expect((vm.vm.area.district.name)).to.equal('禹会区');
                        done();
                    }, 100);
                }, 10);
            }, 100);
        }, 10);
    });

    it('scene:4', (done) => { // 单省份多城市
        vm = mount({
            template: `
            <som-city-picker
                :scene="4"
                :showAll="true"
                :provinceDataUrl="getProvinceData"
                :districtDataUrl="getDistrictDataUrl"
                :cityDataUrl="getCityDataUrl"
                @onSelected="selected"
                @onSelectProvince="selectProvince">
            </som-city-picker>`,
            data () {
                return {
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                getCityDataUrl () {
                    return getCityDataUrl();
                },
                getDistrictDataUrl () {
                    return getDistrictDataUrl();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            let province = vm.find('.som-selector-group__content--inner');
            expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(1);

            province.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0).
            trigger('click'); //点击安徽

            setTimeout(() => {
                expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(2);
                let city = vm.findAll('.som-selector-group__content--inner').at(1);

                expect(city.findAll('.som-selector-list-item__checkbox').length).to.equal(6);

                expect(city.findAll('.som-selector-list-item').at(1).text()).to.equal('黄山');
                city.findAll('.som-selector-list-item').at(1).trigger('click');

                vm.find('.som-button--primary').trigger('click');

                setTimeout(() => {
                    expect((vm.vm.area.province[0].name)).to.equal('安徽');
                    expect((vm.vm.area.province[0].city.length)).to.equal(1);
                    expect((vm.vm.area.province[0].city[0].name)).to.equal('黄山');

                    city.findAll('.som-selector-list-item').at(0).trigger('click');
                    vm.find('.som-button--primary').trigger('click');
                    setTimeout(() => {
                        expect((vm.vm.area.province[0].city[0].code)).to.equal('all');
                        done();
                    }, 100);
                }, 10);
            }, 100);
        }, 10);
    });

    it('scene:5', (done) => { // 多省份
        vm = mount({
            template: `
            <som-city-picker
                :showAll="true"
                :activedValue="value"
                :scene="5"
                :provinceDataUrl="getProvinceData"
                @onSelected="selected"
                @onSelectProvince="selectProvince">
            </som-city-picker>`,
            data () {
                return {
                    value: {
                        province: [{
                            code: '00002',
                            name: '四川'
                        }]
                    },
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            expect(vm.findAll('.som-selector-list-item__checkbox').length).to.equal(6);

            expect(vm.find('.som-selector-list-item-label-selected').text()).to.equal('四川');

            vm.findAll('.som-selector-item--indexed').at(0)
            .find('.som-selector-list-item').trigger('click'); //点击全国
            vm.find('.som-button--primary').trigger('click');

            setTimeout(() => {
                expect(vm.vm.area.isWholeCountrySelected).to.true;
                expect(vm.findAll('.som-selector-list-item-label-selected').length).to.equal(6);

                vm.findAll('.som-selector-item--indexed').at(1)
                .find('.som-selector-list-item').trigger('click'); //取消黄山

                vm.findAll('.som-selector-item--indexed').at(2)
                .find('.som-selector-list-item').trigger('click'); //取消北京

                vm.find('.som-button--primary').trigger('click');

                setTimeout(() => {
                    expect(vm.vm.area.province.length).to.equal(3);
                    expect(vm.vm.area.province[0].name).to.equal('四川');
                    expect(vm.vm.area.province[1].name).to.equal('浙江');
                    expect(vm.vm.area.province[2].name).to.equal('重庆');
                    done();
                }, 10);
            }, 10);
        }, 10);
    });

    it('scene:6', (done) => { // 多省份多城市
        vm = mount({
            template: `
            <som-city-picker
                :scene="6"
                :showAll="true"
                :provinceDataUrl="getProvinceData"
                :districtDataUrl="getDistrictDataUrl"
                :cityDataUrl="getCityDataUrl"
                @onSelected="selected"
                @onSelectProvince="selectProvince">
            </som-city-picker>`,
            data () {
                return {
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                getCityDataUrl () {
                    return getCityDataUrl();
                },
                getDistrictDataUrl () {
                    return getDistrictDataUrl();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            let province = vm.find('.som-selector-group__content--inner');
            expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(1);

            province.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0).
            trigger('click'); //点击安徽

            setTimeout(() => {
                expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(2);
                let city = vm.findAll('.som-selector-group__content--inner').at(1);
                expect(city.findAll('.som-selector-list-item__checkbox').length).to.equal(6);

                expect(city.findAll('.som-selector-list-item').at(1).text()).to.equal('黄山');
                city.findAll('.som-selector-list-item').at(1).trigger('click');
                city.findAll('.som-selector-list-item').at(2).trigger('click');
                vm.find('.som-button--primary').trigger('click');
                setTimeout(() => {
                    expect(vm.vm.area.province.length).to.equal(1);
                    expect(vm.vm.area.province[0].city.length).to.equal(2);
                    done();
                }, 10);
            }, 10);
        }, 10);
    }, {attachToDocument: true});

    it('touch index-list', (done) => { // 点击导航
        vm = mount({
            template: `
                <som-city-picker
                    :scene="1"
                    style="width: 400px; position: relative"
                    :showAll="true"
                    :provinceDataUrl="getProvinceData"
                    @onSelected="selected"
                    @onSelectProvince="selectProvince">
                </som-city-picker>`,
            data () {
                return {
                    area: '',
                    provinceInfo: ''
                };
            },
            methods: {
                getProvinceData () {
                    return getProvinceData();
                },
                selected (val) {
                    this.area = val;
                },
                selectProvince (val) {
                    this.provinceInfo = val;
                }
            }
        });

        setTimeout(() => {
            let alphabet = vm.find('.som-selector-alphabet');
            triggerTouch(alphabet, 'touchstart', 390, 120);
            triggerTouch(alphabet, 'touchmove', 390, 150);
            triggerTouch(alphabet, 'touchend', 390, 150);
            setTimeout(() => {
                done();
            }, 10);
        }, 10);
    });
});

