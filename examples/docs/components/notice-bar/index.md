## NoticeBar 通告栏

### 概述

在导航栏下方，一般用作系统提醒、活动提醒等通知

### 代码演示

::: demo notice-bar
基础用法
:::

### API

#### NoticeBar
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type   | 提示类型 | string | info/warn/success | — |
| mode    | 提示模式 | string | closable/link | — |
| icon    | 在开始位置设置图标 | string | — | — |
| onClick | 点击关闭或者操作区域的回调函数 | function | — | — |
| marquee | marquee 参数 | object | — | `{loop: false, leading: 500, trailing: 800, fps: 40}` |


#### NoticeBar Slot
| 事件名      | 说明          |
|---------- |-------------- |
| action | 右侧操作内容 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 吴昀珠 |
| 设计师 | 王菲菲、孟轲、吴艳 |

