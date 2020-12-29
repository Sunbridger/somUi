var merge = require('webpack-merge');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var webpackBase = require('./webpack.base');

delete webpackBase.externals;

module.exports = merge(webpackBase, {
    devtool: '#inline-source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new ProgressBarPlugin()
    ]
});
