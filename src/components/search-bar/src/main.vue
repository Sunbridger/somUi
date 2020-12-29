<template>
    <div class="som-search-bar" 
        :class="[
            type ? `som-search-bar--${type}` : '', 
            select && 'som-search-bar--select',
            isFixed ? 'som-search-bar--fixed' : '']"
        :style="{ top: isFixed ? top : ''}">
        <div class="som-search">
            <slot name="left"></slot>
            <form class="som-search__form" 
                :style="formStyle"
                @submit.prevent="handleSubmit" action=".">
                <slot name="searchLeft">
                    <som-tips v-model="popShow" 
                        :effect="effect"
                        :gutter="gutter"
                        mode="list"
                        :placement="placement" 
                        hide-on-blur 
                        v-if="select" class="search-select">
                        <span class="text">{{selectVal}}<som-icon name="caret-bottom" :size="8" :class="popShow ? 'som-select-up' : 'som-select-down'"></som-icon>
                        </span>
                        <div slot="content">
                            <som-tips-item v-for="(v, i) in selectList" 
                                :key="i" 
                                :text="v.text || v"
                                :icon="v['icon'] || ''" 
                                :link="JSON.stringify(v['link']) || ''"
                                @click.native="onselectText(v)">
                            </som-tips-item>
                        </div>
                    </som-tips>
                    <i class="som-icon-search" v-else></i>
                </slot>
                <div class="som-search-input__box ">
                    <input v-model="currentValue"
                        ref="input"
                        :style="inputStyle"
                        type="search"
                        autocomplete="off"
                        :id="labelId"
                        class="som-search__input"
                        :placeholder="placeholder"
                        :required="required"
                        @focus="onFocus"
                        @blur="onBlur"
                        @compositionstart="onComposition($event, 'start')"
                        @compositionend="onComposition($event, 'end')"
                        @input="onComposition($event, 'input')"/>
                </div>

                <a href="javascript:"
                    class="som-icon-circle-close"
                    @click="clear"
                    v-show="currentValue">
                </a>

                <label class="som-search__label"
                    :for="labelId"
                    v-show="!isFocus && !currentValue && labelId">
                    <i class="som-icon-search"></i>
                    <span>{{placeholder}}</span>
                </label>
            </form>
            
            <slot name="right">
                <a href="javascript:" class="som-search__cancel-btn" v-if="isCancel || isFixed"
                    @click="cancel">{{ cancelText}}</a>
            </slot>
        </div>

        <div class="som-search-bar__result" 
            v-show="isFixed" 
            @touchstart="touchStart" 
            :class="{ 'no-result': !results.length && currentValue}">

            <slot name="history">
                <div class="som-search-bar__recommend" v-if="!value && history.length">
                    <div class="title">历史搜索</div>
                    <som-tag-group>
                        <som-tag
                            @click.native="handleResultClick(item.text || item)" 
                            plain
                            v-for="(item, i) in history"
                            :key="i"
                            :icon="item.icon">{{item.text || item}}</som-tag>
                    </som-tag-group>
                </div>
            </slot>
            <slot name="hot">
                <div class="som-search-bar__recommend" v-if="!value && hot.length">
                    <div class="title">热门搜索</div>
                    <som-tag-group>
                        <som-tag
                            @click.native="handleResultClick(item.text || item)"  
                            plain 
                            v-for="(item, i) in hot"
                            :key="i"
                            :icon="item.icon">{{item.text || item}}</som-tag>
                    </som-tag-group>
                </div>
            </slot>
            <slot>
                <div class="som-result-cell som-list-item"
                    :key="index"
                    v-for="(item, index) in results"
                    @click="handleResultClick(item)">
                    <div class="som-list-item__bd">
                    <p>{{item.title || item}}</p>
                    </div>
                </div>
                <div class="som-result-cell som-list-item" v-if="!results.length && currentValue && noResultMsg">
                    <div class="som-list-item__bd">
                        <p>{{noResultMsg}}</p>
                    </div>
                </div>
            </slot>

            <slot name="customResMsg"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SomSearchBar',
    props: {
        type: String,
        required: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '搜索'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        value: {
            type: String,
            default: ''
        },
        top: {
            type: String,
            default: '0px'
        },
        isCancel: Boolean,
        labelId: String,
        select: Boolean,
        selectKey: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default () {
                return []
            }
        },
        hot: {
            type: Array,
            default () {
                return [];
            }
        },
        effect: {
            type: String,
            default: 'dark'
        },
        gutter: Number,
        selectList: {
            type: Array,
            default () {
                return []
            }
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        autoFixed: Boolean,
        results: {
            type: Array,
            default () {
                return []
            }
        },
        noResultMsg: {
            type: String,
            default: '抱歉， 暂无相关信息'
        },
        autoScrollToTop: Boolean,
        formStyle: {
            type: Object,
            default: () => {
                return {};
            }
        },
        inputStyle: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    created () {
        if (this.value) {
            this.currentValue = this.value;
        }
    },
    methods: {
        onselectText (val) {
            this.selectVal = val;
            this.$emit('on-select-change', this.selectVal);
        },
        handleSubmit (value) {
            this.$emit('on-submit', this.value)
        },
        handleResultClick (item) {
            this.$emit('on-result-click', item);
            this.setBlur();
            this.isFixed = false;
        },
        touchStart () {
            this.setBlur();
        },
        emitEvent () {
            this.$nextTick(() => {
                this.$emit('input', this.currentValue);
                this.$emit('on-change', this.currentValue);
            });
        },
        onComposition ($event, type) {
            if (type === 'start') {
                this.onInput = true;
            }
            if (type === 'end') {
                this.onInput = false
            }
            if (type === 'input') {
                if (!this.onInput) {
                    this.emitEvent();
                }
            }
        },
        clear () {
            this.currentValue = '';
            this.emitEvent();
            this.isFocus = true;
            this.setFocus();
            if (this.autoFixed && !this.isFixed) {
                this.isFixed = true;
            }
        },
        cancel () {
            this.currentValue = '';
            this.emitEvent();
            this.$emit('on-cancel');
            this.isFixed = false;
        },
        touch () {
            this.$emit('on-touch');
            if (this.autoFixed) {
                this.isFixed = true;
            }
        },
        setFocus () {
            this.$refs.input.focus();
        },
        setBlur () {
            this.$refs.input.blur();
        },
        onFocus () {
            this.isFocus = true;
            this.$emit('on-focus');
            this.touch();
        },
        onBlur () {
            this.isFocus = false;
            this.$emit('on-blur');
        }
    },
    data () {
        return {
            isFixed: false,
            popShow: false,
            onInput: false,
            currentValue: '',
            isFocus: false,
            selectVal: this.selectList[this.selectKey] && this.selectList[this.selectKey].text || this.selectList[this.selectKey]
        }
    },
    watch: {
        isFixed (val) {
            if (val === true) {
                this.setFocus();
                this.isFocus = true;

                if (this.autoScrollToTop) {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 150)
                }
            }
        },
        value (val) {
            this.currentValue = val;
        }
    }
};
</script>
