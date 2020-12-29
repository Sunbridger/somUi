/* eslint-disable no-console */

console.log();
process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
    console.error('[组件名]必填 - Please enter new component name');
    process.exit(1);
}

var path = require('path');
var fileSave = require('file-save');
var uppercamelcase = require('uppercamelcase');
var componentsFile = require('../../components.json');
var navConfigFile = require('../../examples/map.json');

var componentname = process.argv[2];
var chineseName = process.argv[3] || componentname;
var ComponentName = uppercamelcase(componentname);
var PackagePath = path.resolve(__dirname, '../../packages', componentname);
var Files = [
    {
        filename: 'index.js',
        content: `import ${ComponentName} from './src/main';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
    Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
    },
    {
        filename: 'package.json',
        content: `{
  "name": "@souche-ui/som-${componentname}",
  "version": "0.1.0",
  "description": "${componentname}",
  "main": "./lib/index.js",
  "repository": "http://git.souche.com/souche-ui/som-ui/tree/master/packages/${componentname}",
  "author": "souchefe",
  "license": "MIT",
  "files": [
    "src",
    "lib",
    "index.js"
  ]
}`
    },
    {
        filename: 'README.md',
        content: `# som-${componentname}
> A som-${componentname} component for Vue.js.

## Documentation
http://f2e-assets.souche.com/projects/som-ui/www/index.html#/packages/${componentname}`
    },
    {
        filename: 'webpack.config.js',
        content: `var webpackPackages = require('../../build/webpack.packages');

module.exports = webpackPackages(__dirname, 'Som${ComponentName}');`
    },
    {
        filename: 'src/main.vue',
        content: `<template>
    <div class="som-${componentname}"></div>
</template>

<script>
import './main.css';

export default {
    name: 'Som${ComponentName}'
};
</script>`
    },
    {
        filename: 'src/main.css',
        content: `/* ${componentname}.css */`
    },
    {
        filename: path.join(
            '../../examples/docs/components/packages',
            componentname,
            'index.vue'
        ),
        content: `<template>
    <som-${componentname}></som-${componentname}>
</template>
<script>
export default {
};
</script>
`
    },
    {
        filename: path.join(
            '../../examples/docs/components/packages',
            componentname,
            'index.md'
        ),
        content: `## ${ComponentName} ${chineseName}

### 代码演示

::: demo ${componentname}
${componentname}
:::

### API

#### ${ComponentName}
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| — | — | — | — | — |

#### ${ComponentName} Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| — | — | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
`
    },
    {
        filename: path.join(
            '../../test/unit/specs/packages',
            `${componentname}.spec.js`
        ),
        content: `import ${ComponentName} from 'packages/${componentname}';
import { createTest, destroyVM } from '../../util';

describe('${ComponentName}', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(${ComponentName}, true);
        expect(vm.$el).to.exist;
    });
});
`
    }
];

// 添加到 components.json
if (componentsFile.packages[componentname]) {
    console.error(`${componentname} 已存在.`);
    process.exit(1);
}
componentsFile.packages[componentname] = `./packages/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json')).write(JSON.stringify(componentsFile, null, 4), 'utf8').end('\n');

// 创建 package
Files.forEach((file) => {
    fileSave(path.join(PackagePath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
});

// 添加到 map.json
navConfigFile.forEach((nav) => {
    if (nav.path.indexOf('packages') > -1) {
        var groups = nav.children[nav.children.length - 1].children;
        var otherGroup = groups[groups.length - 1];
        otherGroup
            .children
            .push({name: componentname, alias: chineseName});
    }
});

fileSave(path.join(__dirname, '../../examples/map.json')).write(JSON.stringify(navConfigFile, null, 4), 'utf8').end('\n');

console.log('DONE!');
