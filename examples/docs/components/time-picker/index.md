## TimePicker 时间选择器

### 概述


### 代码演示

::: demo time-picker
基础用法
:::

### API

#### TimePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| halftime | 时间类型时，视图选择分为上午下午模式 | boolean | — | false |
| min-hour | 可选的最小小时，针对 time 类型 | number | — | 0 |
| max-hour | 可选的最大小时，针对 time 类型 | number | — | 23 |
| minute-step | 分钟的间隔，针对 time 类型 | number | — | 1 |
| title | 顶部栏标题 | string | — | — |
| item-height | 选项高度 | number | — | 34 |
| confirm-button-text | 确认按钮文字 | string | — | 确认 |
| cancel-button-text | 取消按钮文字 | string | — | 取消 |
| visible-item-count | 可见的选项个数 | number | — | 7 |
| range | 是否是时间段选择 | boolean | — | false |
| time-range-step | 时间段的差值, 针对 range 类型 | number | — | 1 |
| default-minute | 默认时间的起始分钟, 针对 range 类型 | number | — | 0 |

#### TimePicker Events
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

