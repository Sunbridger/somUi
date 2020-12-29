<template>
    <div>
        <div
            class="som-list__title"
            v-if="title"
            :style="cleanStyle({
                color: titleColor
            })"
            v-html="title">
        </div>
        
        <slot name="title"></slot>
        <div
            class="som-list"
            :class="{ 'som-list-no-title': !title }"
            :style="styles">
            <slot name="after-title"></slot>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { cleanStyle } from 'som-ui/src/utils/util';

export default {
    name: 'SomList',
    methods: {
        cleanStyle
    },
    props: {
        title: String,
        titleColor: String,
        labelWidth: String,
        labelAlign: String,
        labelMarginRight: String,
        gutter: String,
        listStyle: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        styles () {
            if (this.title) {
                return this.listStyle;
            } else {
                return cleanStyle(Object.assign({}, this.listStyle, { marginTop: this.gutter || '', }));
            }
        }
    }
};
</script>
