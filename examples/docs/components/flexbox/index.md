## Flexbox 弹性盒

### 概述

弹性盒，将区域进行12等分，这样可以轻松应对大部分布局问题。

### 代码演示

::: demo flexbox
基础用法
:::

### API

#### Flexbox
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 间隙像素大小（px） | number | — | 8 |
| orient | 排布方向 | string | horizontal/vertical | horizontal |
| justify | `flex` 的 `justify-content` 属性 | string | — | — |
| align | `flex` 的 `align-items` 属性 | string | — | — |
| wrap | `flex` 的 `flex-wrap` 属性 | string | — | — |
| direction | `flex` 的 `flex-direction` 属性 | string | — | — |

#### FlexboxItem
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | 占用宽度，如果不设置，所有 flexbox-item 将平分 | number/string | — | — |
| order | `flex` 的 `order` 属性 | number/string | — | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

