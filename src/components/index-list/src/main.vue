<template>
    <div class="som-index-list">
        <div class="som-index-list__content" 
            ref="content">
            <div class="list-wrap">
                <slot>
                    <som-list
                        :title="item.title"
                        :key="index"
                        v-for="(item, index) in list">
                        <som-list-item
                            @click.native="onClick(data, item.key, item.title)"
                            class="som-list-item-access"
                            v-for="(data, i) in item.data"
                            :key="i"
                            :title="data">
                        </som-list-item>
                    </som-list>
                </slot>
            </div>
        </div>

        <div class="som-index-list__index"
            ref="indexList">
            <div v-for="(item, index) in list"
                @touchstart.stop="touchStart"
                :class="{'active': activeIndex === index}"
                :key="index"
                @click="onIndexClick(index)"
                class="index-item">{{item.key}}
                <div class="item-tips" v-show="activeIndex === index && touching">{{item.key}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { scrollTop } from 'som-ui/src/utils/util';

export default {
    name: 'SomIndexList',
    props: {
        list: {
            type: Array,
            default () {
                []
            }
        },
        itemClass: {
            type: String,
            default: 'som-list'
        },
        boundTop: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            Nodes: [],
            activeIndex: '',
            touching: false,
            startY: '',
            startKey: ''
        }
    },
    mounted () {
        let content = this.$refs.content;
        document.addEventListener('touchmove', this.touchMove, { passive: false });
        document.addEventListener('touchend', this.touchEnd, { passive: false });
        this.Nodes = content.querySelectorAll(`.${this.itemClass}`);
    },
    computed: {
        indexList () {
            let indexList = [];
            for (let item of this.list) {
                indexList.push(item.key);
            }
            return indexList;
        }
    },
    watch: {
        activeIndex (val) {
            if (!this.Nodes[val]) {
                this.Nodes = this.$refs.content.querySelectorAll(`.${this.itemClass}`);
            }
            this.$emit('on-key-change', this.indexList[val], val);
            let nodeTop = this.Nodes[val].getBoundingClientRect().top;
            let content = this.$refs.content;
            let scrolltop = content.scrollTop;
            scrollTop(content, scrolltop, scrolltop + nodeTop - 50 -this.boundTop, 10);
        }
    },
    methods: {
        onClick (value, key, title) {
            this.$emit('on-item-click', value, key, title);
        },
        onIndexClick (index) {
            this.activeIndex = index;
        },
        setActiveKey (key) {
            this.activeIndex = this.indexList.indexOf(key);
        },
        touchStart (e) {
            e.preventDefault();
            this.touching = true;
            let t = e.touches[0];
            let x = t.clientX;
            this.startY = t.clientY;
            let target = event.target;

            let key = target.querySelector('.item-tips').textContent;
            this.activeIndex = this.indexList.indexOf(key);
            this.startKey = this.activeIndex;

        },
        touchMove(e) {
            if (this.touching) {
                e.preventDefault();
                let t = e.touches[0];
                let x = t.clientX;
                let y = t.clientY;
                let index = this.startKey +  Math.floor((y-this.startY) / 15);
                this.activeIndex = index >= this.indexList.length ? this.indexList.length -1 : index <= 0 ? 0 : index;
            }
        },
        touchEnd(e) {
            if (this.touching) {
                e.preventDefault();
                this.touching = false;
                this.startY = '';
                this.startKey = '';
            }
        }
    }
};
</script>
