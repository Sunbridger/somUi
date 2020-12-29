## Input 输入框

### 概述

用户点击时自动唤起输入键盘, 输入内容

### 代码演示

::: demo input
基础用法
:::

### API

#### Input
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 表单值，使用 v-model 绑定, 在 `type = number-range` 时，需绑定 { min, max } 的值形式 | string/number/object | — | — |
| type | 即 input 的 type 属性 | text/number/email/password/tel/number-range | string | text | — |
| number-range-align | 在 `type = number-range` 时，input 段对齐方式 | string | right | — |
| is-type | 验证函数，需要同步返回一个对象 `{valid: true}` 或者 `{valid: false, msg: 错误信息}` | function | — | — |
| required | 是否必值，如果不禁用验证，当没有填写时会在右侧显示错误 icon | boolean | — | false |
| title | label 文字 | string | — | — |
| placeholder | placeholder 提示 | string | — | 请输入 |
| show-clear | 是否显示清除 icon | boolean | — | true |
| min | 最小输入字符长度限制 | number | — | — |
| max | 最大输入字符长度限制 | number | — | — |
| name | input 标准属性 | string | — | — |
| disabled | 是否禁用填写 | boolean | — | false |
| readonly | 同 input 的标准属性 readonly | boolean | — | false |
| autocomplete | 规定是否使用输入字段的自动完成功能（标准属性）| string | off/on | off |
| autocapitalize | 是否首字母大写( IOS 上 WebKit 支持, 其中 on/off IOS5 已弃用) | string | none/sentences/words/characters/on/off | none |
| autocorrect | Safari 支持的非标准属性 | string | off/on | off |
| spellcheck | 是否进行拼写检查 | boolean | — | false |
| novalidate | 是否不进行验证 | boolean | — | false |
| debounce | `debounce` 用以限制 `on-change` 事件触发。如果你需要根据用户输入做 `ajax` 请求，建议开启以节省无效请求和服务器资源，单位为毫秒 | number | — | — |
| placeholder-align | placeholder 文字对齐方式 | string | — | left |
| text-align | 值对齐方式 | string | — | left |
| label-width | label 宽度，权重比 list 的 labelWidth 高 | string | — | — |
| mask | 值格式化，依赖于 vanilla-masker，其中 9 表示数字，A 表示大写字母，S 表示数字或者字母 | string | — | — |
| should-toast-error | 是否在点击错误图标时用 toast 的形式显示错误 | string | — | true |

#### Input Slot
| name    | description   |
|-------|-------|
| label | 用于自定义 label (即 title) 部分内容，比如使用 icon |
| right | 用以在输入框右边显示内容，比如验证码图片，单位，切换密码显示方式等 |

#### Input Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-blur | input 的 blur 事件 | (value, $event) |
| on-focus | input 的 focus 事件 | (value, $event) |
| on-enter | input 输入完成后点击 enter 事件 | (value, $event) |
| on-change | 输入值变化时触发。如果你使用了 debounce，那么触发将不会是实时的。 | (value) |
| on-click-error-icon | 点击错误图标时触发，你可以关闭 should-toast-error 然后用这个事件来自定义显示错误的提示内容 | (error) |

#### Input Methods
| 函数            | 说明          |
|--------------- |-------------- |
| focus() | 手动获得焦点 |
| blur() | 手动设置 input 失去焦点 |
| reset() | 重置输入框值，清除错误信息 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

