<template>
    <div class="som-result">
        <div class="som-result__img">
            <slot><img :src="img"></slot>
        </div>
        <div class="som-result__title" v-if="title">{{title}}</div>
        <div class="som-result__desc" v-if="desc">{{desc}}</div>
        <div class="som-result__footer" v-if="isFooter">
            <slot name="footer">
                <som-button type="primary" @click.native="onConfrim" large>{{confirmText }}</som-button>
                <som-button v-if="isCancel" @click.native="onCancel" large>{{cancelText}}</som-button>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SomResult',
    props: {
        img: String,
        title: String,
        desc: String,
        isFooter: {
            type: Boolean,
            default: true
        },
        isCancel: Boolean,
        confirmText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        }
    },
    methods: {
        onConfrim () {
            this.$emit('on-confrim');
        },
        onCancel () {
            this.$emit('on-cancel');
        }
    }
};
</script>
