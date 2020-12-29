<template>
    <div class="som-tag-group"
        :class="[rank ? `som-tag-group--${rank}` : '', column ? `som-tag-group--${column}-column` : '']">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SomTagGroup',
    props: {
        rank: String,
        column: String
    }
};
</script>

