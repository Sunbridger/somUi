<template>
    <span class="som-tag"
        :class="{
        [`som-tag--${size}`]: size,
        [`som-tag--${type}`]: type,
        'som-tag--plain': plain,
        'som-tag--mark': mark}">
        <som-icon :size="12" :name="icon" v-if="icon" class="som-tag__icon"></som-icon>
        <span><slot></slot></span>
        <div class="som-tag__close" @click="handleClose" v-if="closable">
            <som-icon :size="8" name="close"></som-icon>
        </div>
    </span>
    
</template>

<script>
export default {
    name: 'SomTag',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        icon: String,
        closable: Boolean,
        mark: Boolean,
        plain: Boolean,
        size: String
    },
    data () {
        return {
            closeMask: false
        }
    },
    methods: {
        handleClose () {
            this.$emit('on-close');
        }
    }
};
</script>
