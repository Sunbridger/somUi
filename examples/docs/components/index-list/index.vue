<template>
    <div class="wrap">
        <som-list>
            <som-switch v-model="show1" title="基本使用"></som-switch>
            <som-switch v-model="show2" title="自定义使用"></som-switch>
        </som-list>

        <som-index-list 
            :list="list" 
            v-show="show1" 
            class="index-list" 
            :bound-top="96">
        </som-index-list>

        <som-index-list 
            :list="list2" 
            v-show="show2" 
            class="index-list" 
            :bound-top="96">
            <som-list title="自己">
                <som-list-item title="自己">
                </som-list-item>
            </som-list>
            <som-list title="*">
                <som-list-item title="不限"></som-list-item>
            </som-list>

            <som-list
                :title="item.title"
                :key="index"
                v-for="(item, index) in list">
                <som-list-item
                    v-for="(data, i) in item.data"
                    :key="i"
                    :title="data">
                </som-list-item>
            </som-list>
        </som-index-list>
    </div>
</template>


<script>

export default {
    data () {
        return {
            show1: true,
            show2: false,
            list: [
                {key: 'A', title: 'A', data: ['A1', 'A2', 'A3', 'A4']},
                {key: 'B', title: 'B', data: ['B1', 'B2', 'B3', 'B4']},
                {key: 'C', title: 'C', data: ['C1', 'C2', 'C3', 'C4']},
                {key: 'D', title: 'D', data: ['D1', 'D2', 'D3', 'D4']},
                {key: 'E', title: 'E', data: ['E1', 'E2', 'E3', 'E4']},
                {key: 'F', title: 'F', data: ['F1', 'F2', 'F3', 'F4']},
                {key: 'G', title: 'G', data: ['G1', 'G2', 'G3', 'G4']},
                {key: 'H', title: 'H', data: ['H1', 'H2', 'H3', 'H4']},
                {key: 'I', title: 'I', data: ['I1', 'I2', 'I3', 'I4']},
                {key: 'N', title: 'N', data: ['N1', 'N2', 'N3', 'N4']},
                {key: 'O', title: 'O', data: ['O1', 'O2', 'O3', 'O4']},
                {key: 'P', title: 'P', data: ['P1', 'P2', 'P3', 'P4']},
                {key: 'Q', title: 'Q', data: ['Q1', 'Q2', 'Q3', 'Q4']},
                {key: 'R', title: 'R', data: ['R1', 'R2', 'R3', 'R4']},
                {key: 'S', title: 'S', data: ['S1', 'S2', 'S3', 'S4']},
                {key: 'T', title: 'T', data: ['T1', 'T2', 'T3', 'T4']},
                {key: 'U', title: 'U', data: ['U1', 'U2', 'U3', 'U4']},
                {key: 'V', title: 'V', data: ['V1', 'V2', 'V3', 'V4']},
                {key: 'W', title: 'W', data: ['W1', 'W2', 'W3', 'W4']},
                {key: 'X', title: 'X', data: ['X1', 'X2', 'X3', 'X4']},
                {key: 'Z', title: 'Z', data: ['Z1', 'Z2', 'Z3', 'Z4']}
            ],
            list2: [
                {key: '自', title: '自己'},
                {key: '*', title: '*'},
                {key: 'A', title: 'A'},
                {key: 'B', title: 'B'},
                {key: 'C', title: 'C'},
                {key: 'D', title: 'D'},
                {key: 'E', title: 'E'},
                {key: 'F', title: 'F'},
                {key: 'G', title: 'G'},
                {key: 'H', title: 'H'},
                {key: 'I', title: 'I'},
                {key: 'N', title: 'N'},
                {key: 'O', title: 'O'},
                {key: 'P', title: 'P'},
                {key: 'Q', title: 'Q'},
                {key: 'R', title: 'R'},
                {key: 'S', title: 'S'},
                {key: 'T', title: 'T'},
                {key: 'U', title: 'U'},
                {key: 'V', title: 'V'},
                {key: 'W', title: 'W'},
                {key: 'X', title: 'X'},
                {key: 'Z', title: 'Z'}
            ]
        }
    }
}
</script>


<style scoped>
.index-list {
    height: calc(100vh - 96px);
}
.wrap {
    height: 100%;
    width: 100%;
    position: absolute;
}
</style>
