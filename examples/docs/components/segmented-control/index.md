## SegmentedControl 分段器

### 概述

和 Tab 功能相似，尽可能避免一个页面中同时出现这两个组件

### 代码演示

::: demo segmented-control
基础用法
:::

### API

#### SegmentedControl
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 当前选中索引值，从0开始，使用 v-model 绑定 | number | — | — |
| type | 分段器类型 | string | info/success/warn/error | — | — |
| height | 高度值, 单位为像素 | number | — | 30 |
| small | 小的分段器 | boolean |  —  | false |
| prevent-default | 是否禁止自动切换 tab-item, 这时候点击每个 item 触发的是 on-before-index-change 事件 | boolean | — | false |

#### SegmentedControl Slot
| 参数      | 说明          |
|---------- |-------------- |
| default | 分段器主体内容，只允许 segment-control-item |

#### SegmentedControl Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-index-change | 当选中 button index 发生变化时触发 | index |
| on-before-index-change	 | 下标切换之前, 配合禁止自动切换使用 | index |

#### SegmentedControlItem
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| selected | 是否选中 | boolean | — | false |
| disabled | 高度值, 单位为像素 | boolean | — | false |

#### SegmentedControlItem Slot
| 参数      | 说明          |
|---------- |-------------- |
| default | 分段器每一项主体内容 |

#### SegmentedControlItem Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-item-click | 当每一项被点击时触发  | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

