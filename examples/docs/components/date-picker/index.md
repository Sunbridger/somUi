## DatePicker 事件选择器

### 概述

只支持单选，建议选项内容为时间，适用于输入时间的场景中

### 代码演示

::: demo date-picker
基础用法
:::

### API

#### DatePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 组件类型 | string | date/year/year-month | date |
| min-date | 可选的最小日期 | date | — | 十年前的 1 月 1 日 |
| max-date | 可选的最大日期 | date | — | 十年后的 12 月 31 日 |
| default-date | 默认展示日期 | date | — | 当前日期 |
| title | 顶部栏标题 | string | — | — |
| item-height | 选项高度 | number | — | 34 |
| confirm-button-text | 确认按钮文字 | string | — | 确认 |
| cancel-button-text | 取消按钮文字 | string | — | 取消 |
| visible-item-count | 可见的选项个数 | number | — | 7 |
| value-format | on-confirm 传出的值格式 (yyyy 代表年 MM 代表月 dd 代表日） | string | — | — |

#### DatePicker Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 当值变化时触发的事件 | picker 实例 |
| on-confirm | 点击完成按钮时触发的事件 | 当前 value |
| on-cancel | 点击取消按钮时触发的事件 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

