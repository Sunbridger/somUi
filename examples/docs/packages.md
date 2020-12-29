
## 安装扩展组件

扩展组件的安装方式都是一致的，例如我们要安装 `action-picker` 组件，那么对应的包名为 `@souche-ui/som-action-picker`。
你可能已经注意到了，我们的扩展组件都是以 `@souche-ui/som-` 开头，这样可以体现出组件基于 `som-ui` 开发。

::: tip
扩展组件基于 som-ui 开发，所以请务必在使用时安装 [som-ui](#/components/installation)，并引入。
:::

### 使用 npm

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```bash
npm i @souche-ui/som-{扩展组件名} --save --registry=http://registry.npm.souche-inc.com
```

### 使用组件
以 `action-picker` 扩展组件为例，在 main.js 中写入以下内容：

```js
import 'som-ui/lib/styles/index.css'; // 记得在 webpack 中配置 som-ui 别名哦
import '@souche-ui/som-action-picker/lib/index.css'; // 引入样式（如果有）
import Vue from 'vue';
import SomUI from 'som-ui';
import SomActionPicker from '@souche-ui/som-action-picker'; // 引入组件
import App from './App.vue';

Vue.use(SomUI);
Vue.use(SomActionPicker);

new Vue({
    el: '#app',
    render: h => h(App)
});
```

### 注意

- 安装扩展组件前，先安装 `som-ui`
- 你可以为扩展组件设置别名，当然也可以不设。但是 `som-ui` 的[别名](#/components/quickstart#pei-zhi-bie-ming)是一定要设置的
- 扩展组件具体的使用方式见文档

### 版本号

所有扩展组件的版本号跟主版本保持一致，方便管理。
