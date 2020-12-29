## SearchBar 搜索栏

### 概述

搜索组件分四种常用类型：普通搜索，历史记录，热门推荐，模糊搜索。可根据不同业务场景配置

### 代码演示

::: demo search-bar
基础用法
:::

### API

#### SearchBar
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 表单值，`v-model` 绑定 | string | — | — |
| placeholder | 提示文字 | string | — | 搜索 |
| required | 是否必填值, 当必填时提交搜索会进行相关提示 | boolean | — | false |
| is-cancel | 是否显示取消按钮 | blooean | — | false |
| cancel-text | 取消文字 | string | — | 取消 |
| type | 样式类型 | string | light/corner | — | — |
| label-id | 通过设置 label 遮罩，实现输入框提示居中样式 | string | — | — |
| select | 是否为可切换列表搜索 | boolean | — | false | 
| select-list | 切换列表数据 | array | — | — |
| select-key | 切换列表默认选择 key 值 | number| — | 0 |
| effect | 切换列表模式， 同 tips | string | light/dark/active | dark |
| placement | tips 的出现位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/right | bottom|
| gutter | 箭头和触发元素之间的距离 | number | — | 8 |
| auto-fixed | 是否 fixed 在页面，并展示 result | boolean | — |  false |
| top | 自动固定时距离顶部的距离 | string | — | 0px |
| results | 指定搜索结果, 为带有 title key 的对象 或字符串组成的数组，如 [ {title: 'hello', otherData: otherValue} ]  | array | — | — |
| history | 指定搜索的历史记录, 点击历史，触发 on-result-click 事件 | array | — | — |
| hot | 指定搜索的热门推荐, 点击热门，触发 on-result-click 事件 | array | — | — |
| no-result-msg | 没有搜索结果时的提示信息, 设置为空时不显示 | string | — | 抱歉， 暂无相关信息 |
| auto-scroll-to-top | `safari` 下弹出键盘时可能会出现看不到input，需要手动滚动，启用该属性会在fix时滚动到顶端 | boolean | — | false |
| input-style | input 框样式自定义 | object |  — | — |
| form-style | 搜索框 form 样式自定义 | object |  — | — |
#### SearchBar
| 参数      | 说明          |
|---------- |-------------- |
| left | 搜索框左侧内容 | 
| searchLeft | 搜索输入框内左侧内容 |
| right | 搜索框右侧内容 |
| default | 自定义搜索结果列表内容 |
| history | 自定义历史记录内容 |
| hot | 自定义热门推荐内容 |
| customResMsg | 自定义搜索无搜索提示信息，请将 no-result-msg 设置为 null |

#### SearchBar Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-submit | 表单提交时触发 | value |
| on-cancel | 点击 `取消` 按钮时触发 | — |
| on-change | 输入文字变化时触发 | value |
| on-result-click | 点击结果条目时触发 | item |
| on-focus | 输入框获取到焦点时触发 | — |
| on-blur | 输入框失去焦点时触发 | — |

#### SearchBar Methods
| 函数            | 说明          |
|--------------- |-------------- |
| setFocus | 获取 input 焦点 |
| setBlur | 手动设置 input 失去焦点，一般用于在 on-submit 事件中实现隐藏手机键盘 |
| handleResultClick | 结果点击事件， 一般用于在外部 slot 写的结果被点击时调用，以实现自动定位的恢复 |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

