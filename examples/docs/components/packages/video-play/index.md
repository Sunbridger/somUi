## VideoPlay 视频播放器

### 视频播放器 2.0 版。

### 代码演示

::: demo video-play
video-play
:::

### API 

[详细说明](https://souche.yuque.com/wireless/vmiody/pfqywy)

#### options
| 参数       | 说明                 | 类型                          | 可选值                           | 默认值   |
| ---------- | --------------       | ----------                    | -------------------------------- | -------- |
| autoplay   | 自动播放             | boolean                       | —                                | false    |
| controls   | 是否显示底部控制栏   | boolean                       | —                                | true     |
| width      | 视频播放器显示的宽度 | string/Number(200 or "200px") | —                                |          |
| height     | 视频播放器显示的高度 | string/Number(200 or "200px") | —                                |          |
| loop       | 是否循环播放         | boolean                       | —                                | false    |
| src        | 要嵌入的视频资源url  | string                        | —                                |          |

#### VideoPlay Events
| 事件名          | 说明               | 返回值                           |
| ----------      | --------------     | -------------------------------- |
| play            | 播放               | —                                |
| pause           | 暂停               | —                                |
| enterFullScreen | 全屏               | —                                |
| enterFullScreen | 退出全屏           | —                                |
| volume          | 音量               | —                                |
| width           | 视频宽度           | —                                |
| height          | 视频高度           | —                                |
| size            | 设置视频宽度、高度 | —                                |

### 贡献者
| 类型   | 参与者 |
| ------ | ------ |
| 维护者 | 冷博文 |


