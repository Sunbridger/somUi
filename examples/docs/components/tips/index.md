## Tips 提示气泡

### 概述

在点击控件后，浮出一个气泡菜单来做更多的操作或进行提示

### 代码演示

::: demo tips
基础用法
:::

### API

#### Tips
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show | 是否显示，用 v-model 绑定 | boolean | — | false |
| effect | 主题颜色 | string | light/dark/active | light |
| mode | 气泡模式 | string | defalut/guide/list | defalut |
| placement | tips 的出现位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/right | bottom |
| gutter | 箭头和触发元素之间的距离 | number | — | 8 |
| hide-on-blur | 点击外部是否关闭 | boolean | — | false |
| is-trigger | 触发元素是否设置开关 | boolean | — | true |
| content | mode = defalut 时提示的内容 | string | — | — |
| title | mode = guide 时提示的标题 | string | — | — |
| writer | mode = guide 时提示的文案 | string | — | — |
| illustration | mode = guide 时提示的插图 | string | — | — |
| tips-class | 气泡的样式类， 通过添加类名，可以自定义气泡样式 | — | — |

#### Tips Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-show | 提示弹出时触发 | — |
| on-hide | 提示隐藏时触发 | — |

#### Tips Slot
| 事件名      | 说明          |
|---------- |-------------- |
| default | 触发元素 |
| content | 弹窗内容或 som-tips-item 的内容插槽 |

#### TipsItem Slot
| 事件名      | 说明          |
|---------- |-------------- |
| default | 子项内容 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

