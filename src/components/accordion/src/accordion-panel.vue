<template>
    <som-list v-if="!parent.center">
        <som-list-item
            v-if="!center"
            :title="header"
            :arrow-direction="showContent ? 'up' : 'down'"
            @click.native="handleToggle">
        </som-list-item>
        <som-accordion-transition>
            <div v-show="showContent" class="som-accordion__panel" :style="contentStyle">
                <slot></slot>
            </div>
        </som-accordion-transition>
    </som-list>
    
    <som-list v-else>
        <som-accordion-transition>
            <div v-show="showContent" class="som-accordion__panel som-accordion__panel-center" :style="contentStyle">
                <slot></slot>
            </div>
        </som-accordion-transition>
        <div  class="som-list-item som-accordion--center" @click="handleToggle">
            {{showContent ? '收起' : '展开'}}
            <div class="som-list-item__ft">
                <som-icon name="arrow-up" :class="showContent ? 'som-arrow-up' : 'som-arrow-down'"></som-icon>
            </div>
        </div>
    </som-list>
</template>

<script>
import Emitter from 'som-ui/src/mixins/emitter';

export default {
    name: 'SomAccordionPanel',
    mixins: [Emitter],
    props: {
        header: String
    },
    data () {
        return {
            showContent: false,
            panelText: false,
            center: false
        };
    },
    computed: {
        contentStyle () {
            if (this.panelText) {
                return { paddingRight: '16px', paddingBottom: '16px'};
            }
        },
        parent () {
            let result = this.$parent;
            return result;
        },
        key () {
            let key;
            this.parent.$children.forEach((v, i) => {
                if (v._uid === this._uid) {
                    key = i;
                }
            });
            return key;
        }
    },
    created () {
        this.$on('handleHide', this.handleHide);
        this.$on('handleShow', this.handleShow);
    },
    mounted () {
        let slot = this.$slots.default;
        if (slot.length === 1 && !slot[0].tag) {
            this.panelText = true;
        }
    },
    methods: {
        handleToggle () {
            this.showContent = !this.showContent;
            if (this.showContent) {
                this.dispatch('SomAccordion', 'handleShow', this.key);
            } else {
                this.dispatch('SomAccordion', 'handleHide', this.key);
            }
        },
        handleHide (key) {
            if (this.key !== key) {
                this.showContent = false;
            }
        },
        handleShow (key) {
            if (this.key === key) {
                this.showContent = true;
            }
        }
    }
};
</script>
