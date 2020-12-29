## Font 字体

我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。

### 中文字体

<div class="docs-font clearfix">
    <div class="item" style="font-family: PingFang SC">
        大搜车
        <p class="item__value">PingFang SC</p>
    </div>
    <div class="item" style="font-family: Hiragino Sans GB">
        大搜车
        <p class="item__value">Hiragino Sans GB</p>
    </div>
    <div class="item" style="font-family: Microsoft YaHei">
        大搜车
        <p class="item__value">Microsoft YaHei</p>
    </div>
</div>


### 英文／数字字体

<div class="docs-font clearfix">
    <div class="item" style="font-family: Helvetica Neue">
        So UI
        <p class="item__value">Helvetica Neue</p>
    </div>
    <div class="item" style="font-family: Helvetica">
        So UI
        <p class="item__value">Helvetica</p>
    </div>
    <div class="item" style="font-family: Arial">
        So UI
        <p class="item__value">Arial</p>
    </div>
</div>

### Font-family 代码

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",
            Arial, sans-serif;
```

### 字体使用规范

<table>
    <tbody>
        <tr>
            <td>数据</td>
            <td>大搜车</td>
            <td class="color-dark-light">24px #1A1A1A</td>
        </tr>
        <tr>
            <td>数据</td>
            <td>大搜车</td>
            <td class="color-dark-light">20px #1A1A1A</td>
        </tr>
        <tr>
            <td>导航栏标题/弹出窗标题/正文标题/重要文字</td>
            <td>我是字体 ABCDEFGH</td>
            <td class="color-dark-light">18px #1A1A1A</td>
        </tr>
        <tr>
            <td>小标题/Tab/菜单/表单标题/List标题</td>
            <td>我是字体 ABCDEFGH 0123456789</td>
            <td class="color-dark-light">16px #1A1A1A</td>
        </tr>
        <tr>
            <td>正文/操作/辅助文字</td>
            <td>我是字体 ABCDEFGH 0123456789</td>
            <td class="color-dark-light">14px #1A1A1A</td>
        </tr>
        <tr>
            <td>说明文字</td>
            <td>我是字体 ABCDEFGH 0123456789</td>
            <td class="color-dark-light">13px #1A1A1A</td>
        </tr>
        <tr>
            <td>次级辅助文字</td>
            <td>我是字体 ABCDEFGH 0123456789</td>
            <td class="color-dark-light">12px #999999</td>
        </tr>
        <tr>
            <td>小标签文字/tabbar文字</td>
            <td>我是字体 ABCDEFGH 0123456789</td>
            <td class="color-dark-light">10px #999999</td>
        </tr>
    </tbody>
</table>

<style lang="postcss" scoped>
.docs-font {
    .item {
        margin-right: 20px;
        width: 200px;
        height: 200px;
        float: left;
        border-radius: 4px;
        margin-top: 10px;
        border: 1px solid #eee;
        position: relative;
        line-height: 160px;
        font-size: 40px;
        text-align: center;
        color: #1f2d3d;
    }

    .item__value {
        font-size: 13px;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 35px;
        border-top: 1px solid #eaeefb;
        font-size: 14px;
        color: #8492a6;
        line-height: 35px;
        text-align: left;
        text-indent: 10px;
        font-family: Helvetica Neue;
        margin: 0;
    }
}

table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    color: #5e6d82;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;

    td {
        border-bottom: 1px solid #eaeefb;
        padding: 10px;
        max-width: 250px;
        line-height: 1.5;
    }
    
    tr:nth-child(1) {
        font-size: 24px;
    }

    tr:nth-child(2) {
        font-size: 20px;
    }

    tr:nth-child(3) {
        font-size: 18px;
    }

    tr:nth-child(4) {
        font-size: 16px;
    }

    tr:nth-child(5) {
        font-size: 14px;
    }

    tr:nth-child(6) {
        font-size: 13px;
    }
    tr:nth-child(7) {
        font-size: 12px;
    }

    tr:nth-child(8) {
        font-size: 14px;
    }
}
</style>
