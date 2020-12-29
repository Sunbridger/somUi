<template>
    <div class="page-docs">
        <so-row>
            <so-col :xs="24" :sm="24" :md="6" :lg="4">
                <div class="page-docs__side">
                    <ul>
                        <template v-for="component in components.children">
                            <router-link v-if="!component.children"
                                :to="components.path + '/' + component.name"
                                class="docs-trans page-docs__side__item"
                                tag="li">
                                <span>{{component.alias}}</span>
                            </router-link>
                            <li v-else>
                                <div class="page-docs__side__submenu">{{component.alias}}</div>
                                <ul class="page-docs__side__sub"
                                    v-for="group in component.children">
                                    <li class="page-docs__side__group">
                                        <div class="page-docs__side__group__title">{{group.groupName}}</div>
                                        <ul>
                                            <router-link v-for="(item, index) in group.children"
                                                        :key="index"
                                                        :to="components.path + '/' + item.name"
                                                        tag="li"
                                                        class="docs-trans page-docs__side__item">
                                                <div class="page-docs__side__item__title">{{item.name | componentName}} <span>{{item.alias}}</span></div>
                                            </router-link>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </template>
                    </ul>
                </div>
            </so-col>
            <so-col :xs="24" :sm="24" :md="18" :lg="20">
                <div class="page-docs__content">
                    <transition name="docs-fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </so-col>
        </so-row>
    </div>
</template>

<script>
import routesMap from '../map';

export default {
    data() {
        return {
            groups: routesMap
        };
    },
    computed: {
        components() {
            const path = this.$route.path;
            return routesMap.filter(route => path.indexOf(route.path) > -1)[0];
        }
    },
    filters: {
        componentName(value) {
            value = value.split('-');
            value = value.map(text => (text[0].toUpperCase() + text.slice(1)));
            return value.join('');
        }
    }
};
</script>

<style lang="postcss">
@custom-selector :--anchor h1, h2, h3, h4, h5, h6;

.page-docs__side {
    margin: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    padding: 20px 0;
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        font-size: 14px;
    }
}

.page-docs__side__item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 24px;
    padding-top: 14px;
    padding-bottom: 14px;

    &:hover {
        color: var(--color-primary);
        cursor: pointer;
    }
}

.page-docs__side .router-link-active {
    border-right: 3px solid var(--color-primary);
    color: var(--color-primary);
    background: var(--color-hover-bg);
}

.page-docs__side__submenu {
    padding-left: 24px;
    padding-top: 14px;
    padding-bottom: 14px;
}

.page-docs__side__item__title {
    padding-left: 26px;

    span {
        font-size: 12px;
        opacity: .67;
    }
}

.page-docs__side__group__title {
    color: #999;
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 32px;
}

.page-docs__content {
    min-height: 600px;
    margin: 0;
    border-left: 1px solid #eee;
    position: relative;
    left: -1px;
    padding: 14px 24px 24px;
    box-sizing: border-box;
    font-size: 14px;

    section > ul {
        padding: 0;
        list-style: none;

        li {
            list-style-type: circle;
            margin-left: 20px;
            padding-left: 4px;
            margin-top: 8px;
            margin-bottom: 8px;
            line-height: 1.5;
        }
    }

    h2 {
        font-size: 28px;
    }

    h3 {
        font-size: 22px;
    }

    h4 {
        font-size: 18px;
    }

    p {
        line-height: 2;
    }
}

.docs-demo__table {
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
    width: 100%;
    margin: 8px 0 16px;
    font-size: 13px;
    color: #5c6b77;

    th,
    td {
        border: 1px solid #e9e9e9;
        padding: 8px 16px;
        text-align: left;
    }

    td:first-child {
        background: #fcfcfc;
        font-weight: 500;
        width: 20%;
    }

    th {
        white-space: nowrap;
        font-weight: 600;
        background: #f7f7f7;
    }

    td {
        line-height: 1.8;
    }
}

.page-docs__anchor {
    opacity: 0;
    transition: all .2s;
}

.page-docs__content :--anchor {
    font-weight: 500;
    color: rgba(0,0,0,.85);
}

.page-docs__content :--anchor:hover .page-docs__anchor {
  opacity: 1;
}

.page-docs__tip {
    padding: 8px 16px;
    background-color: var(--color-hover-bg);
    border-radius: 4px;
    border-left: 5px solid var(--color-hover);
    font-size: 14px;
    color: #5e6d82;
}
</style>
