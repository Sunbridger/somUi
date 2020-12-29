## DatePicker 事件选择器

### 概述

只支持单选，建议选项内容为时间，适用于输入时间的场景中

### 代码演示

::: demo date-time-picker
基础用法
:::

### API

#### DatePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| format | 自定义选择列，默认格式为 'yyyy-mm-dd am H mm', 当 am 为大写时， 上午和下午表示为 AM 和 PM, 当不设置 am 时, 只显示日期、时间、分钟 | string | yyyy-mm-dd am H mm / yyyy-mm-dd AM H mm / yyyy-mm-dd H mm | yyyy-mm-dd am H mm |
| value-format | 确认值格式化, yyyy 代表年份 MM 代表月 dd 代表日期 hh代表小时 mm代表分 | string | — | — |
| min-date | 可选的最小日期 | date | — | 十年前的 1 月 1 日 |
| max-date | 可选的最大日期 | date | — | 十年后的 12 月 31 日 |
| min-hour | 可选的最小小时，针对 time 类型 | number | — | 0 |
| max-hour | 可选的最大小时，针对 time 类型 | number | — | 23 |
| default-date | 默认展示日期 | date | — | 当前日期 |
| minute-step | 分钟的间隔 | number | — | 1 |
| title | 顶部栏标题 | string | — | — |
| item-height | 选项高度 | number | — | 34 |
| confirm-button-text | 确认按钮文字 | string | — | 确认 |
| cancel-button-text | 取消按钮文字 | string | — | 取消 |
| visible-item-count | 可见的选项个数 | number | — | 7 |
| range | 是否是时间段选择 | boolean | — | false |
| time-range-step | 时间段的差值, 针对 range 类型 | number | — | 1 |
| default-minute | 默认时间的起始分钟, 针对 range 类型 | number | — | 0 |

#### DatePicker Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 当值变化时触发的事件 | picker 实例 |
| on-confirm | 点击完成按钮时触发的事件 | 当前 value(或 valueFormat 格式化的值) |
| on-cancel | 点击取消按钮时触发的事件 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

