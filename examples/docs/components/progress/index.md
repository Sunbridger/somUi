## Progress 进度条

### 概述

表明某个任务的当前进度

### 代码演示

::: demo progress
基础用法
:::

### API

#### Progress
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| percent | 进度值，0 到 100 | number | — | 0 |
| bar-color | 进度条的色彩 | string | — | —  |
| unfilled | 是否不填充背景色 | boolean | — | false |
| filled-color | 进度条背景颜色 | string | — | —  |
| width | 进度条宽度 | number | — | —  |
| ticks | 刻度数据, 形如{percent, text}, percent: 刻度所在的进度, text: 刻度对应文案 | array | — | —  |
| show-tip | 是否显示进度数据 | boolean | — | true |
| tip-content | 自定义进度数据 | string | — | 当前进度值 |
| show-cancel | 是否显示取消按钮 | boolean | — | false |

#### Progress Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-cancel | 点击取消按钮时触发 | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 陈子瑜 |
| 设计师 | 汪侃捷 王菲菲 |

