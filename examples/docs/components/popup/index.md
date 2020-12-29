## Popup 底部弹出框

### 概述

弹出于页面，可以设置各个方面，同时遮罩遮盖页面内容

### 使用配置

当底层页面有滚动时，按照下面配置布局可以实现阻止滚动。 
兼容 safari 时，请在 body 主内容加上 som-fix-safari-overflow-scrolling 类, 以解决 safari 布局抖动

```
import { ConfigPlugin } from 'som-ui';

Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
```

当使用 

### 代码演示

::: demo popup
基础用法
:::

### API

#### Popup
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 是否关闭，使用 `v-model` 绑定 | boolean | — | — |
| height | 高度，设置 `100%` 为整屏高度。当 position 为 top 或者 bottom 时有效。 | string | — | auto |
| max-height | 最大高度 | string | — | — |
| hide-on-blur | 点击遮罩时是否自动关闭 | boolean | — | true |
| is-transparent | 是否为透明背景 | boolean | — | false |
| width | 设置 100% 宽度必须使用该属性。在 position 为 left 或者 right 时有效。 | string | — | auto |
| position | 位置 | string | left/right/top/bottom | bottom |
| show-mask | 是否显示遮罩 | boolean | — | true |
| mask-class | 遮罩的类名 | string | — | — |
| popup-style | 弹窗样式，可以用于强制指定 z-index | object | — | — |
| hide-on-deactivated | 是否在 deactived 事件触发时自动关闭，避免在路由切换时依然显示弹窗 | boolean | — | true |

#### Popup Slot
| name    | description   |
|-------|-------|
| default | 底部弹出框的主体内容 |

#### Popup Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-hide | 关闭时触发 | — |
| on-show | 显示时触发 | — |
| on-first-show | 第一次显示时触发，可以在该事件回调里初始化数据或者界面 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

