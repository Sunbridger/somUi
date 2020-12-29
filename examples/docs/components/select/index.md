## Select select

单项选项框

### 代码演示

::: demo select
select
:::

### API

#### Select
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 表单值，使用 v-model 绑定 | string/number | — | — |
| title | select 选择内容标题 | string | — | — |
| required | 是否必选 | boolean  — | false |
| placeholder | placeholder 提示 | string | — | 请输入 |
| disabled | 是否禁用填写 | boolean | — | false |
| text-align | 值对齐方式 | string | — | left |
| label-width | label 宽度，权重比 list 的 labelWidth 高 | string | — | — |
| options | 选项数组，形如 [{values: '', text: ''}] | array | — | — |
| show-toolbar | 是否显示顶部栏 | boolean | — | true |
| item-height | 每一个选项高度 | number | — | 36 | 
| visible-item-count | 选项框可见的选项个数 | number |  — | 5 |
| label-key | 选项对象中，文字对应的 key | string | — | text | 
| value-key | 选项对象中，value 对应的 key | string | — | value | 
| picker-title | picker 顶部栏标题 | string | — | — |
| confirm-button-text | picker 确认按钮文字 | string | — | 确定 | 
| cancel-button-text | picker 取消按钮文字 | string | — | 取消 | 

#### Select Slot
| name    | description   |
|-------|-------|
| label | 用于自定义 select 框 label (即 title) 部分内容，比如使用 icon |
| right | 用以在 select 框右边显示内容 |
| default | picker 的 show-toolbar 内容，仅 show-toolbar 为 true 时显示 |

#### Select Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 选项值发生改变时 | (value, item) |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | — |

