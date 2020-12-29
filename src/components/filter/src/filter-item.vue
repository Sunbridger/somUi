<template>
    <a href="javascript:;"
        class="som-filter-item"
        :class="{'som-filter-item--on': show}"
        @click="onItemClick">
        <div class="som-filter-item__content" :class="(oneVal !== '' || filterNums) &&  'fill'">
            <span class="text">
                {{ formatLabel(getLabel()) }}<sup v-if="filterNums && showValue" :class="filterNums < 10 ? 'single': ''">{{filterNums}}</sup>
            </span>
            <span class="icon"> 
                <som-icon
                    v-if="(showArrow || !showValue) && !group" 
                    name="caret-bottom" 
                    :size="8" 
                    :class="show ? 'som-select-up' : 'som-select-down'">
                </som-icon>
                <som-icon
                    v-if="(showArrow || !showValue) && group" 
                    name="filter" 
                    :size="14">
                </som-icon>
            </span>
        </div>
    </a>
</template>

<script>
import Emitter from 'som-ui/src/mixins/emitter';
import { getLabels } from 'som-ui/src/utils/object-fliter';

export default {
    name: 'SomFilterItem',
    mixins: [Emitter],
    props: {
        label: String,
        value: String,
        options: {
            type: Array,
            default () {
                return [];
            }
        },
        multiple: Boolean,
        group: Boolean,
        full: Boolean
    },
    data () {
        return {
            show: false,
            showArrow: true,
            oneVal: '',
            groupVal: {},
            filterNums: 0
        };
    },
    computed: {
        changeArrow () {
            return this.$parent.changeArrow;
        },
        maxLength () {
            return this.$parent.maxLength || 0;
        },
        showValue () {
            return this.$parent.showValue;
        },
        check () {
            return this.$parent.value[this.value] !== undefined && this.$parent.value[this.value] !== '';
        }
    },
    watch: {
        filterNums (val) {
            if (val && this.changeArrow) {
                this.showArrow = false;
            } else {
                this.showArrow = true;
            }
        },
        oneVal(val) {
            if (val !== '' && this.changeArrow) {
                this.showArrow = false;
            } else {
                this.showArrow = true;
            }
        },
        show () {
            if (this.multiple || this.group) {
                this.initLabel();
            }
        }
    },
    created () {
        this.$on('valChange', this.initLabel);
        this.$parent.cachedOptions.push(this);
    },
    mounted () {
        this.initLabel();
    },
    methods: {
        initLabel() {
            let filters = this.$parent.value || {};
            if (!this.group) {
                for (let key in filters) {
                    if (key === this.value) {
                        this.oneVal = filters[key];
                    }
                }
            } else {
                let num = 0;
                for (let label of this.options) {
                    if (filters[label.value]) {
                        num += 1;
                        this.groupVal[label.value] = filters[label.value];
                    } else {
                        this.groupVal[label.value] = '';
                    }
                }
                this.filterNums = num;
            }
        },
        formatLabel (str) {
            let len = str.length;
            if (this.maxLength !== 0 && len > this.maxLength) {
                let lastStr = str[len - 1];
                let fristStr = str.slice(0, this.maxLength - 2);
                return `${fristStr}...${lastStr}`;
            } else {
                return str;
            }
        },
        getLabel () {
            if(!this.showValue) return this.label;
            let val = typeof(this.oneVal) === 'string' ? this.oneVal.replace(/\s+/g, '').split(';') : [this.oneVal];
            let str = getLabels(this.options, val).join(';');
            return str || this.label;
        },
        onItemClick() {
            this.dispatch('SomFilter', 'itemClick', this.value);
        }
    }
}
</script>

