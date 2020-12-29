## Toast 轻提示

### 概述

一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中

### 使用配置

##### 如果你是在全局下使用插件配置
```js
import { Toast } from 'som-ui';
import ToastPlugin from 'som-ui/lib/pluigns/toast';
Vue.use(ToastPlugin);
```

##### 如果你是在某一个页面中单独引入, 除了上面步骤，还需在组件中引入 `mixins: [Vue]`

### 代码演示

::: demo toast
基础用法
:::

### API

#### Toast
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 是否显示, 使用 v-model 绑定 | boolean | — | false |
| time | 显示时间 | number | — | 2000 |
| type | 类型  | string | success/warn/info/error | success | — |
| width | 宽度 | string | — | — |
| is-show-mask | 是否显示遮罩，如果显示，用户将不能点击页面上其他元素 | boolean | — | false |
| text | 提示内容，支持 html，和默认 slot 同样功能 | string | — | — |
| position | 显示位置 | string | default/top/middle/bottom | default |
| top | 提示框距离顶部距离 | string | — | — |
| transition | 显示动画名字 | string | — | som-fade |
#### Toast Slot
| 名字      | 说明          |
|---------- |-------------- |
| default | 默认 slot, 提示内容 |

#### Toast Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-show | 提示弹出时触发 | — |
| on-hide | 提示隐藏时触发 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

