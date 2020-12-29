const execSync = require('child_process').execSync;
const existsSync = require('fs').existsSync;
const path = require('path');
const components = require('../components.json');

let componentPaths = [];

Object
    .keys(components.packages)
    .forEach((key) => {
        var filePath = path.join(__dirname, `../packages/${key}/webpack.config.js`);

        if (existsSync(filePath)) {
            componentPaths.push(`packages/${key}/webpack.config.js`);
        } else {
            let pkg = key.split('-')[0];
            componentPaths.push(`packages/${pkg}/${key}.webpack.config.js`);
        }
    });

if (componentPaths.length) {
    const paths = componentPaths.join(' --config ');

    const cli = `${path.join('node_modules', '.bin', 'webpack')} --config ${paths}`;

    execSync(cli, {stdio: 'inherit'});
}

