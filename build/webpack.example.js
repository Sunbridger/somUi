var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var eslintFriendlyFormatter = require('eslint-friendly-formatter');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var webpackBase = require('./webpack.base');
var utils = require('./utils');

var isProd = process.env.NODE_ENV === 'production';
var version = process.env.VERSION || require('../package.json').version;

delete webpackBase.externals;

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

const config = merge(webpackBase, {
    entry: './examples/index.js',
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: isProd ? `https://assets.souche.com/projects/som-ui/${version}/www/` : '/'
    },
    devServer: {
        contentBase: [
            path.join(__dirname, '../examples/dist'),
            path.join(__dirname, '../examples/assets/images')
        ],
        port: 8086,
        hot: true,
        quiet: true,
        compress: true,
        historyApiFallback: true,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('examples'), resolve('packages')],
                options: {
                    formatter: eslintFriendlyFormatter
                }
            },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: utils.markdownLoader()
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: './examples/index.html'
            // favicon: './examples/assets/images/favicon.ico'
        }),
        new ExtractTextPlugin('index.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['编译成功，请访问: http://localhost:8086']
            }
        }),
        new ProgressBarPlugin(),
        new StyleLintPlugin({
            context: 'packages',
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            fix: true
        }),
        new StyleLintPlugin({
            context: 'src',
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            fix: true
        })
    ]
});

config.module.rules.forEach((rule) => {
    if (rule.test.test('test.css')) {
        rule.use.splice(0, 1); // remove style-loader
        rule.use = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: rule.use
        });
    }
});

module.exports = config;
