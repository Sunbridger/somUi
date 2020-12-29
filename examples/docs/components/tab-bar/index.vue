<template>
    <div>
        <som-tab-bar>
            <som-tab-bar-item>
                <img slot="icon-active" src="http://img.souche.com/f2e/c7f2cb7014d5f7ad34242a23e31bde0a.png">
                <img slot="icon" src="http://img.souche.com/f2e/a35fbfe7ef993ced24acf3bbeabedf5d.png">
                <span slot="label">Wechat</span>
            </som-tab-bar-item>
            <som-tab-bar-item selected>
                <img slot="icon" src="http://img.souche.com/f2e/c7f2cb7014d5f7ad34242a23e31bde0a.png">
                <span slot="label">Message</span>
            </som-tab-bar-item>
            <som-tab-bar-item show-dot>
                <img slot="icon" src="http://img.souche.com/f2e/9c59a59e00ba122dca81c01dc04708e9.png">
                <span slot="label">Explore</span>
            </som-tab-bar-item>
            <som-tab-bar-item badge="2">
                <img slot="icon" src="http://img.souche.com/f2e/e5b35520f5c3c9aa0c33d90febe212fd.png">
                <span slot="label">News</span>
            </som-tab-bar-item>
        </som-tab-bar>
    </div>
</template>
