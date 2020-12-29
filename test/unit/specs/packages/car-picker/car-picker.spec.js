import CarPicker from 'packages/car-picker';
import SomButton from 'components/button';
import SomButtonGroup from 'components/button-group';
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import utils from 'packages/car-picker/src/utils.js';
import { getGroupDataFromServerByType } from './request';

utils.getGroupDataFromServerByType = getGroupDataFromServerByType;

Vue.use(CarPicker);
Vue.use(SomButton);
Vue.use(SomButtonGroup);
describe('CarPicker', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('scene: 1', (done) => { // 单品牌
        vm = mount({
            template: `
                <som-car-picker
                    :actived-value="value"
                    :scene="1"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    value: {
                        brand: {
                            code: 'brand-15',
                            name: '奥迪'
                        }
                    },
                    brand: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.brand = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            expect(vm.find('.som-selector-list-item-label-selected').text()).to.equal('奥迪');
            let lists = vm.findAll('.som-selector-item--indexed');
            lists.at(0).find('.som-selector-list-item').trigger('click'); // 点击不限
            setTimeout(() => {
                expect(vm.vm.brand.isAllBrandSelected).to.be.true;
                expect(vm.vm.brandInfo[0].name).to.equal('不限品牌');
                lists.at(1).find('.som-selector-list-item').trigger('click'); // 点击 AC Schnitzer
                setTimeout(() => {
                    expect(vm.vm.brandInfo[0].name).to.equal('AC Schnitzer');
                    done();
                }, 100);
            }, 100);
        }, 100);

    }, { attachToDocument: true });

    it('scene: 2', (done) => { // 单品牌单车系
        vm = mount({
            template: `
                <som-car-picker
                    :scene="2"
                    :actived-value="value"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    value: {
                        brand: {
                            code: 'brand-15',
                            name: '奥迪'
                        },
                        series: {
                            code: 'series-50634',
                            name: 'AC X6'
                        }
                    },
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            expect(vm.findAll('.som-selector-group__content--inner').at(1)
            .find('.som-selector-list-item-label-selected').text()).to.equal('AC X6');

            let lists = vm.findAll('.som-selector-item--indexed');
            lists.at(0).find('.som-selector-list-item').trigger('click'); // 点击不限
            setTimeout(() => {
                expect(vm.find('.som-selector-group__content--inner--header').exists()).to.be.false;
                lists.at(1).find('.som-selector-list-item').trigger('click'); // 点击 AC Schnitzer
                setTimeout(() => {
                    expect(vm.find('.som-selector-group__content--inner--title').text()).to.equal('AC Schnitzer');
                    expect(vm.find('.som-selector-group:last-child .som-selector-item').text()).to.equal('不限车系');
                    // 点击 AC M3 车系
                    vm.find('.som-selector-group:last-child .som-selector-item--indexed .som-selector-list-item').trigger('click');

                    setTimeout(() => {
                        expect(vm.vm.res.series.enName).to.equal('AC M3');
                        done();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);

    }, { attachToDocument: true });

    it('scene: 3', (done) => { // 单品牌单车系单车型
        vm = mount({
            template: `
                <som-car-picker
                    v-if="visible"
                    ref="carPicker"
                    :scene="3"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    visible: true,
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(1);

            vm.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0)
            .trigger('click'); // 点击 AC 品牌
            setTimeout(() => {
                expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(2);
                vm.findAll('.som-selector-group__content--inner').at(1)
                .findAll('.som-selector-item--indexed .som-selector-list-item').at(0)
                .trigger('click'); // 点击 ac m3 车系

                setTimeout(() => {
                    expect(vm.findAll('.som-selector-group__content--inner').length).to.equal(3);

                    let model = vm.findAll('.som-selector-group__content--inner').at(2);
                    expect(model.find('.som-selector-item').text()).to.equal('不限车型');

                    // 点击 2015款 AC M3 ACS3 sport 车型
                    model.find('.som-selector-item--indexed .som-selector-list-item').trigger('click');

                    setTimeout(() => {
                        expect(vm.vm.res.model.manuModelCode).to.equal('209725');
                        vm.vm.visible = false;
                        done();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);

    }, { attachToDocument: true });

    it('scene: 4', (done) => { // 单品牌单车系多车型
        vm = mount({
            template: `
                <som-car-picker
                    ref="carPicker"
                    :scene="4"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    visible: true,
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            vm.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0)
            .trigger('click'); // 点击 AC 品牌
            setTimeout(() => {
                let series = vm.findAll('.som-selector-group__content--inner').at(1).findAll('.som-selector-item--indexed .som-selector-list-item');

                series.at(0).trigger('click'); // 点击 ac m3 车系
                series.at(1).trigger('click'); // 点击 ac X5 车系
                setTimeout(() => {
                    expect(series.at(0).classes().indexOf('som-selector-list-item-label-selected')).to.equal(-1);
                    expect(series.at(1).classes().indexOf('som-selector-list-item-label-selected')).to.equal(1);
                    series.at(1).find('.som-selector-list-item-right__label').trigger('click'); //点击选车型

                    setTimeout(() => {
                        let model = vm.findAll('.som-selector-group__content--inner').at(2);
                        expect(model.findAll('.som-selector-list-item__checkbox').length).to.equal(3);
                        // 点击全部车型
                        model.find('.som-selector-list-item').trigger('click');
                        setTimeout(() => {
                            vm.find('.som-button--primary').trigger('click');
                            setTimeout(() => {
                                expect(vm.vm.res.brand.length).to.equal(1);
                                let series = vm.vm.res.brand[0].series;
                                expect(series.length).to.equal(1);
                                let model = series[0].model;
                                expect(model[0].code).to.equal('model-all');
                                done();
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);

    }, { attachToDocument: true });

    it('scene: 5', (done) => { // 单品牌多车系
        vm = mount({
            template: `
                <som-car-picker
                    ref="carPicker"
                    :scene="5"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    visible: true,
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            vm.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0)
            .trigger('click'); // 点击 AC 品牌
            setTimeout(() => {
                let seriesPanel = vm.findAll('.som-selector-group__content--inner').at(1);
                let series = seriesPanel.findAll('.som-selector-list-item');
                series.at(0).trigger('click'); // 点击 ac m3 车系
                setTimeout(() => {
                    series.at(1).trigger('click'); // 点击 ac X5 车系
                    setTimeout(() => {
                        vm.find('.som-button--primary').trigger('click');
                        setTimeout(() => {
                            let series = vm.vm.res.brand[0].series;
                            expect(series.length).to.equal(2);
                            vm.find('.som-button--gray').trigger('click');
                            setTimeout(() => {
                                vm.find('.som-button--primary').trigger('click');
                                setTimeout(() => {
                                    expect(vm.vm.res.brand[0].series.length).to.equal(0);
                                    seriesPanel.find('.som-selector-group__content--goback--button').trigger('click');
                                    setTimeout(() => {
                                        vm.findAll('.som-selector-item--indexed').at(1)
                                        .findAll('.som-selector-list-item').at(1)
                                        .trigger('click'); // 点击 Alpina 品牌
                                        setTimeout(() => {
                                            vm.find('.som-button--primary').trigger('click');
                                            setTimeout(() => {
                                                expect(vm.vm.res.brand[0].enName).to.equal('Alpina');
                                                done();
                                            }, 100);
                                        }, 100);
                                    }, 100);
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }, { attachToDocument: true });

    it('scene: 6', (done) => { // 多品牌
        vm = mount({
            template: `
                <som-car-picker
                    ref="carPicker"
                    :actived-value="value"
                    :scene="6"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    value: {isAllBrandSelected: true},
                    show: true,
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            expect(vm.findAll('.som-selector-list-item__checkbox').length).to.equal(9);
            expect(vm.findAll('.som-selector-list-item-label-selected').length).to.equal(9);
            expect(vm.findAll('.som-selector-item--indexed').length).to.equal(3);
            vm.findAll('.som-selector-list-item').at(0).trigger('click'); // 点击全部品牌
            setTimeout(() => {
                vm.find('.som-button--primary').trigger('click');
                setTimeout(() => {
                    vm.findAll('.som-selector-item--indexed').at(1)
                    .find('.som-selector-list-item').trigger('click'); // 品牌 AC Schnitzer
                    vm.findAll('.som-selector-item--indexed').at(2) // 品牌 bieke
                    .find('.som-selector-list-item').trigger('click');
                    vm.find('.som-button--primary').trigger('click');
                    setTimeout(() => {
                        expect(vm.vm.res.brand.length).to.equal(2);
                        done();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);

    }, { attachToDocument: true });


    it('scene: 7', (done) => { // 多品牌多车系
        vm = mount({
            template: `
                <som-car-picker
                    :scene="7"
                    :activedValue="value"
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    value: { brand: []},
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            vm.find('.som-button--gray').trigger('click');
            vm.find('.som-button--primary').trigger('click');
            setTimeout(() => {
                vm.findAll('.som-selector-item--indexed').at(1)
                .findAll('.som-selector-list-item').at(0)
                .trigger('click'); // 品牌 AC Schnitzer
                setTimeout(() => {
                    vm.findAll('.som-selector-group__content--inner').at(1)
                    .find('.som-selector-list-item')
                    .trigger('click'); // 全选车系

                    vm.find('.som-selector-group__content--goback--button').trigger('click'); // 返回
                    setTimeout(() => {
                        vm.findAll('.som-selector-item--indexed').at(2)
                        .findAll('.som-selector-list-item').at(0)
                        .trigger('click'); // 品牌 bieke

                        setTimeout(() => {
                            vm.findAll('.som-selector-group__content--inner').at(1)
                            .findAll('.som-selector-list-item').at(2)
                            .trigger('click'); // 选一个车系, 由于静态车型数据没有改变，导致 key 值没有重新渲染， 这里实际是取消
                            vm.find('.som-button--primary').trigger('click');
                            setTimeout(() => {
                                let brand = vm.vm.res.brand;
                                expect(brand.length).to.equal(2);
                                expect(brand[0].series[0].code).equal('series-all');
                                expect(brand[1].series.length).equal(2);
                                vm.find('.som-button--gray').trigger('click');
                                vm.find('.som-button--primary').trigger('click');
                                setTimeout(() => {
                                    done();
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }, { attachToDocument: true });

    it('scene: 8', (done) => { // 多品牌多车系多车型
        let vm = mount({
            template: `
                <som-car-picker
                    ref="carPicker"
                    :scene="8"
                    v-show
                    @onSelected="onSelected"
                    @onSelectedBrand="onSelectedBrand">
                </som-car-picker>
            `,
            data () {
                return {
                    res: '',
                    brandInfo: ''
                };
            },
            methods: {
                onSelected (val) {
                    this.res = val;
                },
                onSelectedBrand (val) {
                    this.brandInfo = val;
                }
            }
        });
        setTimeout(() => {
            vm.findAll('.som-selector-item--indexed').at(1)
            .findAll('.som-selector-list-item').at(0)
            .trigger('click'); // 品牌 AC Schnitzer
            setTimeout(() => {
                vm.findAll('.som-selector-group__content--inner').at(1)
                .findAll('.som-selector-list-item').at(1)
                .trigger('click'); // 车系一

                setTimeout(() => {
                    vm.findAll('.som-selector-group__content--inner').at(2)
                    .findAll('.som-selector-list-item').at(1) // 车型1
                    .trigger('click');

                    vm.findAll('.som-selector-item--indexed').at(1)
                    .findAll('.som-selector-list-item').at(1)
                    .trigger('click'); // 品牌 Alpina

                    setTimeout(() => {
                        vm.findAll('.som-selector-group__content--inner').at(1)
                        .findAll('.som-selector-list-item').at(2)
                        .trigger('click'); // 车系2

                        setTimeout(() => {
                            vm.findAll('.som-selector-group__content--inner').at(2)
                            .findAll('.som-selector-list-item').at(1) // 车型2
                            .trigger('click');

                            vm.find('.som-button--primary').trigger('click');
                            setTimeout(() => {
                                let brand = vm.vm.res.brand;
                                expect(brand.length).to.equal(2);
                                done();
                            }, 10);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 400);

    }, { attachToDocument: true });
});

