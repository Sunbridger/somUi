<template>
    <div class="docs" v-if="!isDemoPage">
        <so-notification
            v-show="!closeInfo"
            class="som-info"
            title="使用问题请加入安装页面的钉钉反馈群"
            type="info"
            @on-close="closeLocal"
            description="bug 问题事后记得提 issue, 备注 assign 为维护者. 如能自行修改提 MR 更好！"
            show-icon>
        </so-notification>
        <div class="docs__header">
            <div class="docs__container">
                <so-row>
                    <so-col :xs="8" :sm="8" :md="8" :lg="8">
                        <a href="#" class="docs__header__title">
                            <img src="../assets/images/logo.png">
                            <span>Som UI </span>
                        </a>
                    </so-col>
                    <so-col :xs="16" :sm="16" :md="16" :lg="16">
                        <ul class="docs__nav">
                            <router-link to="/docs/guide" tag="li" class="docs-trans">指南</router-link>
                            <router-link to="/components" tag="li" class="docs-trans">组件</router-link>
                            <router-link to="/packages" tag="li" class="docs-trans">扩展组件</router-link>
                            <router-link to="/resource" tag="li" class="docs-trans">资源</router-link>
                            <so-dropdown class="docs__version">
                                <so-button size="small">
                                    {{version}} <i class="so-icon-caret-bottom so-icon--right"></i>
                                </so-button>
                                <so-dropdown-menu slot="dropdown">
                                    <so-dropdown-item
                                        v-for="item in Object.keys(versions)"
                                        :key="item"
                                        @click.native="switchVersion(item)">{{item}}</so-dropdown-item>
                                </so-dropdown-menu>
                            </so-dropdown>
                            <so-color-picker v-model="color" @on-change="onChange" class="theme-color"></so-color-picker>
                        </ul>
                    </so-col>
                </so-row>
            </div>
        </div>
        <div class="docs__main">
            <div class="docs__container">
                <router-view></router-view>
            </div>
        </div>
        <div class="docs__footer">
            <div class="docs__container">
                <ul>
                    <li>
                        <h2>GitLab</h2>
                        <div>
                            <a target="_blank" href="http://git.souche.com/souche-ui/som-ui">源码仓库</a>
                        </div>
                        <div>
                            <router-link to="/components/custom-theme" class="docs-trans">定制主题</router-link>
                        </div>
                    </li>
                    <li>
                        <h2>相关站点</h2>
                        <div>
                            <a target="_blank" href="http://git.souche.com/groups/souche-ui">Souche UI</a>
                        </div>
                        <div>
                            <a target="_blank" href="http://git.souche.com/souche-ui/so-ui">So UI</a>
                            <span> - </span>
                            <span>PC 版</span>
                        </div>
                    </li>
                    <li>
                        <h2>社区</h2>
                        <div>
                            <router-link to="/components/changelog" class="docs-trans">更新记录</router-link>
                        </div>
                        <div>
                            <a target="_blank" href="http://git.souche.com/souche-ui/som-ui/issues/new">报告 Bug</a>
                        </div>
                        <div>
                            <a target="_blank" href="http://git.souche.com/souche-ui/som-ui/issues">讨论列表</a>
                        </div>
                    </li>
                    <li>
                        <h2>Copyright © 2018</h2>
                        <div>大搜车无线架构部-前端架构组出品</div>
                        <img src="../assets/images/logo.png">
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
</template>
<script>
import { version } from 'main/index.js';
import versions from '../versions.json';

const colorFun = require('css-color-function');
const root = document.documentElement;

