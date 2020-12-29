<template>
    <div :class="['som-selector-list-item',
            {'som-selector-list-item-right-selected': selected && rightSpanSelect},
            {'som-selector-list-item-label-selected': selected && !rightSpanSelect}]"
            @click="select" 
            role="button"
            ref="item">
        <div class="som-selector-list-item__content" 
            v-if="itemMode === ITEM_NORMAL_MODE">
            <div v-if="showCheckboxButton"
                class="som-selector-list-item__checkbox">
                <span class="som-selector-list-item__checkbox__circle"
                    :style="{backgroundColor: selected ? labelActivedColor : '', borderColor: selected ? labelActivedColor : ''}"></span>
            </div>
            <div v-if="image !== false" class="som-selector-list-item__image">
                <img v-if="image" :src="image.replace(/^http[s]?:/, '')">
            </div>
            <div class="som-selector-list-item__label"
                :style="{color: (selected && !rightSpanSelect) ? labelActivedColor : ''}"
                v-html="label"></div>
        </div>
        <div class="som-selector-list-item__content_mode_second" v-else>
            <div v-if="image !== false" class="som-selector-list-item__image">
                <img v-if="image" :src="image.replace(/^http[s]?:/, '')">
            </div>
            <div class="som-selector-list-item__label"
                :style="{color: (selected && !rightSpanSelect) ? labelActivedColor : ''}"
                v-html="label"></div>
            <div class="som-selector-list-item-right" @click.stop="clickRight">
                <span 
                    class="som-selector-list-item-right__label"
                    :style="{color: (selected && rightSpanSelect) ? labelActivedColor : ''}">{{goNextGroupText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import './main.css';

const ITEM_NORMAL_MODE = 1; //选中当前item触发click事件
const ITEM_HAVE_TWO_STATE_MODE = 2; //选中item触发selectEnd()或者选择右侧触发click事件

export default {
    name: 'SomSelectorListItem',
    props: {
        label: {
            type: [String, Number]
        },
        value: {
            type: Object
        },
        image: {
            type: [String, Boolean]
        },
        selected: {
            type: [Boolean, Object],
            default: false
        },
        showCheckboxButton: {
            type: Boolean,
            default: false
        },
        itemMode: {
            type: Number,
            default: ITEM_NORMAL_MODE
        },
        goNextGroupText: {
            type: String
        },
        labelActivedColor: {
            type: String
        }
    },
    data() {
        return {
            ITEM_NORMAL_MODE: ITEM_NORMAL_MODE,
            ITEM_HAVE_TWO_STATE_MODE: ITEM_HAVE_TWO_STATE_MODE,
            rightSpanSelect: this.getInitialRightSpanSelectValue()
        };
    },
    computed: {
        isSelected() {
            if (typeof this.selected === 'object') {
                this.rightSpanSelect = !!this.selected.rightSpanSelect;
            }
            return typeof this.selected === 'object' ? this.selected.isSelected : this.selected;
        }
    },
    methods: {
        getInitialRightSpanSelectValue() {
            return typeof this.selected === 'object' ? this.selected.rightSpanSelect : false;
        },
        clickRight() {
            this.rightSpanSelect = true;
            this.$emit('click', this.value);
        },
        select () {
            this.rightSpanSelect = false;
            if (this.itemMode === ITEM_HAVE_TWO_STATE_MODE) {
                this.$emit('clickItemEnd', this.value);
            } else {
                this.$emit('click', this.value);
            }
        },
        selectEnd () {
            this.$emit('clickItemEnd', this.value);
        }
    }
};
</script>
