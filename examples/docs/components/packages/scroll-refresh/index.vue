<template>
    <div class="demo__div">
        <som-button class="change-list" @click="onChangeList">切换列表</som-button>

        <som-scroll-refresh 
            ref="scrollRefresh" 
            :pull-up="onInfinite"
            :bottom-distance="100"
            :pull-down="onRefresh">
            <som-list>
                <som-list-item v-for="(item, index) in list"
                    :title="item"
                    :key="index">
                </som-list-item>
            </som-list>
        </som-scroll-refresh>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                len: 30
            };
        },
        methods: {
            /**
             * 上拉加载
             */
            onInfinite(e) {
                setTimeout(() => {
                    const arr = [];
                    for (let i = this.list.length; i < 20; i++) {
                        arr.push(i);
                    }
                    if (arr.length) {
                        this.list = this.list.concat(arr);
                        // 当页数据加载完成，必须调用，否则无法进行下一页加载
                        e.loaded();
                        if (this.list.length >= this.len) {
                            //所有数据加载完成时调用，pullUp不会再触发
                            e.completed();
                        }
                    } else {
                        e.completed();
                    }
                }, 1500);
            },
            /**
             * 下拉刷新，数据回到初始状态
             */
            onRefresh(e) {
                this.len = 30;
                setTimeout(() => {
                    const arr = [];
                    for (let i = 0; i < 32; i++) {
                        arr.push(i);
                    }
                    this.list = JSON.parse(JSON.stringify(arr));
                    e.refreshed();
                }, 1000);
            },
            /**
             * 上拉加载条件改变时，通知子组件更新
             */
            onChangeList() {
                this.len = 50;
                this.list = [3, 3, 3, 3, 3, 3, 3, 3, 3];
                this.$nextTick(() => {
                    this.$refs.scrollRefresh.$emit('loadmore:reset');
                });
            }
        }
    };

</script>

<style scoped>
.demo__div {
    background-color: var(--background-page);
    min-height: 100vh;
}

.change-list {
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
}
</style>
