
## 贡献指南

贡献组件代码前请务必先与 `前端架构组` 联系，确定好开发内容和 API，以免产生不必要或重复的工作。

### Issue 规范

- issue 仅用于提交 Bug 或 Feature 以及设计相关的内容，其它内容可能会被直接关闭。如果你在使用时产生了疑问，请向 `前端架构组` 咨询。
- 在提交 issue 之前，请搜索相关内容是否已被提出。
- 请说明 Som UI 和 Vue 的版本号，并提供操作系统和浏览器信息。推荐使用 [codepen](https://codepen.io/pen) 生成在线 `demo`，这能够更直观地重现问题。

### Pull Request 规范

- 请先基于最新的 develop 分支创建分支。
- commit 遵循 [angular 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)，例如 fix(button): xxx bug。
- **不要提交** lib 里面打包的文件。
- 执行 `npm run build` 后可以正确打包文件。
- 为了兼容性以及最终打包的文件体积考虑，我们的 `babel` 只引入了 `preset-2015`，所以不建议使用 `ES2015` 的 API，例如 `Array.prototype.find`、`Object.assign`等。如果有需要，请引入第三方的 polyfill。
- 确保 PR 是提交到 `develop` 分支，而不是 `master` 分支。
- 如果是修复 bug，请在 PR 中给出描述信息。

### 开发环境搭建

首先你需要 Node.js 5+ 和 NPM 3+

```bash
git clone git@git.souche-inc.com:souche-ui/som-ui.git
cd som-ui
npm install --registry=http://registry.npm.souche-inc.com
npm run dev

# open http://localhost:8083
```

### 组件开发规范

- 通过 make new 创建组件目录结构，包含测试代码、入口文件、文档、样式
<!-- - 如果包含父子组件，需要更改目录结构，参考 `Timeline` -->
<!-- - 组件内如果依赖了其他组件，需要在当前组件内引入，参考 `Select` -->

#### 组件

##### 命名

- 尽量简单、表意。
- css 前缀使用 `som-`
- 事件命名，使用 `on-` 为前缀，比如 `on-change`
- 目录，文件名（全小写，可以包含连字符 - ）
- export 出的对象使用驼峰命名，比如 Page、ButtonGroup
- 如组件需要嵌套使用，子组件命名在父组件后加 `-item`，比如 `timeline` 及 `timeline-item`

##### 样式

- 样式在 `src/styles` 下
- 每个组件样式的文件名与组件的名称一致，并放置在 `src/styles` 根目录下。比如 `timeline.vue` 和 `timeline.css`。
- 使用 [BEM 命名](https://segmentfault.com/a/1190000000391762)，参考 `Row`
- 基于 `postcss`，插件配置以 [postcssrc](https://git.souche-inc.com/souche-ui/som-ui/blob/master/.postcssrc.js) 为准

##### 目录

- 组件在目录 `src/components` 下，每个组件单独一个目录，入口文件为 `index.js` 用于导出组件，再由根入口文件 `src/index.js` 暴露给使用者
- 每个组件的文件名与组件的名称一致，比如 `timeline.vue` 和 `timeline-item.vue`，并放置在组件目录的 `src`（参考 `Row`），如果组件只有一个文件时，可用 `main.vue` 命名

##### 属性

- 必须规定 `type` 或者使用 `validator` 进行验证
- 如果 `validator` 验证为几个值中的一个，则使用 `src/utils ` 内的 `oneOf` 函数验证
- 如果有尺寸的参数 `size`，只能使用 `small` `large`，默认是适中，则不用写

##### 事件

- `$dispatch` 和 `$broadcast` 替代方案在 `src/mixins` 内

### 代码规范

遵循大搜车前端的 [ESLint](http://git.souche.com/souche-f2e/eslint-config-frontend) 即可
