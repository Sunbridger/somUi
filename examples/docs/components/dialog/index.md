## Dialog 弹窗

### 概述

常用于功能引导，位于页面正中，出现时间一般为用户初次打开软件或初次使用某一功能为宜，一般只出现一次

### 使用配置

如果你是 100% 布局，按照下面配置布局可以实现阻止滚动。
```js
import { ConfigPlugin } from 'som-ui';

Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
```

如果当前组件直接使用了 Safari 的 overflowScrolling:touch，请引入指令 transfer-dom 以解决其带来的 z-index 失效问题。 

### 代码演示

::: demo dialog
基础用法
:::

### API

#### Dialog
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show | 弹窗是否可见，使用 `v-model` 绑定，支持.sync修饰符 | boolean | — | false |
| mask-transition | 遮罩层动画 | string | — | som-mask |
| dialog-transition | 弹窗动画 | string | — | som-dialog-fade |
| hide-on-blur | 是否在点击遮罩时自动关闭弹窗 | boolean | — | false |
| dialog-style | 设置内部弹窗样式，覆盖原有的宽度、背景颜色等样式 | object | — | — |
| mask-z-index | 遮罩层 z-index 值 | number/string | — | 1000 |
| is-cancle | 是否显示关闭按钮 | boolean | — | true |

#### Dialog Slot
| name    | description   |
|-------|-------|
| default | 弹窗的主体内容 |

#### Dialog Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-show | 弹窗可见时触发 | — |
| on-hide | 弹窗关闭时触发 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

