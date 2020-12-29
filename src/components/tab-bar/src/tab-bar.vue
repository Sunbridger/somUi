<template>
    <div class="som-tab-bar">
        <slot></slot>
    </div>
</template>

<script>
import { parentMixin } from 'som-ui/src/mixins/multi-items';

export default {
    name: 'SomTabBar',
    mixins: [parentMixin],
    props: {
        iconClass: String
    }
};
</script>
