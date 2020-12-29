## Picker 选择器

### 概述

使用 Picker 来帮助用户完成输入，避免用户通过键盘直接输入

### 代码演示

::: demo picker
基础用法
:::

### API

#### Picker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| columns | 对象数组，配置每一列显示的数据, 通过 [{values: [], defaultIndex}] 方式设定默认选中值。 | array | — | — |
| show-toolbar | 是否显示顶部栏 | boolean | — | false |
| title | 顶部栏标题 | string | — | — |
| confirm-button-text | 确认按钮文字 | string | — | 确定 | 
| cancel-button-text | 取消按钮文字 | string | — | 取消 | 
| item-height | 选项高度 | number | — | 36 | 
| visible-item-count | 可见的选项个数 | number |  — | 5 |
| value-key | 选项对象中，文字对应的 key | string | — | text | 

#### Picker Slot
| name    | description   |
|-------|-------|
| default | show-toolbar 自定义头部栏 |

#### Picker Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-confirm | 点击完成按钮时触发 | value, columnIndex (选中列对应的 index,下同) |
| on-cancel | 点击取消按钮时触发 | picker (picker 实例, 可调用实例方法控制 picker 内容), value, columnIndex |
| on-change | 选项改变时触发 | picker, value, columnIndex, 在多列下还会返回列的下标 |

#### Picker Methods
| 函数            | 说明          |
|--------------- |-------------- |
| getValues() | 获取所有列选中的值，返回一个数组 |
| setValues(values) | 设置所有列选中的值 |
| getIndexes() | 获取所有列选中值对应的索引，返回一个数组 |
| setIndexes(indexes) | 设置所有列选中值对应的索引 |
| getColumnValue(columnIndex) | 获取对应列选中的值 |
| setColumnValue(columnIndex, value) | 设置对应列选中的值 |
| getColumnIndex(columnIndex) | 获取对应列选中项的索引 |
| setColumnIndex(columnIndex, optionIndex) | 设置对应列选中项的索引 |
| getColumnValues(columnIndex) | 获取对应列中所有选项 |
| setColumnValues(columnIndex, values) | 设置对应列中所有选项 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

