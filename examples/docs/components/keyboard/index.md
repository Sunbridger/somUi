## Keyboard 数字键盘

### 概述
用于调用数字键盘。默认展示为一个输入框。
### 代码演示

::: demo keyboard
基础用法
:::

### API
#### 说明
数字键盘组件基于 som-ui 的 som-input 组件，支持 som-input 中除 disabled 的 Api,目前不支持Events。为了禁止触发手机自带键盘, disabled 为 true,不可更改。
#### Keyboard
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| input-parmes | 输入框参数,支持 SomInput 中除 disabled 的 Api 参数 | Object | — | — |
| keyboard-parme | 键盘参数,参考下面 keyboard-parme | Object | — | — |

#### keyboard-parme
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isShow | 键盘是否展示,同一个页面有多个键盘组件的情况下，只能有一个组件的 isShow 可以为 true | Boolean | true/false | false |
| confirmButtonText | 完成按钮文字 | String | - | 完成 |

#### Keyboard Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-confirm | 点击完成时触发 | 当前 value |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 张媛 |
| 设计师 | 汪侃捷 |
