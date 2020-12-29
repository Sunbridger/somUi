## Rate 评分

### 概述

用于用户评分和展示评分的场景，可自定义图片和icon，支持只读情景下设置半星。

### 代码演示

::: demo rate
rate
:::

### API

#### Rate
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| unselect-img | 未选择时展现的评分图标，传入unselect-img 和 select-img 表示开启image 模式 | array | — |  |
| select-img | 选择时展现的评分图标(需与 unselect-img 数组长度相同) | array | — |  |
| icon-name | 传入som-ui 包含的icon name，表示开启icon模式。与image 模式相比icon 模式优先级更高。 | string | — | star |
| icon-colors |  长度为2的数组 [unselect-color, select-color],色值为16进制(只有在 icon 模式时生效) | array | — | ['#D7D7DB', '#FFC400'] |
| select-count | 已选的图标个数，支持整数、带小数位（ 状态必须为只读，类型为icon)| number | — | 0 |
| size | 展示图标的大小，单位为px | number | — | 24 |
| length | 表示评分图片的长度，传入的 unselect-img.length, select-img.length 与 length 不同 ，以length为准，对图片进行增减。只支持整数传入。 | number | — | 5 |
| read | 评分栏为只读状态，点击无法改变图标样式。 | boolean | — | false |
| tooltips | 传入辅助文字数组 | Array | — | [] |
| tooltipStyle | 修改辅助文字样式 | Object | — | - |

#### Rate Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-click | 点击具体的图标时触发 | （value, index） |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 罗宇丽 |
| 设计师 | 刘子榆 |