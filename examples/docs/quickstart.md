
## 快速上手
本节将介绍如何在项目中使用 Som UI。

### 引入 Som UI
你可以引入整个 Som UI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Som UI。

#### 配置别名

:::tip
**注意：** 为了使用方便，我们在组件内部使用 som-ui 代替 @souche-ui/som-ui。也就是说，我们必须在自己的项目中增加这个别名才能使用组件（这样也方便使用）。
:::

webpack.config.js
```js
module.exports = {
    // ...
    resolve: {
        alias: {
           'som-ui': '@souche-ui/som-ui'
        }
    }
    // ...
};
```

#### 完整引入
在 main.js 中写入以下内容：

```js
import 'som-ui/lib/styles/index.css';
import Vue from 'vue';s
import SomUI from 'som-ui'; // 记得在 webpack 中配置别名哦
import App from './App.vue';

Vue.use(SomUI);

new Vue({
    el: '#app',
    render: h => h(App)
});
```

以上代码便完成了 Som UI 的引入。需要注意的是，样式文件需要单独引入。
新零售和弹个车的主题样式请引入对应的样式文件。 如要按需引入，请自定主题文件， 参考[定制主题](#/components/custom-theme)

#### 按需引入
借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component --save-dev
```

然后，将 .babelrc 修改为：

```json
{
    "presets": [
        ["es2015", { "modules": false }]
    ],
    "plugins": [["component", [
        {
            "libraryName": "som-ui",
            "styleLibraryName": "styles"
        }
    ]]]
}
```

如是 `babel.config.js` 文件则添加配置如下
```js
plugins: [
    ['component', {
        libraryName: 'som-ui',
        styleLibraryName: 'styles'
    }, 'som-ui']
]
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import { Button, Select, Toast } from 'som-ui'; // 记得在 webpack 中配置别名哦
import ToastPlugin from 'som-ui/lib/plugins/toast/';  //引入 toast 的插件方式, 详见 toast 组件文档
import App from './App.vue';


Vue.use(ToastPlugin);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
    el: '#app',
    render: h => h(App)
});
```

以上代码会自动引入组件样式，无需开发者手动引入。

各个组件的使用方法请参阅它们各自的文档。
