## Color 色彩

### 概述

Som UI 使用 [lemon](http://lemon.souche-inc.com/docs/variables/color) 的颜色变量用作组件开发，方便组件根据不同的主题颜色变量进行更换主题。

使用时请安装 [lemon](http://lemon.souche-inc.com/docs/variables/color) 包, 并遵照以下调色板的颜色作为设计和开发规范，以保证页面和组件之间的视觉一致。

### 主色

Som UI 默认大风车主色。

<so-row class="docs-color" :gutter="16">
    <so-col span="6">
        <div class="item" style="background: var(--color-primary)">
            <p>主题色</p>
            <p class="item__value">--primary</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #ff571a">
            <p>文字按钮色</p>
            <p class="item__value">--primary-text</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #e54e17">
            <p>按钮点击</p>
            <p class="item__value">--primary-press</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #ff9a76">
            <p>按钮失效</p>
            <p class="item__value">--primary-disable</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #ffeee8">
            <p>标签选中填充色</p>
            <p class="item__value">--primary-selected</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #ff571a">
            <p>标签选中文字</p>
            <p class="item__value">--text-selected</p>
        </div>
    </so-col>
</so-row>

### 辅助色

辅助色是具有代表性的颜色，常用于信息提示，比如成功、警告和失败。

<so-row class="docs-color" :gutter="16">
    <so-col span="6">
        <div class="item" style="background: #ff4040">
            <p>警示 / 价格</p>
            <p class="item__value">--warning</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #1dbf6e">
            <p>成功 / 安全</p>
            <p class="item__value">--success</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #4DA6FF">
            <p>链接色</p>
            <p class="item__value">#4DA6FF</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #fff2bd">
            <p>提示底色</p>
            <p class="item__value">--background-notice</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #fff1f0">
            <p>警告底色</p>
            <p class="item__value">--background-warning</p>
        </div>
    </so-col>
</so-row>

### 文本色

中性色常用于文本、背景、边框、阴影等，可以体现出页面的层次结构。

<so-row class="docs-color" :gutter="16">
    <so-col span="6">
        <div class="item" style="background: #1b1c33">
            <p>标题 / 正文</p>
            <p class="item__value">--text-title</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #5e5e66">
            <p>辅助 / 表头</p>
            <p class="item__value">--text-body</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #8d8e99">
            <p>次级辅助文字 / 失效文字</p>
            <p class="item__value">--text-caption</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #b0b1b8">
            <p>占位符 / 模块分割线</p>
            <p class="item__value">--text-hint</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #d7d7db">
            <p>分割线 B端</p>
            <p class="item__value">--line-b</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #ededf0">
            <p>分割线 C端</p>
            <p class="item__value">--line-c</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #e3e3e6">
            <p>press</p>
            <p class="item__value">--press</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #f2f3f5;">
            <p>页面背景色</p>
            <p class="item__value">--background-page</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #f7f8fa;">
            <p>组件背景色</p>
            <p class="item__value">--background-block</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #fff; border: 1px solid #ddd">
            <p>纯白色</p>
            <p class="item__value">--white</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item item--light" style="background: #fff; border: 1px solid #ddd">
            <p>反白文字</p>
            <p class="item__value">--text-anti</p>
        </div>
    </so-col>
    <so-col span="6">
        <div class="item" style="background: #000">
            <p>蒙层</p>
            <p class="item__value">--mask</p>
        </div>
    </so-col>
</so-row>

<script>

const root = document.documentElement;
export default {
    data () {
        return {
            color: ''
        }
    },
    mounted () {
        this.color = root.style.getPropertyValue('--color-primary');
    }
}
</script>

<style lang="postcss">
.docs-color {
    .item {
        border-radius: 4px;
        color: #fff;
        padding: 16px;
        box-sizing: border-box;
        margin-top: 10px;

        p {
            margin: 0;
        }
    }

    .item--light {
        color: #353842;
    }

    .item__value {
        font-size: 12px;
        opacity: .6;
        margin-top: 6px!important;
    }
}
</style>
