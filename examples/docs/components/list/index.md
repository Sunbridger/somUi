## List 列表

### 概述

单个连续模块垂直排列，显示当前的内容、状态和可进行的操作。

### 代码演示

::: demo list
基础用法
:::

### API

#### List
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 列表标题 | string | — | — |
| title-color | 列表标题文字颜色 | string | — | — |
| label-width | 为子元素设定统一 label 宽度 | string | — | — |
| label-align | 为子元素设定统一对齐方式 | string | — | — |
| label-margin-right | 为子元素设定统一的右边 margin | string | — | — |
| gutter | 设定 list 的上边距，只能用于没有标题时 | string | — | — |
| list-style | 列表容器样式 | object | — | — |

#### List Slot
| 参数 | 说明          |
|---------- |-------------- |
| default | 子组件插槽 |
| title | 标题插槽 |

#### List Item
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 左边标题文字 | string | — | — |
| value | 右侧文字，复杂的样式布局请使用 slot | string | — | — |
| inline-desc | 标题下面文字，一般为说明文字 | string | — | — |
| is-link | 是否为链接，如果是，右侧将会出现指引点击的右箭头 | boolean | — | false |
| link | 点击链接，可以为 http(s) 协议，也可以是 vue-router 支持的地址形式 | string/object | — | — |
| primary | 对应的div会加上 som-list-item__primary 类名实现内容宽度自适应 | string | title/content | title |
| is-loading | 是否显示加载图标，适用于异步加载数据的场景 | boolean | — | false |
| value-align | 文字值对齐方式，当设为 right 时，primary 值将会设为 content | string | left/right | left |
| border-intent | 是否显示边框与左边的间隙 | boolean | — | true |
| arrow-direction | 右侧箭头方向 | string | up/down/left/right | — |
| disabled | 对 label 和箭头(如果使用 is-link )显示不可操作样式 | boolean | — | — |
| align-items | align-items 样式值 | string | — | center |

#### List Item Slot
| 参数 | 说明          |
|---------- |-------------- |
| default | 右侧内容，相比于 value 的优点是可以用复杂的样式或者调用组件 |
| icon | 标题左侧的图像位置 |
| after-title | 标题右侧位置 |
| child | list-item 的直接子元素，因此可以添加一个相对于 list-item 绝对定位的元素 |
| inline-desc | inline-desc 内容，和 prop:inline-desc 功能一样，但是可以使用 html |
| title | title 插槽，方便自定义样式 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

