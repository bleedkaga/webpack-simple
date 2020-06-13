const baseCommon = require('./webpack.base.config')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const merge = require('webpack-merge')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin() // 测量各个插件和loader所花费的时间
const { DllReferencePlugin } = require('webpack')
const path = require('path');

module.exports = smp.wrap(merge(baseCommon, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        concatenateModules: true, // 作用域提升：webpack 通过 ES6 语法的静态分析，分析出依赖模块之间的依赖关系，尽可能地把模块放到同一个函数中。
    },
    plugins: [
        new DllReferencePlugin({
            // manifest: path.resolve(__dirname, './dll/main-manifest.json')
        }),
        new AddAssetHtmlPlugin([{
            // filepath: path.resolve(__dirname, './dll/.dll.js')
        }])
    ],

}))