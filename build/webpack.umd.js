var webpack = require('webpack');
var merge = require('webpack-merge');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpackBase = require('./webpack.base');

delete webpackBase.externals;

module.exports = merge(webpackBase, {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'SOMUI',
        umdNamedDefine: true
    },
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ],
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
});
