var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpackBase = require('./webpack.base');
var nodeExternals = require('webpack-node-externals');

module.exports = function (context, moduleName, entry) {
    var config = merge(webpackBase, {
        entry: {
            [entry || 'index']: path.resolve(context, entry || 'index.js')
        },
        output: {
            path: path.resolve(context, 'lib'),
            libraryTarget: 'umd',
            filename: '[name].js',
            library: moduleName,
            umdNamedDefine: true
        },
        plugins: [
            new UglifyJSPlugin({
                compress: {
                    warnings: false
                },
                exclude: /node_modules/
            }),
            new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'})
        ],
        externals: [ // 移除公司公用包
            {
                '@souche-ui/oss-image': '@souche-ui/oss-image',
                '@souche-f2e/oss-upload': '@souche-f2e/oss-upload',
                '@souche-f2e/http-request': '@souche-f2e/http-request'
            },
            nodeExternals()
        ]
    });

    return config;
};
