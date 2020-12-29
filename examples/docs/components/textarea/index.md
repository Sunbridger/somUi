## Textarea 文本框

### 概述

大段文字输入框，常用于地址、评论场景

### 代码演示

::: demo textarea
基础用法
:::

### API

#### Textarea
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 表单值, 使用 `v-model` 绑定 | string | — | — |
| title | label 文字 | string | — | — |
| inline-desc | 位于标题下的描述文字 | string | — | — |
| show-counter | 是否显示计数 | boolean | — | true |
| max-number| 提示所输入的最大值, 并不限制输入 | number | — | — |
| max | 最大长度限制, 标准属性 | number | — | — |
| name | 表单名字, 标准属性 | string | — | — |
| disabled | 是否禁用填写 | boolean | — | false |
| required | 是否必填值，标准属性 | boolean | — | false |
| placeholder | 文本框占位文本 | string | — | — |
| rows | textarea 标准属性 rows | number | — | 3 |
| cols | textarea 标准属性 cols | number | — | 30 |
| height | 高度 | number | — | — |
| readonly | textarea 标签属性 readonly | boolean | — | false |
| autosize | 是否根据内容自动设置高度, 可传入对象，如 { maxHeight: 100, minHeight: 50 }, 单位为 px | boolean | — | false |
| autocomplete | 规定是否使用输入字段的自动完成功能（标准属性）| string | off/on | off |
| autocapitalize | 是否首字母大写( IOS 上 WebKit 支持, 其中 on/off IOS5 已弃用) | string | none/sentences/words/characters/on/off | none |
| spellcheck | 是否进行拼写检查 | boolean | — | false |


#### Textarea Slot
| 参数名     | 说明          |
|---------- |-------------- |
| label | 用于自定义 label (即 title) 部分内容，比如使用 icon |

#### Textarea Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-change | 表单值变化时触发 | (value) |
| on-focus | focus 事件 | — |
| on-blur | blur 事件 | — |

#### Textarea Methods
| 函数            | 说明          |
|--------------- |-------------- |
| updateAutosize() | 重置 autosize 高度，如果绑定值不为空，需要调用该函数进行高度重置 |
| focus() | 手动获得焦点 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

