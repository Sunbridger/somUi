## Radio 单选框

### 概述

在筛选或输入的场景中，用于单项内容选择时且有两个或两个以上时适用

### 代码演示

::: demo radio
基础用法
:::

### API

#### Radio
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 表单值，使用 `v-model` 绑定 | string/number/boolean | — | — |
| options | 可选列表，可以用字符串组成的数组或者 `key=>value` 的形式 | array | — | — |
| mode | 单选模式, 分为 button 按钮模式和勾选模式  | string | button/icon | button |
| title | 按钮模式下的选项标题  | string | — | — |
| fill-mode | 是否可填写 | boolean | — | false | — |
| fill-placeholder | 可填写时的提示文字 | string | — | — |
| fill-label | 可填写时的 label 文字 | string | — | — |
| disabled | 禁用操作 | boolean | — | — |

#### Radio Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 值变化时触发 | value, label |

#### Radio Slot
| name    | description   |
|-------|-------|
| default | 按钮模式下， 自定义 title 内容 |
| each-item | 自定义如何显示每一项, 暴露参数 `props: { icon: '选项的图标', label: '选项文案', index: '选项下标', selected: '选中状态' }` |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

