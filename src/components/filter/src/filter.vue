
<script>
import Emitter from 'som-ui/src/mixins/emitter';

export default {
    name: 'SomFilter',
    mixins: [Emitter],
    props: {
        showMask: {
            type: Boolean,
            default: true
        },
        showValue: {
            type: Boolean,
            default: false
        },
        hideOnBlur: {
            type: Boolean,
            default: true
        },
        changeArrow: {
            type: Boolean,
            default: true
        },
        maxLength: {
            type: Number,
            default: 4
        },
        value: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    render (h) {
        let activeLableValue = this.activeLableValue;
        let currentItem = this.currentItem;
        let filters = this.filters;
        let groupVal = this.groupVal;
        let multipleVal = this.multipleVal;
        let that = this;

        let notSingleDom;
        if (currentItem && currentItem.$slots.default) {
            notSingleDom = (
                <div v-show={this.show} class="som-filter__options options-tag">
                    { currentItem.$slots.default }
                </div>
                );
        } else if(!this.group && this.multiple) {
            notSingleDom = (
                <div v-show={this.show} class="som-filter__options options-tag">
                    <div class="filter-content-one">
                        <som-tag-group rank="three">
                            {   this.options.map((item) =>
                                    <som-tag
                                        type={(multipleVal[activeLableValue] || '')
                                            .replace(/ /g, '').split(';').indexOf(item.value || item) !== -1 ? 'primary': 'default'}
                                        nativeOn-click={() => that.selectTag(item)}>
                                        {item.key || item }
                                    </som-tag>)
                            }
                        </som-tag-group>
                    </div>
                    <som-button-group flex-rank="three" class="filter-toolip">
                        <som-button type="primary" nativeOn-click={this.onSubmit} large>确定</som-button>
                    </som-button-group>
                </div>
            );
        } else if (this.group) {
            notSingleDom = (
                <div v-show={this.show} class="som-filter__options options-tag options-group">
                    {   this.options.map((group) =>
                            <div class="filter-content">
                                <div class="group-title">
                                    {group.key}
                                </div>
                                <som-tag-group rank="three">
                                {   group.options.map((item) =>
                                        <som-tag
                                            type={(groupVal[group.value] || '')
                                            .replace(/ /g, '').split(';').indexOf(item.value || item) !== -1? 'primary': 'default'}
                                            nativeOn-click={() => that.selectTag(item, group)}>
                                            {item.key || item }
                                        </som-tag>)
                                }
                                </som-tag-group>
                            </div>)
                    }
                    <som-button-group flex-rank="three" class="filter-toolip">
                        <som-button large type="gray" nativeOn-click={this.onReset}>重置</som-button>
                        <som-button large type="primary" nativeOn-click={this.onSubmit}>确定</som-button>
                    </som-button-group>
                </div>
            );
        }

        return (
            <div class="som-filter" style={this.filterStyle}>
                {
                    this.showMask ? <div class="som-mask" v-show={this.show} on-click={this.onMask}></div> : ''
                }
                <div class="som-filter__select">
                    {this.$slots.default}
                </div>
                <transition>
                {
                    !this.multiple && !this.group ?
                    <div class="som-filter__options" v-show={ this.show }>
                        {currentItem && currentItem.$slots.default}
                        <som-list>
                            <som-radio
                                on-on-click={ this.handleRadioClick }
                                on-on-change={ this.onChange }
                                mode="icon"
                                options={ this.options }
                                value={ this.filters[activeLableValue] }>
                            </som-radio>
                        </som-list>
                    </div> : notSingleDom
                }
                </transition>
            </div>
        )
    },
    data () {
        return {
            filters: {},
            label: '',
            show: false,
            cachedOptions: [],
            activeLableValue: '',
            groupVal: {},
            multipleVal: {}
        }
    },
    created () {
        this.$on('itemClick', this.itemClick);
    },
    watch: {
        value () {
            this.filters = this.value;
            this.broadcast('SomFilterItem', 'valChange');
        },
        filters: {
            handler(val) {
                this.$emit('input', val);
                this.$emit('on-change', val);
            },
            deep: true
        }
    },
    computed: {
        currentItem () {
            let childitem = this.cachedOptions[0];
            for (let item of this.cachedOptions) {
                if (item.value === this.activeLableValue) {
                    childitem = item;
                }
            }
            return childitem;
        },
        multiple () {
            return this.currentItem && this.currentItem.multiple;
        },
        group () {
            return this.currentItem && this.currentItem.group;
        },
        options () {
            return this.currentItem && this.currentItem.options || [];
        },
        full () {
            return this.currentItem && this.currentItem.full;
        },
        filterStyle () {
            if (this.full) return { position: 'absolute'};
        },
        extraLabel () {
            let labelVals = [];
            if (this.currentItem.group) {
                for (let label of this.currentItem.options) {
                    labelVals.push(label.value);
                }
            }
            return labelVals;
        }
    },
    mounted () {
        this.filters = this.value;
    },
    methods: {
        onChange (value) {
            if (value !== this.filters[this.activeLableValue]) {
                this.currentItem.oneVal = value;
                this.show = false;
                this.currentItem.show = false;
                this.filters = Object.assign({}, this.filters, {[this.activeLableValue]: value});
            }
        },
        handleRadioClick (val) {
            this.$emit('on-item-click', val);
        },
        selectTag (item, group) {
            // 没有分组时
            let value = item.value || item;

            if (!group) {
                if (this.multipleVal[this.activeLableValue] === undefined) {
                    this.multipleVal[this.activeLableValue] = '';
                }
                let str = this.multipleVal[this.activeLableValue];
                let arr = this.strArray(str.replace(/ /g, ''));
                if (arr.indexOf(value) !== -1) {
                    let index = arr.indexOf(value);
                    arr.splice(index, 1);
                    str = arr.join(';');

                } else {
                    str += !str ? value : `; ${value}`;
                }
                this.currentItem.oneVal = str;
                this.multipleVal[this.activeLableValue] = str;
            } else {
                // 有分组时
                let flag = false;
                if (!this.groupVal[group.value]) {
                    this.groupVal[group.value] = '';
                    flag = true;
                }
                let arr = this.strArray(this.groupVal[group.value].replace(/ /g, ''));

                if(arr.indexOf(value) !== -1) {
                    let index = arr.indexOf(value);
                    arr.splice(index, 1);
                    this.groupVal[group.value] = arr.join(';');
                } else {
                    if (group.multiple) {
                        this.groupVal[group.value] += !this.groupVal[group.value] ? value : `; ${value}`;
                    } else {
                        this.groupVal[group.value] = value;
                    }
                }

                let num = 0;
                for (let i in this.groupVal) {
                    if (this.groupVal[i]) num ++;
                }
                this.currentItem.filterNums = num;

            }
            this.$forceUpdate();
        },
        strArray (str) {
            return str.split(';');
        },
        onSubmit () {
            this.show = false;
            this.currentItem.show = false;
            this.filters = Object.assign({}, this.filters, this.groupVal, this.multipleVal);
        },
        onReset() {
            for(let label of this.extraLabel) {
                this.groupVal[label] = '';
            }
            this.currentItem.filterNums = 0;
            this.$forceUpdate();
        },
        itemClick (label) {
            this.currentItem.show = false;
            this.show = this.activeLableValue === label ? !this.show : true;
            this.activeLableValue = label;
            if (!this.group && !this.multiple) {
                if (this.filters[label] === undefined) this.filters[label] = '';
            } else if (this.multiple) {
                this.multipleVal[label] = this.filters[label];
            } else if (this.group) {
                for (let i of this.extraLabel) {
                    if (this.filters[i]) this.groupVal[i] = this.filters[i];
                }
            }
            this.currentItem.show = this.show;
        },
        onMask () {
            if (this.hideOnBlur) {
                this.show = false;
                this.currentItem.show = false;
            }
        },
        setShow (val) {
            this.show = val;
            this.currentItem.show =val;
        }
    }
};
</script>
