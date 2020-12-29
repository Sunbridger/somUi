## Button 按钮

### 概述

基础组件，触发业务逻辑时使用。

### 代码演示

::: demo button
基础用法
:::

### API

#### Button
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| -------- | ------ | ----- | ---  | ------- |
| type | 按钮类型 | string | default/primary/gray/info/warn/success/error/text | default |
| disabled | 是否不可点击 | boolean | — | false |
| text | 按钮文字 | string | — | — |
| mini | 是否为 mini 类型，即小尺寸的按钮 | boolean | — | false |
| large | 是否为 large 类型，即大尺寸的按钮 | boolean | — | false |
| plain | 是否是 plain 样式，没有背景色 | boolean | — | false |
| action-type | `button` 的 type 属性 | string | submit/button/reset | — |
| link | vue-router 路由, 值为 `BACK` 等同于 `go(-1)`, 当为 object 时，路由会采用 replace 方式  | string/object | — | — |
| loading | 设置按钮为加载中状态 | boolean | — | false |
| icon | 设置按钮的图标类型 | string | — | — |
| gradients | 按钮背景渐变，长度必须为 2 | array | — | — |
| radius | 组件边框圆角 | string/number | —  | 4 |
| border-width | 组件边框宽度 | number | 2/1 | 2 |
| btn-style | 按钮样式自定义 | object | — | —  |
| delay-time | 点击之后延迟禁点 | number | — | — |

#### Button Group
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| -------- | ------ | ----- | ---  | ------- |
| flex-rank | 两个按钮时的 flex 比例 | string | two/three | — |
| right | 按钮是否右侧对齐 | boolean | — | false |


#### Button Slot
| 参数 | 说明          |
|---------- |-------------- |
| default | 按钮文字 |

### 贡献者
| 类型       | 参与者                         |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |
