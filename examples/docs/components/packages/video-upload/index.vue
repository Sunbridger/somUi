<template>
    <div class="wrap">
        <som-video-upload 
            :width="300" 
            :height="200" 
            accept="video/*"
            capture="environment"
            :limited=1
            :limitSize="100"
            @on-change="change" 
            @on-error="error" 
            @on-success="success"></som-video-upload>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        change(data) {
            // console.log(data);
        },
        error(data) {
            console.log('================== error ==================');
            console.log(data);
            console.log('====================================');
        },
        success(data) {
            console.log(data);
        }
    }
};
</script>

<style scoped>
.wrap {
    padding: 32px;
}
</style>
