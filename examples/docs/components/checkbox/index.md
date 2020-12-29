## Checkbox 多选

### 概述

在筛选和输入的场景中，建议用于多项内容选择时且有三个或三个以上时适用

### 代码演示

::: demo checkbox
基础用法
:::

### API

#### Checkbox
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选中值, v-model 绑定 | array | — | — |
| title | 标题 | string | — | — |
| required | 是否为必选 | boolean | false | — |
| options | 选项列表，可以为 `[{key:'name',value:'value',inlineDesc:'inlineDesc', icon: 'icon'}]` 的形式 | array | — | — |
| max | 最多可选个数 | number | — | — |
| min | 最少可选个数 | number | — | — |
| random-order | 是否随机打乱选项顺序 | boolean | — | false |
| align | 多选框的排列方式 | string | vertical/horizontal | vertical |
| label-position | 垂直排列时 label 位置  | string | left/right | right |
| disabled | 是否禁用操作 | boolean | — | false |
| inline-desc-click | 统一描述的点击事件, 使用参数有(option, index, event) | function | — | — |

#### Checkbox Slot-scope
| 参数名      | 说明          |
|---------- |-------------- |
| inline-desc | inline-desc内容，统一设置选项所属描述 |

#### Checkbox Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 值变化时触发 | (value, label) |
| on-error | 绑定值个数与设置的 max、min、required 不符时触发 | err |
| on-clear-error | 错误被修正时触发 | — |

#### Checkbox Methods
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| getFullValue | 获取值和对应的显示文字 | {value, label} |

#### Checkbox Group
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 多选组的显示文字 | string | — | '全选' |
| value | 多选组选中值, v-model 绑定 | array | — | — |
| label-position | label 位置  | string | left/right | right |
| disabled | 是否禁用操作 | boolean | — | false |

#### Checkbox Group Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-group-change | 多选组值变化时触发 | (value) |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

