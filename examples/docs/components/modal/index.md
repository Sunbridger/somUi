## Modal 对话框

### 概述

用于警示或告知用户操作可能会产生的后果

### 使用配置

##### 如果你是在全局下使用插件配置
```js
import { Dialog, Modal } from 'som-ui';
import ModalPlugin from 'som-ui/lib/pluigns/modal';
Vue.use(Dialog); // 所有弹窗都依赖 Dialog 组件
Vue.use(ModalPlugin);
```

##### 如果你是在某一个页面中单独引入, 除了上面步骤，还需在组件中引入 `mixins: [Vue]`

### 代码演示

::: demo modal
基础用法
:::

### API

#### Modal
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show | 是否显示，使用 `v-model` 绑定 | boolean | — | false |
| show-input | 是否显示输入框 | boolean | — | false |
| placeholder | 输入框的提示（仅在 show-input 为 true 的情况下有效） | string | —  | — |
| theme | 弹窗风格，可以是 ios 或 android | string | — | ios |
| hide-on-blur | 是否在点击遮罩时自动关闭弹窗 | boolean | — | false |
| title | 弹窗标题 | string | — | — |
| content | 弹窗内容, 支持 html | string | — | — |
| is-confirm | 是否对话模式 | boolean | — | false |
| confirm-text | 确认按钮的显示文字 | string | — | 确认 |
| cancel-text | 取消按钮的显示文字 | string | — | 取消 |
| cancel-style | 取消按钮的样式配置，覆盖btn-style属性 | object |  — |  — |
| confirm-style | 确认按钮的样式配置，覆盖btn-style属性 | object |  — |  — |
| btn-style | 确认、取消按钮的样式配置 | object |  — |  — |
| mask-transition | 遮罩动画 | string | — | som-fade |
| dialog-transition | 弹窗动画 | string | — | som-dialog |
| close-on-confirm | 是否在点击确认按钮时自动关闭 | boolean | — | true |
| close-on-cancel | 是否在点击取消按钮时自动关闭 | boolean | — | true |
| mask-z-index | 遮罩层 z-index 值 | number/string | — | 1000 |

#### Modal Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-cancel | 点击取消按钮时触发 | — |
| on-confirm | 点击确定按钮时触发, 参数为 input 中输入的值 | (value) |
| on-show | 弹窗出现时触发 | —  |
| on-hide | 弹窗隐藏时触发 | —  |

#### Modal Slot
| name    | description   |
|-------|-------|
| title | 对话框标题 |
| default | 对话框内容 |
| footer | 对话框底部按钮栏 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

