<template>
    <div class="som-action-tip" v-if="visible">
        <div class="modal" @click="clickMask"></div>
        <div class="tip-main" :class="customClass">
            <div class="tip-title">
                <span class="title">{{title}}</span>
                <span @click="clickClose"><slot name="closeIcon"><img src="../assets/icon-close.png" alt="" class="icon-close"></slot></span>
            </div>
            <div class="tip-content">
                <slot name="content">内容</slot>
            </div>
        </div>
    </div>
</template>

<script>
import './main.css';

export default {
    name: 'SomActionTip',
    props: {
        customClass: '',
        visible: {
            type: Boolean,
            default: false
        },
        showTip: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '标题'
        }
    },
    methods: {
        clickMask() {
            this.$emit('clickMask');
        },
        clickClose() {
            this.$emit('update:visible', false);
        }
    },
    watch: {
        'visible' (val) {
            if (val) {
                document.body.classList.add('som-over-flow');
            } else {
                document.body.classList.remove('som-over-flow');
            }
        }
    }
};
</script>
