<template>
    <div>
        <som-result
            :is-footer="false"
            :img="img"
            title="主文案"
            desc="这里是一些解释文案">
        </som-result>

        <som-result
            :img="img"
            title="主文案"
            desc="这里是一些解释文案">
        </som-result>

        <som-result
            :img="img"
            title="主文案"
            is-cancel
            desc="这里是一些解释文案">
        </som-result>

        <som-result
            :img="img"
            title="主文案主文案主文案主文案主文案主文案主文案主文案主"
            is-cancel>
        </som-result>
    </div>
</template>

<script>
let img = require("../../../assets/images/result.png");
export default {
    data () {
        return {
            img: img
        }
    }
}
</script>
