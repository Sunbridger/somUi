var fs = require('fs');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var Components = require('../components.json');

var externals = {};

Object.keys(Components.base).forEach(function(key) {
    externals[`som-ui/src/components/${key}`] = `@souche-ui/som-ui/lib/${key}`;
});

utilsList.forEach(function(file) {
    file = path.basename(file, '.js');
    externals[`som-ui/src/utils/${file}`] = `@souche-ui/som-ui/lib/utils/${file}`;
});

mixinsList.forEach(function(file) {
    file = path.basename(file, '.js');
    externals[`som-ui/src/mixins/${file}`] = `@souche-ui/som-ui/lib/mixins/${file}`;
});

transitionList.forEach(function(file) {
    file = path.basename(file, '.js');
    externals[`som-ui/src/transitions/${file}`] = `@souche-ui/som-ui/lib/transitions/${file}`;
});

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            main: path.resolve(__dirname, '../src'),
            packages: path.resolve(__dirname, '../packages'),
            components: path.resolve(__dirname, '../src/components'),
            examples: path.resolve(__dirname, '../examples'),
            assets: path.resolve(__dirname, '../examples/assets'),
            'som-ui': path.resolve(__dirname, '../'),
            'so-ui': '@souche-ui/so-ui',
            'lemon': '@souche-ui/lemon',
            utils: path.resolve(__dirname, '../src/utils/util')
        }
    },
    output: {
        path: path.join(__dirname, '../lib'),
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    externals: [
        Object.assign({
            vue: 'vue',
            lemon: 'lemon'
        }, externals),
        nodeExternals()
    ]
};
