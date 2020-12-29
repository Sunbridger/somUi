## Flow 流程

### 概述


### 代码演示

::: demo flow
基础用法
:::

### API

#### Flow
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| orientation | flow 方向 | string | horizontal/vertical | horizontal |
| title-length | 节点标题一行最大字数 | number | — | 4 |
| item-width | 设置每项节点宽度 | string | — | 60px |
| flexable | 节点是否平均分配宽度 | boolean | — | false |

#### FlowItem
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| state | 节点圆内置文字 | string | — | — |
| title | 节点标题 | string | — | — |
| is-done | 节点是否完成 | boolean | — | false |
| is-active | 节点是否正在进行 | boolean | — | false |
| active-color | 节点的激活的颜色 | string | — | — |

#### FlowItem slot
| 参数      | 说明          |
|---------- |-------------- |
| icon | 节点图标自定义 |
| title | 节点标题自定义 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲 |

