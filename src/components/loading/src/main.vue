<template>
    <div class="som-loading" :class="fullscreen && 'is-fullscreen'">
        <transition :name="transition">
            <div v-show="show">
                <div class="som-loading-mask"></div>
                <div class="som-loading__content"
                    :style="{'position': position }">
                    <som-icon name="loading" :size="fullscreen ? 24 : 28"></som-icon>
                    <p class="som-loading-decs"><slot>{{text || '加载中...' }}</slot></p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'SomLoading',
    props: {
        show: Boolean,
        text: String,
        position: String,
        fullscreen: Boolean,
        transition: {
            type: String,
            default: 'som-mask'
        }
    },
    model: {
        prop: 'show',
        event: 'change'
    },
    watch: {
        show (val) {
            this.$emit('update:show', val);
        }
    }
};
</script>
