const path = require('path')
const { DllPlugin } = require('webpack')

module.exports = {
    mode: 'development',
    // entry: ['vue', 'vue-router', 'vuex', 'axios', 'lodash'],
    entry: {
        vue: ['vue'],
        vue_router: ['vue-router'],
        vuex: ['vuex'],
        axios: ['axios'],
        lodash: ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dll'),
        filename: '[name].dll.js',
        library: "[name]_[hash:6]"
    },
    plugins: [
        new DllPlugin({
            path: path.resolve(__dirname, './dll', '[name]-manifest.json'),
            name: "[name]_[hash:6]"
        })
    ]
}