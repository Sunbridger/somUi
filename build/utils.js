var path = require('path');
var fs = require('fs');
var hljs = require('highlight.js');
var markdownIt = require('markdown-it');
var markdownItContainer = require('markdown-it-container');
var markdownItAnchor = require('markdown-it-anchor');
var slugify = require('transliteration').slugify;

function _renderHighlight(str, lang) {
    if (!(lang && hljs.getLanguage(lang))) {
        return '';
    }

    return hljs.highlight(lang, str, true).value;
}

function _wrap(render) {
    return function() {
        return render.apply(this, arguments) // eslint-disable-line
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">');
    };
}

function markdownLoader () {
    var md = markdownIt({
        preset: 'default',
        breaks: true,
        html: true,
        highlight: _renderHighlight
    });
    md.renderer.rules.table_open = function () {
        return '<table class="docs-demo__table">';
    };
    md.renderer.rules.fence = _wrap(md.renderer.rules.fence);
    return md
    .use(markdownItAnchor, {
        level: 2,
        slugify: slugify,
        permalink: true,
        permalinkSymbol: '#',
        permalinkClass: 'page-docs__anchor'
    })
    .use(markdownItContainer, 'tip', {
        render: function(tokens, idx) {
            if (tokens[idx].nesting === 1) {
                return '<div class="page-docs__tip">\n';
            } else {
                return '</div>\n';
            }
        }
    })
    .use(markdownItContainer, 'demo', {
        validate: function(params) {
            return params.trim().match(/^demo\s*(.*)$/);
        },
        render: function(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

            if (tokens[idx].nesting === 1) {
                const component = m[1];
                const desc = tokens[idx + 2].content;
                let file = path.resolve(__dirname, '../examples/docs/components', component, 'index.vue');
                const packagesFilePath = path.resolve(__dirname, '../examples/docs/components/packages', component, 'index.vue');
                if (component && fs.existsSync(file)) {
                    // 替换 som-ui/src 为 som-ui 的主要目的是：
                    // 1.防止误导组件的使用者将 som-ui/src 作为组件路径导入。
                    file = `\`\`\`html\n${fs.readFileSync(file, 'utf8')}\`\`\``.replace('from \'som-ui/src\'', 'from \'som-ui\'');
                    file = file.replace(/from 'som-ui\/src\/plugins/g, 'from \'som-ui/lib/plugins');
                } else {
                    file = `\`\`\`html\n${fs.readFileSync(packagesFilePath, 'utf8')}\`\`\``.replace('from \'som-ui/src\'', 'from \'som-ui\'');
                }
                // 移除描述，防止被添加到代码块
                tokens[idx + 2].children = [];

                return `<demo-block>
                        <div slot="desc">${md.renderInline(desc)}</div>
                        <div slot="highlight">${md.render(file)}`;
            }
            return '</div></demo-block>\n';
        }
    });
}

module.exports = {
    markdownLoader
};
