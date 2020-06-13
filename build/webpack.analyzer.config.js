const baseCommon = require('./webpack.base.config')
const merge = require('webpack-merge')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin() // 测量各个插件和loader所花费的时间
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 依赖分析

module.exports = smp.wrap(merge(baseCommon, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        concatenateModules: true, // 作用域提升：webpack 通过 ES6 语法的静态分析，分析出依赖模块之间的依赖关系，尽可能地把模块放到同一个函数中。
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],

}))