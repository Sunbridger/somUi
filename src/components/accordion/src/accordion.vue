<template>
    <div class="som-accordion">
        <slot></slot>
    </div>
</template>

<script>
import Emitter from 'som-ui/src/mixins/emitter';

export default {
    name: 'SomAccordion',
    mixins: [Emitter],
    props: {
        defaultActiveKey: {
            type: Array,
            default: () => {
                return [];
            }
        },
        accordion: {
            type: Boolean,
            default: true
        },
        center: Boolean
    },
    data () {
        return {
            ActiveKey: []
        };
    },
    created () {
        this.ActiveKey = this.defaultActiveKey || [];
        this.$on('handleShow', this.handleShow);
        this.$on('handleHide', this.handleHide);
    },
    watch: {
        ActiveKey () {
            this.$emit('on-change', this.ActiveKey);
        }
    },
    mounted () {
        for (let key of this.defaultActiveKey) {
            this.broadcast('SomAccordionPanel', 'handleShow', key);
        }
    },
    methods: {
        handleShow (key) {
            if (this.accordion) {
                this.ActiveKey = [key];
                this.broadcast('SomAccordionPanel', 'handleHide', key);
            } else {
                this.ActiveKey.push(key);
            }
        },
        handleHide (key) {
            let index = this.ActiveKey.indexOf(key);
            this.ActiveKey.splice(index, 1);
        }
    }
};
</script>
