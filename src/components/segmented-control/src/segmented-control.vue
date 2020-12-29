<template>
    <div class="som-segmented-control" :class="type ? `som-segmented-control--${type}`:  ''">
        <slot></slot>
    </div>
</template>

<script>
import { parentMixin } from 'som-ui/src/mixins/multi-items';

export default {
    name: 'SomSegmentedControl',
    mixins: [parentMixin],
    props: {
        height: Number,
        type: String,
        small: Boolean,
        preventDefault: Boolean
    }
};
</script>
