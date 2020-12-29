### 仅改变主题色使用 

#### lemon 现支持主题

现 [lemon](http://lemon.souche-inc.com/#/docs/grammer/installation) 已包含 大风车 、 弹个车 、新零售 三套颜色主题, 组件默认大风车主题， 如需要换肤，请按照 lemon 并在 main.js 导入相应的主题样式文件。

> 请前往 lemon 官方文档查看使用教程

在 main.js 中写入以下内容：

```js
import 'lemon/less/theme/tgc.css';
// import 'lemon/less/theme/new-seller.css';
```

#### 贡献主题

如有新的主题颜色需要，请一定向设计师确认，并参考 lemon/less/theme 下文件进行颜色贡献。 具体查看 [贡献指南](http://lemon.souche-inc.com/theme) 和 [主题颜色计算规则表](#/components/custom-theme#guan-yu-ding-zhi-zhu-ti-gui-ze-can-kao)


### 完全自定义主题

通过自定义组件中所用的所有变量，可以自定义不光是颜色，甚至是组件的形状(如 border-radius/border/box-shadow...), 然后引入未经过编译的组件 css 文件，编译成功即可实现改变。

#### 具体步骤

- 自行定义一个名为 theme-var.css 文件

```less
 @import "som-ui/src/styles/index.css"; /* 引入的全部组件 css */

/* @import "som-ui/src/styles/button.css"; // 如想引入只用到的组件，自行引入每个组件 css
@import "som-ui/src/styles/icon.css"; */

:root {
    --primary: green;
    --border-radius-normal: 6px;
    ...
}
```

这个 var 文件所支持的变量你可以通过 node_modules/@souche-ui/som-ui/src/styles/base/var.css 进行查看.

- 配置支持 postcss-loader 支持解析组件库样式的语法糖

在 postcss.config.js 配置，若无此文件请手动添加。
> 请查看 package.json 中是否有 `postcss` 配置，若有请删除以便教授叫采用 `postcss.config.js` 配置。

请安装 [@souche-ui/postcss-ui-theme](http://npm.souche-inc.com/package/@souche-ui/postcss-ui-theme) 插件

```js
const createResolver = require('postcss-import-webpack-resolver');

module.exports = {
    plugins: [
        require('@souche-ui/postcss-ui-theme')({
            import: {
                resolve: createResolver({
                    alias: {
                        'lemon': '@souche-ui/lemon'
                    },
                    modules: ['src', 'node_modules']
                })
            }
            defaultNamespace: 'som',
            browsers: ['ie > 8', 'iOS >= 7', 'Android >= 4.1', 'Safari >= 6'],
            assets: {
                basePath: 'node_modules/@souche-ui/som-ui/src/styles',
                relative: true
            }
        })
    ]
};
```


> 如只想自定义的 `theme-var.css` 文件使用以上配置解析 css, 可通过配置 `include: /src\/assets\/theme-var.css/` 实现



### 关于定制主题规则参考
| 颜色       | 变量值 |  计算说明                         |
|---------- |------------ | --------------------  |
| 主题色 | --primary | — | 
| 文字按钮色 | --primary-text | 主色值减淡 40% |
| 点击色 | --primary-press | 主色值加深 30 | 
| 按钮禁用色 | --primary-disable | 主色值减淡 60% |
| button 主题色禁用时字体色 | --primary-disable-select-color | 主色值减淡 80% |
| tag 主色填充色 | --primary-selected | 主色值减淡 90% | 
| 反白文字 | --text-anti | 主色值为深色时(类似大风车主题）设定为白色， 为浅色时(类似弹个车主题）设定为 --text-title 变量色 |
| 文字选中色 | --text-selected | 主色为深色时，设置为主色，为浅色时设置为 --text-title 变量色 |