<style>
.button {
    margin: 10px auto;
}

</style>
<template>
    <div>
        <som-video-play
            :globalEvents="['fullscreenchange']"
            @fullscreenchange="onFullscreenchange($event)"
            @ready="playerReadied"
            :options="playerOptions"></som-video-play>

        <button class="button" @click="full">按钮点击展示，退出不显示</button>
        <som-video-play
            v-show="show"
            ref="player"
            :globalEvents="['fullscreenchange']"
            @fullscreenchange="onFullscreenchange($event)"
            @ready="playerReadied"
            :options="playerOptions"></som-video-play>
    </div>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            playerOptions: {
                muted: false, // 是否静音
                volume: 0.5, // 音量
                language: 'zh-CN',
                autoplay: false,
                preload: 'none',
                sources: [],
                poster: ''
            }
        };
    },
    methods: {
        full() {
            this.$refs.player.player.requestFullscreen();
        },
        onFullscreenchange(player) {
            this.show = player.isFullscreen();
            !this.show ? player.pause() : player.play();
        },
        playerReadied(player) {
            this.setPlayerData(player);
        },
        setPlayerData(player) {
            player.poster('//img.souche.com/20180903/jpg/1518ed09aa63e9fc2fec44d247266fd4.jpg');
            player.src([{
                type: 'video/mp4',
                src: '//res.souche.com/material/videos/Act-ss-mp4-ld/8cea063685ab74fd157bef067079fe9b/8468f9bca8f34a8ba672ee3a8ef7853f_8cea063685ab74f'
                + 'd157bef067079fe9b.mp4'
            }]);
        }
    }
};
</script>

