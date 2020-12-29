<template>
    <div class="som-tips-item" @click="onClick">
        <slot>
            <div class="som-tips-item__icon" v-if="icon">
                <som-icon :name="icon" :size="14"></som-icon>
            </div>
            <div class="som-tips-item__text">{{ text }}</div>
        </slot>
        
    </div>
</template>


<script>
import { go } from 'som-ui/src/utils/router';

export default {
    name: 'SomTipsItem',
    props: {
        icon: String,
        text: String,
        link: [String, Object]
    },
    methods: {
        onClick () {
            /* istanbul ignore next */
            !this.disabled && go(this.link, this.$router);
            this.$parent.handleClose();
        }
    }
};
</script>
