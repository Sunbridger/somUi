## Calendar 日历

### 概述

通过日历表形式直观的选择时间

### 代码演示

::: demo calendar
基础用法
:::

### API

#### Calendar
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 当前选中值，使用 v-model 绑定， 在选择日期范围时，需绑定 {beginDate, overDate}。 默认视图显示在当前日期，当有绑定值以绑定值为准 | string/object | — | — |
| show | 是否显示 | boolean | — | false |
| start-date | 起始日期， 格式为 YY/MM/DD, 只输入到月份时不精确到日 | string | — | 一年前 |
| end-date | 结束日期， 格式为 YY/MM/DD， 只输入到月份时不精确到日 | string | — | 一年后 |
| past | 是否向前渲染日期 | boolean | — | false |
| weeks-list | 星期列表，从周日开始 | array | — | ['日', '一', '二', '三', '四', '五', '六'] |
| height | 日历表高度 | string | — | — |
| week-class | 星期列表样式 | string | — | — |
| show-toolbar | 是否显示顶部栏 | boolean | — | true |
| show-result | 是否显示头部结果区域  | boolean | — | true |
| is-multiple | 是否日期范围选择 | boolean | — | false |
| is-time | 是否选则时间 | boolean | — | false |
| default-time | 当选则时间时, 定义时间的默认值 | array | — | ['08: 00', '17:00'] |
| min-hour | 当选则时间时,可选的最小小时 | number | — | 0 |
| max-hour | 当选则时间时,可选的最大小时 | number | — | 23 |
| minute-step | 当选则时间时, 分钟的间隔 | number | — | 1 |
| render-date | 自定义日期的显示 | function(h, month, date) | — | — |
| shortcuts | 自定义快捷选项 | array | — | — |
| disable-past | 是否禁止选择过去 | boolean | — | false |
| disable-future | 是否禁止选择将来 | boolean | — | false |
| disable-weekend | 是否禁止选择周末 | boolean | — | false |
| disable-dates | 自定义禁止选择的日期, 可备注原因 | array | — | — |
| cancel-button-text | 取消按钮文字 | string | — | 取消 |
| confirm-button-text | 确定按钮文字 | string | — | 确定 |
| begin-date-class | 日期范围选择时，选定的开始日期的样式 | string | — | begin-date |
| in-date-class | 日期范围选择时，在选择范围之类的样式 | string | — | in-date |
| over-date-class | 日期范围选择时，选定的结束日期的样式 | string | — | over-date |
| current-date-class | 日期选择时，选定的日期的样式 | string | — | current-date |

#### Calendar Slot
| 参数名      | 说明          |
|---------- |-------------- |
| toolbar | 顶部栏内容 |
| footer | 日期选择底部内容 |

#### Calendar Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-confirm | 点击完成按钮时触发 | value, days (选中的值，当日期范围选择时, 有选择的具体日期) |
| on-cancel | 点击取消按钮时触发 | — |
| on-change | 选项改变时触发 | value |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

