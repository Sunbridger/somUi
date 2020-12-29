var merge = require('webpack-merge');
var webpack = require('webpack');
var webpackBase = require('./webpack.base');

module.exports = merge(webpackBase, {
    entry: './src/index.js',
    output: {
        filename: 'som-ui.common.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
});
