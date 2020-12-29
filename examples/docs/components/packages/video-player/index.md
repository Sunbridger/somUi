## VideoPlayer 视频播放

### 旧版视频播放器，如可以请迁移至 2.0 版。

播放视频

### 代码演示

::: demo video-player
视频播放
:::

### API

#### VideoPlayer
| 参数      | 说明              | 类型      | 可选值                           | 默认值  |
|---------- |--------------    |---------- |--------------------------------  |-------- |
| data      | 接受的数据        | Object    | 看下表                           |  无      |
| play      | 点击是否允许播放  | Boolean    | ture/false                      |  ture    |
| net       | 播放判断网络状态  | Boolean    | ture/false                      |  false   |

#### VideoPlayer Events
| 事件名             | 说明          |
|----------         |-------------- |
| video:fullscreen  | 全屏播放       |
| fullscreenchange  | 全屏播放事件监听 |
| playVideo  | play设为false时播放的点击事件 |

