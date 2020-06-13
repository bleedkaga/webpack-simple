const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
    mode: 'development',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    devtool: 'inline-source-map',
})