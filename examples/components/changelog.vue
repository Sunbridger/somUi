<template>
    <div class="page-changelog">
        <h2 id="geng-xin-ri-zhi">更新日志 <a href="#geng-xin-ri-zhi" aria-hidden="true" class="page-docs__anchor">#</a></h2>
        <p>
            <code>Som UI</code> 严格遵循 <a href="http://semver.org/lang/zh-CN/" target="_blank">Semantic Versioning 2.0.0</a> 语义化版本规范。
        </p>
        <h4 id="fa-bu-zhou-qi" class="version">
            发布周期 <a href="#fa-bu-zhou-qi" class="page-docs__anchor">#</a>
        </h4>
        <ul class="rules">
            <li>
                <p>修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）</p>
            </li>
            <li>
                <p>次版本号：每月发布一个带有新特性的向下兼容的版本。</p>
            </li>
            <li>
                <p>主版本号：含有破坏性更新和新特性，不在发布周期内。</p>
            </li>
        </ul>
        <so-timeline>
            <so-timeline-item color="#FF7340" v-for="(item, index) in items" :key="index">
                <div v-html="item.version"></div>
                <div v-html="item.date"></div>
                <div v-html="item.content"></div>
            </so-timeline-item>
        </so-timeline>
        <change-log ref="changeLog"></change-log>
    </div>
</template>
<script>
import ChangeLog from '../../CHANGELOG.md';

export default {
    data() {
        return {
            items: []
        };
    },
    mounted() {
        const changeLog = this.$refs.changeLog;
        const changeLogNodes = changeLog.$el.children;

        let item = {
            version: changeLogNodes[1].innerHTML.split('</a>')[0] + '</a>',
            date: '',
            content: ''
        };

        for (let len = changeLogNodes.length, i = 2; i < len; i += 1) {
            let node = changeLogNodes[i];
            if (node.querySelector('em')) {
                item.date = node.outerHTML.replace(/em/g, 'code');
            } else if (node.tagName !== 'H3') {
                item.content += changeLogNodes[i].outerHTML;
            } else {
                this.items.push(item);
                item = {
                    version: changeLogNodes[i].innerHTML.split('</a>')[0] + '</a>',
                    date: '',
                    content: ''
                };
            }
        }

        if (this.items[this.items.length - 1] !== item) {
            this.items.push(item);
        }

        this.items.forEach((obj) => {
            let version = obj.version.match(/>(.+)</)[1];
            let docUrl = `http://f2e-assets.souche.com/projects/som-ui/${version}/www/index.html${location.hash}`;
            obj.content = obj.content.replace(/#(\d+)/g, '<a href="http://git.souche.com/souche-ui/som-ui/issues/$1" target="_blank">#$1</a>');
            // obj.version = obj.version.replace(/(.+)/g, `<h2 class="version">$1 <a href="${docUrl}" class="page-docs" target="_blank">文档</a></h2>`);
        });

        changeLog.$el.remove();
    },
    components: {
        ChangeLog
    }
};
</script>
<style lang="postcss">
.page-changelog {
    .so-timeline__item .version {
        margin: 0;
        position: relative;
        top: -3px;
        font-size: 22px;
    }

    .so-timeline__item ul,
    ul.rules {
        padding: 0;

        li {
            list-style-type: circle;
            margin-left: 20px;
            padding-left: 4px;
            margin-bottom: 8px;
            line-height: 1.5;
        }
    }

    .so-timeline__item__content > div:first-child {
        font-size: 20px;
        font-weight: 400;
        a {
            font-weight: 700;
        }
    }

    .page-docs {
        color: #f90;
        margin-left: 8px;
        font-size: 14px;
    }

    ul.rules {
        margin-bottom: 40px;
    }
}

</style>
