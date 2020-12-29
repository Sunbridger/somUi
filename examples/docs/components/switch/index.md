## Switch 滑动开关

### 概述

常出现于功能设置的场景, 只能在 list 中使用

### 代码演示

::: demo switch
基础用法
:::

### API

#### Switch
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | label 文字 | string | — | — |
| disabled | 是否不可点击 | boolean | — | false |
| value | 表单值, 使用 `v-model` 绑定 | boolean | — | false |
| inline-desc | 标签下文字 | string | — | — |
| prevent-default | 阻止点击时自动设定值 | boolean | — | false |
| value-map | 用于自定义 false 和 true 映射的实际值，用于方便处理比如接口返回了 0 1 这类非 boolean 值的情况 | array | — | [false, true] |

#### Switch Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 值变化时触发 | currentValue |
| on-click | 点击组件时触发, 仅当不自动设置值模式下触发 | newVal, oldVal |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

