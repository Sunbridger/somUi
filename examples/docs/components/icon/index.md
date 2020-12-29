## Icon 图标

语义化的矢量图形。

### 如何使用

使用 `<som-icon>` 标签声明组件，指定图标对应的 name 属性，示例代码如下:

```html
<som-icon name="clock"></som-icon>
```

渲染后为：

```html
<i class="som-icon-clock"></i>
```

### API

#### Icon
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 图标的名称 | string | — | — |
| size | 图标的大小，单位是 px。例：`size="32"` | string/number | — | — |
| color | 图标的颜色。例：`color="#000"` | string | — | — |

### 图标集合

<so-row class="icon-list">
    <so-col v-for="name in icons" :key="name" span="4">
        <span class="w">
            <i :class="'som-icon-' + name"></i>
            {{'som-icon-' + name}}
        </span>
    </so-col>
</so-row>

<script>
import iconList from 'examples/icon.json';

export default {
    data() {
        return {
            icons: iconList
        };
    }
}
</script>
<style lang="postcss" scoped>
.icon-list {
    overflow: hidden;
    border: solid 1px #eaeefb;
    border-radius: 4px;
}

.so-col {
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;

    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    
    margin-bottom: -1px;

    &:nth-child(6n) {
        border-right: none;
    }

    .w {
        display: inline-block;
        line-height: normal;
        vertical-align: middle;
        font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
        color: #99a9bf;
    }

    & 
    & i {
        display: block;
        font-size: 34px;
        margin-bottom: 15px;
        color: #8492a6;
    }

    &:hover {
        color: rgb(92, 182, 255);
    }
}
</style>
