<template>
    <div class="docs-demo-wrapper">
        <so-row>
            <so-col span="15">
                <div class="docs-demo"
                    :class="{'docs-demo--expand': isExpand}">
                    <div class="docs-demo__meta">
                        <slot name="desc"></slot>
                        <span class="docs-trans docs-demo__triangle" @click="toggle"><i></i></span>
                    </div>
                    <div class="highlight-wrapper">
                        <slot name="highlight"></slot>
                    </div>
                </div>
            </so-col>
            <so-col span="8" offset="1">
                <div class="docs-demo__code__mobi" :style="mobiHeight">
                    <div class="docs-demo__code__mobi__header">
                        <img src="https://os.alipayobjects.com/rmsportal/VfVHYcSUxreetec.png">
                        <div class="url-box">{{demoUrl}}</div>
                    </div>
                    <div class="docs-demo__code__mobi__content">
                        <iframe 
                            ref="iframe" 
                            :src="demoUrl"
                            name="iframe"></iframe>
                    </div>
                </div>
            </so-col>
        </so-row>
    </div>
</template>

<script>
const colorFun = require('css-color-function');

export default {
    data() {
        return {
            isExpand: true
        };
    },
    computed: {
        demoUrl() {
            const match = this.$route.path.match(/[components|packages]\/(.*)/);
            const component = match && match[1];
            return `${location.origin}${location.pathname}#/demo/${component}`;
        },
        mobiHeight () {
            let width = document.documentElement.clientWidth * 0.24;
            width = width > 375 ? 375 : width;
            return {height: width * 2 + 'px' }; // eslint-disable-line
        }
    },
    methods: {
        toggle() {
            this.isExpand = !this.isExpand;
        },
        loadStyle () {
            let val = document.documentElement.style.getPropertyValue('--color-primary');

            let root = window.frames['iframe'].document.documentElement;
            root.style.setProperty('--primary', val);
            root.style.setProperty('--primary-text', val);
            root.style.setProperty('--primary-press', val);
            root.style.setProperty('--primary-disable', colorFun.convert(`color(${val} tint(60%))`));
            root.style.setProperty('--primary-selected', colorFun.convert(`color(${val} tint(90%))`));
            if (!val.slice(1, 4).match(/[1-9]/g)) {
                root.style.setProperty('--text-anti', '#1b1c33');
                root.style.setProperty('--text-selected', '#1b1c33');
            } else {
                root.style.setProperty('--text-anti', '#fff');
                root.style.setProperty('--text-selected', val);
            }
            root.style.setProperty('--primary-disable-select-color', colorFun.convert(`color(${val} tint(80%))`));
        }
    },
    mounted () {
        window.frames['iframe'].addEventListener("DOMContentLoaded", () => {
            this.loadStyle();
        });
    }
};
</script>

<style lang="postcss">
.docs-demo {
    width: 100%;
    min-height: 60px;
    border: 1px solid #eee;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    margin: 20px 0;

   pre code {
        border: none;
        background: #fff;
    }
}

.docs-demo__code,
.highlight-wrapper,
.docs-demo__meta {
    padding: 20px;
}

.docs-demo__code {
    border-bottom: 1px solid #eee;
}

.docs-demo__meta {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #777;

    > div:nth-child(2) {
        line-height: 2;
    }
}

.docs-demo__meta__title {
    position: absolute;
    top: -10px;
    background: #fff;
    color: rgba(0, 0, 0, .65);
    padding: 0 6px;
    margin-left: -6px;
    font-weight: 500;
    font-size: 13px;
    

}

.docs-demo.docs-demo--expand .docs-demo__meta {
    border-bottom: 1px dashed #e9e9e9;
}

.docs-demo__triangle {
    border: 1px solid #999;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    position: absolute;
    right: 14px;
    bottom: 20px;

    i {
        triangle: 4px bottom #999;
    }
}

.docs-demo.docs-demo--expand .docs-demo__triangle {
    transform: rotate(180deg);
}

.highlight-wrapper {
    display: none;

    p,
    pre {
        margin: 0;
    }

    .hljs {
        padding: 0;
    }
}

.docs-demo.docs-demo--expand .highlight-wrapper {
    display: block;
}

.docs-demo__code__mobi {
    max-width: 375px;
    padding: 80px 12px;
    background: url(http://img.souche.com/f2e/879df4c717741389394d8e556246a3b6.png);
    background-size: 100% 100%;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    
}

.docs-demo__code__mobi__header {
    font-size: 14px;
    border-radius: 4px 4px 0 0;
    background: -webkit-linear-gradient(rgba(55,55,55,.98),#545456);
    background: linear-gradient(rgba(55,55,55,.98),#545456);
    text-align: center;
    padding: 0px 8px 8px 8px;
    

    img {
        width: 100%;
    }

    .url-box {
        height: 28px;
        line-height: 28px;
        color: #fff;
        padding: 0 3px;
        background-color: #a2a2a2;
        margin: 0px auto;
        border-radius: 4px;
        white-space: nowrap;
        overflow-x: scroll;
    }
    .url-box::-webkit-scrollbar {
        display: none;
    }

    .url-box::-webkit-scrollbar {
        display: none;
    }

}

.docs-demo__code__mobi__content {
    font-size: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px 12px 230px 12px;
    left: 0;
}
iframe {
    width: 100%;
    border: 0;
    height: 100%;
}
</style>

