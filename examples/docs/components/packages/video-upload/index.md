## VideoUpload 视频录制上传

### 代码演示

::: demo video-upload
video-upload
:::

### API

#### VideoUpload
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | 组件宽度 | number | — | 300 |
| height | 组件高度 | number | — | 150 |
| limitSize | file最大大小，单位M | — | — | 200 |
| limited | file可选数量 | — | — | 1 |
| accept | html5 input 属性| — | video/*  和 image/* |  |
| capture | html5 input 属性 | — | — |  |

#### VideoUpload Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-success | 上传完成，返回数组 | 视频数组 |
| on-change | 每上传完成一个file，返回数组 | 视频数组 |
| on-error | 错误信息 | error |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 宓正迪 | 
| 设计师 | 罗文凤 |

