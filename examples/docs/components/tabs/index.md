## Tab 选项卡

### 概述

用于让用户在不同的视图中进行切换内容

### 代码演示

::: demo tabs
基础用法
:::

### API

#### Tab
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| line-width | 线条宽度 | number | — | 2 |
| vertical | 是否垂直模式 | boolean | — | false |
| active-color | 选中时文字颜色 | string | — | — |
| default-color | 默认文字颜色 | string | — | — |
| disabled-color | 不可点击时文字颜色 | string | — | — |
| bar-active-color | 设置底部 `bar` 颜色 | string | — | — |
| is-same-away | tab 之间是否相同间距 | boolean | — | false |
| animate | 切换时是否需要动画 | boolean | — | true |
| custom-bar-width | 设置底部 `bar` 宽度。使用函数时参数为当前索引 `index`，你可以定义不同 `tab-item` 对应的 `bar` 宽度。 | string/function | — | 默认宽度是 tab 内容宽度加八 |
| prevent-default | 是否禁止自动切换 tab-item | boolean | — | false |

#### TabItem
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabled | 是否不可选 | boolean | — | false |
| active-class | 当前项选中时的样式 | string | — | — |
| badge-label | 徽标文字 | string | — | — |
| badge-background | 徽标背景颜色 | string | — | — |
| badge-color | 徽标文字颜色 | string | — | — |

#### Tabs Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-before-index-change | 下标切换之前, 配合禁止自动切换使用 | ( index ) |
| on-index-change | 当前标签卡改变时触发 | ( val, oldVal ) |

#### TabItem Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-item-click | 当前 tabItem 被点击时触发 | ( index ) |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

