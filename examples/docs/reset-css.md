
## 重置样式

如果你需要一份重置样式，例如：

- [normalize.css](https://github.com/necolas/normalize.css)

那么你可以使用组件内部提供的一份 `reset.css`（这份样式只是提供一种方便，默认不会打包进全局样式）。

这份样式使用了[最优字体](#/components/font)。

::: tip
组件内部不会引入重置样式（reset.css）
:::

### CDN

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="http://f2e-assets.souche.com/projects/som-ui/{版本号}/styles/reset.css">
```

### 代码引入

```js
import 'som-ui/lib/styles/reset.css';
import 'som-ui/lib/styles/index.css'; // 组件样式
import Vue from 'vue';
import SomUI from 'som-ui'; // 记得在 webpack 中配置别名哦
import App from './App.vue';

Vue.use(SomUI);

new Vue({
    el: '#app',
    render: h => h(App)
});
```
