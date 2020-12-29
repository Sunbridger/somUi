## Loading 加载

### 概述

页面居中显示，常用于进入新页面，页面数据加载中时应有加载动画，页面加载完后消失


### 使用配置

##### 如果你是在全局下使用插件配置
```js
import { Loading } from 'som-ui';
import LoadingPlugin from 'som-ui/lib/pluigns/loading';
Vue.use(LoadingPlugin);
```

##### 如果你是在某一个页面中单独引入, 除了上面步骤，还需在组件中引入 `mixins: [Vue]`

### 代码演示

::: demo loading
基础用法
:::

### API

#### Loading
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show | 显示状态 | boolean | — | false |
| text | 提示文字 | string | — | '加载中...' |
| position | 定位方式，默认为 `fixed`，在100%的布局下用 `absolute` 可以避免抖动 | string | — | fixed |
| transition | 显示动画名字 | string | — | som-mask |
| fullsreen | 是否全屏遮罩显示 | boolean | — | false |

#### Loading Slot
| 事件名      | 说明          |
|---------- |-------------- |
| default | 提示文字区域 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

