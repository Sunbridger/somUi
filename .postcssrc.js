const createResolver = require('postcss-import-webpack-resolver');

module.exports = {
    plugins: [
        require('@souche-ui/postcss-ui-theme')({
            import: {
                resolve: createResolver({
                    alias: {
                        'lemon': '@souche-ui/lemon'
                    },
                    modules: ['src', 'node_modules']
                })
            },
            defaultNamespace: 'som',
            overrideBrowserslist: ['iOS >= 7', 'Android >= 4.1', 'Safari >= 6']
        }),
    ]
};
