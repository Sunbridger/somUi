<template>
    <span v-text="text"
        :style="badgeStyle"
        :class="['som-badge', 
            {  'som-badge-dot': typeof text === 'undefined', 
                'som-badge-single': typeof text !== 'undefined' && text.toString().length === 1}]">
    </span>
</template>

<script>
export default {
    name: 'SomBadge',
    props: {
        text: [String, Number],
        badgeStyle: Object
    }
};
</script>
