<template>
    <div class="som-selector-alphabet"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend.prevent="touchend">
        <div class="som-selector-alphabet__content">
            <div 
                :style="{color: labelColor}"
                class="som-selector-alphabet__content--item" 
                v-for="item in alphabet"
                :key="item">{{item}}</div>
        </div>
    </div>
</template>

<script>
    import './main.css';

    export default {
        name: 'SomselectorAlphabet',
        props: {
            labelColor: {
                type: String
            },
            alphabet: {
                type: [Array]
            }
        },
        data () {
            return {
                clientX: 0
            };
        },
        methods: {
            touchstart (e) {
                this.clientX = e.touches[0].clientX;
                const alpha = e.target.innerHTML;
                if (e.target.classList.contains('som-selector-alphabet__content--item') && alpha.length) {
                    this.$emit('input', alpha);
                }
            },
            touchmove (e) {
                e.preventDefault();
                const ele = document.elementFromPoint(this.clientX, e.touches[0].clientY);
                if (ele && ele.classList.contains('som-selector-alphabet__content--item')) {
                    const alpha = ele.innerHTML;
                    this.$emit('input', alpha);
                }
            },
            touchend() {
                this.$emit('alphabet-touche-end');
            }
        }
    };
</script>

<style>

</style>