export default {
    data() {
        return {
            color: '#ff571a',
            version,
            versions,
            isDemoPage: false,
            theme: '大风车',
            closeInfo: false
        };
    },
    methods: {
        onChange (val) {
            root.style.setProperty('--color-primary', val);

            if (!val.slice(1, 4).match(/[1-9]/g)) {
                root.style.setProperty('--color-hover', val);
            } else {
                root.style.setProperty('--color-hover', colorFun.convert(`color(${val} tint(40%))`));
            }
            root.style.setProperty('--color-hover-bg', colorFun.convert(`color(${val} tint(90%))`));
            root.style.setProperty('--color-hover-bg2', colorFun.convert(`color(${val} tint(70%))`));

            if (window.frames['iframe']) {
                let frame = window.frames['iframe'].document.documentElement;
                frame.style.setProperty('--primary', val);
                frame.style.setProperty('--primary-text', val);
                frame.style.setProperty('--primary-press', val);
                frame.style.setProperty('--primary-disable', colorFun.convert(`color(${val} tint(60%))`));
                frame.style.setProperty('--primary-selected', colorFun.convert(`color(${val} tint(90%))`));
                if (!val.slice(1, 4).match(/[1-9]/g)) {
                    frame.style.setProperty('--text-anti', '#1b1c33');
                    frame.style.setProperty('--text-selected', '#1b1c33');
                } else {
                    frame.style.setProperty('--text-anti', '#fff');
                    frame.style.setProperty('--text-selected', val);
                }
                frame.style.setProperty('--primary-disable-select-color', colorFun.convert(`color(${val} tint(80%))`));
            }
        },
        switchVersion(version) {
            if (version === this.version) return;
            location.href = `http://f2e-assets.souche.com/projects/som-ui/${this.versions[version]}/www/index.html${location.hash}`;
        },
        renderAnchorHref() {
            const basePath = location.href.split('#').splice(0, 2).join('#');
            setTimeout(() => {
                const anchors = document.querySelectorAll('h2 a,h3 a,h4 a');
                [].slice.call(anchors).forEach((a) => {
                    const href = a.getAttribute('href');
                    a.href = basePath + href;
                });
            }, 500);
        },
        goAnchor() {
            if (location.href.match(/#/g).length > 1) {
                const anchor = location.href.match(/#[^#]+$/g);
                if (!anchor) return;
                const elm = document.querySelector(anchor[0]);
                if (!elm) return;

                setTimeout(() => {
                    document.documentElement.scrollTop = document.body.scrollTop = elm.offsetTop + 100;
                }, 50);
            }
        },
        closeLocal () {
            localStorage.setItem(location.href.replace(location.hash, '') + '/closeInfo/', 'closeInfo');
        }
    },
    mounted() {
        this.closeInfo = localStorage.getItem(location.href.replace(location.hash, '') + '/closeInfo/') === 'closeInfo';
        root.style.setProperty('--color-primary', '#FF571A');
        root.style.setProperty('--color-hover', colorFun.convert('color(#FF571A tint(40%))'));
        root.style.setProperty('--color-hover-bg', colorFun.convert('color(#FF571A tint(90%))'));
        root.style.setProperty('--color-hover-bg2', colorFun.convert('color(#FF571A tint(70%))'));
        this.goAnchor();
        this.renderAnchorHref();
        this.isDemoPage = /#\/demo/.test(location.href);
    },
    created() {
        window.addEventListener('hashchange', () => {
            this.isDemoPage = /#\/demo/.test(location.href);
            if (location.href.match(/#/g).length < 2) {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                this.renderAnchorHref();
            } else {
                this.goAnchor();
            }
        });
    }
};
</script>

<style lang="postcss">
@import '../assets/styles/common.css';
@media (max-width: 640px) {
    .docs__nav {
        display: none!important;
    }
    .docs__header .so-col {
        width: 100%!important;
        text-align: center;
    }
}

.docs__nav li:hover:not(:last-child),
.docs__header .router-link-active {
    border-bottom: 3px solid var(--color-primary);
    color: var(--color-primary);
}
.docs__version .so-button:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
}
.theme-color {
    line-height: 0;
    top: 11px;
}

.theme-color {
    .so-color-picker__trigger {
        height: 30px;
    }
    .so-color-picker__trigger__color {
        height: 14px;
    }
}

.som-info {
    position: absolute;
    background-color: #fff;
    top: 110px;
    right: 5%;
    z-index: 10;
    box-shadow: 2px 4px 8px rgba(0,0,0,.1);
    width: 400px;
    box-sizing: border-box;
}

.docs__version .so-button {
    font-size: 12px;
    min-width: initial;
    padding: 0 8px;
    margin-right: 18px;
}

.docs__header {
    width: 100%;
    height: 80px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .05);
    line-height: 80px;
}

.docs__header__title {
    font-size: 18px;
    cursor: pointer;

    img {
        position: relative;
        top: 9px;
        margin-right: 5px;
        width: 30px;
    }

    span {
        font-family: Raleway,Hiragino Sans GB,sans-serif;
    }
    b {
        margin-left: 8px;
        font-size: 12px;
        color: var(--text-caption);
    }

}

.docs__container {
    width: 90%;
    margin: auto;
}

.docs__main .docs__container {
    margin: 30px auto;
    border-radius: 30px;
    border-radius: 6px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    background: #fff;
}

.docs__footer {
    background: #fff;
    clear: both;
    font-size: 12px;
    background: #fff;
    position: relative;
    z-index: 1;
    color: #8d8e99;
    box-shadow: 0 1000px 0 1000px #fff;

    ul {
        overflow: hidden;
        list-style: none;
        padding: 0;
    }

    li {
        float: left;
        width: 25%;
        padding: 24px 0;
    }

    li > h2 {
        font-size: 14px;
        margin: 0 auto 12px;
        font-weight: 500;
        position: relative;
    }

    li > div,
    li > img {
        margin: 6px 0;
    }

    img {
        width: 48px;
    }
}

.docs__nav {
    margin: 0;
    padding: 0;
    list-style: none;
    float: right;
    font-size: 14px;
    color: #8d8e99;

    li {
        float: left;
        padding: 0 20px;
        cursor: pointer;
        box-sizing: border-box;
        height: 80px;
    }
}

.docs__nav li:last-child {
    line-height: 0;
    position: relative;
    top: 25px;
}
</style>
