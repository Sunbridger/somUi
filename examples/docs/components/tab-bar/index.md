## TabBar 底部导航

### 概述

位于 APP 底部，方便用户在不同功能模块之间进行快速切换。

### 代码演示

> 默认定位为 absolute，适用于 100%页面布局。如果你并非 100% 布局，请手动重置样式为 position: fixed

::: demo tab-bar
基础用法
支持简单模式，即不指定 `icon`，`label` 将垂直居中显示。
:::

### API

#### TabBar
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon-class | 图标的 class 名 | string | — | — |

#### TabBar Slot
| 参数 | 说明          |
|---------- |-------------- |
| default | tab-bar 主体内容，只允许 tab-bar-item	 |

#### TabBar Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-index-change | value 值变化时触发 | — |

#### TabBar Item
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| selected | 是否选中当前项，你也可以使用 `v-model` 来指定选中的 `tab-bar-item` 的 index | boolean | — | false |
| badge | 徽标文字，不指定则不显示 | string | — | — |
| show-dot | 是否显示红点 | boolean | — | false |
| link | 链接，可以为普通 url 或者用 `vue-link` 的路径写法，使用 object 写法指定 replace 为 true 可实现 replace 跳转 | string | — | — |
| icon-class | 图标类名，如果 tab-bar 也同时定义了 icon-class, 会使用 tab-bar-item 的 | string | — | — |

#### TabBar Item Slot
| 参数 | 说明          |
|---------- |-------------- |
| icon | 图标区域	 |
| icon-active | 如果存在，当前 tabbar-item 点击时会显示，用于切换图标 |
| label | 图标下方文字 |

#### TabBar Item Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-item-click	| 点击菜单项时触发 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 高攀 |
| 设计师 | 王菲菲、孟轲、吴艳 |

