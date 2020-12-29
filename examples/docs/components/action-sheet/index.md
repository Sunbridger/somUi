## ActionSheet 动作面板

### 概述

用户进行某项操作后，需要进行选择和确认的操作大于2个时通常会采用操作菜单

### 代码演示

::: demo action-sheet
基础用法
:::

### API

#### ActionSheet
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 是否显示, 使用 v-model 绑定变量 | boolean | — | false |
| header | 提示文字 | string | — | — |
| show-cancel | 是否显示取消菜单，对安卓风格无效 | boolean | — | false |
| cancel-text | 取消菜单的显示文字 | string | — | 取消 |
| theme | 菜单风格，可选值为 ['ios', 'android'] | string | — | ios |
| menus | 菜单项列表, 举例：`{ menu1: '删除' }`，如果名字上带有 `.noop` 表明这是纯文本(HTML)展示，不会触发事件 | object/array | — | — |
| close-on-clicking-mask | 点击遮罩时是否关闭菜单，适用于一些进入页面时需要强制选择的场景。 | boolean | — |true |
| close-on-clicking-menu | 点击菜单时是否自动隐藏 | boolean | — | true |

#### ActionSheet Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-click-menu | 点击菜单时触发 | ( menuKey, menuItem ) |
| on-click-menu-{menuKey} | 点击事件的快捷方式, `menuKey` 与 `label` 的值有关。举例：如果你有一个菜单名字为`delete`, 那么你可以监听 `on-click-menu-delete` | (menuKey) |
| on-click-menu-cancel | 点击取消菜单时触发 | — |
| on-click-mask | 点击遮罩时触发 | — |

#### ActionSheet Slot
| 事件名      | 说明          |
|---------- |-------------- |
| header | 提示文字区域 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

